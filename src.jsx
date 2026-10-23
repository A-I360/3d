import React,{useState,useEffect} from 'react';import{createRoot}from'react-dom/client';import{Search,UserRound,ShoppingBag,ArrowUpRight,Plus,Minus,X,Menu,Camera,MessageCircle}from'lucide-react';import'./style.css';import'./motion.css';
const imageUrls = import.meta.glob('./assets/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const A = filename => {
  const url = imageUrls[`./assets/${filename}`];
  if (!url) throw new Error(`Missing bundled image asset: ${filename}`);
  return url;
};
const P = path => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
const WHATSAPP_NUMBER = '08157384810';
const WHATSAPP_LINK = `https://wa.me/234${WHATSAPP_NUMBER.slice(1)}`;
const APP_BASE_ROOT = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/+$/, '');
const isWithinAppBase = pathname => !APP_BASE_ROOT || pathname === APP_BASE_ROOT || pathname.startsWith(`${APP_BASE_ROOT}/`);
const routePathFromLocation = pathname => {
  const appPath = APP_BASE_ROOT && isWithinAppBase(pathname)
    ? pathname.slice(APP_BASE_ROOT.length) || '/'
    : pathname;
  return `/${appPath.split('/').filter(Boolean).join('/')}`;
};

const formatPrice = amount => new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}).format(amount);

const products = [
  {
    slug: 'baovera-therapy-hair-oil-100ml',
    name: 'Baovera Therapy Hair Oil 100ml',
    desc: 'A nourishing botanical oil for your hair ritual.',
    price: 8000,
    cat: 'HAIR',
    img: 'baovera-hair-oil-100ml-editorial-v5.jpg',
  },
  {
    slug: 'baovera-therapy-hair-oil-50ml',
    name: 'Baovera Therapy Hair Oil 50ml',
    desc: 'A nourishing botanical oil for your hair ritual.',
    price: 5000,
    cat: 'HAIR',
    img: 'baovera-hair-oil-50ml-editorial-v2.jpg',
  },
  {
    slug: 'lushwood-body-oil-50ml',
    name: 'Lushwood Body Oil 50ml',
    desc: 'A softly scented body oil inspired by warm woods.',
    price: 5500,
    cat: 'BODY',
    img: 'lushwood-body-oil-50ml-editorial.jpg',
  },
  {
    slug: 'all-scented-body-oils-50ml',
    name: 'All Scented Body Oils 50ml',
    desc: 'Choose a scent for a little everyday indulgence.',
    price: 5000,
    cat: 'BODY',
    img: 'all-scented-body-oils-50ml-editorial.jpg',
  },
  {
    slug: 'all-scented-body-oils-30ml',
    name: 'All Scented Body Oils 30ml',
    desc: 'A pocket-sized dose of your favourite body oil.',
    price: 3500,
    cat: 'BODY',
    img: 'lush-wood-luxury.png',
  },
  {
    slug: 'healing-glow-body-butter',
    name: 'Healing + Glow Body Butter',
    desc: 'Rich, comforting moisture for soft, radiant skin.',
    price: 6500,
    cat: 'BODY',
    img: 'body-butter-editorial-v3.png',
  },
  {
    slug: 'all-scented-shimmer-oil-30ml',
    name: 'All Scented Shimmer Oil 30ml',
    desc: 'A light-catching finish in your favourite scent.',
    price: 4000,
    cat: 'RADIANCE',
    img: 'unlabeled-shimmer-30ml-editorial-final.jpg',
  },
  {
    slug: 'all-scented-shimmer-oil-50ml',
    name: 'All Scented Shimmer Oil 50ml',
    desc: 'A light-catching finish in your favourite scent.',
    price: 5500,
    cat: 'RADIANCE',
    img: 'unlabeled-shimmer-50ml-editorial.jpg',
  },
  {
    slug: 'clear-aura-facial-oil-30ml',
    name: 'Clear Aura Facial Oil 30ml',
    desc: 'A considered facial oil for your daily skin ritual.',
    price: 4500,
    cat: 'SKIN',
    img: 'clear-aura-facial-oil-editorial.jpg',
  },
  {
    slug: 'herbal-teas',
    name: 'Herbal Teas',
    desc: 'A gentle botanical infusion for a slower moment.',
    price: 1500,
    cat: 'WELLNESS',
    img: 'herbal-tea-sachet-editorial.jpg',
  },
  {
    slug: 'black-luxe-face-body-cleanser',
    name: 'Black Luxe Face & Body Cleanser',
    desc: 'A richly lathering cleanser for face and body.',
    price: 5000,
    cat: 'CLEANSING',
    img: 'black-luxe-cleanser-editorial-final.jpg',
  },
];

const scentedBodyOilScents = [
  {
    slug: 'apple-coconut',
    name: 'Apple & Coconut',
    description: 'A bright fruit-and-coconut scent with a soft, creamy finish.',
    images: {
      '30ml': 'all-scented-body-oils-30ml-apple-coconut.jpg',
      '50ml': 'all-scented-body-oils-50ml-apple-coconut.jpg',
    },
  },
  {
    slug: 'tropical-berries',
    name: 'Tropical Berries',
    description: 'A juicy, berry-forward scent with a lively, sweet character.',
    images: {
      '30ml': 'all-scented-body-oils-30ml-tropical-berries.jpg',
      '50ml': 'all-scented-body-oils-50ml-tropical-berries.jpg',
    },
  },
  {
    slug: 'clean-ocean',
    name: 'Clean Ocean',
    description: 'A crisp, airy scent inspired by a fresh ocean breeze.',
    images: {
      '30ml': 'all-scented-body-oils-30ml-clean-ocean.jpg',
      '50ml': 'all-scented-body-oils-50ml-clean-ocean.jpg',
    },
  },
];
const isAllScentedBodyOil = product => product?.slug === 'all-scented-body-oils-30ml' || product?.slug === 'all-scented-body-oils-50ml';
const scentedBodyOilProducts = products
  .filter(isAllScentedBodyOil)
  .flatMap(product => {
    const size = product.slug.endsWith('30ml') ? '30ml' : '50ml';
    return scentedBodyOilScents.map(scent => ({
      slug: `${product.slug}-${scent.slug}`,
      baseSlug: product.slug,
      scentName: scent.name,
      name: `${scent.name} Body Oil ${size}`,
      desc: scent.description,
      price: product.price,
      cat: product.cat,
      img: scent.images[size],
      size,
    }));
  });
const cartProducts = [...products, ...scentedBodyOilProducts];

const stories = {
  'baovera-therapy-hair-oil-100ml': 'Baovera Therapy Hair Oil brings a nourishing botanical ritual to wash day and the moments in between. Take a little time to care for your crown, ends and everything between.',
  'baovera-therapy-hair-oil-50ml': 'Baovera Therapy Hair Oil brings a nourishing botanical ritual to wash day and the moments in between. Take a little time to care for your crown, ends and everything between.',
  'lushwood-body-oil-50ml': 'Inspired by sun-warmed wood and a slow afternoon in the shade, this silky blend was created to leave skin soft and quietly scented.',
  'all-scented-body-oils-50ml': 'Choose the fragrance that suits your mood. This collection of scented body oils turns daily moisturising into a small, personal ritual.',
  'all-scented-body-oils-30ml': 'Choose the fragrance that suits your mood. This collection of scented body oils turns daily moisturising into a small, personal ritual.',
  'healing-glow-body-butter': 'Made for a moment of comfort, this rich butter melts into dry skin and turns everyday moisture into a sensorial pause.',
  'all-scented-shimmer-oil-30ml': 'Created to catch the last light of the day, this luminous scented oil gives skin a soft glow without losing its natural warmth.',
  'all-scented-shimmer-oil-50ml': 'Created to catch the last light of the day, this luminous scented oil gives skin a soft glow without losing its natural warmth.',
  'clear-aura-facial-oil-30ml': 'Clear Aura brings a considered, lightweight oil step to your daily facial care ritual. Apply with intention and take a moment for yourself.',
  'herbal-teas': 'A botanical infusion for a slower moment in the day. Let the warmth of a freshly brewed cup become a small, restorative ritual.',
  'black-luxe-face-body-cleanser': 'A considered black cleanser with a rich, grounding character, made to bring a little ceremony to the simplest daily wash.',
};

const journalArticles = [
  {
    slug: 'quiet-luxury-of-taking-your-time',
    category: 'RITUALS',
    readTime: '04 MIN READ',
    title: 'The quiet luxury of taking your time',
    img: 'baovera-model.png',
    intro: 'A slower routine does not ask you to do more; it asks you to meet familiar moments with a little more attention.',
    sections: [
      { heading: 'Make a little room', paragraphs: [
        'Before the first message or the first task, give yourself a moment to arrive. Open the curtains, take a breath, and notice the light moving through the room.',
        'That pause can be brief. A few unhurried minutes are enough to change the feeling of a morning without asking you to rebuild your whole routine.'
      ]},
      { heading: 'Choose a familiar anchor', paragraphs: [
        'A familiar care step can become an anchor. Apply Baovera Therapy Hair Oil as part of your own hair ritual, taking time to focus on the ends, the scalp, or wherever your routine calls for care.',
        'Move without checking the clock for a moment. Let the texture, the gentle pressure of your hands, and the quiet repetition bring you back to the present.'
      ]},
      { heading: 'Let the rhythm belong to you', paragraphs: [
        'The best rituals are not the most elaborate ones; they are the ones that feel possible to return to. Keep the steps that feel good and leave the rest for another day.',
        'Some mornings will be quick, others will have room to linger. Taking your time is not about perfection. It is about making a little space for yourself in the day you already have.'
      ]}
    ]
  },
  {
    slug: 'botanicals-behind-the-glow',
    category: 'INGREDIENTS',
    readTime: '05 MIN READ',
    title: 'Meet the botanicals behind the glow',
    img: 'perfume-oil-model.png',
    intro: 'A closer look at the natural textures, aromas and inspirations that make everyday care feel considered.',
    sections: [
      { heading: 'Begin with curiosity', paragraphs: [
        'A botanical can be more than a name on a label. It can call to mind a place, a colour, a scent, or a memory of care shared across generations.',
        'At AfriEssence, nature is part of the mood as much as the method: earthy shades, warm textures, and a sense of connection to the landscape around us.'
      ]},
      { heading: 'Rooted in place', paragraphs: [
        'Baobab and shea are familiar touchstones in the wider story of African beauty and making. They remind us that thoughtful care often begins with noticing what has been close at hand all along.',
        'Each botanical has its own history and character. We approach that richness with respect, keeping the story open rather than reducing it to a single promise.'
      ]},
      { heading: 'Let the ritual stay personal', paragraphs: [
        'When you reach for an oil or a butter, take a moment to notice its texture and aroma. Those small sensory details can make an ordinary step feel more intentional.',
        'There is no one right way to build a ritual. Let your own preferences guide you, and allow nature to be an invitation to explore rather than a list of rules.'
      ]}
    ]
  },
  {
    slug: 'softer-way-to-start-your-morning',
    category: 'WELLNESS',
    readTime: '04 MIN READ',
    title: 'A softer way to start your morning',
    img: 'wellness-tea-ritual-editorial.jpg',
    intro: 'A warm cup and a few quiet minutes can give the morning a gentler beginning, at whatever pace your day allows.',
    sections: [
      { heading: 'Before the day gathers speed', paragraphs: [
        'Mornings can begin in a rush, but the first moments do not have to. Put the kettle on, set a cup somewhere you can sit comfortably, and let the small preparation mark a change of pace.',
        'A gentle beginning is not a checklist. It is simply a chance to notice that the day has started and to decide how you would like to meet it.'
      ]},
      { heading: 'Let the cup set the pace', paragraphs: [
        'Prepare AfriEssence Herbal Teas according to the directions on the pack. While it steeps, leave your phone aside or look out of a window; let the pause be uncomplicated.',
        'Notice the warmth of the cup and the aroma as it rises. These familiar details can make the moment feel complete without needing to add anything else.'
      ]},
      { heading: 'Carry the quiet forward', paragraphs: [
        'When you are ready, take the first sip slowly. There is no need to turn the moment into a performance or to make it last longer than your morning allows.',
        'Even a short pause can be something you return to. Keep it simple, make it your own, and let the rest of the morning unfold from there.'
      ]}
    ]
  },
  {
    slug: 'small-ceremony-of-making-tea',
    category: 'WELLNESS',
    readTime: '03 MIN READ',
    title: 'The small ceremony of making tea',
    img: 'herbal-tea-sachet-editorial.jpg',
    intro: 'From choosing a favourite cup to taking the first sip, the simplest tea ritual can create a little breathing room.',
    sections: [
      { heading: 'Choose your moment', paragraphs: [
        'A tea break can sit between meetings, after a walk, or at the end of a long afternoon. It does not need a special setting; a small pause is enough.',
        'Pick a cup you enjoy holding and find a spot where you can be still for a few minutes. Let the ordinary surroundings become part of the scene.'
      ]},
      { heading: 'Keep the preparation easy', paragraphs: [
        'Follow the preparation guidance on your Herbal Teas pack, and give the sachet the time it needs. The small sequence of warming, steeping, and waiting can become a pleasant rhythm.',
        'Use those minutes to put away one thing, breathe, or simply do nothing. There is no need to fill every quiet space with another task.'
      ]},
      { heading: 'Savour without rushing', paragraphs: [
        'When the tea is ready, pause before the first sip. Notice its colour, warmth, and aroma; let your attention rest on what is in front of you.',
        'The ceremony is yours to shape. A favourite mug, a quiet corner, or a shared cup can each make the moment feel a little more personal.'
      ]}
    ]
  },
  {
    slug: 'softer-evening-one-cup-at-a-time',
    category: 'WELLNESS',
    readTime: '04 MIN READ',
    title: 'A softer evening, one cup at a time',
    img: 'wellness-tea-ritual-editorial.jpg',
    intro: 'A familiar evening cup can be a gentle signal to step away from the pace of the day and settle into your own time.',
    sections: [
      { heading: 'Let the day loosen its hold', paragraphs: [
        'Evenings arrive with their own list of things to finish. Before moving on to the next one, choose a small moment that belongs only to you.',
        'Set out your cup and prepare Herbal Teas according to the package directions. A simple, repeatable gesture can make the transition into evening feel more deliberate.'
      ]},
      { heading: 'Make comfort uncomplicated', paragraphs: [
        'Dim a light, set down your phone, or sit near an open window. There is no ideal atmosphere to create; the point is to make the moment comfortable for you.',
        'Let the tea be part of the pause rather than another task to complete. Give yourself permission to enjoy a few quiet sips before deciding what comes next.'
      ]},
      { heading: 'Close the day in your own way', paragraphs: [
        'A gentle evening ritual can be short and still feel meaningful. Perhaps it is a cup of tea, a few pages of a book, or a moment to think about what went well.',
        'Choose a version that fits real life. Small comforts can make the end of the day feel more like a landing and less like another finish line.'
      ]}
    ]
  },
  {
    slug: 'layering-scent-with-intention',
    category: 'RITUALS',
    readTime: '04 MIN READ',
    title: 'Layering scent with intention',
    img: 'all-scented-body-oils-50ml-editorial.jpg',
    intro: 'A personal scent ritual begins with noticing what you enjoy, then giving that choice room to feel like your own.',
    sections: [
      { heading: 'Start with what you love', paragraphs: [
        'Fragrance is personal. One day you may want something soft and close; another day, a note that feels brighter or more expressive.',
        'Give yourself a moment to choose rather than reaching automatically. The small act of noticing your mood can make the routine feel considered.'
      ]},
      { heading: 'Let each step breathe', paragraphs: [
        'If body oil is part of your routine, apply it in the way that feels comfortable for you and allow the scent to settle before adding another layer.',
        'There is no need to use many products at once. One familiar scent can be enough to make a care ritual feel complete.'
      ]},
      { heading: 'Make it a signature, not a rule', paragraphs: [
        'A signature does not have to stay the same every day. Let it shift with the season, the occasion, or simply what you feel like wearing.',
        'The best combination is the one you enjoy. Trust your own sense of balance and leave a little space for discovery.'
      ]}
    ]
  },
  {
    slug: 'listening-to-your-skin',
    category: 'SKIN',
    readTime: '04 MIN READ',
    title: 'Listening to what your skin needs',
    img: 'clear-aura-facial-oil-editorial.jpg',
    intro: 'A thoughtful skin ritual starts with observation and makes room for the way your skin feels from one day to the next.',
    sections: [
      { heading: 'Notice before you add', paragraphs: [
        'Skin can feel different from morning to evening and from one season to another. Before adding a new step, pause and notice what feels comfortable today.',
        'Keeping a routine simple can make it easier to understand what you enjoy. A few familiar steps often feel more manageable than a crowded shelf.'
      ]},
      { heading: 'Make the moment gentle', paragraphs: [
        'If Clear Aura Facial Oil is already part of your routine, use it as directed and take a moment to apply it with care. Let the experience be calm rather than hurried.',
        'Avoid turning every change into a problem to solve. A little attention and a steady routine can help you decide what works for your own preferences.'
      ]},
      { heading: 'Give your routine room to change', paragraphs: [
        'Your needs and tastes may shift over time. It is perfectly fine to adjust your routine, keep what feels right, and set aside what does not.',
        'Care is personal, not a race toward a perfect routine. Let your choices stay practical, comfortable, and yours.'
      ]}
    ]
  },
  {
    slug: 'pleasure-of-a-soft-finish',
    category: 'BODY',
    readTime: '03 MIN READ',
    title: 'The pleasure of a soft finish',
    img: 'body-butter-editorial-v3.png',
    intro: 'Body care can be a brief sensory pause: a familiar texture, a slow breath, and a moment to reconnect with yourself.',
    sections: [
      { heading: 'Make care feel welcoming', paragraphs: [
        'After a shower or before getting dressed, the simplest body-care step can feel like a welcome return to yourself. Choose a moment that fits naturally into your day.',
        'Healing + Glow Body Butter brings a rich, comforting texture to that moment. Take your time with the familiar motions and enjoy the pause.'
      ]},
      { heading: 'Follow the feeling', paragraphs: [
        'You do not need a complicated sequence. Use the product as directed, and let the feel of the texture guide how much time you want to give the ritual.',
        'Small details matter: a soft towel, a favourite song, or the quiet just after the water stops running. They make the everyday feel a little more considered.'
      ]},
      { heading: 'Return to what feels good', paragraphs: [
        'A routine can be both simple and meaningful. Keep the steps that feel pleasant and easy to repeat, and let your idea of care evolve with you.',
        'A soft finish is not about doing more. It is about noticing the moment you are already in.'
      ]}
    ]
  },
  {
    slug: 'thoughtful-return-to-cleansing',
    category: 'CLEANSING',
    readTime: '03 MIN READ',
    title: 'A thoughtful return to cleansing',
    img: 'black-luxe-cleanser-editorial-final.jpg',
    intro: 'An everyday cleanse can be more than a first step; it can be a small reset between the day you have had and the one ahead.',
    sections: [
      { heading: 'Begin with a pause', paragraphs: [
        'Cleansing is often the most familiar part of a routine, which makes it easy to rush through. Take a breath before you begin and let the moment be simple.',
        'Black Luxe Face & Body Cleanser can be part of that everyday reset. Follow the directions on the product and choose a pace that feels comfortable.'
      ]},
      { heading: 'Let repetition become ritual', paragraphs: [
        'A familiar step can feel new when you give it your attention. Notice the water, the lather, and the way the routine marks a transition in your day.',
        'There is no need to add extra steps just to make the routine feel special. A gentle, consistent moment can be enough.'
      ]},
      { heading: 'Leave space for what comes next', paragraphs: [
        'Once you are finished, take a moment before moving on. Dry off, gather your essentials, and let the rest of your care follow in its own time.',
        'A thoughtful cleanse is a simple way to return to yourself, whether it begins the morning or closes the day.'
      ]}
    ]
  }
];

function Loader(){return <div className="loader" role="status" aria-label="Loading AfriEssence"><img className="loaderLogo" src={A('logo-transparent.png')} alt="AfriEssence"/><div className="loaderLine"><i/></div><small>RESTORE YOUR CONFIDENCE</small></div>}
function checkoutUrlFor(cart) {
  const lines = cart.map((product, index) => `${index + 1}. ${product.name} — ${formatPrice(product.price)}`);
  const message = [
    'Hello AfriEssence, I would like to place an order:',
    ...lines,
    `Subtotal: ${formatPrice(cart.reduce((total, product) => total + product.price, 0))}`,
  ].join('\n');
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;
}

function PageHeader({cartCount, onOpenBag}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [['HOME', '/'], ['SHOP', '/shop'], ['WELLNESS', '/wellness'], ['ABOUT', '/about'], ['JOURNAL', '/journal'], ['CONTACT', '/contact']];

  return <>
    <header className="siteHeader pageHeader">
      <a className="logo" href={P('/')}><img src={A('logo-transparent.png')} alt="AfriEssence"/></a>
      <nav aria-label="Main navigation">{links.map(([label, href]) => <a key={label} href={P(href)}>{label}</a>)}</nav>
      <div className="pageActions">
        <button className="pageBag" onClick={onOpenBag} aria-label={`Open shopping bag, ${cartCount} items`}>
          <ShoppingBag/><b>{cartCount}</b>
        </button>
        <button className="pageMenu" onClick={() => setMenuOpen(open => !open)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}>
          {menuOpen ? <X/> : <Menu/>}
        </button>
      </div>
    </header>
    {menuOpen && <div className="mobileMenu pageMobileMenu">
      <button className="pageMobileClose" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu"><X/></button>
      {links.map(([label, href]) => <a key={label} href={P(href)} onClick={() => setMenuOpen(false)}>{label}</a>)}
    </div>}
  </>;
}

function CartDrawer({cart, onClose, onRemove, checkoutHref}) {
  return <aside className="drawer" role="dialog" aria-modal="true" aria-label="Shopping bag">
    <div className="drawerHead">
      <h2>Your bag <small>{cart.length} items</small></h2>
      <button onClick={onClose} aria-label="Close shopping bag"><X/></button>
    </div>
    {cart.length ? <>
      {cart.map((product, index) => <div className="bagItem" key={`${product.slug}-${index}`}>
        <img src={A(product.img)} alt={product.name} loading="lazy" decoding="async"/>
        <div><h3>{product.name}</h3><p>{formatPrice(product.price)}</p></div>
        <button onClick={() => onRemove(index)} aria-label={`Remove ${product.name} from bag`}><X/></button>
      </div>)}
      <div className="total"><span>Subtotal</span><b>{formatPrice(cart.reduce((total, product) => total + product.price, 0))}</b></div>
      <a className="btn dark checkout" href={checkoutHref} target="_blank" rel="noreferrer">Checkout on WhatsApp <ArrowUpRight/></a>
    </> : <div className="empty">Your ritual awaits.<br/><button className="continueShopping" onClick={onClose}>Continue shopping</button></div>}
  </aside>;
}

function ScentedBodyOilCard({product, showStory = false}) {
  const productUrl = P('/product/' + product.slug);

  return <article className="card scentedBodyOilProductCard">
    <div className="productImg">
      <a className="productImgLink" href={productUrl}><img src={A(product.img)} alt={product.name} loading="lazy" decoding="async"/></a>
      <a className="quick" href={productUrl}>Choose scent <ArrowUpRight/></a>
    </div>
    {showStory ? <div className="cardInfo">
      <div>
        <h3><a href={productUrl}>{product.name}</a></h3>
        <p>{product.desc}</p>
        <details className="storyDetails">
          <summary>Creation story</summary>
          <p>{stories[product.slug]}</p>
          <a className="storyRead" href={productUrl}>Choose a scent <ArrowUpRight/></a>
        </details>
      </div>
      <strong>{formatPrice(product.price)}</strong>
    </div> : <>
      <div className="cardInfo"><h3><a href={productUrl}>{product.name}</a></h3><strong>{formatPrice(product.price)}</strong></div>
      <p>{product.desc}</p>
    </>}
    <a className="view" href={productUrl}>Choose a scent <ArrowUpRight/></a>
  </article>;
}

function ProductPage({product, onAdd, cartCount, onOpenBag}) {
  const [added, setAdded] = useState(false);
  const [addedScentSlug, setAddedScentSlug] = useState(null);
  const handleAdd = () => {
    onAdd(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };
  const handleScentAdd = scent => {
    onAdd(scent);
    setAddedScentSlug(scent.slug);
    window.setTimeout(() => setAddedScentSlug(null), 1800);
  };

  if (isAllScentedBodyOil(product)) {
    const scents = scentedBodyOilProducts.filter(item => item.baseSlug === product.slug);
    return <>
      <PageHeader cartCount={cartCount} onOpenBag={onOpenBag}/>
      <main className="scentOptionsPage">
        <a className="scentBackLink" href={P('/shop')}>← Back to all products</a>
        <div className="scentOptionsIntro">
          <p className="eyebrow">AFRIESSENCE / BODY OILS / {scents[0]?.size}</p>
          <h1>{product.name}</h1>
          <p>Choose from three distinctive scents. Each scent is sold separately in its own {scents[0]?.size} bottle.</p>
        </div>
        <div className="scentOptionsGrid">
          {scents.map(scent => <article className="scentOption" key={scent.slug}>
            <div className="scentOptionImage"><img src={A(scent.img)} alt={`${scent.scentName} body oil, ${scent.size}`} loading="lazy" decoding="async"/></div>
            <div className="scentOptionCopy">
              <p className="eyebrow">{scent.size} / SOLD SEPARATELY</p>
              <h2>{scent.scentName}</h2>
              <p>{scent.desc}</p>
              <div className="scentOptionPurchase">
                <strong>{formatPrice(scent.price)}</strong>
                <button className="btn dark" onClick={() => handleScentAdd(scent)}>{addedScentSlug === scent.slug ? 'Added to bag' : 'Add to bag'} <Plus/></button>
              </div>
            </div>
          </article>)}
        </div>
      </main>
      <footer><a className="logo" href={P('/')}><img src={A('logo-transparent.png')} alt="AfriEssence"/></a><p>Restore your Confidence</p></footer>
    </>;
  }

  return <>
    <PageHeader cartCount={cartCount} onOpenBag={onOpenBag}/>
    <main className="productPage">
      <div className="productPageImage"><img src={A(product.img)} alt={product.name}/></div>
      <div className="productPageCopy">
        <p className="eyebrow">THE MAKING OF / AFRIESSENCE</p>
        <h1>{product.name}</h1>
        <p className="productLead">{product.desc}, thoughtfully made for your everyday glow.</p>
        <p className="productPrice">{formatPrice(product.price)}</p>
        <div className="longStory">
          <h2>The story behind the product</h2>
          <p>{stories[product.slug]}</p>
          <p>Every detail begins with a simple question: how can a daily essential feel more considered? We chose a warm, sensory direction and brought together ingredients, texture and fragrance to create a product that feels as good in the moment as it does in your routine.</p>
          <p>This is beauty made slowly — with intention, warmth and a respect for the small moments that make up a beautiful day.</p>
        </div>
        <button className="btn dark" onClick={handleAdd}>{added ? 'Added to bag' : 'Add to bag'} <ArrowUpRight/></button>
      </div>
    </main>
    <footer><a className="logo" href={P('/')}><img src={A('logo-transparent.png')} alt="AfriEssence"/></a><p>Restore your Confidence</p></footer>
  </>;
}
function InnerPage({type, onAdd, cartCount, onOpenBag}) {
  const data = {
    shop: ['SHOP AFRIESSENCE', 'Explore thoughtful beauty essentials at affordable, everyday-friendly prices.'],
    about: ['ROOTED IN NATURE.', 'A modern African beauty house built around elevated rituals.'],
    journal: ['THE JOURNAL', 'Long-form notes on rituals, botanicals, wellness and the little moments that make a day feel more considered.'],
    contact: ['LET’S CONNECT', 'We would love to hear from you.'],
  }[type];

  return <>
    <PageHeader cartCount={cartCount} onOpenBag={onOpenBag}/>
    <main className="innerPage">
      <p className="eyebrow">AFRIESSENCE / {type.toUpperCase()}</p>
      <h1>{data[0]}</h1>
      <p className="innerIntro">{data[1]}</p>
      {type === 'shop' ? <div className="grid innerGrid">
        {products.map(product => isAllScentedBodyOil(product)
          ? <ScentedBodyOilCard product={product} key={product.slug}/>
          : <article className="card" key={product.slug}>
            <div className="productImg"><img src={A(product.img)} alt={product.name} loading="lazy" decoding="async"/><button className="quick" onClick={() => onAdd(product)}>Add to bag <Plus/></button></div>
            <div className="cardInfo"><h3>{product.name}</h3><strong>{formatPrice(product.price)}</strong></div>
            <p>{product.desc}</p>
            <a className="view" href={P('/product/' + product.slug)}>View product <ArrowUpRight/></a>
          </article>)}
      </div> : type === 'journal' ? <div className="journalGrid innerJournalGrid">
        {journalArticles.map(article => <article key={article.slug}>
          <div><a href={P('/journal/' + article.slug)}><img src={A(article.img)} alt={article.title} loading="lazy"/></a></div>
          <span>{article.category} / {article.readTime}</span>
          <h3><a href={P('/journal/' + article.slug)}>{article.title}</a></h3>
          <p className="journalExcerpt">{article.intro}</p>
          <a className="journalRead" href={P('/journal/' + article.slug)}>Read story <ArrowUpRight/></a>
        </article>)}
      </div> : type === 'contact' ? <div className="pageFeature">
        <img src={A('lush-wood-luxury.png')} alt="AfriEssence botanical beauty"/>
        <div>
          <h2>Your radiance starts here.</h2>
          <p>For product questions, orders and ritual recommendations, send us a message. We would love to help.</p>
          <a className="btn dark" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">Chat with us on WhatsApp <ArrowUpRight/></a>
        </div>
      </div> : <div className="pageFeature">
        <img src={A('baovera-luxury.png')} alt="AfriEssence botanical beauty"/>
        <div>
          <h2>Beauty, beautifully considered.</h2>
          <p>Thoughtful beauty, warm light and everyday moments made extraordinary. Discover the AfriEssence point of view.</p>
          <a className="btn dark" href={P('/shop')}>Explore the collection <ArrowUpRight/></a>
        </div>
      </div>}
    </main>
    <footer><a className="logo" href={P('/')}><img src={A('logo-transparent.png')} alt="AfriEssence"/></a><p>Restore your Confidence</p></footer>
  </>;
}

function WellnessPage({onAdd, cartCount, onOpenBag}) {
  const teaProduct = products.find(product => product.slug === 'herbal-teas');
  const wellnessArticles = journalArticles.filter(article => article.category === 'WELLNESS');

  return <>
    <PageHeader cartCount={cartCount} onOpenBag={onOpenBag}/>
    <main className="wellnessLandingPage">
      <section className="wellnessPageHero">
        <div className="wellnessPageHeroCopy">
          <p className="eyebrow">AFRIESSENCE / WELLNESS</p>
          <h1>Make room<br/><i>for a softer pace.</i></h1>
          <p>Wellness does not have to be a grand plan. It can begin with a warm cup, a quiet corner and a few minutes that belong to you. Our Wellness edit puts Herbal Teas at the heart of that everyday pause.</p>
          <div className="wellnessPageActions">
            <a className="btn dark" href="#tea">Meet Herbal Teas <ArrowUpRight/></a>
            <a className="textLink" href={P('/journal')}>Read the journal</a>
          </div>
        </div>
        <div className="wellnessPageHeroImage">
          <img src={A('wellness-tea-ritual-editorial.jpg')} alt="Herbal tea sachet beside a warm cup of tea"/>
          <span>THE WELLNESS EDIT / 01</span>
        </div>
      </section>

      <section className="wellnessPageManifesto">
        <p className="eyebrow">A NOTE ON WELLNESS</p>
        <h2>Not another routine to perfect.<br/><i>A moment to return.</i></h2>
        <p>There is no single way to feel well, and no one pace that suits every day. We believe in creating small, welcoming spaces for comfort, reflection and a little more presence.</p>
        <p>That idea shapes this page: practical rituals, thoughtful reading and a cup of AfriEssence Herbal Teas whenever a pause feels right. No pressure to do it perfectly—just an invitation to begin where you are.</p>
      </section>

      <section className="wellnessPillars">
        <article><span>01 / PAUSE</span><h3>Make a little room</h3><p>Set aside a few minutes that do not need to be productive. Let the quiet be useful in its own way.</p></article>
        <article><span>02 / PREPARE</span><h3>Keep it simple</h3><p>Choose a familiar cup, prepare your tea according to the pack directions, and let the small sequence become a gentle cue.</p></article>
        <article><span>03 / RETURN</span><h3>Follow your own pace</h3><p>Some days offer a long pause; others offer only a sip. Both can belong to a personal ritual.</p></article>
      </section>

      <section id="tea" className="teaFeature">
        <div className="teaFeatureImage"><img src={A(teaProduct.img)} alt="A single AfriEssence Herbal Teas sachet" loading="lazy" decoding="async"/></div>
        <div className="teaFeatureCopy">
          <p className="eyebrow">THE WELLNESS EDIT / HERBAL TEAS</p>
          <h2>A cup for<br/><i>the in-between.</i></h2>
          <p>Meet the simple centre of our Wellness edit: AfriEssence Herbal Teas. A sachet, a favourite cup and a moment to slow down—whether you take that pause at the start of the morning or somewhere in the middle of a full day.</p>
          <p>Prepare the tea according to the directions on its pack. Let the waiting be part of the ritual, then enjoy the warmth and aroma at a pace that feels like yours.</p>
          <div className="teaFeaturePrice"><span>AFRIESSENCE HERBAL TEAS</span><strong>{formatPrice(teaProduct.price)}</strong></div>
          <div className="wellnessPageActions">
            <button className="btn dark" onClick={() => onAdd(teaProduct)}>Add to bag <Plus/></button>
            <a className="textLink" href={P('/product/herbal-teas')}>View product details <ArrowUpRight/></a>
          </div>
        </div>
      </section>

      <section className="teaRitualSteps">
        <p className="eyebrow">MAKE A MOMENT OF IT</p>
        <h2>A simple tea ritual.</h2>
        <p className="teaRitualIntro">A few small choices can help a familiar cup feel like a moment of your own.</p>
        <div className="teaStepsGrid">
          <article><span>01</span><h3>Choose your cup</h3><p>Reach for a cup you enjoy holding and find a place where you can be comfortable for a few minutes.</p></article>
          <article><span>02</span><h3>Let it steep</h3><p>Follow the preparation guidance on the Herbal Teas pack. While you wait, put down your phone or simply take a breath.</p></article>
          <article><span>03</span><h3>Savour the pause</h3><p>Notice the warmth, colour and aroma. There is no need to rush the first sip or fill the quiet with another task.</p></article>
        </div>
      </section>

      <section className="wellnessReadings">
        <div className="wellnessReadingsHead">
          <p className="eyebrow">WELLNESS NOTES</p>
          <h2>Read, pause,<br/><i>return.</i></h2>
          <p>Short reflections for softer mornings, tea breaks and the small spaces between the day’s plans.</p>
        </div>
        <div className="journalGrid">
          {wellnessArticles.map(article => <article key={article.slug}>
            <div><a href={P('/journal/' + article.slug)}><img src={A(article.img)} alt={article.title} loading="lazy"/></a></div>
            <span>{article.readTime}</span>
            <h3><a href={P('/journal/' + article.slug)}>{article.title}</a></h3>
            <p className="journalExcerpt">{article.intro}</p>
            <a className="journalRead" href={P('/journal/' + article.slug)}>Read story <ArrowUpRight/></a>
          </article>)}
        </div>
        <a className="journalAllLink" href={P('/journal')}>Explore the full journal <ArrowUpRight/></a>
      </section>

      <section className="wellnessClosing">
        <p className="eyebrow">A SMALL INVITATION</p>
        <h2>Begin with a pause.<br/><i>Let the day follow.</i></h2>
        <p>Discover the Herbal Teas ritual or keep reading for more ideas to make everyday care feel a little more considered.</p>
        <div className="wellnessPageActions">
          <a className="btn dark" href="#tea">Explore Herbal Teas <ArrowUpRight/></a>
          <a className="textLink" href={P('/journal')}>Visit the journal</a>
        </div>
      </section>
    </main>
    <footer><a className="logo" href={P('/')}><img src={A('logo-transparent.png')} alt="AfriEssence"/></a><p>Restore your Confidence</p></footer>
  </>;
}


function JournalArticlePage({article, cartCount, onOpenBag}) {
  return <>
    <PageHeader cartCount={cartCount} onOpenBag={onOpenBag}/>
    <main className="journalArticlePage">
      <a className="backToJournal" href={P('/journal')}>← Back to the journal</a>
      <p className="eyebrow">{article.category} / {article.readTime}</p>
      <h1>{article.title}</h1>
      <p className="articleIntro">{article.intro}</p>
      <div className="articleImage"><img src={A(article.img)} alt={article.title}/></div>
      <article className="articleBody">
        {article.sections.map((section, sectionIndex) => <section className="articleSection" key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph, paragraphIndex) => <p key={`${sectionIndex}-${paragraphIndex}`}>{paragraph}</p>)}
        </section>)}
      </article>
      <div className="articleActions">
        <a className="btn dark" href={P('/shop')}>Explore the collection <ArrowUpRight/></a>
        <a className="textLink" href={P('/journal')}>More from the journal</a>
      </div>
    </main>
    <footer><a className="logo" href={P('/')}><img src={A('logo-transparent.png')} alt="AfriEssence"/></a><p>Restore your Confidence</p></footer>
  </>;
}

function NotFoundPage({cartCount, onOpenBag}) {
  return <>
    <PageHeader cartCount={cartCount} onOpenBag={onOpenBag}/>
    <main className="innerPage notFoundPage">
      <p className="eyebrow">AFRIESSENCE / 404</p>
      <h1>That page has wandered.</h1>
      <p className="innerIntro">The page you’re looking for isn’t here. Let’s find your way back to something beautiful.</p>
      <a className="btn dark" href={P('/shop')}>Browse the collection <ArrowUpRight/></a>
      <a className="textLink" href={P('/')}>Return home</a>
    </main>
    <footer><a className="logo" href={P('/')}><img src={A('logo-transparent.png')} alt="AfriEssence"/></a><p>Restore your Confidence</p></footer>
  </>;
}
function App(){const[pathname,setPathname]=useState(()=>routePathFromLocation(window.location.pathname)),[loading,setLoading]=useState(true),[cart,setCart]=useState(()=>{try{const saved=JSON.parse(window.localStorage.getItem('afriessence-cart')||'[]');return Array.isArray(saved)?saved.map(item=>cartProducts.find(product=>product.slug===item?.slug)).filter(Boolean):[]}catch{return[]}}),[filter,setFilter]=useState('ALL'),[bag,setBag]=useState(false),[menu,setMenu]=useState(false),[scrolled,setScrolled]=useState(false);useEffect(()=>{const timer=setTimeout(()=>setLoading(false),1400);return()=>clearTimeout(timer)},[]);
useEffect(()=>{const onPopState=()=>setPathname(routePathFromLocation(window.location.pathname));window.addEventListener('popstate',onPopState);return()=>window.removeEventListener('popstate',onPopState)},[]);
useEffect(()=>{const onInternalLinkClick=event=>{if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;const target=event.target instanceof Element?event.target:null;const anchor=target?.closest('a[href]');if(!anchor||anchor.hasAttribute('download')||(anchor.target&&anchor.target!=='_self'))return;const url=new URL(anchor.href,window.location.href);if(url.origin!==window.location.origin||!isWithinAppBase(url.pathname)||/\.[a-z0-9]+$/i.test(url.pathname))return;if(url.pathname===window.location.pathname&&url.search===window.location.search&&url.hash){return}if(url.pathname===window.location.pathname&&url.search===window.location.search&&url.hash===window.location.hash){event.preventDefault();return}event.preventDefault();window.history.pushState({},'',`${url.pathname}${url.search}${url.hash}`);setPathname(routePathFromLocation(url.pathname))};document.addEventListener('click',onInternalLinkClick);return()=>document.removeEventListener('click',onInternalLinkClick)},[]);
useEffect(()=>{if(loading)return;const hash=window.location.hash;if(hash){let id=hash.slice(1);try{id=decodeURIComponent(id)}catch{}document.getElementById(id)?.scrollIntoView()}else{window.scrollTo(0,0)}},[loading,pathname]);
useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>30);window.addEventListener('scroll',onScroll);return()=>window.removeEventListener('scroll',onScroll)},[]);useEffect(()=>{const move=(x,y)=>{document.documentElement.style.setProperty('--sensor-x',`${x}px`);document.documentElement.style.setProperty('--sensor-y',`${y}px`)};const pointer=e=>move((e.clientX/window.innerWidth-.5)*8,(e.clientY/window.innerHeight-.5)*8);const orient=e=>move((e.gamma||0)/8,(e.beta||0)/10);window.addEventListener('pointermove',pointer,{passive:true});window.addEventListener('deviceorientation',orient,{passive:true});return()=>{window.removeEventListener('pointermove',pointer);window.removeEventListener('deviceorientation',orient)}},[]);useEffect(()=>{try{window.localStorage.setItem('afriessence-cart',JSON.stringify(cart))}catch{}},[cart]);if(loading)return <Loader/>;const add=p=>{setCart(current=>[...current,p]);setBag(true)};const removeFromBag=index=>setCart(current=>current.filter((_,i)=>i!==index));const checkoutHref=checkoutUrlFor(cart);const cartDrawer=bag?<CartDrawer cart={cart} onClose={()=>setBag(false)} onRemove={removeFromBag} checkoutHref={checkoutHref}/>:null;const productSlug=pathname.startsWith('/product/')?pathname.slice('/product/'.length):null;const productPage=products.find(p=>p.slug===productSlug);const journalSlug=pathname.startsWith('/journal/')?pathname.slice('/journal/'.length):null;const journalArticle=journalArticles.find(article=>article.slug===journalSlug);if(productPage)return <><ProductPage product={productPage} onAdd={add} cartCount={cart.length} onOpenBag={()=>setBag(true)}/>{cartDrawer}</>;if(journalArticle)return <><JournalArticlePage article={journalArticle} cartCount={cart.length} onOpenBag={()=>setBag(true)}/>{cartDrawer}</>;if(pathname==='/wellness')return <><WellnessPage onAdd={add} cartCount={cart.length} onOpenBag={()=>setBag(true)}/>{cartDrawer}</>;if(['/shop','/about','/journal','/contact'].includes(pathname))return <><InnerPage type={pathname.slice(1)} onAdd={add} cartCount={cart.length} onOpenBag={()=>setBag(true)}/>{cartDrawer}</>;if(pathname!=='/')return <><NotFoundPage cartCount={cart.length} onOpenBag={()=>setBag(true)}/>{cartDrawer}</>;const shown=filter==='ALL'?products:products.filter(p=>p.cat===filter);return <><header className={`siteHeader ${scrolled ? 'scrolled' : ''}`}><a className="logo" href="#top"><img src={A('logo-transparent.png')} alt="AfriEssence"/></a><nav>{['HOME','SHOP','WELLNESS','ABOUT','JOURNAL','CONTACT'].map(x=><a href={P(x==='HOME'?'/':x==='SHOP'?'/shop':x==='WELLNESS'?'/wellness':x==='ABOUT'?'/about':x==='JOURNAL'?'/journal':'/contact')}>{x}</a>)}</nav><div className="actions"><button aria-label="Search"><Search/></button><button aria-label="Account"><UserRound/></button><button className="bag" onClick={()=>setBag(true)} aria-label="Shopping bag"><ShoppingBag/><b>{cart.length}</b></button><button className="men" onClick={()=>setMenu(!menu)}><Menu/></button></div></header>{menu&&<div className="mobileMenu"><button onClick={()=>setMenu(false)}><X/></button>{['HOME','SHOP','WELLNESS','ABOUT','JOURNAL','CONTACT'].map(x=><a href={P(x==='HOME'?'/':x==='SHOP'?'/shop':x==='WELLNESS'?'/wellness':x==='ABOUT'?'/about':x==='JOURNAL'?'/journal':'/contact')} onClick={()=>setMenu(false)}>{x}</a>)}</div>}<main id="top"><section className="hero"><div className="heroCopy"><p className="eyebrow pricePromise">AFFORDABLE BEAUTY FROM {formatPrice(Math.min(...products.map(product => product.price)))}</p><h1>Restore your<br/><i>Confidence.</i></h1><p className="lead">Nature-inspired essentials to nourish your skin, hair and everyday radiance—thoughtfully priced for real-life routines.</p><div><a className="btn dark" href="#shop">Shop the collection <ArrowUpRight/></a><a className="textLink" href="#about">Discover AfriEssence</a></div></div></section><section className="marquee"><span>Nature, elevated</span><span>✦</span><span>Made for your ritual</span><span>✦</span><span>Self-care within reach</span></section><section id="shop" className="collection"><div className="sectionHead"><div><p className="eyebrow">THE COLLECTION / {String(products.length).padStart(2,'0')}</p><h2>Beauty, in its<br/><i>many rituals.</i></h2></div><p>Discover thoughtful essentials for hair, body, skin and everyday radiance—priced to keep self-care within reach.</p></div><div className="filters">{['ALL','BODY','HAIR','SKIN','CLEANSING','RADIANCE','WELLNESS'].map(x=><button key={x} className={filter===x?'active':''} onClick={()=>setFilter(x)}>{x}</button>)}</div><div className="grid">{shown.map(p=>isAllScentedBodyOil(p)?<ScentedBodyOilCard product={p} key={p.slug} showStory/>:<article className="card" key={p.slug}><div className="productImg"><img src={A(p.img)} alt={p.name} loading="lazy" decoding="async"/><button className="quick" onClick={()=>add(p)}>Add to bag <Plus/></button></div><div className="cardInfo"><div><h3>{p.name}</h3><p>{p.desc}</p><details className="storyDetails"><summary>Creation story</summary><p>{stories[p.slug]}</p><a className="storyRead" href={P('/product/'+p.slug)}>Read the full story <ArrowUpRight/></a></details></div><strong>{formatPrice(p.price)}</strong></div><a className="view" href={P('/product/'+p.slug)}>View product <ArrowUpRight/></a></article>)}</div></section><section id="about" className="story"><div className="storyImg"><img src={A('baovera-model.jpg')}/></div><div className="storyCopy"><p className="eyebrow">THE AFRIESSENCE PHILOSOPHY</p><h2>Rooted in nature.<br/><i>Crafted for radiance.</i></h2><p>AfriEssence is an invitation to slow down and return to yourself. Inspired by the richness of Africa and the quiet intelligence of nature, we create modern rituals that make everyday care feel extraordinary.</p><a className="textLink" href={P('/about')}>Our story <ArrowUpRight/></a></div></section><section id="journey" className="journey"><div><p className="eyebrow">THE AFRIESSENCE JOURNEY</p><h2>From our roots<br/><i>to your ritual.</i></h2><p>Born from a love of African botanicals and modern self-care, AfriEssence is a journey of discovery. Every blend is made to bring you closer to nature, and closer to yourself.</p><a className="textLink" href={P('/about')}>Read our story <ArrowUpRight/></a></div><div className="journeySteps"><div><b>01</b><span>ROOTED</span><p>Inspired by the richness of the continent.</p></div><div><b>02</b><span>CRAFTED</span><p>Thoughtful formulas for modern rituals.</p></div><div><b>03</b><span>RADIANT</span><p>Made to reveal your everyday glow.</p></div></div></section><section id="rituals" className="rituals"><div className="ritualImg"><img src={A('black-luxe-cleanser-editorial-final.jpg')} alt="AfriEssence Black Luxe Soap in a clear jar"/></div><div className="ritualCopy"><p className="eyebrow">A DAILY MOMENT</p><h2>Morning<br/><i>rituals.</i></h2><p>Begin softly with Black Luxe Soap. Cleanse, nourish and let a little light in before the day begins.</p><div className="ritualList"><span><b>01</b> Cleanse with intention</span><span><b>02</b> Nourish your skin</span><span><b>03</b> Seal in your radiance</span></div><a className="btn dark" href="#shop">Build your ritual <ArrowUpRight/></a></div></section><section id="wellness" className="wellness"><div className="wellnessVisual"><img src={A('herbal-tea-sachet-editorial.jpg')} alt="A single herbal tea sachet for a quiet tea ritual" loading="lazy" decoding="async"/><span className="wellnessIndex">01 / HERBAL TEAS</span></div><div className="wellnessCopy"><p className="eyebrow">WELLNESS / MAKE SPACE TO PAUSE</p><h2>A quieter<br/><i>kind of ritual.</i></h2><p>Settle into the day with a cup of AfriEssence Herbal Teas. A simple botanical infusion, made for a moment to pause, sip and return to yourself.</p><div className="wellnessProduct"><div><span>THE WELLNESS EDIT</span><h3>Herbal Teas</h3></div><strong>{formatPrice(1500)}</strong></div><div className="wellnessActions"><button className="btn dark" onClick={()=>add(products.find(p=>p.slug==='herbal-teas'))}>Add Herbal Teas <Plus/></button><a className="textLink" href={P('/wellness')}>Explore Wellness <ArrowUpRight/></a></div></div></section><section className="quote"><p className="eyebrow">A NOTE FROM OUR COMMUNITY</p><blockquote>“A beautiful new ritual<br/> in my everyday routine.”</blockquote><span>— AMARA K. / VERIFIED CUSTOMER</span></section><section className="glowEdit"><p className="eyebrow">THE GLOW EDIT / WHY AFRIESSENCE</p><h2>Small moments.<br/><i>Lasting radiance.</i></h2><div className="glowCards"><div><span>01</span><h3>Nourish</h3><p>Rich textures that leave skin and hair feeling cared for, never coated.</p></div><div><span>02</span><h3>Layer</h3><p>Build a personal signature with oils, fragrance and luminous finishes.</p></div><div><span>03</span><h3>Glow</h3><p>Let your natural beauty take the room, softly and confidently.</p></div></div><a className="btn dark" href="#shop">Find your glow <ArrowUpRight/></a></section><section className="ingredients"><div className="ingredientsIntro"><p className="eyebrow">THE INGREDIENT EDIT</p><h2>Nature,<br/><i>considered.</i></h2><p>We look to the earth for what works beautifully. Familiar botanicals, considered carefully, blended for modern skin and hair.</p><a className="textLink" href="#shop">Explore ingredients <ArrowUpRight/></a></div><div className="ingredientTiles"><div><span>01</span><h3>Baobab</h3><p>Rich, nourishing and deeply connected to African soil.</p></div><div><span>02</span><h3>Shea</h3><p>A velvety botanical butter for comfort and care.</p></div><div><span>03</span><h3>Botanicals</h3><p>Plant-powered notes that turn care into ritual.</p></div></div></section><section id="journal" className="journal"><div className="journalHead"><div><p className="eyebrow">THE AFRIESSENCE JOURNAL</p><h2>Notes on<br/><i>radiance.</i></h2></div><p>Thoughts, rituals and small discoveries for a more beautiful everyday.</p></div><div className="journalGrid">{journalArticles.slice(0,3).map(article=><article key={article.slug}><div><a href={P('/journal/'+article.slug)}><img src={A(article.img)} alt={article.title} loading="lazy"/></a></div><span>{article.category} / {article.readTime}</span><h3><a href={P('/journal/'+article.slug)}>{article.title}</a></h3><p className="journalExcerpt">{article.intro}</p><a className="journalRead" href={P('/journal/'+article.slug)}>Read story <ArrowUpRight/></a></article>)}</div><a className="journalAllLink" href={P('/journal')}>Explore all journal stories <ArrowUpRight/></a></section><section className="newsletter"><p className="eyebrow">STAY IN THE GLOW</p><h2>Join the <i>radiance.</i></h2><p>New rituals, beauty stories and a little more light in your inbox.</p><form onSubmit={e=>e.preventDefault()}><input placeholder="Your email address" type="email"/><button className="btn dark">Subscribe <ArrowUpRight/></button></form></section></main><footer><div><a className="logo" href={P('/')}>AFRI<span>ESSENCE</span></a><p>Restore your Confidence</p></div><div className="footlinks"><a href={P('/shop')}>Shop</a><a href={P('/wellness')}>Wellness</a><a href={P('/about')}>About</a><a href={P('/journal')}>Journal</a><a href={P('/contact')}>Contact</a></div><div className="social"><a className="social3d" href="https://instagram.com/afri.essence__" target="_blank" rel="noreferrer"><Camera/> Instagram <b>@afri.essence__</b></a><a className="social3d" href={WHATSAPP_LINK} target="_blank" rel="noreferrer"><MessageCircle/> WhatsApp <b>{WHATSAPP_NUMBER}</b></a><a className="social3d" href="https://tiktok.com/@afriessenceholistics" target="_blank" rel="noreferrer"><span className="tik">♪</span> TikTok <b>@afriessenceholistics</b></a><span>@2026 SYNQ Technological Services</span></div></footer>{cartDrawer}</>};createRoot(document.getElementById('root')).render(<App/>);