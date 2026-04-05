export type Locale = 'en' | 'fa' | 'ur'

export const copy = {
  en: {
    brand: 'One Ummah · Iran relief',
    navAbout: 'Our duty',
    navImpact: 'Humanitarian need',
    navDonate: 'Donate',
    navCta: 'Stand with them',
    navFaq: 'FAQ',
    navComments: 'Comments',
    langLabel: 'Language',
    bismillah: 'بسم الله الرحمن الرحيم',
    heroKicker: 'One Ummah · We stand together',
    heroTitle: 'Stand With Our Brothers and Sisters in Iran',
    heroLead:
      'In times of hardship, we are one Ummah. Our brothers and sisters are suffering, losing their homes, and struggling to survive. Together, we can stand by them — with compassion, dignity, and support.',
    heroStrength: 'Be Their Support. Be Their Strength.',
    heroCta: 'Donate now',
    heroSecondary: 'See how you help',
    statsRaised: 'Raised (goal)',
    statsGoalPrefix: 'Goal:',
    statsCampaignProgress: 'Campaign progress',
    statsRaisedShort: 'Raised so far',
    statsOurGoal: 'Our goal',
    statsProgressAria: '{pct}% of goal reached',
    statsDonors: 'Supporters',
    statsNote:
      'Totals are in Pakistani rupees (PKR). Figures are updated manually from campaign records.',
    aboutTitle: 'One Ummah, One Responsibility',
    aboutBody:
      'When one part of the Ummah suffers, we all feel the pain. Today, families in Iran are in urgent need of help — not for war, but for survival.',
    aboutDuty:
      'Your donation is not just charity. It is a duty. It is humanity.',
    impactTitle: 'Humanitarian focus',
    impactIntro: 'Thousands of innocent people have been affected:',
    impactItems: [
      'Families have lost their homes',
      'Children need food and clean water',
      'Injured civilians need urgent medical care',
    ],
    impactClosing: 'Your support can help rebuild lives.',
    donateTitle: 'Help Our Brothers Rebuild Their Lives',
    donateIntro:
      'They need us now. Your contribution can ease suffering and restore dignity.',
    donateUsesTitle: 'Your contribution will go toward:',
    donateUses: [
      'Food and basic necessities',
      'Emergency shelter',
      'Medical assistance',
    ],
    donateHope: 'Every small act of kindness brings hope.',
    donatePaymentNote:
      'Give through a secure checkout page (Stripe, PayPal, or another provider you configure). Add your payment link in the site settings.',
    donatePrimary: 'Give securely',
    donateSecondary: 'Alternative payment method',
    donatePlaceholder:
      'Add your payment link in a .env file. Until then, this button is disabled.',
    amountsTitle: 'Suggested amounts',
    ctaTitle: "Don't Stay Silent. Stand With Them.",
    ctaLead:
      'They are not alone — because we are one Ummah. Your voice and your generosity matter.',
    ctaClosing: 'Be their support. Be their strength.',
    faqTitle: 'Questions',
    faqItems: [
      {
        q: 'Who receives the money?',
        a: 'All donations go toward helping people in need inside Iran — our brothers and sisters who are facing hardship, displacement, and crisis.\n\nFunds are delivered through trusted humanitarian partners and verified networks to ensure aid reaches families, children, and individuals who need it most, including food, medical care, and essential support.',
      },
      {
        q: 'Who are your partners on the ground?',
        a: 'We collaborate with trusted non-profits, government-related partners, and private charities to deliver aid safely and effectively.',
      },
      {
        q: 'Can I donate from outside my country?',
        a: 'Absolutely. We welcome support from anywhere in the world.',
      },
    ],
    commentsTitle: 'Verified comments',
    commentsIntro:
      'Only messages approved by our team appear here. You may write freely; each submission is reviewed before it is published.',
    commentsFormTitle: 'Leave us a message',
    commentsFormLead:
      'Use the form below to reach our team. We read every submission; only approved messages are shown publicly.',
    commentsStep1:
      'Write your message in the large box — duas, questions, words of support, or feedback.',
    commentsStep2:
      'Optionally add your name, or leave it empty to stay anonymous.',
    commentsStep3:
      'Press Send. You will see a confirmation when we receive it; if approved, it can take a little time before it appears in the list below.',
    commentsStep3Email:
      'Tap “Send with email app” below. Your mail program opens with your message—send it from there.',
    commentsOfflineLead:
      'Live submit is not connected yet (add Supabase in site settings for that). You can still send us your message by email.',
    commentsEmailButton: 'Send with email app',
    commentsOfflinePublished:
      'Approved public messages will show here after the comment service is connected.',
    commentsPublishedTitle: 'Published messages',
    commentsVerifiedBadge: 'Verified',
    commentsNameLabel: 'Name (optional)',
    commentsNamePlaceholder: 'Your name, or leave blank',
    commentsBodyLabel: 'Your message',
    commentsBodyPlaceholder:
      'Write anything you would like to share with the community…',
    commentsSubmit: 'Submit',
    commentsSubmitting: 'Sending…',
    commentsLoading: 'Loading…',
    commentsSuccess:
      'Thank you. Your message was received and will appear after it is verified.',
    commentsError: 'Something went wrong. Please try again later.',
    commentsErrorRateLimit:
      'Too many messages from your network. Please wait about an hour and try again.',
    commentsErrorProfanity:
      'We could not send that text. Please remove strong language and try again.',
    commentsEmpty:
      'No verified messages yet. Yours may appear here after moderation.',
    commentsAnonymous: 'Anonymous',
    footerContact: 'Contact',
    leaderAlt:
      'Ayatollah Ali Khamenei on a poster with Persian calligraphy and English text: Khamenei’s God is Alive O People',
    leaderCaption: 'Khamenei’s God is Alive O People — خدای خامنه‌ای زنده است ای مردم',
  },
  fa: {
    brand: 'امت واحده · کمک به ایران',
    navAbout: 'مسئولیت ما',
    navImpact: 'نیاز انسان‌دوستانه',
    navDonate: 'کمک مالی',
    navCta: 'همراهی کنید',
    navFaq: 'سوالات',
    navComments: 'نظرات',
    langLabel: 'زبان',
    bismillah: 'بسم الله الرحمن الرحيم',
    heroKicker: 'امت واحده · با هم می‌ایستیم',
    heroTitle: 'با برادران و خواهرانمان در ایران بایستیم',
    heroLead:
      'در روزهای سخت، ما یک امتیم. برادران و خواهرانمان در رنج‌اند، خانه‌هایشان را از دست داده‌اند و برای زنده ماندن می‌جنگند. با هم می‌توانیم کنارشان بایستیم — با رحمت، کرامت و حمایت واقعی.',
    heroStrength: 'پشتیبانشان باشید. توانشان باشید.',
    heroCta: 'همین حالا کمک کنید',
    heroSecondary: 'بدانید کمک‌تان کجا می‌رود',
    statsRaised: 'جمع شده (هدف)',
    statsGoalPrefix: 'هدف:',
    statsCampaignProgress: 'پیشرفت کمپین',
    statsRaisedShort: 'جمع‌شده تا اینجا',
    statsOurGoal: 'هدف ما',
    statsProgressAria: '{pct}٪ از هدف محقق شده',
    statsDonors: 'حامیان',
    statsNote:
      'مبالغ به روپیه پاکستان (PKR) است و از روی سوابق کمپین به‌صورت دستی به‌روز می‌شود.',
    aboutTitle: 'امت واحد، مسئولیت واحد',
    aboutBody:
      'وقتی بخشی از امت دردمند است، همه احساس می‌کنیم. امروز خانواده‌ها در ایران به کمک فوری نیاز دارند — نه برای جنگ، برای زنده ماندن.',
    aboutDuty:
      'کمک مالی شما فقط صدقه نیست. تکلیف است. انسانیت است.',
    impactTitle: 'تمرکز انسان‌دوستانه',
    impactIntro: 'هزاران انسان بی‌گناه آسیب دیده‌اند:',
    impactItems: [
      'خانواده‌ها خانه خود را از دست داده‌اند',
      'کودکان به غذا و آب سالم نیاز دارند',
      'غیرنظامیان زخمی به کمک پزشکی فوری نیاز دارند',
    ],
    impactClosing: 'حمایت شما می‌تواند به بازسازی زندگی‌ها کمک کند.',
    donateTitle: 'به برادرانمان برای بازسازی زندگی کمک کنیم',
    donateIntro:
      'اکنون به ما نیاز دارند. مشارکت شما می‌تواند رنج را کم و کرامت را برگرداند.',
    donateUsesTitle: 'کمک شما صرف این موارد می‌شود:',
    donateUses: [
      'غذا و مایحتاج اولیه',
      'سرپناه اضطراری',
      'کمک‌های پزشکی',
    ],
    donateHope: 'هر عمل کوچک مهربانی، امید می‌آورد.',
    donatePaymentNote:
      'از صفحه پرداخت امن (استرایپ، پی‌پال و غیره) استفاده کنید و لینک پرداخت را در تنظیمات سایت قرار دهید.',
    donatePrimary: 'پرداخت امن',
    donateSecondary: 'روش پرداخت دیگر',
    donatePlaceholder:
      'لینک پرداخت را در فایل .env قرار دهید. تا آن زمان این دکمه غیرفعال است.',
    amountsTitle: 'مبالغ پیشنهادی',
    ctaTitle: 'ساکت نمانید. کنارشان بایستید.',
    ctaLead:
      'تنها نیستند — چون ما یک امتیم. صدای شما و بخشندگی‌تان اهمیت دارد.',
    ctaClosing: 'پشتیبانشان باشید. توانشان باشید.',
    faqTitle: 'پرسش‌ها',
    faqItems: [
      {
        q: 'پول به دست چه کسی می‌رسد؟',
        a: 'تمام کمک‌ها صرف افراد نیازمند در داخل ایران — برادران و خواهران ما که با سختی، آواره‌شدگی و بحران روبه‌رو هستند — اختصاص دارد.\n\nکمک‌ها از طریق شرکای بشردوستانه مورد اعتماد و شبکه‌های تأییدشده تحویل داده می‌شود تا امداد به خانواده‌ها، کودکان و افرادی که بیش از همه نیاز دارند، از جمله غذا، مراقبت پزشکی و حمایت‌های ضروری برسد.',
      },
      {
        q: 'شرکای میدانی شما چه کسانی هستند؟',
        a: 'با سازمان‌های غیرانتفاعی مورد اعتماد، همکاران مرتبط با دولت و خیریه‌های خصوصی همکاری می‌کنیم تا کمک‌ها به‌صورت امن و مؤثر برسد.',
      },
      {
        q: 'آیا می‌توانم از خارج کشور کمک کنم؟',
        a: 'قطعاً. ما از حمایت از هر نقطه‌ای در جهان استقبال می‌کنیم.',
      },
    ],
    commentsTitle: 'نظرات تأییدشده',
    commentsIntro:
      'فقط پیام‌هایی که توسط تیم ما تأیید شده‌اند اینجا نمایش داده می‌شوند. آزادانه بنویسید؛ هر ارسال پیش از انتشار بررسی می‌شود.',
    commentsFormTitle: 'برای ما پیام بگذارید',
    commentsFormLead:
      'با فرم زیر با تیم ما در ارتباط باشید. هر ارسال را می‌خوانیم؛ فقط پیام‌های تأییدشده علناً نمایش داده می‌شوند.',
    commentsStep1:
      'در کادر بزرگ پیام خود را بنویسید — دعا، پرسش، همدلی یا بازخورد.',
    commentsStep2:
      'در صورت تمایل نام بگذارید، یا خالی بگذارید تا ناشناس بمانید.',
    commentsStep3:
      'ارسال را بزنید. پس از دریافت، پیام تأیید می‌بینید؛ در صورت تأیید، ممکن است کمی طول بکشد تا در فهرست زیر دیده شود.',
    commentsStep3Email:
      '«ارسال با ایمیل» را بزنید. برنامه ایمیل با متن شما باز می‌شود — از همان‌جا ارسال کنید.',
    commentsOfflineLead:
      'ارسال زنده هنوز وصل نیست (برای آن Supabase را در تنظیمات سایت اضافه کنید). همچنان می‌توانید با ایمیل به ما پیام دهید.',
    commentsEmailButton: 'ارسال با برنامه ایمیل',
    commentsOfflinePublished:
      'پس از اتصال سرویس نظرات، پیام‌های تأییدشده اینجا نمایش داده می‌شوند.',
    commentsPublishedTitle: 'پیام‌های منتشرشده',
    commentsVerifiedBadge: 'تأییدشده',
    commentsNameLabel: 'نام (اختیاری)',
    commentsNamePlaceholder: 'نام شما یا خالی بگذارید',
    commentsBodyLabel: 'پیام شما',
    commentsBodyPlaceholder:
      'هر چه می‌خواهید با جامعه در میان بگذارید بنویسید…',
    commentsSubmit: 'ارسال',
    commentsSubmitting: 'در حال ارسال…',
    commentsLoading: 'در حال بارگذاری…',
    commentsSuccess:
      'سپاس. پیام شما دریافت شد و پس از تأیید اینجا نمایش داده می‌شود.',
    commentsError: 'خطایی رخ داد. بعداً دوباره تلاش کنید.',
    commentsErrorRateLimit:
      'از این شبکه پیام‌های زیادی ارسال شده. حدود یک ساعت صبر کنید و دوباره تلاش کنید.',
    commentsErrorProfanity:
      'این متن ارسال نشد. لطفاً از واژه‌های نامناسب پرهیز کنید و دوباره تلاش کنید.',
    commentsEmpty:
      'هنوز پیام تأییدشده‌ای نیست؛ پس از بررسی، پیام شما ممکن است اینجا باشد.',
    commentsAnonymous: 'ناشناس',
    footerContact: 'تماس',
    leaderAlt:
      'پوستر آیت‌الله خامنه‌ای با خط فارسی و متن انگلیسی: خدای خامنه‌ای زنده است ای مردم',
    leaderCaption: 'خدای خامنه‌ای زنده است ای مردم',
  },
  ur: {
    brand: 'ایک امت · ایران امداد',
    navAbout: 'ہماری ذمہ داری',
    navImpact: 'انسانی ضرورت',
    navDonate: 'عطیہ',
    navCta: 'ان کے ساتھ کھڑے ہوں',
    navFaq: 'سوالات',
    navComments: 'تبصرے',
    langLabel: 'زبان',
    bismillah: 'بسم الله الرحمن الرحيم',
    heroKicker: 'ایک امت · ہم ساتھ ہیں',
    heroTitle: 'ایران میں اپنے بہنوں بھائیوں کے ساتھ کھڑے ہوں',
    heroLead:
      'مشکل کے دنوں میں ہم ایک امت ہیں۔ ہمارے بہن بھائی تکلیف میں ہیں، اپنا گھر کھو چکے ہیں، اور زندہ رہنے کی جدوجہد کر رہے ہیں۔ ہم مل کر ان کے ساتھ کھڑے ہو سکتے ہیں — رحمت، وقار اور سچی مدد کے ساتھ۔',
    heroStrength: 'ان کی مدد بنیں۔ ان کی طاقت بنیں۔',
    heroCta: 'ابھی عطیہ کریں',
    heroSecondary: 'دیکھیں آپ کی مدد کہاں جاتی ہے',
    statsRaised: 'جمع شدہ (ہدف)',
    statsGoalPrefix: 'ہدف:',
    statsCampaignProgress: 'مہم کی پیشرفت',
    statsRaisedShort: 'اب تک جمع',
    statsOurGoal: 'ہمارا ہدف',
    statsProgressAria: 'ہدف کا {pct}% پورا ہوا',
    statsDonors: 'حامی',
    statsNote:
      'رقوم پاکستانی روپے (PKR) میں ہیں؛ مہم کے ریکارڈ سے دستی طور پر اپ ڈیٹ ہوتی ہیں۔',
    aboutTitle: 'ایک امت، ایک ذمہ داری',
    aboutBody:
      'جب امت کا کوئی حصہ دکھ اٹھاتا ہے تو ہم سب محسوس کرتے ہیں۔ آج ایران میں خاندانوں کو فوری مدد درکار ہے — جنگ کے لیے نہیں، زندہ رہنے کے لیے۔',
    aboutDuty:
      'آپ کا عطیہ صرف خیرات نہیں۔ یہ فرض ہے۔ یہ انسانیت ہے۔',
    impactTitle: 'انسانی فوکس',
    impactIntro: 'ہزاروں معصوم متاثر ہوئے ہیں:',
    impactItems: [
      'خاندانوں نے اپنا گھر کھو دیا',
      'بچوں کو کھانا اور صاف پانی درکار ہے',
      'زخمی شہریوں کو فوری طبی امداد درکار ہے',
    ],
    impactClosing: 'آپ کی مدد زندگیاں دوبارہ سنبھالنے میں معاون ہو سکتی ہے۔',
    donateTitle: 'اپنے بھائیوں کی زندگی دوبارہ بسانے میں مدد کریں',
    donateIntro:
      'انہیں اب ہماری ضرورت ہے۔ آپ کا حصہ تکلیف کم کر سکتا ہے اور وقار لوٹا سکتا ہے۔',
    donateUsesTitle: 'آپ کا عطیہ ان پر خرچ ہو گا:',
    donateUses: [
      'خوراک اور بنیادی ضروریات',
      'ایمرجنسی پناہ',
      'طبی امداد',
    ],
    donateHope: 'ہر چھوٹی مہربانی امید لاتی ہے۔',
    donatePaymentNote:
      'محفوظ چیک آؤٹ (سٹرائپ، پی پال یا آپ کا سروس) کے ذریعے عطیہ کریں۔ سائٹ کی ترتیبات میں ادائیگی کا لنک شامل کریں۔',
    donatePrimary: 'محفوظ طریقے سے عطیہ',
    donateSecondary: 'متبادل ادائیگی',
    donatePlaceholder:
      '.env فائل میں ادائیگی کا لنک شامل کریں۔ تب تک یہ بٹن غیر فعال ہے۔',
    amountsTitle: 'تجویز کردہ رقم',
    ctaTitle: 'خاموش نہ رہیں۔ ان کے ساتھ کھڑے ہوں۔',
    ctaLead:
      'وہ اکیلے نہیں — کیونکہ ہم ایک امت ہیں۔ آپ کی آواز اور سخاوت اہم ہے۔',
    ctaClosing: 'ان کی مدد بنیں۔ ان کی طاقت بنیں۔',
    faqTitle: 'سوالات',
    faqItems: [
      {
        q: 'رقم کس تک پہنچتی ہے؟',
        a: 'تمام عطیات ایران میں محتاج لوگوں کی مدد کے لیے ہیں — وہ بھائی بہن جو مشکلات، بے گھری اور بحران کا سامنا کر رہے ہیں۔\n\nرقوم قابل اعتماد انسانی شراکت داروں اور تصدیق شدہ نیٹ ورکس کے ذریعے پہنچائی جاتی ہیں تاکہ خاندانوں، بچوں اور سب سے زیادہ ضرورت مند افراد تک امداد پہنچے، بشمول غذا، طبی دیکھ بھال اور ضروری معاونت۔',
      },
      {
        q: 'میدان میں آپ کے شراکت دار کون ہیں؟',
        a: 'ہم قابل اعتماد غیر منافع بخش اداروں، سرکاری وابستہ شراکت داروں اور نجی خیراتی اداروں کے ساتھ مل کر امداد محفوظ اور موثر طریقے سے پہنچاتے ہیں۔',
      },
      {
        q: 'کیا میں اپنے ملک سے باہر سے عطیہ کر سکتا ہوں؟',
        a: 'بالکل۔ ہم دنیا بھر سے حمایت کا خیرمقدم کرتے ہیں۔',
      },
    ],
    commentsTitle: 'تصدیق شدہ تبصرے',
    commentsIntro:
      'صرف وہ پیغامات یہاں دکھائے جاتے ہیں جنہیں ہماری ٹیم نے منظور کیا ہو۔ آزادانہ لکھیں؛ ہر ارسال شائع ہونے سے پہلے دیکھی جاتی ہے.',
    commentsFormTitle: 'ہمیں پیغام بھیجیں',
    commentsFormLead:
      'نیچے والے فارم سے ہماری ٹیم تک پہنچیں۔ ہر ارسال پڑھتے ہیں؛ صرف منظور شدہ پیغام عوامی طور پر دکھائے جاتے ہیں.',
    commentsStep1:
      'بڑے خانے میں اپنا پیغام لکھیں — دعائیں، سوالات، حمایت یا رائے.',
    commentsStep2:
      'چاہیں تو نام لکھیں، ورنہ خالی چھوڑیں اور گمنام رہیں.',
    commentsStep3:
      'جمع کرائیں دبائیں۔ وصول ہوتے ہی تصدیق نظر آئے گی؛ منظوری پر فہرست میں آنے میں تھوڑا وقت لگ سکتا ہے.',
    commentsStep3Email:
      'نیچے «ایمیل ایپ سے بھیجیں» دبائیں۔ میل پروگرام آپ کا متن لے کر کھلے گا — وہاں سے بھیجیں.',
    commentsOfflineLead:
      'لائیو بھیجنا ابھی منسلک نہیں (سائٹ میں Supabase شامل کریں)۔ پھر بھی ایمیل سے ہمیں پیغام دے سکتے ہیں.',
    commentsEmailButton: 'ایمیل ایپ سے بھیجیں',
    commentsOfflinePublished:
      'تبصرے کا نظام جوڑنے کے بعد منظور شدہ پیغامات یہاں دکھیں گے.',
    commentsPublishedTitle: 'شائع شدہ پیغامات',
    commentsVerifiedBadge: 'تصدیق شدہ',
    commentsNameLabel: 'نام (اختیاری)',
    commentsNamePlaceholder: 'اپنا نام یا خالی چھوڑ دیں',
    commentsBodyLabel: 'آپ کا پیغام',
    commentsBodyPlaceholder:
      'جو کچھ آپ برادری کے ساتھ شیئر کرنا چاہیں لکھیں…',
    commentsSubmit: 'جمع کرائیں',
    commentsSubmitting: 'بھیجا جا رہا ہے…',
    commentsLoading: 'لوڈ ہو رہا ہے…',
    commentsSuccess:
      'شکریہ۔ آپ کا پیغام موصول ہو گیا ہے اور تصدیق کے بعد یہاں نظر آئے گا.',
    commentsError: 'کچھ غلط ہو گیا۔ بعد میں دوبارہ کوشش کریں.',
    commentsErrorRateLimit:
      'آپ کے نیٹ ورک سے بہت زیادہ پیغامات بھیجے گئے۔ تقریباً ایک گھنٹہ انتظار کریں اور دوبارہ کوشش کریں.',
    commentsErrorProfanity:
      'یہ متن نہیں بھیجا جا سکا۔ براہ کرم نامناسب الفاظ ہٹا کر دوبارہ کوشش کریں.',
    commentsEmpty:
      'ابھی کوئی تصدیق شدہ پیغام نہیں؛ جانچ کے بعد آپ کا یہاں آسکتا ہے.',
    commentsAnonymous: 'گمنام',
    footerContact: 'رابطہ',
    leaderAlt:
      'پوسٹر پر آیت اللہ علی خامنئی، فارسی خطاطی اور انگریزی متن: خدائے خامنئی زندہ ہے اے لوگو',
    leaderCaption: 'خدائے خامنئی زندہ ہے اے لوگو — خدای خامنه‌ای زنده است ای مردم',
  },
} as const
