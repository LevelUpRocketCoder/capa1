import { useState, useRef, useEffect } from 'react';
import { MessageCircle, ShoppingCart, FileText } from 'lucide-react';
import { Language, ProductItem } from './types';
import { TRANSLATIONS, PARTNERS, PRODUCTS } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Departments from './components/Departments';
import CorporatePhilosophy from './components/CorporatePhilosophy';
import Recipes from './components/Recipes';
import ProductGallery from './components/ProductGallery';
import ContactModal from './components/ContactModal';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

export default function App() {
  const [currentLang, setLang] = useState<Language>('ES');
  const [activeDivision, setActiveDivision] = useState<'galleteria' | 'navidad' | 'queques'>('galleteria');
  const [contactOpen, setContactOpen] = useState(false);
  const [prefilledProduct, setPrefilledProduct] = useState<string | undefined>(undefined);
  const [adminOpen, setAdminOpen] = useState(false);
  const [products, setProducts] = useState<ProductItem[]>(PRODUCTS);

  useEffect(() => {
    // Fetch latest products from our local API
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const aboutSectionRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[currentLang];
  const isES = currentLang === 'ES';

  const triggerQuoteForProduct = (productName: string) => {
    setPrefilledProduct(productName);
    setContactOpen(true);
  };

  const openGeneralContact = () => {
    setPrefilledProduct(undefined);
    setContactOpen(true);
  };

  const scrollToDivisionAndGallery = (div: 'galleteria' | 'navidad' | 'queques') => {
    setActiveDivision(div);
    const element = document.getElementById('productos');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-white bg-brand-bg relative selection:bg-gold selection:text-neutral-900 font-sans">

      {/* NOISE OVERLAY */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      <Navbar 
        currentLang={currentLang} 
        setLang={setLang} 
        openContact={openGeneralContact}
        onOpenAdmin={() => setAdminOpen(true)}
      />
      <Hero currentLang={currentLang} openContact={openGeneralContact} />
      <Departments currentLang={currentLang} onSelectDivision={scrollToDivisionAndGallery} />

      {/* ABOUT SECTION */}
      <section
        id="about"
        ref={aboutSectionRef}
        className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-white text-neutral-900 relative overflow-hidden"
      >
        {/* Subtle decorative background pattern */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/[0.03] rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: Image with decorative frame */}
            <div className="relative group">
              <div className="absolute -inset-3 border border-gold/20 rounded-sm pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold/10 rounded-sm pointer-events-none" />
              <img
                src="./images/bakery-pattern.png"
                alt={isES ? 'Industrias Gustossi - Fabricación Artesanal' : 'Industrias Gustossi - Artisan Production'}
                className="w-full aspect-[4/3] object-cover rounded-sm shadow-2xl group-hover:shadow-gold/10 transition-shadow duration-500"
              />
              {/* Year badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-5 py-3 rounded-sm shadow-lg">
                <span className="text-[10px] font-manrope font-bold uppercase tracking-widest text-gold block">{isES ? 'DESDE' : 'SINCE'}</span>
                <span className="text-3xl font-accent font-bold text-neutral-900 leading-none">2013</span>
              </div>
            </div>

            {/* Right: Text content */}
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="font-luxurious text-gold text-3xl md:text-4xl block select-none leading-none">
                  {t.aboutTitle}
                </span>
                <h2 className="font-accent text-3xl md:text-4xl font-bold uppercase tracking-tight text-neutral-900 leading-tight">
                  {isES ? 'EL SABOR DEL BUEN GUSTO BOLIVIANO' : 'THE TASTE OF BOLIVIAN QUALITY'}
                </h2>
              </div>

              {/* Highlight quote */}
              <div className="border-l-4 border-gold pl-5 py-1">
                <p className="font-accent text-lg md:text-xl italic text-neutral-700 leading-relaxed">
                  {isES 
                    ? '"Nacidos con la visión de llevar el mejor sabor a los hogares bolivianos."'
                    : '"Born with the vision of bringing the best flavor to Bolivian homes."'}
                </p>
              </div>

              <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-sans">
                {t.aboutBody}
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-neutral-100">
                <div className="text-center">
                  <span className="text-2xl md:text-3xl font-accent font-bold text-gold block">10+</span>
                  <span className="text-[10px] font-manrope font-bold uppercase tracking-widest text-neutral-400">{isES ? 'Años' : 'Years'}</span>
                </div>
                <div className="text-center">
                  <span className="text-2xl md:text-3xl font-accent font-bold text-gold block">50+</span>
                  <span className="text-[10px] font-manrope font-bold uppercase tracking-widest text-neutral-400">{isES ? 'Productos' : 'Products'}</span>
                </div>
                <div className="text-center">
                  <span className="text-2xl md:text-3xl font-accent font-bold text-gold block">9</span>
                  <span className="text-[10px] font-manrope font-bold uppercase tracking-widest text-neutral-400">{isES ? 'Dptos.' : 'Regions'}</span>
                </div>
              </div>

              <button
                onClick={openGeneralContact}
                className="px-8 py-3.5 bg-neutral-950 text-white font-manrope font-bold text-xs tracking-wider uppercase hover:bg-gold hover:text-white transition-colors duration-300 rounded-sm shadow-xl"
              >
                {t.readMore}
              </button>
            </div>
          </div>
        </div>

        {/* MARQUEE */}
        <div className="max-w-6xl mx-auto mt-24 border-t border-b border-neutral-150 py-5 overflow-hidden relative">
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="animate-marquee whitespace-nowrap">
            <div className="flex gap-20 pr-20 items-center justify-around">
              {PARTNERS.map((p, idx) => (
                <span key={idx} className="font-manrope text-xs font-bold uppercase tracking-[0.25em] text-neutral-400 select-none">
                  ★ {p.logoText}
                </span>
              ))}
            </div>
            <div className="flex gap-20 pr-20 items-center justify-around">
              {PARTNERS.map((p, idx) => (
                <span key={`dup-${idx}`} className="font-manrope text-xs font-bold uppercase tracking-[0.25em] text-neutral-400 select-none">
                  ★ {p.logoText}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CorporatePhilosophy currentLang={currentLang} />

      <Recipes currentLang={currentLang} />

      <ProductGallery
        currentLang={currentLang}
        activeDivision={activeDivision}
        setActiveDivision={setActiveDivision}
        onRequestQuote={triggerQuoteForProduct}
        products={products}
      />

      <Footer currentLang={currentLang} openContact={openGeneralContact} />

      {/* FLOATING BUTTONS */}
      <div className="fixed right-5 bottom-8 z-40 hidden sm:flex flex-col gap-3 font-manrope">
        <button
          onClick={openGeneralContact}
          className="group flex items-center bg-black/90 hover:bg-gold border border-white/10 text-white p-3 rounded-full shadow-2xl transition-all duration-300"
        >
          <FileText className="w-5 h-5 flex-shrink-0" />
          <span className="max-w-0 opacity-0 overflow-hidden group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300">
            {isES ? 'Catálogo' : 'Catalogue'}
          </span>
        </button>

        <a
          href="https://wa.me/59144268010"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-full shadow-2xl transition-all duration-300"
        >
          <MessageCircle className="w-5 h-5 flex-shrink-0" />
          <span className="max-w-0 opacity-0 overflow-hidden group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300">
            WhatsApp Bolivia
          </span>
        </a>

        <button
          onClick={openGeneralContact}
          className="group flex items-center bg-gold hover:bg-white text-neutral-900 p-3 rounded-full shadow-2xl transition-all duration-300"
        >
          <ShoppingCart className="w-5 h-5 flex-shrink-0" />
          <span className="max-w-0 opacity-0 overflow-hidden group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300">
            {t.quotationTitle}
          </span>
        </button>
      </div>

      <ContactModal
        currentLang={currentLang}
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        prefilledProduct={prefilledProduct}
      />

      {adminOpen && (
        <AdminPanel 
          products={products}
          onClose={() => setAdminOpen(false)} 
          onProductAdded={(newProduct) => {
            setProducts([...products, newProduct]);
          }} 
          onProductDeleted={(id) => {
            setProducts(products.filter(p => p.id !== id));
          }}
        />
      )}
    </div>
  );
}
