const pack = (fa, en) => ({ fa, en, ar: en, zh: en, es: en });

export const DRINK_DETAILS = {
  espresso: {
    specs: pack(
      ['حجم شات: ۳۰ میلی‌لیتر', 'کافئین: حدود ۶۳ میلی‌گرم', 'رست: متوسط‌تیره', 'خاستگاه: ترکیب اتیوپی و برزیل', 'دما: ۹۲ تا ۹۶ درجه'],
      ['Shot: 30 ml', 'Caffeine: about 63 mg', 'Roast: medium-dark', 'Origin: Ethiopia & Brazil', 'Temp: 92–96°C']
    ),
    ingredients: pack(
      ['دان اسپرسو تازه آسیاب‌شده', 'آب فیلترشده'],
      ['Freshly ground espresso beans', 'Filtered water']
    )
  },
  americano: {
    specs: pack(
      ['حجم فنجان متوسط: ۲۴۰ میلی‌لیتر', 'کافئین: حدود ۷۷ میلی‌گرم', 'نسبت: یک شات اسپرسو به آب داغ', 'طعم: تمیز، کمی تلخ، اسیدیته ملایم'],
      ['Medium cup: 240 ml', 'Caffeine: about 77 mg', 'Ratio: one espresso shot to hot water', 'Taste: clean, lightly bitter, mild acidity']
    ),
    ingredients: pack(
      ['شات اسپرسو', 'آب داغ فیلترشده'],
      ['Espresso shot', 'Hot filtered water']
    )
  },
  cappuccino: {
    specs: pack(
      ['حجم فنجان متوسط: ۱۸۰ میلی‌لیتر', 'کافئین: حدود ۶۳ میلی‌گرم', 'نسبت: یک‌سوم اسپرسو، شیر و فوم', 'بافت: فوم مخملی و خشک روی سطح'],
      ['Medium cup: 180 ml', 'Caffeine: about 63 mg', 'Ratio: equal espresso, milk and foam', 'Texture: dry velvet foam on top']
    ),
    ingredients: pack(
      ['شات اسپرسو', 'شیر کامل بخار داده‌شده', 'فوم شیر'],
      ['Espresso shot', 'Steamed whole milk', 'Milk foam']
    )
  },
  latte: {
    specs: pack(
      ['حجم فنجان متوسط: ۲۷۰ میلی‌لیتر', 'کافئین: حدود ۶۳ میلی‌گرم', 'نسبت: اسپرسو با لایه ضخیم شیر', 'بافت: نرم و ابریشمی'],
      ['Medium cup: 270 ml', 'Caffeine: about 63 mg', 'Ratio: espresso under a thick milk layer', 'Texture: silky and soft']
    ),
    ingredients: pack(
      ['شات اسپرسو', 'شیر بخار داده‌شده', 'لایه نازک میکروفوم'],
      ['Espresso shot', 'Steamed milk', 'Thin microfoam']
    )
  },
  'flat-white': {
    specs: pack(
      ['حجم فنجان متوسط: ۱۶۰ میلی‌لیتر', 'کافئین: حدود ۱۳۰ میلی‌گرم (دبل شات)', 'میکروفوم نازک ۲ تا ۳ میلی‌متر', 'طعم قهوه پررنگ‌تر از لاته'],
      ['Medium cup: 160 ml', 'Caffeine: about 130 mg (double shot)', 'Microfoam 2–3 mm', 'Bolder coffee taste than latte']
    ),
    ingredients: pack(
      ['دبل اسپرسو', 'شیر بخار داده‌شده با میکروفوم نازک'],
      ['Double espresso', 'Steamed milk with thin microfoam']
    )
  },
  mocha: {
    specs: pack(
      ['حجم فنجان متوسط: ۲۷۰ میلی‌لیتر', 'کافئین: حدود ۷۰ میلی‌گرم', 'شیرینی: متوسط از شکلات تلخ', 'سرو: با پودر کاکائو روی فوم'],
      ['Medium cup: 270 ml', 'Caffeine: about 70 mg', 'Sweetness: medium, from dark chocolate', 'Finish: cocoa on the foam']
    ),
    ingredients: pack(
      ['شات اسپرسو', 'سس شکلات تلخ', 'شیر گرم', 'فوم شیر', 'پودر کاکائو'],
      ['Espresso shot', 'Dark chocolate sauce', 'Steamed milk', 'Milk foam', 'Cocoa powder']
    )
  },
  macchiato: {
    specs: pack(
      ['حجم فنجان: ۶۰ تا ۸۰ میلی‌لیتر', 'کافئین: حدود ۶۳ میلی‌گرم', 'نسبت: اسپرسو با لکه شیر', 'طعم: قوی، کوتاه، کمی نرم‌شده'],
      ['Cup: 60–80 ml', 'Caffeine: about 63 mg', 'Ratio: espresso stained with milk', 'Taste: short, strong, slightly softened']
    ),
    ingredients: pack(
      ['شات اسپرسو', 'یک قاشق فوم شیر'],
      ['Espresso shot', 'A spoon of milk foam']
    )
  },
  cortado: {
    specs: pack(
      ['حجم فنجان: ۱۲۰ میلی‌لیتر', 'کافئین: حدود ۶۳ میلی‌گرم', 'نسبت: تقریباً برابر اسپرسو و شیر', 'بافت: کم‌فوم و متعادل'],
      ['Cup: 120 ml', 'Caffeine: about 63 mg', 'Ratio: roughly equal espresso and milk', 'Texture: little foam, balanced']
    ),
    ingredients: pack(
      ['شات اسپرسو', 'شیر گرم کمی بخار داده‌شده'],
      ['Espresso shot', 'Lightly steamed warm milk']
    )
  },
  turkish: {
    specs: pack(
      ['حجم فنجان: ۶۰ تا ۹۰ میلی‌لیتر', 'کافئین: حدود ۵۰ تا ۶۵ میلی‌گرم', 'آسیاب: بسیار نرم، مثل پودر', 'دم‌آوری: جوش آرام در جذوه مسی'],
      ['Cup: 60–90 ml', 'Caffeine: about 50–65 mg', 'Grind: extra fine, powder-like', 'Brew: slow simmer in a copper cezve']
    ),
    ingredients: pack(
      ['پودر قهوه ترک', 'آب سرد', 'شکر (به انتخاب)', 'هل (اختیاری)'],
      ['Turkish coffee powder', 'Cold water', 'Sugar (optional)', 'Cardamom (optional)']
    )
  },
  v60: {
    specs: pack(
      ['حجم فنجان متوسط: ۲۵۰ میلی‌لیتر', 'کافئین: حدود ۱۲۰ میلی‌گرم', 'نسبت دم: ۱۵ گرم قهوه به ۲۵۰ گرم آب', 'پروفایل: میوه‌ای، شفاف، اسیدیته روشن'],
      ['Medium cup: 250 ml', 'Caffeine: about 120 mg', 'Brew ratio: 15 g coffee to 250 g water', 'Profile: fruity, clear, bright acidity']
    ),
    ingredients: pack(
      ['دان فیلتر تازه آسیاب‌شده', 'آب ۹۲ درجه', 'فیلتر کاغذی V60'],
      ['Freshly ground filter beans', 'Water at 92°C', 'V60 paper filter']
    )
  },
  affogato: {
    specs: pack(
      ['سرو: یک اسکوپ بستنی با شات داغ', 'کافئین: حدود ۶۳ میلی‌گرم', 'دما: تضاد داغ و سرد', 'پیشنهاد: بلافاصله بعد از ریختن اسپرسو'],
      ['Serve: one scoop of ice cream with a hot shot', 'Caffeine: about 63 mg', 'Temp: hot-and-cold contrast', 'Best drunk right after pouring']
    ),
    ingredients: pack(
      ['بستنی وانیل', 'شات اسپرسوی داغ'],
      ['Vanilla ice cream', 'Hot espresso shot']
    )
  },
  'cold-brew': {
    specs: pack(
      ['حجم فنجان متوسط: ۳۰۰ میلی‌لیتر', 'کافئین: حدود ۱۵۰ میلی‌گرم', 'زمان عصاره: ۱۲ ساعت در یخچال', 'طعم: نرم، شکلاتی، کم‌اسید'],
      ['Medium cup: 300 ml', 'Caffeine: about 150 mg', 'Steep: 12 hours in the fridge', 'Taste: smooth, chocolatey, low-acid']
    ),
    ingredients: pack(
      ['دان درشت آسیاب‌شده', 'آب سرد فیلترشده', 'یخ هنگام سرو'],
      ['Coarse-ground beans', 'Cold filtered water', 'Ice at service']
    )
  },
  'iced-latte': {
    specs: pack(
      ['حجم فنجان متوسط: ۳۲۰ میلی‌لیتر', 'کافئین: حدود ۶۳ میلی‌گرم', 'سرو روی یخ', 'شیرینی طبیعی شیر بدون شکر اضافه'],
      ['Medium cup: 320 ml', 'Caffeine: about 63 mg', 'Served over ice', 'Natural milk sweetness, no extra sugar']
    ),
    ingredients: pack(
      ['شات اسپرسو', 'شیر سرد', 'یخ'],
      ['Espresso shot', 'Cold milk', 'Ice']
    )
  },
  frappe: {
    specs: pack(
      ['حجم فنجان متوسط: ۳۵۰ میلی‌لیتر', 'کافئین: حدود ۸۰ میلی‌گرم', 'بافت: کف سبک و یخی', 'شیرینی: متوسط'],
      ['Medium cup: 350 ml', 'Caffeine: about 80 mg', 'Texture: light iced foam', 'Sweetness: medium']
    ),
    ingredients: pack(
      ['قهوه فوری یا شات اسپرسو', 'شیر', 'یخ', 'شکر یا سیروپ', 'کمی آب'],
      ['Instant coffee or espresso', 'Milk', 'Ice', 'Sugar or syrup', 'A splash of water']
    )
  },
  'espresso-tonic': {
    specs: pack(
      ['حجم فنجان متوسط: ۳۰۰ میلی‌لیتر', 'کافئین: حدود ۶۳ میلی‌گرم', 'طعم: تلخ، مرکباتی و شاداب', 'سرو: اسپرسو روی تونیک و یخ'],
      ['Medium cup: 300 ml', 'Caffeine: about 63 mg', 'Taste: bitter, citrusy, refreshing', 'Serve: espresso over tonic and ice']
    ),
    ingredients: pack(
      ['شات اسپرسو', 'آب گازدار تونیک', 'یخ', 'برش لیمو یا پرتقال (تزئین)'],
      ['Espresso shot', 'Tonic water', 'Ice', 'Lemon or orange slice']
    )
  },
  'caramel-latte': {
    specs: pack(
      ['حجم فنجان متوسط: ۲۷۰ میلی‌لیتر', 'کافئین: حدود ۶۳ میلی‌گرم', 'شیرینی: کارامل خانگی', 'سرو گرم با درازل کارامل'],
      ['Medium cup: 270 ml', 'Caffeine: about 63 mg', 'Sweetness: house caramel', 'Served hot with caramel drizzle']
    ),
    ingredients: pack(
      ['شات اسپرسو', 'شیر بخار داده‌شده', 'سس کارامل خانگی', 'درازل کارامل روی فوم'],
      ['Espresso shot', 'Steamed milk', 'House caramel sauce', 'Caramel drizzle']
    )
  }
};
