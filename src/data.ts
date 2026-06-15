import { TranslationSet, ProductItem, OfficeLocation, PartnerBrand } from './types';
import productsData from './products.json';

export const TRANSLATIONS: Record<'ES' | 'EN', TranslationSet> = {
  ES: {
    aboutUs: 'Nosotros',
    partnering: 'Distribución',
    ourProducts: 'Productos',
    letsConnect: 'Conéctate',
    downloadBrochure: 'Descargar Catálogo',
    chatWithUs: 'Escríbenos',
    heroSub: 'Las más ricas galletas de Bolivia',
    heroTitle: 'EL SABOR DEL BUEN GUSTO',
    heroSubBakery: 'Las más ricas galletas de Bolivia',
    heroTitleBakery: 'EL SABOR DEL BUEN GUSTO',
    heroSubDeli: 'Galletas Cracker Premium',
    heroTitleDeli: 'TRADICIÓN & CALIDAD',
    aboutTitle: 'Quiénes Somos',
    aboutBody: 'Especialistas en panadería, galletería y repostería. Somos una empresa de productos alimenticios horneados que inició operaciones en noviembre de 2013. Nacidos con la visión de llevar el mejor sabor a los hogares bolivianos, elaboramos nuestros productos con ingredientes de primera calidad, procesos artesanales y el amor por la buena gastronomía que caracteriza a nuestra tierra.',
    readMore: 'Conoce Nuestra Historia',
    partneringTitle: 'Distribución Nacional',
    trustedSourcing: 'Ingredientes Seleccionados',
    trustedSourcingDesc: 'Materias primas de la más alta calidad para garantizar el sabor y la textura perfecta en cada producto.',
    foodSafety: 'Calidad Certificada',
    foodSafetyDesc: 'Elaboramos nuestros productos bajo estrictos controles de calidad e inocuidad alimentaria en Bolivia.',
    operationalEfficiency: 'Distribución Nacional',
    operationalEfficiencyDesc: 'Llegamos a los principales supermercados, tiendas y distribuidores de todo el territorio boliviano.',
    expertSupport: 'Sabor Artesanal',
    expertSupportDesc: 'Recetas tradicionales bolivianas elaboradas con pasión y los mejores ingredientes del mercado.',
    quotationTitle: 'Solicitar Información',
    quotationSubtitle: 'Déjanos un mensaje y nuestro equipo se contactará contigo a la brevedad.',
    nameField: 'Nombre Completo / Empresa',
    emailField: 'Correo Electrónico',
    phoneField: 'Número de Contacto (WhatsApp)',
    messageField: '¿En qué productos está interesado?',
    submitBtn: 'Enviar Solicitud',
    successMsg: '¡Solicitud recibida! Nos comunicaremos con usted a la brevedad.',
    contactHeader: 'Centros de Distribución',
  },
  EN: {
    aboutUs: 'About Us',
    partnering: 'Distribution',
    ourProducts: 'Our Products',
    letsConnect: "Let's Connect!",
    downloadBrochure: 'Download Catalogue',
    chatWithUs: 'Chat With Us',
    heroSub: 'The finest cookies in Bolivia',
    heroTitle: 'THE TASTE OF GOOD FLAVOR',
    heroSubBakery: 'The finest cookies in Bolivia',
    heroTitleBakery: 'THE TASTE OF GOOD FLAVOR',
    heroSubDeli: 'Premium Cracker Cookies',
    heroTitleDeli: 'TRADITION & QUALITY',
    aboutTitle: 'About Us',
    aboutBody: 'Specialists in bakery, cookies and artisan pastries. We are a baked food products company that started operations in November 2013. Born with the vision of bringing the best flavor to Bolivian homes, we produce our products with top quality ingredients, artisan processes and the love for good gastronomy that characterizes our land.',
    readMore: 'Read Our Story',
    partneringTitle: 'National Distribution',
    trustedSourcing: 'Selected Ingredients',
    trustedSourcingDesc: 'Highest quality raw materials to guarantee perfect flavor and texture in every product.',
    foodSafety: 'Certified Quality',
    foodSafetyDesc: 'We produce our products under strict quality and food safety controls in Bolivia.',
    operationalEfficiency: 'National Distribution',
    operationalEfficiencyDesc: 'We reach the main supermarkets, stores and distributors throughout Bolivia.',
    expertSupport: 'Artisan Flavor',
    expertSupportDesc: 'Traditional Bolivian recipes made with passion and the best ingredients on the market.',
    quotationTitle: 'Request Information',
    quotationSubtitle: 'Leave us a message and our team will contact you shortly.',
    nameField: 'Full Name / Company',
    emailField: 'Email Address',
    phoneField: 'Contact Number (WhatsApp)',
    messageField: 'Which products are you interested in?',
    submitBtn: 'Send Request',
    successMsg: 'Request received! We will contact you shortly.',
    contactHeader: 'Distribution Centers',
  },
};

export const NAVIGATION_DATA = {
  ES: {
    aboutUs: [
      { label: 'Nuestra Historia', url: '#about' },
      { label: 'Filosofía & Valores', url: '#filosofia' },
      { label: 'Calidad Gustossi', url: '#valores' },
    ],
    partnering: [
      { label: 'Distribución Nacional', url: '#oficinas' },
      { label: 'Canal Retail', url: '#oficinas' },
      { label: 'Mayoristas', url: '#oficinas' },
    ],
    products: [
      { label: 'Galletería', url: 'https://www.industriasgustossi.com.bo/galleteria/' },
      { label: 'Repostería', url: 'https://www.industriasgustossi.com.bo/reposteria/' },
      { label: 'Navideños', url: 'https://www.industriasgustossi.com.bo/navidad/' },
      { label: 'Wafer & Rellena', url: 'https://www.industriasgustossi.com.bo/wafer/' },
    ],
    connect: [
      { label: 'Contacto Directo', url: '#contacto' },
      { label: 'WhatsApp', url: 'https://wa.me/59144268010' },
      { label: 'Sitio Oficial', url: 'https://www.industriasgustossi.com.bo' },
    ],
  },
  EN: {
    aboutUs: [
      { label: 'Our Story', url: '#about' },
      { label: 'Philosophy & Values', url: '#filosofia' },
      { label: 'Gustossi Quality', url: '#valores' },
    ],
    partnering: [
      { label: 'National Distribution', url: '#oficinas' },
      { label: 'Retail Channel', url: '#oficinas' },
      { label: 'Wholesale', url: '#oficinas' },
    ],
    products: [
      { label: 'Cookies', url: 'https://www.industriasgustossi.com.bo/galleteria/' },
      { label: 'Pastries', url: 'https://www.industriasgustossi.com.bo/reposteria/' },
      { label: 'Christmas', url: 'https://www.industriasgustossi.com.bo/navidad/' },
      { label: 'Wafer & Filled', url: 'https://www.industriasgustossi.com.bo/wafer/' },
    ],
    connect: [
      { label: 'Direct Contact', url: '#contacto' },
      { label: 'WhatsApp', url: 'https://wa.me/59144268010' },
      { label: 'Official Site', url: 'https://www.industriasgustossi.com.bo' },
    ],
  },
};

export const PARTNERS: PartnerBrand[] = [
  { logoText: 'Supermercados Bolivia' },
  { logoText: 'Canal Retail Nacional' },
  { logoText: 'Tiendas de Barrio' },
  { logoText: 'Distribuidores Cochabamba' },
  { logoText: 'Mercados La Paz' },
  { logoText: 'Santa Cruz Retail' },
  { logoText: 'Oruro & Potosí' },
  { logoText: 'Canal HORECA' },
];

export const OFFICES: OfficeLocation[] = [
  {
    city: 'Cochabamba',
    role: 'Planta Principal',
    address: 'Cochabamba, Bolivia',
    phone: '+591 4426-8010',
    email: 'ventas@gustossi.com.bo',
  },
  {
    city: 'La Paz',
    role: 'Distribución Occidente',
    address: 'La Paz, Bolivia',
    phone: '+591 4426-8010',
    email: 'lapaz@gustossi.com.bo',
  },
  {
    city: 'Santa Cruz',
    role: 'Distribución Oriente',
    address: 'Santa Cruz, Bolivia',
    phone: '+591 4426-8010',
    email: 'santacruz@gustossi.com.bo',
  },
];

export const PHILOSOPHY_DATA = {
  ES: {
    title: 'Nuestra Filosofía',
    subtitle: 'LOS PILARES DE LA CALIDAD GUSTOSSI',
    tabs: [
      { id: 'mision', label: 'Nuestra Misión' },
      { id: 'vision', label: 'Nuestra Visión' },
      { id: 'valores', label: 'Nuestros Valores' },
    ],
    mision: {
      title: 'Compromiso con el Buen Sabor',
      content: 'Llevar a los hogares bolivianos y al exigente mercado de distribución productos de panadería, galletería y repostería de la más alta calidad y frescura. Resguardando recetas tradicionales bolivianas, buscamos enriquecer cada momento compartido en familia, garantizando siempre la mejor textura, sabor auténtico y presentación impecable.',
    },
    vision: {
      title: 'Liderazgo en el Sabor Boliviano',
      content: 'Consolidarnos como la empresa productora de galletería y repostería artesanal de mayor confianza e innovación en Bolivia. Queremos que el sello Gustossi sea reconocido como sinónimo de calidad boliviana, tradición impecable y sabor incomparable en cada hogar del país.',
    },
    valores: [
      { title: 'Calidad Superior', desc: 'Ingredientes seleccionados y procesos artesanales que garantizan el mejor sabor en cada producto Gustossi.' },
      { title: 'Tradición Boliviana', desc: 'Recetas tradicionales y sabores auténticos que representan la gastronomía y el buen gusto boliviano.' },
      { title: 'Innovación Constante', desc: 'Desarrollamos nuevos productos y sabores para satisfacer los gustos cambiantes de nuestros consumidores.' },
      { title: 'Compromiso Nacional', desc: 'Empresa boliviana comprometida con el desarrollo productivo y la generación de empleo en nuestro país.' },
    ],
  },
  EN: {
    title: 'Our Philosophy',
    subtitle: 'THE PILLARS OF GUSTOSSI QUALITY',
    tabs: [
      { id: 'mision', label: 'Our Mission' },
      { id: 'vision', label: 'Our Vision' },
      { id: 'valores', label: 'Our Values' },
    ],
    mision: {
      title: 'Commitment to Great Taste',
      content: 'To bring Bolivian homes and the demanding distribution market bakery, cookie and pastry products of the highest quality and freshness. Protecting traditional Bolivian recipes, we seek to enrich every family moment, always guaranteeing the best texture, authentic flavor and impeccable presentation.',
    },
    vision: {
      title: 'Leadership in Bolivian Flavor',
      content: 'To consolidate ourselves as the most trusted and innovative artisan cookie and pastry producer in Bolivia. We want the Gustossi seal to be recognized as a synonym for Bolivian quality, impeccable tradition and incomparable flavor in every home in the country.',
    },
    valores: [
      { title: 'Superior Quality', desc: 'Selected ingredients and artisan processes that guarantee the best flavor in every Gustossi product.' },
      { title: 'Bolivian Tradition', desc: 'Traditional recipes and authentic flavors that represent the gastronomy and good taste of Bolivia.' },
      { title: 'Constant Innovation', desc: 'We develop new products and flavors to satisfy the changing tastes of our consumers.' },
      { title: 'National Commitment', desc: 'A Bolivian company committed to productive development and job creation in our country.' },
    ],
  },
};

export const PRODUCTS: ProductItem[] = productsData as ProductItem[];
