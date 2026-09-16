/**
 * Site-wide i18n: locale plumbing + the EN/AR UI string dictionary.
 * Content translation lives in the content collections (en/ar folders).
 */

export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const languageNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
};

export const isLocale = (v: string): v is Locale =>
  (locales as readonly string[]).includes(v);

/** Extract the active locale from a URL (handles the /en, /ar prefixes). */
export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang && isLocale(lang)) return lang;
  return defaultLocale;
}

/** Absolute URL for the same page in a different locale (strips the current locale prefix). */
export function getLocaleUrl(url: URL, locale: Locale): string {
  const segments = url.pathname.split('/').filter(Boolean); // e.g. ['en','about'] or ['about']
  if (segments.length > 0 && isLocale(segments[0])) segments.shift();
  const suffix = segments.length ? `/${segments.join('/')}` : '/';
  return `/${locale}${suffix}`;
}

const en = {
  dir: 'ltr',
  // Navbar
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.caseStudies': 'Case Studies',
  'nav.services': 'Services',
  'nav.blog': 'Blog',
  'nav.contact': 'Contact',
  'nav.getStarted': 'Get started',
  'nav.allServices': 'All services',
  'nav.toggleMenu': 'Toggle menu',
  'nav.closeMenu': 'Close menu',
  'nav.connect': 'Connect',
  // Footer
  'footer.tagline': 'Growth through technology.',
  'footer.quickLinks': 'Quick Links',
  'footer.services': 'Services',
  'footer.contact': 'Contact',
  'footer.webDevelopment': 'Web Development',
  'footer.odooErp': 'Odoo ERP',
  'footer.mobileApps': 'Mobile Apps',
  'footer.followUs': 'Follow us',
  'footer.rights': 'All rights reserved.',
  // Common
  'common.getInTouch': 'Get in Touch',
  'common.ourServices': 'Our Services',
  'common.learnMore': 'Learn More',
  'common.visitWebsite': 'Visit Website',
  'common.workWithUs': 'Work With Us',
  'common.readCaseStudy': 'Read case study',
  'common.readArticle': 'Read article',
  'common.viewAllCaseStudies': 'View All Case Studies',
  'common.viewAllArticles': 'View all articles',
  'common.allServices': 'All Services',
  'common.moreProjects': 'More Projects',
  'common.startAProject': 'Start a Project',
  'common.backToPortfolio': 'Portfolio',
  'common.caseStudies': 'Case Studies',
  'common.portfolio': 'Portfolio',
  // Category / badge labels
  'cat.ecommerce': 'E-commerce',
  'cat.odoo': 'Odoo ERP',
  'cat.web': 'Web Development',
  'cat.mobile': 'Mobile App',
  // Home
  'home.softwareThat': 'Software that',
  'home.drivesGrowth': 'Drives Growth.',
  'home.subtitle':
    'We build software that transforms businesses across Kuwait and the MENA region.',
  'home.viewOurWork': 'View Our Work',
  'home.whatWeDo': 'What We Do',
  'home.ourServices': 'Our Services',
  'home.servicesSub':
    'Comprehensive digital solutions tailored to elevate your business in the modern landscape.',
  'home.clientStories': 'Client Stories',
  'home.caseStudies': 'Case Studies',
  'home.caseStudiesSub':
    "Real projects, real results. See how we've helped businesses transform their digital operations.",
  'home.insights': 'Insights',
  'home.fromTheBlog': 'From the blog',
  'home.blogSub':
    'Notes on ERP, commerce, and shipping software that holds up in production across Kuwait and the wider region.',
  'home.clientVoices': 'Client voices',
  'home.whatPartnersSay': 'What partners say',
  'home.partnersSub':
    'Long-term relationships matter to us — here is how teams describe working with ENET on the ground.',
  'home.readyToTransform': 'Ready to Transform Your Business?',
  'home.letsDiscuss':
    "Let's discuss how we can help you achieve your digital transformation goals.",
  'home.statYears': 'Years Experience',
  'home.statProjects': 'Projects Delivered',
  'home.statClients': 'Happy Clients',
  'home.statSupport': '24/7 Support',
  // About
  'about.title': 'About Us',
  'about.subtitle': 'Your trusted partner in digital transformation since 2015',
  'about.ourStory': 'Our Story',
  'about.drivingTitle': 'Driving Digital Excellence in Kuwait',
  'about.p1':
    'ENET Systems LTD was founded with a mission to help businesses in Kuwait and the MENA region harness the power of technology for growth and innovation. Over the years, we have evolved into a comprehensive software solutions provider, serving clients across various industries.',
  'about.p2':
    "Our team of experienced developers, designers, and business analysts work collaboratively to deliver solutions that not only meet technical requirements but also align with our clients' business objectives. We believe in building long-term partnerships based on trust, transparency, and exceptional results.",
  'about.p3':
    'As an official Odoo Partner, we bring international best practices in enterprise resource planning to local businesses, helping them streamline operations and achieve digital maturity.',
  'about.statYears': 'Years in Business',
  'about.statProjects': 'Projects Completed',
  'about.statClients': 'Happy Clients',
  'about.statTeam': 'Team Members',
  'about.whatWeBelieve': 'What We Believe',
  'about.coreValues': 'Our Core Values',
  'about.value.innovation': 'Innovation',
  'about.value.innovation.desc':
    'We embrace new technologies and creative solutions to solve complex business challenges.',
  'about.value.quality': 'Quality',
  'about.value.quality.desc':
    'Excellence in code, design, and service is non-negotiable. We deliver nothing less than the best.',
  'about.value.partnership': 'Partnership',
  'about.value.partnership.desc':
    'Your success is our success. We work as an extension of your team, not just a vendor.',
  'about.thePersonBehind': 'The Person Behind It',
  'about.founder': 'Founder',
  'about.role': 'Founder & CEO',
  'about.connectLinkedIn': 'Connect on LinkedIn',
  'about.bio1':
    'Mohanad Hesham is a Full Stack Web Developer with over 4 years of hands-on experience building web applications across a broad technology stack — PHP, Python, Node.js, SQL, and beyond.',
  'about.bio2':
    'What sets Mohanad apart is an uncommon blend of technical depth and business acumen, forged through years of working with startups in Egypt and Kuwait. That experience shaped a practical, results-first approach to software: build what works, ship fast, and keep improving.',
  'about.bio3':
    'He founded ENET Systems with a simple conviction — that businesses in Kuwait and the MENA region deserve high-quality digital solutions built by people who genuinely care about outcomes. Every project at ENET carries that same ethos.',
  'about.letsWorkTogether': "Let's Work Together",
  'about.ctaDesc':
    "Ready to transform your business with technology? We're here to help.",
  // Contact
  'contact.title': 'Contact Us',
  'contact.subtitle': 'Get in touch with our team for a free consultation',
  'contact.letsConnect': "Let's Connect",
  'contact.desc':
    "Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  'contact.phone': 'Phone',
  'contact.email': 'Email',
  'contact.workingHours': 'Working Hours',
  'contact.social': 'Social',
  'contact.sendUsMessage': 'Send Us a Message',
  'contact.fullName': 'Full Name *',
  'contact.emailAddress': 'Email Address *',
  'contact.phoneNumber': 'Phone Number',
  'contact.serviceInterested': 'Service Interested In',
  'contact.selectService': 'Select a service',
  'contact.opt.web': 'Web Development',
  'contact.opt.odoo': 'Odoo ERP',
  'contact.opt.mobile': 'Mobile Apps',
  'contact.opt.other': 'Other',
  'contact.message': 'Message *',
  'contact.sendMessage': 'Send Message',
  'contact.thanks':
    'Thank you for your message! We will get back to you soon.',
  // Services
  'services.title': 'Our Services',
  'home.techHighlight': 'Technologies We Work With',
  'services.subtitle': 'Comprehensive digital solutions to power your business growth',
  'services.whatWeUse': 'What We Use',
  'services.overview': 'Overview',
  'services.techSub': 'Technologies We Use',
  'services.howWeWork': 'How We Work',
  'services.process': 'Our Development Process',
  'services.process.1': 'Discovery',
  'services.process.1.desc': 'We analyze requirements and create a detailed project roadmap.',
  'services.process.2': 'Design',
  'services.process.2.desc': 'Our design team creates intuitive interfaces aligned with your brand.',
  'services.process.3': 'Development',
  'services.process.3.desc': 'Expert developers build using best practices and cutting-edge tech.',
  'services.process.4': 'Testing',
  'services.process.4.desc': 'Rigorous QA ensures your product is bug-free and optimal.',
  'services.process.5': 'Deployment',
  'services.process.5.desc': 'We deploy to production and ensure smooth launch.',
  'services.process.6': 'Support',
  'services.process.6.desc': 'Ongoing maintenance to keep your solution running at peak.',
  'services.readyToStart': 'Ready to Start Your Project?',
  'services.ctaDesc': "Let's discuss how we can help bring your vision to life.",
  // Portfolio index
  'portfolio.title': 'Our Portfolio',
  'portfolio.subtitle':
    'A showcase of our work across e-commerce, corporate websites, and ERP solutions.',
  'portfolio.projectsDelivered': 'Projects Delivered',
  'portfolio.serviceCategories': 'Service Categories',
  'portfolio.yearsExperience': 'Years Experience',
  'portfolio.happyClients': 'Happy Clients',
  'portfolio.viewCaseStudy': 'View case study',
  'portfolio.startYourProject': 'Start Your Project',
  'portfolio.ctaDesc':
    "Ready to build something amazing? Let's discuss your next project and bring your vision to life.",
  'portfolio.cat.ecommerce': 'E-commerce',
  'portfolio.cat.ecommerce.desc':
    'Online stores with secure payments, inventory management, and responsive design',
  'portfolio.cat.web': 'Company Profiles',
  'portfolio.cat.web.desc':
    'Professional corporate websites that showcase your brand and services',
  'portfolio.cat.odoo': 'Odoo ERP',
  'portfolio.cat.odoo.desc':
    'Enterprise resource planning solutions for streamlined operations',
  // Blog
  'blog.title': 'Blog',
  'blog.subtitle':
    'Practical notes on building software that runs businesses — ERP, commerce, and the web stack in between.',
  'blog.articles': 'Articles',
  'blog.updated': 'Updated',
  'blog.morePosts': 'More posts',
  'blog.footerCta': 'Want to work together?',
  'blog.getInTouch': 'Get in touch',
  'blog.orExplore': 'or explore',
  // Case studies index
  'cs.title': 'Client Case Studies',
  'cs.subtitle':
    "Real stories of digital transformation. From single-service deployments to full-stack overhauls — see what we've built and the results it delivered.",
  'cs.count': 'Case Studies',
  'cs.featured': 'Featured',
  'cs.all': 'All Case Studies',
  'cs.wantResults': 'Want Results Like These?',
  'cs.ctaDesc':
    "Every case study started with a conversation. Let's talk about what we can build for your business.",
  // Content detail pages
  'detail.servicesDelivered': 'Services delivered',
  'detail.moreCaseStudies': 'More Case Studies',
  'detail.readyToBuild': 'Ready to Build Something Like This?',
  'detail.csCtaDesc':
    "Let's talk about how we can help your business achieve similar results.",
  'detail.readyToGetStarted': 'Ready to Get Started?',
  'detail.svcCtaDesc':
    "Let's talk about your project and how we can help bring it to life.",
  'detail.readyToBuildPortfolio': 'Ready to build something like this?',
  'detail.pfCtaDesc': "Let's talk about what we can create together.",
  'detail.startYourProject': 'Start Your Project',
} as const;

type Dictionary = typeof en;

const ar: Dictionary = {
  dir: 'rtl',
  // Navbar
  'nav.home': 'الرئيسية',
  'nav.about': 'من نحن',
  'nav.caseStudies': 'دراسات الحالة',
  'nav.services': 'الخدمات',
  'nav.blog': 'المدونة',
  'nav.contact': 'تواصل معنا',
  'nav.getStarted': 'ابدأ الآن',
  'nav.allServices': 'جميع الخدمات',
  'nav.toggleMenu': 'فتح القائمة',
  'nav.closeMenu': 'إغلاق القائمة',
  'nav.connect': 'تواصل معنا',
  // Footer
  'footer.tagline': 'النمو من خلال التكنولوجيا.',
  'footer.quickLinks': 'روابط سريعة',
  'footer.services': 'الخدمات',
  'footer.contact': 'تواصل معنا',
  'footer.webDevelopment': 'تطوير الويب',
  'footer.odooErp': 'أودو ERP',
  'footer.mobileApps': 'تطبيقات الجوال',
  'footer.followUs': 'تابعنا',
  'footer.rights': 'جميع الحقوق محفوظة.',
  // Common
  'common.getInTouch': 'تواصل معنا',
  'common.ourServices': 'خدماتنا',
  'common.learnMore': 'اعرف المزيد',
  'common.visitWebsite': 'زيارة الموقع',
  'common.workWithUs': 'اعمل معنا',
  'common.readCaseStudy': 'اقرأ دراسة الحالة',
  'common.readArticle': 'اقرأ المقال',
  'common.viewAllCaseStudies': 'عرض جميع دراسات الحالة',
  'common.viewAllArticles': 'عرض جميع المقالات',
  'common.allServices': 'جميع الخدمات',
  'common.moreProjects': 'المزيد من المشاريع',
  'common.startAProject': 'ابدأ مشروعاً',
  'common.backToPortfolio': 'أعمالنا',
  'common.caseStudies': 'دراسات الحالة',
  'common.portfolio': 'أعمالنا',
  // Category / badge labels
  'cat.ecommerce': 'تجارة إلكترونية',
  'cat.odoo': 'أودو ERP',
  'cat.web': 'تطوير الويب',
  'cat.mobile': 'تطبيق جوال',
  // Home
  'home.softwareThat': 'برمجيات تقود',
  'home.drivesGrowth': 'نمو أعمالك.',
  'home.subtitle':
    'نبني برمجيات تحوّل الأعمال في الكويت ومنطقة الشرق الأوسط وشمال أفريقيا.',
  'home.viewOurWork': 'شاهد أعمالنا',
  'home.whatWeDo': 'ماذا نقدم',
  'home.ourServices': 'خدماتنا',
  'home.servicesSub':
    'حلول رقمية متكاملة مصمّمة لترتقي بأعمالك في المشهد الرقمي الحديث.',
  'home.clientStories': 'قصص العملاء',
  'home.caseStudies': 'دراسات الحالة',
  'home.caseStudiesSub':
    'مشاريع حقيقية ونتائج ملموسة. تعرّف على كيف ساعدنا الشركات في تحويل عملياتها الرقمية.',
  'home.insights': 'رؤى',
  'home.fromTheBlog': 'من المدونة',
  'home.blogSub':
    'ملاحظات عملية حول أنظمة ERP والتجارة الإلكترونية والبرمجيات الموثوقة في بيئات الإنتاج بالكويت والمنطقة.',
  'home.clientVoices': 'آراء العملاء',
  'home.whatPartnersSay': 'ماذا يقول شركاؤنا',
  'home.partnersSub':
    'العلاقات طويلة الأمد مهمة لدينا — إليك كيف تصف الفرق التعامل مع ENET في الميدان.',
  'home.readyToTransform': 'جاهز لتحويل أعمالك رقمياً؟',
  'home.letsDiscuss':
    'لنتحدث عن كيف يمكننا مساعدتك في تحقيق أهداف التحول الرقمي.',
  'home.statYears': 'سنوات خبرة',
  'home.statProjects': 'مشروع منجز',
  'home.statClients': 'عميل سعيد',
  'home.statSupport': 'دعم على مدار الساعة',
  // About
  'about.title': 'من نحن',
  'about.subtitle': 'شريكك الموثوق في التحول الرقمي منذ 2015',
  'about.ourStory': 'قصتنا',
  'about.drivingTitle': 'نقود التميز الرقمي في الكويت',
  'about.p1':
    'تأسست ENET Systems LTD برسالة واضحة: مساعدة الشركات في الكويت ومنطقة الشرق الأوسط وشمال أفريقيا على توظيف قوة التكنولوجيا لتحقيق النمو والابتكار. وعلى مر السنين، تطورنا إلى مزوّد حلول برمجية متكاملة نخدم من خلاله عملاء في قطاعات متنوعة.',
  'about.p2':
    'يعمل فريقنا من مطوّرين ومصمّمين ومحللي أعمال ذوي خبرة بشكل تعاوني لتقديم حلول لا تلبي المتطلبات التقنية فحسب، بل تتوافق أيضاً مع أهداف عملائنا التجارية. نؤمن ببناء شراكات طويلة الأمد تقوم على الثقة والشفافية والنتائج الاستثنائية.',
  'about.p3':
    'بصفتنا شريكاً رسمياً لـ Odoo، نجلب أفضل الممارسات العالمية في تخطيط موارد المؤسسات إلى الشركات المحلية، لمساعدتها على تبسيط عملياتها والوصول إلى النضج الرقمي.',
  'about.statYears': 'سنوات في العمل',
  'about.statProjects': 'مشروع مكتمل',
  'about.statClients': 'عميل سعيد',
  'about.statTeam': 'عضو في الفريق',
  'about.whatWeBelieve': 'ما نؤمن به',
  'about.coreValues': 'قيمنا الأساسية',
  'about.value.innovation': 'الابتكار',
  'about.value.innovation.desc':
    'نتبنى التقنيات الجديدة والحلول الإبداعية لحل التحديات التجارية المعقدة.',
  'about.value.quality': 'الجودة',
  'about.value.quality.desc':
    'التميز في الكود والتصميم والخدمة ليس خياراً. نقدم دائماً الأفضل.',
  'about.value.partnership': 'الشراكة',
  'about.value.partnership.desc':
    'نجاحك هو نجاحنا. نعمل كجزء من فريقك وليس مجرد مورّد.',
  'about.thePersonBehind': 'صاحب الرؤية',
  'about.founder': 'المؤسس',
  'about.role': 'المؤسس والرئيس التنفيذي',
  'about.connectLinkedIn': 'تواصل عبر لينكدإن',
  'about.bio1':
    'مهنّد هشام مطوّر ويب متكامل (Full Stack) يتمتع بخبرة عملية تتجاوز أربع سنوات في بناء تطبيقات الويب عبر مجموعة واسعة من التقنيات — PHP وPython وNode.js وSQL وغيرها.',
  'about.bio2':
    'ما يميّز مهنّد هو مزيج نادر من العمق التقني والفطنة التجارية، صقلته سنوات العمل مع الشركات الناشئة في مصر والكويت. شكّلت تلك التجربة منهجاً عملياً يركز على النتائج: ابنِ ما ينجح، وأطلق بسرعة، واستمر في التحسين.',
  'about.bio3':
    'أسّس ENET Systems بقناعة بسيطة — أن الشركات في الكويت والمنطقة تستحق حلولاً رقمية عالية الجودة يبنيها أشخاص يهتمون فعلاً بالنتائج. كل مشروع في ENET يحمل هذه الروح.',
  'about.letsWorkTogether': 'لنعمل معاً',
  'about.ctaDesc': 'جاهز لتحويل أعمالك بالتكنولوجيا؟ نحن هنا لمساعدتك.',
  // Contact
  'contact.title': 'تواصل معنا',
  'contact.subtitle': 'تواصل مع فريقنا للحصول على استشارة مجانية',
  'contact.letsConnect': 'لنبدأ المحادثة',
  'contact.desc':
    'لديك مشروع في ذهنك؟ يسعدنا أن نسمع منك. أرسل لنا رسالة وسنرد في أقرب وقت ممكن.',
  'contact.phone': 'الهاتف',
  'contact.email': 'البريد الإلكتروني',
  'contact.workingHours': 'ساعات العمل',
  'contact.social': 'وسائل التواصل',
  'contact.sendUsMessage': 'أرسل لنا رسالة',
  'contact.fullName': 'الاسم الكامل *',
  'contact.emailAddress': 'البريد الإلكتروني *',
  'contact.phoneNumber': 'رقم الهاتف',
  'contact.serviceInterested': 'الخدمة المطلوبة',
  'contact.selectService': 'اختر خدمة',
  'contact.opt.web': 'تطوير الويب',
  'contact.opt.odoo': 'أودو ERP',
  'contact.opt.mobile': 'تطبيقات الجوال',
  'contact.opt.other': 'أخرى',
  'contact.message': 'الرسالة *',
  'contact.sendMessage': 'إرسال الرسالة',
  'contact.thanks': 'شكراً لرسالتك! سنعود إليك قريباً.',
  // Services
  'services.title': 'خدماتنا',
  'home.techHighlight': 'التقنيات التي نعمل بها',
  'services.subtitle': 'حلول رقمية متكاملة لدفع نمو أعمالك',
  'services.whatWeUse': 'ماذا نستخدم',
  'services.overview': 'نظرة عامة',
  'services.techSub': 'التقنيات التي نستخدمها',
  'services.howWeWork': 'كيف نعمل',
  'services.process': 'منهجية تطويرنا',
  'services.process.1': 'الاكتشاف',
  'services.process.1.desc': 'نحلل المتطلبات ونضع خارطة طريق مفصّلة للمشروع.',
  'services.process.2': 'التصميم',
  'services.process.2.desc': 'فريق التصميم يبتكر واجهات سهلة الاستخدام تتناسب مع هوية علامتك.',
  'services.process.3': 'التطوير',
  'services.process.3.desc': 'مطوّرون خبراء يبنون باستخدام أفضل الممارسات وأحدث التقنيات.',
  'services.process.4': 'الاختبار',
  'services.process.4.desc': 'ضمان جودة صارم يضمن أن منتجك خالٍ من الأخطاء وبأداء مثالي.',
  'services.process.5': 'الإطلاق',
  'services.process.5.desc': 'ننشر إلى بيئة الإنتاج ونضمن إطلاقاً سلساً.',
  'services.process.6': 'الدعم',
  'services.process.6.desc': 'صيانة مستمرة لإبقاء حلّك يعمل بأعلى كفاءة.',
  'services.readyToStart': 'جاهز لبدء مشروعك؟',
  'services.ctaDesc': 'لنتحدث عن كيف يمكننا تحويل رؤيتك إلى واقع.',
  // Portfolio index
  'portfolio.title': 'أعمالنا',
  'portfolio.subtitle':
    'عرض مختار من أعمالنا في التجارة الإلكترونية والمواقع المؤسسية وحلول ERP.',
  'portfolio.projectsDelivered': 'مشروع منجز',
  'portfolio.serviceCategories': 'فئات الخدمات',
  'portfolio.yearsExperience': 'سنوات خبرة',
  'portfolio.happyClients': 'عميل سعيد',
  'portfolio.viewCaseStudy': 'عرض دراسة الحالة',
  'portfolio.startYourProject': 'ابدأ مشروعك',
  'portfolio.ctaDesc':
    'جاهز لبناء شيء رائع؟ لنتحدث عن مشروعك القادم ونحوّل رؤيتك إلى واقع.',
  'portfolio.cat.ecommerce': 'التجارة الإلكترونية',
  'portfolio.cat.ecommerce.desc':
    'متاجر إلكترونية مع مدفوعات آمنة وإدارة مخزون وتصميم متجاوب',
  'portfolio.cat.web': 'المواقع المؤسسية',
  'portfolio.cat.web.desc':
    'مواقع شركات احترافية تعرض علامتك وخدماتك بأفضل صورة',
  'portfolio.cat.odoo': 'أودو ERP',
  'portfolio.cat.odoo.desc':
    'حلول تخطيط موارد المؤسسات لتبسيط عملياتك التشغيلية',
  // Blog
  'blog.title': 'المدونة',
  'blog.subtitle':
    'ملاحظات عملية حول بناء برمجيات تدير الأعمال — ERP والتجارة الإلكترونية وتقنيات الويب فيما بينها.',
  'blog.articles': 'مقالات',
  'blog.updated': 'تم التحديث',
  'blog.morePosts': 'مقالات أخرى',
  'blog.footerCta': 'تريد العمل معنا؟',
  'blog.getInTouch': 'تواصل معنا',
  'blog.orExplore': 'أو استكشف',
  // Case studies index
  'cs.title': 'دراسات حالة العملاء',
  'cs.subtitle':
    'قصص حقيقية للتحول الرقمي. من تنفيذ خدمة واحدة إلى إصلاح شامل للمنظومة — شاهد ما بنيناه والنتائج التي حققناها.',
  'cs.count': 'دراسة حالة',
  'cs.featured': 'مختارة',
  'cs.all': 'جميع دراسات الحالة',
  'cs.wantResults': 'تريد نتائج مماثلة؟',
  'cs.ctaDesc':
    'كل دراسة حالة بدأت بمحادثة. لنتحدث عما يمكننا بناؤه لأعمالك.',
  // Content detail pages
  'detail.servicesDelivered': 'الخدمات المقدمة',
  'detail.moreCaseStudies': 'دراسات حالة أخرى',
  'detail.readyToBuild': 'جاهز لبناء شيء مماثل؟',
  'detail.csCtaDesc':
    'لنتحدث عن كيف يمكننا مساعدة أعمالك على تحقيق نتائج مماثلة.',
  'detail.readyToGetStarted': 'جاهز للبدء؟',
  'detail.svcCtaDesc': 'لنتحدث عن مشروعك وكيف يمكننا المساعدة في إنجازه.',
  'detail.readyToBuildPortfolio': 'جاهز لبناء شيء مماثل؟',
  'detail.pfCtaDesc': 'لنتحدث عما يمكننا إبداعه معاً.',
  'detail.startYourProject': 'ابدأ مشروعك',
};

export type UiKey = keyof Dictionary;

export const translations: Record<Locale, Dictionary> = { en, ar };

/** Translate a UI key for a locale. Falls back to English. */
export function t(locale: Locale, key: UiKey): string {
  return translations[locale][key] ?? translations[defaultLocale][key];
}

export function dir(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}
