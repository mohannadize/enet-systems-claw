<?php

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed.']);
    exit;
}

$configFile = is_file(__DIR__ . '/contact.config.php')
    ? __DIR__ . '/contact.config.php'
    : __DIR__ . '/../contact.config.php';
if (!is_file($configFile)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Contact form is not configured.']);
    exit;
}

$config = require $configFile;
$to = isset($config['to']) ? (string) $config['to'] : '';
$from = isset($config['from']) ? (string) $config['from'] : '';
$secret = isset($config['turnstile_secret']) ? (string) $config['turnstile_secret'] : '';

if ($to === '' || $from === '' || $secret === '') {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Contact form is not configured.']);
    exit;
}

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$phone = trim((string) ($_POST['phone'] ?? ''));
$service = trim((string) ($_POST['service'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));
$token = (string) ($_POST['cf-turnstile-response'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Please fill in your name, email, and message.']);
    exit;
}

if (strlen($name) > 200 || strlen($phone) > 50 || strlen($service) > 80 || strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'One of the fields is too long.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $email) || preg_match('/[\r\n]/', $name)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Please enter a valid email address.']);
    exit;
}

$remoteIp = $_SERVER['HTTP_CF_CONNECTING_IP']
    ?? $_SERVER['HTTP_X_FORWARDED_FOR']
    ?? $_SERVER['REMOTE_ADDR']
    ?? '';
if (is_string($remoteIp) && strpos($remoteIp, ',') !== false) {
    $remoteIp = trim(explode(',', $remoteIp)[0]);
}

$turnstile = verify_turnstile($secret, $token, is_string($remoteIp) ? $remoteIp : '');
if (empty($turnstile['success'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Verification failed. Please try again.']);
    exit;
}

$services = [
    'web' => 'Web Development',
    'odoo' => 'Odoo ERP',
    'mobile' => 'Mobile Apps',
    'agentic' => 'Agentic Automation',
    'other' => 'Other',
];
$serviceLabel = isset($services[$service]) ? $services[$service] : ($service !== '' ? $service : 'Not specified');

$body = "New enquiry from the ENET website\n\n"
    . "Name: {$name}\n"
    . "Email: {$email}\n"
    . "Phone: " . ($phone !== '' ? $phone : 'Not provided') . "\n"
    . "Service: {$serviceLabel}\n\n"
    . "Message:\n{$message}\n";

$subject = 'Website enquiry from ' . $name;
$headers = [
    'From: ENET Website <' . $from . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: ENET contact form',
];

$sent = mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Could not send your message. Please email us directly.']);
    exit;
}

echo json_encode(['ok' => true]);

function verify_turnstile($secret, $token, $remoteIp)
{
    if ($token === '') {
        return ['success' => false];
    }

    $fields = [
        'secret' => $secret,
        'response' => $token,
    ];
    if ($remoteIp !== '') {
        $fields['remoteip'] = $remoteIp;
    }

    $url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    $raw = http_post($url, $fields);
    if ($raw === false) {
        return ['success' => false];
    }

    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : ['success' => false];
}

function http_post($url, $fields)
{
    $payload = http_build_query($fields);

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
        ]);
        $body = curl_exec($ch);
        curl_close($ch);
        return $body === false ? false : $body;
    }

    $context = stream_context_create([
        'http' => [
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => $payload,
            'timeout' => 10,
        ],
    ]);
    $body = @file_get_contents($url, false, $context);
    return $body === false ? false : $body;
}
