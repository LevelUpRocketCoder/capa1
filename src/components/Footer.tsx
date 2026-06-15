import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  currentLang: Language;
  openContact: () => void;
}

export default function Footer({ currentLang, openContact }: FooterProps) {
  const isES = currentLang === 'ES';

  return (
    <footer id="oficinas" className="bg-white text-neutral-900 w-full pt-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-black to-gold" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-11 border-b border-neutral-200">

        {/* Brand */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-auto">
              <img 
                src="https://www.industriasgustossi.com.bo/wp-content/uploads/2022/04/Logo-gus-6.png" 
                alt="Gustossi Logo" 
                className="h-full w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

          </div>

          <p className="text-xs text-neutral-500 leading-relaxed font-sans">
            {isES
              ? 'Líderes en galletería, repostería y panadería artesanal para los hogares y el canal retail de Bolivia. El sabor del buen gusto desde 2013.'
              : 'Leaders in artisan cookies, pastries and bakery for Bolivian homes and the retail channel. The taste of good flavor since 2013.'}
          </p>

          <div className="flex items-center justify-between gap-3 bg-neutral-50 border border-neutral-150 p-4 rounded-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-9 h-9 text-gold flex-shrink-0" />
              <div className="text-[10px] font-manrope">
                <span className="block font-bold text-neutral-900 uppercase">CALIDAD ALIMENTARIA CERTIFICADA</span>
                <span className="block text-neutral-500">Productos elaborados bajo estrictos controles de calidad — Bolivia</span>
              </div>
            </div>
            <img 
              src="https://www.industriasgustossi.com.bo/wp-content/uploads/2022/04/Logo-gus-6.png" 
              alt="Gustossi Logo" 
              className="h-6 w-auto object-contain opacity-40 grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Links */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-8 text-xs font-manrope">
          <div className="space-y-4">
            <h4 className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest leading-none">
              {isES ? 'NAVEGACIÓN' : 'NAVIGATE'}
            </h4>
            <ul className="space-y-3 font-semibold text-neutral-800">
              <li><a href="#about" className="hover:text-gold transition-colors">{isES ? 'Quiénes Somos' : 'About Us'}</a></li>
              <li><a href="#divisiones" className="hover:text-gold transition-colors">{isES ? 'Nuestros Productos' : 'Our Products'}</a></li>
              <li><a href="#productos" className="hover:text-gold transition-colors">{isES ? 'Productos Destacados' : 'Featured Products'}</a></li>
              <li><button onClick={openContact} className="hover:text-gold transition-colors text-left">{isES ? 'Contacto' : 'Contact'}</button></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest leading-none">
              {isES ? 'PRODUCTOS' : 'PRODUCTS'}
            </h4>
            <ul className="space-y-3 font-semibold text-neutral-800">
              <li><a href="https://www.industriasgustossi.com.bo/galleteria/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">{isES ? 'Galletería' : 'Cookies'}</a></li>
              <li><a href="https://www.industriasgustossi.com.bo/reposteria/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">{isES ? 'Repostería' : 'Pastries'}</a></li>
              <li><a href="https://www.industriasgustossi.com.bo/navidad/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">{isES ? 'Navideños' : 'Christmas'}</a></li>
              <li><a href="https://www.industriasgustossi.com.bo/wafer/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Wafer & Rellena</a></li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="lg:col-span-4 space-y-4 text-xs">
          <h4 className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest leading-none font-manrope">
            {isES ? 'CONTACTO' : 'CONTACT'}
          </h4>
          <div className="space-y-3 font-semibold font-manrope text-neutral-800">
            <a href="tel:+59144268010" className="flex items-center gap-3 hover:text-gold transition-colors py-1">
              <Phone className="w-4 h-4 text-gold flex-shrink-0" />
              +591 4426-8010
            </a>
            <a href="https://wa.me/59144268010" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gold transition-colors py-1">
              <Mail className="w-4 h-4 text-gold flex-shrink-0" />
              WhatsApp Directo
            </a>
            {/* Location removed per request */}
            <a href="https://www.industriasgustossi.com.bo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gold transition-colors py-1 text-[10px] text-neutral-500 font-normal">
              www.industriasgustossi.com.bo
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-neutral-400 font-manrope">
          © 2024 Industrias Alimenticias Gustossi S.R.L. — {isES ? 'Todos los derechos reservados.' : 'All rights reserved.'}
        </p>
        <div className="flex items-center gap-6 text-[10px] font-manrope font-bold uppercase tracking-wider text-neutral-400">
          <a href="https://www.facebook.com/GustossiBolivia" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Facebook</a>
          <a href="https://www.industriasgustossi.com.bo" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">{isES ? 'Sitio Oficial' : 'Official Site'}</a>
        </div>
      </div>
    </footer>
  );
}
