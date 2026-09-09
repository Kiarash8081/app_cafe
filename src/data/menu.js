import { DRINK_DETAILS } from './menuDetails.js';

const BASE_MENU = [
  {
    id: 'espresso',
    category: 'hot',
    accent: '#5c3a2e',
    prices: { s: 85000, m: 95000, l: 110000 },
    names: { fa: 'اسپرسو', en: 'Espresso', ar: 'إسبريسو', zh: '浓缩咖啡', es: 'Espresso' },
    blurb: {
      fa: 'شات غلیظ و کوتاه با کرمای طلایی.',
      en: 'A short, intense shot with a golden crema.',
      ar: 'جرعة قصيرة وقوية مع كريمة ذهبية.',
      zh: '短而浓郁，带金色油脂层。',
      es: 'Un shot corto e intenso con crema dorada.'
    }
  },
  {
    id: 'americano',
    category: 'hot',
    accent: '#6b4636',
    prices: { s: 95000, m: 110000, l: 125000 },
    names: { fa: 'آمریکانو', en: 'Americano', ar: 'أمريكانو', zh: '美式咖啡', es: 'Americano' },
    blurb: {
      fa: 'اسپرسو با آب داغ؛ طعم تمیز و متعادل.',
      en: 'Espresso stretched with hot water; clean and balanced.',
      ar: 'إسبريسو مع ماء ساخن؛ نكهة نظيفة ومتوازنة.',
      zh: '浓缩加水，干净均衡。',
      es: 'Espresso con agua caliente; limpio y equilibrado.'
    }
  },
  {
    id: 'cappuccino',
    category: 'hot',
    accent: '#c4a07a',
    prices: { s: 120000, m: 135000, l: 150000 },
    names: { fa: 'کاپوچینو', en: 'Cappuccino', ar: 'كابتشينو', zh: '卡布奇诺', es: 'Capuchino' },
    blurb: {
      fa: 'یک‌سوم اسپرسو، شیر و فوم مخملی.',
      en: 'Equal parts espresso, milk and velvet foam.',
      ar: 'ثلث إسبريسو وحليب ورغوة مخملية.',
      zh: '浓缩、牛奶与绵密奶泡各一份。',
      es: 'Partes iguales de espresso, leche y espuma.'
    }
  },
  {
    id: 'latte',
    category: 'hot',
    accent: '#d7b48a',
    prices: { s: 125000, m: 145000, l: 165000 },
    names: { fa: 'لاته', en: 'Latte', ar: 'لاتيه', zh: '拿铁', es: 'Latte' },
    blurb: {
      fa: 'شیر نرم روی اسپرسو، مناسب برای هر ساعت.',
      en: 'Silky milk over espresso, easy any time of day.',
      ar: 'حليب حريري فوق الإسبريسو في أي وقت.',
      zh: '丝滑牛奶覆盖浓缩，全天适合。',
      es: 'Leche sedosa sobre espresso, a cualquier hora.'
    }
  },
  {
    id: 'flat-white',
    category: 'hot',
    accent: '#e2c9a8',
    prices: { s: 130000, m: 150000, l: 168000 },
    names: { fa: 'فلت وایت', en: 'Flat White', ar: 'فلات وايت', zh: '澳白', es: 'Flat White' },
    blurb: {
      fa: 'میکروفوم نازک و طعم پررنگ‌تر قهوه.',
      en: 'Thin microfoam with a bolder coffee taste.',
      ar: 'رغوة دقيقة ونكهة قهوة أوضح.',
      zh: '薄层绵密奶泡，咖啡味更突出。',
      es: 'Microespuma fina y un café más presente.'
    }
  },
  {
    id: 'mocha',
    category: 'hot',
    accent: '#4a2c22',
    prices: { s: 140000, m: 160000, l: 180000 },
    names: { fa: 'موکا', en: 'Mocha', ar: 'موكا', zh: '摩卡', es: 'Mocha' },
    blurb: {
      fa: 'اسپرسو، شکلات و شیر گرم.',
      en: 'Espresso, chocolate and steamed milk.',
      ar: 'إسبريسو وشوكولاتة وحليب ساخن.',
      zh: '浓缩、巧克力与热牛奶。',
      es: 'Espresso, chocolate y leche caliente.'
    }
  },
  {
    id: 'macchiato',
    category: 'hot',
    accent: '#8a5a3c',
    prices: { s: 100000, m: 115000, l: 130000 },
    names: { fa: 'ماکیاتو', en: 'Macchiato', ar: 'ماكياتو', zh: '玛奇朵', es: 'Macchiato' },
    blurb: {
      fa: 'اسپرسو با لکه شیر؛ کوتاه و قوی.',
      en: 'Espresso stained with milk; short and strong.',
      ar: 'إسبريسو بنقطة حليب؛ قصير وقوي.',
      zh: '浓缩点奶，短而强。',
      es: 'Espresso manchado de leche; corto y fuerte.'
    }
  },
  {
    id: 'cortado',
    category: 'hot',
    accent: '#b88962',
    prices: { s: 115000, m: 130000, l: 145000 },
    names: { fa: 'کورتادو', en: 'Cortado', ar: 'كورتادو', zh: '可塔朵', es: 'Cortado' },
    blurb: {
      fa: 'اسپرسو بریده‌شده با کمی شیر گرم.',
      en: 'Espresso cut with a little warm milk.',
      ar: 'إسبريسو مقطوع بقليل من الحليب الدافئ.',
      zh: '浓缩加少量温奶。',
      es: 'Espresso cortado con un poco de leche.'
    }
  },
  {
    id: 'turkish',
    category: 'specialty',
    accent: '#3d2418',
    prices: { s: 110000, m: 125000, l: 140000 },
    names: { fa: 'قهوه ترک', en: 'Turkish coffee', ar: 'قهوة تركية', zh: '土耳其咖啡', es: 'Café turco' },
    blurb: {
      fa: 'جوش آرام در جذوه با کف غلیظ.',
      en: 'Slow-brewed in a cezve with a thick foam.',
      ar: 'تحضير بطيء في الجزوة مع رغوة كثيفة.',
      zh: '在长柄壶中慢煮，泡沫浓厚。',
      es: 'Cocción lenta en cezve con espuma densa.'
    }
  },
  {
    id: 'v60',
    category: 'specialty',
    accent: '#7a4b32',
    prices: { s: 145000, m: 165000, l: 185000 },
    names: { fa: 'فیلتر V60', en: 'V60 filter', ar: 'فلتر V60', zh: 'V60手冲', es: 'Filtro V60' },
    blurb: {
      fa: 'دم‌آوری دستی؛ رایحه میوه‌ای و شفاف.',
      en: 'Pour-over brew; bright and fruit-forward.',
      ar: 'تحضير يدوي بنكهة فاكهية صافية.',
      zh: '手冲，明亮果香。',
      es: 'Preparación por goteo; afrutado y limpio.'
    }
  },
  {
    id: 'affogato',
    category: 'specialty',
    accent: '#f3e6d4',
    prices: { s: 155000, m: 175000, l: 195000 },
    names: { fa: 'آفوگاتو', en: 'Affogato', ar: 'أفوجاتو', zh: '阿芙佳朵', es: 'Affogato' },
    blurb: {
      fa: 'بستنی وانیل غرق در شات اسپرسو.',
      en: 'Vanilla ice cream drowned in a hot espresso shot.',
      ar: 'آيس كريم فانيليا مع شوت إسبريسو ساخن.',
      zh: '香草冰淇淋淋热浓缩。',
      es: 'Helado de vainilla ahogado en espresso.'
    }
  },
  {
    id: 'cold-brew',
    category: 'cold',
    accent: '#2c211c',
    prices: { s: 135000, m: 155000, l: 175000 },
    names: { fa: 'کلد برو', en: 'Cold brew', ar: 'كولد برو', zh: '冷萃', es: 'Cold brew' },
    blurb: {
      fa: 'عصاره سرد ۱۲ ساعته؛ نرم و کم‌اسید.',
      en: '12-hour cold extract; smooth and low-acid.',
      ar: 'استخلاص بارد ١٢ ساعة؛ ناعم ومنخفض الحموضة.',
      zh: '冷萃12小时，顺滑低酸。',
      es: 'Extracción en frío 12 h; suave y baja acidez.'
    }
  },
  {
    id: 'iced-latte',
    category: 'cold',
    accent: '#c9b39a',
    prices: { s: 130000, m: 150000, l: 170000 },
    names: { fa: 'آیس لاته', en: 'Iced latte', ar: 'لاتيه مثلج', zh: '冰拿铁', es: 'Latte helado' },
    blurb: {
      fa: 'اسپرسو، شیر سرد و یخ.',
      en: 'Espresso, cold milk and ice.',
      ar: 'إسبريسو وحليب بارد وثلج.',
      zh: '浓缩、冰奶与冰块。',
      es: 'Espresso, leche fría y hielo.'
    }
  },
  {
    id: 'frappe',
    category: 'cold',
    accent: '#d8c4aa',
    prices: { s: 145000, m: 165000, l: 185000 },
    names: { fa: 'فراپه', en: 'Frappé', ar: 'فرابيه', zh: '星冰乐式', es: 'Frappé' },
    blurb: {
      fa: 'قهوه یخی هم‌زده با کف سبک.',
      en: 'Iced coffee blended with a light foam.',
      ar: 'قهوة مثلجة مخفوقة برغوة خفيفة.',
      zh: '冰咖啡搅打出轻泡沫。',
      es: 'Café helado batido con espuma ligera.'
    }
  },
  {
    id: 'espresso-tonic',
    category: 'cold',
    accent: '#c9a227',
    prices: { s: 150000, m: 170000, l: 190000 },
    names: { fa: 'اسپرسو تونیک', en: 'Espresso tonic', ar: 'إسبريسو تونيك', zh: '通宁浓缩', es: 'Espresso tonic' },
    blurb: {
      fa: 'اسپرسو روی تونیک و یخ؛ تلخ و شاداب.',
      en: 'Espresso over tonic and ice; bitter and bright.',
      ar: 'إسبريسو فوق التونيك والثلج؛ مر ومنعش.',
      zh: '浓缩配汤力水与冰，苦而清爽。',
      es: 'Espresso sobre tónica e hielo; amargo y fresco.'
    }
  },
  {
    id: 'caramel-latte',
    category: 'specialty',
    accent: '#c9893a',
    prices: { s: 150000, m: 170000, l: 190000 },
    names: { fa: 'کارامل لاته', en: 'Caramel latte', ar: 'لاتيه كراميل', zh: '焦糖拿铁', es: 'Latte de caramelo' },
    blurb: {
      fa: 'لاته با سس کارامل خانگی.',
      en: 'Latte finished with house caramel.',
      ar: 'لاتيه مع صوص كراميل منزلي.',
      zh: '拿铁配自制焦糖。',
      es: 'Latte con caramelo de la casa.'
    }
  }
];

export const COFFEE_MENU = BASE_MENU.map((item) => ({
  ...item,
  details: DRINK_DETAILS[item.id] || {
    specs: { fa: [], en: [], ar: [], zh: [], es: [] },
    ingredients: { fa: [], en: [], ar: [], zh: [], es: [] }
  }
}));

function applyPatch(item, patch) {
  if (!patch) return item;
  return {
    ...item,
    category: patch.category || item.category,
    available: typeof patch.available === 'boolean' ? patch.available : item.available !== false,
    removed: typeof patch.removed === 'boolean' ? patch.removed : Boolean(item.removed),
    prices: { ...item.prices, ...(patch.prices || {}) },
    names: { ...item.names, ...(patch.names || {}) },
    blurb: { ...item.blurb, ...(patch.blurb || {}) },
    details: {
      specs: { ...(item.details?.specs || {}), ...(patch.details?.specs || {}) },
      ingredients: { ...(item.details?.ingredients || {}), ...(patch.details?.ingredients || {}) }
    }
  };
}

export function mergeMenu(base, patches = {}, extras = []) {
  const extraList = Array.isArray(extras) ? extras : [];
  return [...base, ...extraList].map((item) => applyPatch(item, patches[item.id]));
}

export const SIZE_KEYS = ['s', 'm', 'l'];
