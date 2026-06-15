import { ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface DepartmentsProps {
  currentLang: Language;
  onSelectDivision: (div: 'galleteria' | 'navidad') => void;
}

const CATEGORIES = [
  {
    id: 'galleteria',
    nameES: 'Galletería',
    nameEN: 'Cookies',
    descES: 'Las más ricas galletas de Bolivia',
    descEN: 'The finest cookies in Bolivia',
    image: '/images/categorias/galleteria.jpg',
    url: 'https://www.industriasgustossi.com.bo/galleteria/',
  },
  {
    id: 'reposteria',
    nameES: 'Repostería',
    nameEN: 'Pastries',
    descES: 'Repostería artesanal de calidad superior',
    descEN: 'Premium artisan pastries',
    image: '/images/categorias/reposteria.jpg',
    url: 'https://www.industriasgustossi.com.bo/reposteria/',
  },
  {
    id: 'navideno',
    nameES: 'Navideño',
    nameEN: 'Christmas',
    descES: 'Variedad en productos navideños: Panetón, etc.',
    descEN: 'Christmas treats: Panettone and more',
    image: '/images/categorias/navideno.jpg',
    url: 'https://www.industriasgustossi.com.bo/navidad/',
  },
  {
    id: 'wafer',
    nameES: 'Wafer',
    nameEN: 'Wafer',
    descES: 'Deliciosas galletas obleas de varios sabores',
    descEN: 'Delicious wafer cookies in many flavors',
    image: '/images/categorias/wafer.jpg',
    url: 'https://www.industriasgustossi.com.bo/wafer/',
  },
  {
    id: 'rellenas',
    nameES: 'Rellena',
    nameEN: 'Filled',
    descES: 'Galletas rellenas en múltiples sabores',
    descEN: 'Filled cookies in multiple flavors',
    image: '/images/categorias/rellenas.jpg',
    url: 'https://www.industriasgustossi.com.bo/rellena/',
  },
  {
    id: 'queques',
    nameES: 'Queque',
    nameEN: 'Cake',
    descES: 'Tiernos queques bolivianos',
    descEN: 'Tender Bolivian cakes',
    image: '/images/categorias/queques.jpg',
    url: 'https://www.industriasgustossi.com.bo/queque/',
  },
];

export default function Departments({ currentLang }: DepartmentsProps) {
  const isES = currentLang === 'ES';

  return (
    <section id="divisiones" className="py-24 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-luxurious text-gold text-3xl md:text-4xl block mb-2">
            {isES ? 'Nuestra Línea' : 'Our Line'}
          </span>
          <h2 className="font-accent text-3xl md:text-4xl font-bold uppercase tracking-tight text-neutral-900">
            {isES ? 'NUESTROS PRODUCTOS' : 'OUR PRODUCTS'}
          </h2>
          <p className="text-neutral-500 text-sm max-w-lg mx-auto mt-3 leading-relaxed">
            {isES
              ? 'Especialistas en panadería, galletería y repostería artesanal. El sabor del buen gusto boliviano.'
              : 'Specialists in artisan bakery, cookies and pastries. The taste of Bolivian quality.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={cat.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-sm aspect-[4/3] block"
            >
              <img
                src={cat.image}
                alt={isES ? cat.nameES : cat.nameEN}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <span className="font-accent text-lg md:text-xl font-bold text-white uppercase block leading-tight">
                  {isES ? cat.nameES : cat.nameEN}
                </span>
                <span className="text-[10px] md:text-xs text-gold font-bold uppercase tracking-widest font-manrope border-b border-gold leading-none">
                  {isES ? 'Ver Productos' : 'View Products'}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
