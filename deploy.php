<?php
$token = 'MVQiEK+hHKs7ilfRS2rUqzLMDzzz3fPqFGd2q4rWtJs=';
if (($_GET['token'] ?? '') !== $token) { http_response_code(403); exit('Forbidden'); }

$root = __DIR__;
$zip  = $root . '/dist.zip';
if (!file_exists($zip)) { http_response_code(404); exit('No archive'); }

// Files/folders at the top level that must survive the wipe
$keep = ['deploy.php', 'dist.zip', '.htaccess', 'cgi-bin', '.well-known'];

function rrmdir(string $path): void {
    foreach (scandir($path) as $item) {
        if ($item === '.' || $item === '..') continue;
        $full = "$path/$item";
        is_dir($full) && !is_link($full) ? rrmdir($full) : unlink($full);
    }
    rmdir($path);
}

// 1. Clean
foreach (scandir($root) as $item) {
    if ($item === '.' || $item === '..' || in_array($item, $keep, true)) continue;
    $full = "$root/$item";
    is_dir($full) && !is_link($full) ? rrmdir($full) : unlink($full);
}

// 2. Extract
$z = new ZipArchive();
if ($z->open($zip) !== true) { http_response_code(500); exit('Bad archive'); }
$z->extractTo($root);
$z->close();
unlink($zip);
unlink(__FILE__);

echo 'OK';
