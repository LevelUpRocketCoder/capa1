import { useState, useMemo, useEffect } from 'react';
import { ShoppingCart, Eye, Sparkles, Filter, ChevronRight, X } from 'lucide-react';
import { Language, ProductItem } from '../types';

interface ProductGalleryProps {
  currentLang: Language;
  activeDivision: 'galleteria' | 'navidad' | 'queques';
  setActiveDivision: (division: 'galleteria' | 'navidad' | 'queques') => void;
  onRequestQuote: (productName: string) => void;
  products: ProductItem[];
}

export default function ProductGallery({
  currentLang,
  activeDivision,
  setActiveDivision,
  onRequestQuote,
  products
}: ProductGalleryProps) {
  const isES = currentLang === 'ES';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Derive categories for filtering
  const categories = useMemo(() => {
    const list = products.filter((p) => p.division === activeDivision);
    const set = new Set(list.map((p) => p.category));
    return ['all', ...Array.from(set)];
  }, [activeDivision, products]);

  // Synchronize with URL hash query parameters (e.g., #productos?cat=sausages)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#productos')) {
        const parts = hash.split('?');
        if (parts.length > 1) {
          const queryParams = new URLSearchParams(parts[1]);
          const cat = queryParams.get('cat');
          if (cat) {
            const match = products.find((p) => p.category.toLowerCase() === cat.toLowerCase());
            if (match) {
              setActiveDivision(match.division);
              // Wait for activeDivision change to recalculate categories
              setActiveCategory(match.category);
            }
          }
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setActiveDivision]);

  // Handle active division toggle — reset subcategory filter on toggle
  const handleDivisionChange = (div: 'galleteria' | 'navidad' | 'queques') => {
    setActiveDivision(div);
    setActiveCategory('all');
  };

  // Filtered array
  const filteredProducts = useMemo(() => {
    const divisionList = products.filter((p) => p.division === activeDivision);
    if (activeCategory === 'all') return divisionList;
    return divisionList.filter((p) => p.category === activeCategory);
  }, [activeDivision, activeCategory, products]);

  return (
    <section id="productos" className="py-24 px-6 md:px-16 lg:px-24 bg-[#161310] relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header section with toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <span className="font-luxurious text-gold text-2xl md:text-4xl tracking-widest block">
              {isES ? 'Selección Gourmet' : 'Gourmet Selection'}
            </span>
            <h2 className="text-3xl md:text-4xl font-accent font-bold uppercase tracking-tight text-white">
              {isES ? 'SABORES QUE CONSTRUYEN HISTORIAS' : 'CRAFTED WITH ABSOLUTE PASSION'}
            </h2>
            <p className="text-white/60 text-sm max-w-lg leading-relaxed">
              {isES
                ? 'Consulte nuestro portafolio de especialidades. Cada producto ha sido elaborado con rigurosa inocuidad y la garantía certificada que merece.'
                : 'Explore our curated culinary collection. Each product is crafted with uncompromising hygiene and pristine certified quality.'}
            </p>
          </div>

          {/* Department selector pill toggler */}
          <div className="flex bg-neutral-900 border border-white/5 rounded-full p-1.5 self-start md:self-auto">
            <button
              onClick={() => handleDivisionChange('galleteria')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold font-manrope uppercase tracking-wider transition-all duration-300 ${
                activeDivision === 'galleteria'
                  ? 'bg-gold text-white shadow-lg shadow-gold/10'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              🍪 {isES ? 'Galletería & Repostería' : 'Cookies & Pastry'}
            </button>
            <button
              onClick={() => handleDivisionChange('navidad')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold font-manrope uppercase tracking-wider transition-all duration-300 ${
                activeDivision === 'navidad'
                  ? 'bg-gold text-white shadow-lg shadow-gold/10'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              🎄 {isES ? 'Navidad' : 'Christmas'}
            </button>
            <button
              onClick={() => handleDivisionChange('queques')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold font-manrope uppercase tracking-wider transition-all duration-300 ${
                activeDivision === 'queques'
                  ? 'bg-gold text-white shadow-lg shadow-gold/10'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              🧁 {isES ? 'Queques' : 'Cakes'}
            </button>
          </div>
        </div>

        {/* Sub-Category Filtering Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <Filter className="w-4 h-4 text-gold/80 flex-shrink-0" />
          <span className="text-xs uppercase font-bold font-manrope text-white/40 tracking-wider mr-2 flex-shrink-0">
            {isES ? 'Categoría:' : 'Filter:'}
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs font-semibold tracking-wider uppercase font-manrope rounded-sm whitespace-nowrap transition-all border ${
                activeCategory === cat
                  ? 'bg-white/10 text-gold border-gold/40'
                  : 'bg-transparent text-white/50 border-white/5 hover:text-white hover:border-white/20'
              }`}
            >
              {cat === 'all'
                ? isES ? 'Todos' : 'All'
                : cat === 'galletas'
                ? isES ? 'Galletas' : 'Cookies'
                : cat === 'reposteria'
                ? isES ? 'Repostería' : 'Pastries'
                : cat === 'wafer'
                ? isES ? 'Wafer' : 'Wafer'
                : cat === 'rellenas'
                ? isES ? 'Rellenas' : 'Filled Cookies'
                : cat === 'panetones'
                ? isES ? 'Panetones' : 'Panettone'
                : cat === 'roscas'
                ? isES ? 'Roscas' : 'Christmas Bread'
                : cat === 'queques'
                ? isES ? 'Queques' : 'Cakes'
                : cat}
            </button>
          ))}
        </div>

        {/* Animated products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="group bg-[#211713]/35 border border-white/5 hover:border-gold/30 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              {/* Image Frame */}
              <div className="relative aspect-video overflow-hidden bg-neutral-900">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Specs pill */}
                {p.spec && (
                  <div className="absolute top-3 left-3 bg-neutral-900/90 backdrop-blur-md border border-white/10 text-[10px] font-bold font-manrope text-white px-2.5 py-1 uppercase tracking-wider">
                    {p.spec}
                  </div>
                )}

                {/* View Details button overlay */}
                <button
                  onClick={() => setSelectedProduct(p)}
                  className="absolute bottom-3 right-3 p-2 bg-neutral-900/90 backdrop-blur-md border border-white/10 rounded-full hover:bg-gold hover:text-neutral-900 text-gold transition-colors shadow-lg pointer-events-auto"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Text */}
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold font-manrope tracking-widest text-gold uppercase">
                    <span>{p.category}</span>
                    <span className="text-[9px] text-white/30">ID: {p.id.toUpperCase()}</span>
                  </div>
                  <h3 className="text-xl font-accent font-bold text-white uppercase group-hover:text-gold transition-colors duration-200">
                    {p.name}
                  </h3>
                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed font-sans">
                    {p.description}
                  </p>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(p)}
                    className="flex-1 text-center py-2 bg-white/5 border border-white/15 hover:border-gold/40 hover:text-gold text-xs font-semibold tracking-wider uppercase font-manrope transition-colors"
                  >
                    {isES ? 'Info Técnica' : 'Technical Spec'}
                  </button>
                  <button
                    onClick={() => onRequestQuote(p.name)}
                    className="p-2 bg-gold/10 hover:bg-gold text-gold hover:text-neutral-900 transition-colors border border-gold/10"
                    title={isES ? 'Solicitar Cotización' : 'Request Quotation'}
                  >
                    <ShoppingCart className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* TECHNICAL DETAILS EXPANSION MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <div className="bg-[#1e1713] border border-white/10 max-w-lg w-full rounded-sm overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white p-1.5 bg-black/40 backdrop-blur-md rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-56 object-cover"
              referrerPolicy="no-referrer"
            />

            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold font-manrope text-gold uppercase tracking-widest">
                  {selectedProduct.category === 'galletas'
                    ? (isES ? 'Galletas' : 'Cookies')
                    : selectedProduct.category === 'reposteria'
                    ? (isES ? 'Repostería' : 'Pastries')
                    : selectedProduct.category === 'wafer'
                    ? (isES ? 'Wafer' : 'Wafer')
                    : selectedProduct.category === 'rellenas'
                    ? (isES ? 'Rellenas' : 'Filled Cookies')
                    : selectedProduct.category === 'panetones'
                    ? (isES ? 'Panetones' : 'Panettone')
                    : selectedProduct.category === 'roscas'
                    ? (isES ? 'Roscas' : 'Christmas Bread')
                    : selectedProduct.category === 'queques'
                    ? (isES ? 'Queques' : 'Cakes')
                    : selectedProduct.category} — {selectedProduct.division === 'galleteria' ? (isES ? 'Galletería & Repostería' : 'Cookies & Pastry') : (isES ? 'Navidad & Queques' : 'Christmas & Cakes')}
                </span>
                <h3 className="text-2xl md:text-3xl font-accent font-bold uppercase text-white leading-tight">
                  {selectedProduct.name}
                </h3>
              </div>

              <div className="space-y-3 pb-4 border-b border-white/5">
                <span className="text-xs uppercase font-bold text-white/30 tracking-widest block font-manrope">
                  {isES ? 'Descripción Culinaria' : 'Gastronomic Details'}
                </span>
                <p className="text-sm text-white/80 leading-relaxed font-sans">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Specs parameters table */}
              <div className="grid grid-cols-2 gap-4 text-xs font-manrope">
                <div className="bg-black/20 p-2.5 rounded-sm">
                  <span className="block text-white/40 uppercase text-[9px] tracking-wider mb-0.5">{isES ? 'Presentación:' : 'Format:'}</span>
                  <span className="text-white font-semibold">{selectedProduct.spec || 'Granel'}</span>
                </div>
                <div className="bg-black/20 p-2.5 rounded-sm">
                  <span className="block text-white/40 uppercase text-[9px] tracking-wider mb-0.5">{isES ? 'Certificación:' : 'Approval:'}</span>
                  <span className="text-gold font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-gold" /> SENASAG Bolivia
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  const name = selectedProduct.name;
                  setSelectedProduct(null);
                  onRequestQuote(name);
                }}
                className="w-full py-4 text-center bg-gold hover:bg-gold/90 text-neutral-900 font-bold uppercase text-xs tracking-widest font-manrope rounded-sm transition-colors shadow-lg"
              >
                {isES ? `Solicitar Cotización de ${selectedProduct.name}` : `Request Quote for ${selectedProduct.name}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
