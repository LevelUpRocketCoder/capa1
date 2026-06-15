import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  currentLang: Language;
  openContact: () => void;
}

export default function Hero({ currentLang, openContact }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;

  // Slide 1 clip math
  const prog1 = Math.min(1, Math.max(0, (scrollY - 0) / (vh * 1.2)));
  const rx1 = 5 + prog1 * 145;
  const ry1 = 8 + prog1 * 142;

  // Slide 2 clip math
  const prog2 = Math.min(1, Math.max(0, (scrollY - vh) / (vh * 1.2)));
  const rx2 = 5 + prog2 * 145;
  const ry2 = 8 + prog2 * 142;

  // Slide 3 clip math (NEW bakery image)
  const prog3 = Math.min(1, Math.max(0, (scrollY - vh * 2) / (vh * 1.2)));
  const rx3 = 5 + prog3 * 145;
  const ry3 = 8 + prog3 * 142;

  // Text per slide
  let activeTitle = currentLang === 'ES' ? 'EL SABOR DEL BUEN GUSTO' : 'THE TASTE OF GOOD FLAVOR';
  let activeSub = currentLang === 'ES' ? 'Las más ricas galletas de Bolivia' : 'The finest cookies in Bolivia';

  if (scrollY > vh * 2.2) {
    activeTitle = currentLang === 'ES' ? 'REPOSTERÍA ARTESANAL' : 'ARTISAN PASTRY';
    activeSub = currentLang === 'ES' ? 'La tradición del buen sabor boliviano' : 'The tradition of great Bolivian flavor';
  } else if (scrollY > vh * 1.5) {
    activeTitle = currentLang === 'ES' ? 'SABORES QUE ENAMORAN' : 'FLAVORS THAT CAPTIVATE';
    activeSub = currentLang === 'ES' ? 'Gustossito, para los más pequeños' : 'Gustossito, for the little ones';
  } else if (scrollY > vh * 0.6) {
    activeTitle = currentLang === 'ES' ? 'TRADICIÓN & CALIDAD' : 'TRADITION & QUALITY';
    activeSub = currentLang === 'ES' ? 'Galletas Cracker Premium' : 'Premium Cracker Cookies';
  }

  return (
    <div
      ref={heroRef}
      className="relative w-full text-white bg-black"
      style={{ height: '380vh' }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* SLIDE 0 – Galletería */}
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <img
            src="/images/hero/slide-galleteria.jpg"
            alt="Galletería Gustossi Bolivia"
            className="w-full h-full object-cover select-none object-center"
          />
          <div className="absolute inset-0 bg-neutral-900/40" />
        </div>

        {/* SLIDE 1 – Cracker */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            zIndex: 2,
            clipPath: `ellipse(${rx1}% ${ry1}% at 50% 50%)`,
            willChange: 'clip-path',
          }}
        >
          <img
            src="/images/hero/slide-cracker.jpg"
            alt="Crackers Gustossi Bolivia"
            className="w-full h-full object-cover select-none object-center"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* SLIDE 2 – Gustossito */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            zIndex: 3,
            clipPath: `ellipse(${rx2}% ${ry2}% at 50% 50%)`,
            willChange: 'clip-path',
          }}
        >
          <img
            src="/images/hero/slide-gustossito.jpg"
            alt="Gustossito Gustossi Bolivia"
            className="w-full h-full object-cover select-none object-center"
          />
          <div className="absolute inset-0 bg-neutral-950/50" />
        </div>

        {/* SLIDE 3 – Panadería & Repostería (NEW) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            zIndex: 4,
            clipPath: `ellipse(${rx3}% ${ry3}% at 50% 50%)`,
            willChange: 'clip-path',
          }}
        >
          <img
            src="/images/hero/hero-main.png"
            alt="Panadería y Repostería Gustossi Bolivia"
            className="w-full h-full object-cover select-none object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* FLOATING HERO TEXT */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-between pointer-events-none py-28 md:py-32">
          <div className="text-center px-4 mt-6">
            <span
              className="text-white text-3xl md:text-5xl lg:text-6xl font-luxurious tracking-wide block drop-shadow-lg opacity-90 transition-all duration-700 select-none"
              style={{ transform: `translateY(${Math.min(100, scrollY * 0.15)}px)` }}
            >
              {activeSub}
            </span>
          </div>

          <div className="text-center px-4 max-w-5xl my-auto">
            <h1
              className="text-[9vw] md:text-6xl lg:text-8xl font-accent leading-none font-bold uppercase tracking-tight text-white drop-shadow-2xl select-none transition-all duration-500 ease-out"
              style={{
                letterSpacing: '-0.03em',
                transform: `scale(${Math.max(0.92, 1 - scrollY * 0.0001)})`,
              }}
            >
              {activeTitle}
            </h1>
          </div>

          <div className="flex flex-col items-center gap-4 pointer-events-auto mt-auto">
            <button
              onClick={openContact}
              className="group flex items-center gap-3 bg-white text-neutral-900 rounded-full px-6 py-3.5 text-xs font-bold font-manrope tracking-wider uppercase hover:bg-gold hover:text-white transition-all duration-300 shadow-xl"
            >
              {currentLang === 'ES' ? 'Ver Catálogo de Productos' : 'View Product Catalogue'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex flex-col items-center text-white/50 text-[10px] tracking-widest uppercase font-manrope animate-bounce mt-4 select-none">
              <span className="mb-1">{currentLang === 'ES' ? 'Desliza para explorar' : 'Scroll to explore'}</span>
              <ChevronDown className="w-4 h-4 text-gold" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
