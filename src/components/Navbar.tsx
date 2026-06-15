import { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Language, NavMenuItem } from '../types';
import { NAVIGATION_DATA } from '../data';

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  openContact: () => void;
  onOpenAdmin?: () => void;
}

export default function Navbar({ currentLang, setLang, openContact, onOpenAdmin }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const clickCountRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navData = NAVIGATION_DATA[currentLang];

  const menuItems: { key: string; label: string; links: { label: string; url: string }[] }[] = [
    {
      key: 'aboutUs',
      label: currentLang === 'ES' ? 'Nosotros' : 'About Us',
      links: navData.aboutUs,
    },
    {
      key: 'partnering',
      label: currentLang === 'ES' ? 'Socio Comercial' : 'Partnering',
      links: navData.partnering,
    },
    {
      key: 'products',
      label: currentLang === 'ES' ? 'Nuestros Productos' : 'Our Products',
      links: navData.products,
    },
    {
      key: 'connect',
      label: currentLang === 'ES' ? 'Conéctate' : "Let's Connect",
      links: navData.connect,
    },
  ];

  const handleMobileAccToggle = (key: string) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 md:px-12 transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-black/90 backdrop-blur-2xl shadow-xl py-3 border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        {/* Left: Small logo for Admin access */}
        <div className="hidden md:flex w-[100px] items-center">
          <button 
            onClick={() => onOpenAdmin && onOpenAdmin()} 
            className="opacity-10 hover:opacity-100 transition-opacity duration-300"
            title="Admin"
          >
            <img 
              src="https://www.industriasgustossi.com.bo/wp-content/uploads/2022/04/Logo-gus-6.png" 
              className="h-6 w-auto brightness-0 invert" 
              alt="Admin" 
            />
          </button>
        </div>

        {/* Center/Desktop menu with logo centered */}
        <div className="hidden md:flex items-center gap-8 lg:gap-11">
          {/* Menu left side */}
          {menuItems.slice(0, 2).map((item) => (
            <div key={item.key} className="relative group nav-item">
              <button className="flex items-center gap-1.5 text-sm font-semibold tracking-wide text-white/90 hover:text-gold transition-colors py-2">
                {item.label}
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white text-neutral-900 rounded-sm py-2 shadow-2xl opacity-0 invisible translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out">
                {item.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    onClick={link.url === '#contacto' ? (e) => { e.preventDefault(); openContact(); } : undefined}
                    className="block px-5 py-2.5 text-xs font-medium border-l-2 border-transparent hover:border-gold hover:bg-gold/5 hover:text-gold transition-all duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Centered Brand Logo */}
          <a
            href="#"
            className="flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300 mx-4"
            aria-label="Industrias Gustossi Logo"
          >
            <div className="h-14 w-auto flex items-center justify-center">
              <img 
                src="https://www.industriasgustossi.com.bo/wp-content/uploads/2022/04/Logo-gus-6.png" 
                alt="Gustossi Logo" 
                className="h-full w-auto object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </div>

          </a>

          {/* Menu right side */}
          {menuItems.slice(2).map((item) => (
            <div key={item.key} className="relative group nav-item">
              <button className="flex items-center gap-1.5 text-sm font-semibold tracking-wide text-white/90 hover:text-gold transition-colors py-2">
                {item.label}
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white text-neutral-900 rounded-sm py-2 shadow-2xl opacity-0 invisible translate-y-3 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out">
                {item.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    onClick={link.url === '#contacto' ? (e) => { e.preventDefault(); openContact(); } : undefined}
                    className="block px-5 py-2.5 text-xs font-medium border-l-2 border-transparent hover:border-gold hover:bg-gold/5 hover:text-gold transition-all duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Bilingual Language Selector */}
          <div className="flex items-center bg-white/10 rounded-full p-0.5 ml-2 border border-white/10">
            <button
              onClick={() => setLang('ES')}
              className={`px-3 py-1 rounded-full text-xs font-bold leading-none transition-all duration-200 ${
                currentLang === 'ES' ? 'bg-gold text-white shadow-md' : 'text-white/60 hover:text-white'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLang('EN')}
              className={`px-3 py-1 rounded-full text-xs font-bold leading-none transition-all duration-200 ${
                currentLang === 'EN' ? 'bg-gold text-white shadow-md' : 'text-white/60 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile View Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Small Language Selector in mobile */}
          <button
            onClick={() => setLang(currentLang === 'ES' ? 'EN' : 'ES')}
            className="text-xs font-bold bg-white/10 border border-white/10 hover:border-gold hover:text-gold transition-colors text-white px-2.5 py-1 rounded-md"
          >
            {currentLang === 'ES' ? 'EN' : 'ES'}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-white hover:text-gold transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            <Menu className="w-6.5 h-6.5" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-neutral-950/98 backdrop-blur-xl z-50 flex flex-col justify-between py-12 px-8 transition-transform duration-500 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="h-8 w-auto">
                <img 
                  src="https://www.industriasgustossi.com.bo/wp-content/uploads/2022/04/Logo-gus-6.png" 
                  alt="Gustossi Logo" 
                  className="h-full w-auto object-contain brightness-0 invert"
                  referrerPolicy="no-referrer"
                />
              </div>

            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-gold transition-colors"
              aria-label="Close Mobile Menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Navigation Accordion */}
          <div className="mt-8 space-y-4">
            {menuItems.map((item) => (
              <div key={item.key} className="border-b border-white/5 pb-3">
                <button
                  onClick={() => handleMobileAccToggle(item.key)}
                  className="w-full flex items-center justify-between text-lg font-medium text-white/90 hover:text-gold transition-colors py-2 text-left"
                >
                  {item.label}
                  <span className="text-gold font-mono text-xl leading-none">
                    {activeAccordion === item.key ? '–' : '+'}
                  </span>
                </button>
                <div
                  className={`pl-4 space-y-2 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
                    activeAccordion === item.key ? 'max-h-56 opacity-100 py-1' : 'max-h-0 opacity-0'
                  }`}
                >
                  {item.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        if (link.url === '#contacto') {
                          e.preventDefault();
                          openContact();
                        }
                      }}
                      className="block text-sm text-white/60 hover:text-gold py-1 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-white/40 space-y-4">
          <p>www.industriasgustossi.com.bo</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => { setMobileMenuOpen(false); setLang('ES'); }}
              className={`px-3 py-1 rounded text-xs ${currentLang === 'ES' ? 'bg-gold text-white font-bold' : 'text-white/60'}`}
            >
              Español
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); setLang('EN'); }}
              className={`px-3 py-1 rounded text-xs ${currentLang === 'EN' ? 'bg-gold text-white font-bold' : 'text-white/60'}`}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
