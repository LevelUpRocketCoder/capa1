import { Flame, ArrowRight, ChefHat } from 'lucide-react';
import { Language } from '../types';

interface RecipesProps {
  currentLang: Language;
}

export default function Recipes({ currentLang }: RecipesProps) {
  const isES = currentLang === 'ES';

  return (
    <section id="recetas" className="pt-8 pb-24 px-6 md:px-16 lg:px-24 bg-[#161310] relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#2a2a2e] p-6 sm:p-8 md:p-12 lg:p-16 rounded-[2rem] relative shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="text-center text-white font-accent tracking-[0.25em] text-sm font-semibold uppercase mb-10 opacity-90 relative z-10">
            {isES ? 'Receta Destacada' : 'Featured Recipe'}
          </div>

          {/* Card */}
          <div className="bg-white rounded-[24px] flex flex-col lg:flex-row relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.2)] min-h-[520px] group">
            
            {/* Blobs */}
            <div className="absolute -right-[20%] lg:-right-[10%] top-[40%] lg:-top-[20%] w-[700px] lg:w-[900px] h-[700px] lg:h-[900px] bg-gray-100 rounded-full z-0 transition-transform duration-700 ease-out group-hover:scale-105"></div>
            <div className="absolute -right-[30%] lg:-right-[25%] -bottom-[10%] lg:-bottom-[30%] w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] bg-[#3e3e42] rounded-full z-0 transition-transform duration-700 ease-out group-hover:scale-102"></div>

            {/* Left Content */}
            <div className="flex-[1.1] p-8 sm:p-12 lg:p-16 relative z-10 flex flex-col justify-center">
              <div className="text-[#c8440a] font-bold tracking-[0.15em] text-sm mb-4 flex items-center gap-2 uppercase">
                <Flame className="w-4 h-4" />
                {isES ? 'Nueva Receta' : 'New Recipe'}
              </div>
              
              <h3 className="font-accent font-extrabold text-4xl md:text-5xl lg:text-6xl text-neutral-900 leading-none mb-4 uppercase tracking-tight">
                Tiramisú<br/>
                <span className="block font-light text-neutral-500 text-2xl md:text-3xl lg:text-4xl mt-2 lowercase tracking-normal">
                  {isES ? 'con galletas cracker' : 'with cracker cookies'}
                </span>
              </h3>
              
              <p className="text-neutral-600 leading-relaxed text-lg max-w-md mb-10 font-sans">
                {isES 
                  ? 'Sorprende a tu familia preparando este delicioso postre utilizando nuestros productos tradicionales. Es rápido, fácil y tiene todo el sabor del buen gusto boliviano.' 
                  : 'Surprise your family by preparing this delicious dessert using our traditional products. It is quick, easy, and has all the flavor of Bolivian good taste.'}
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="text-5xl font-bold text-neutral-900 leading-none font-accent">12</div>
                  <div className="text-sm text-neutral-500 uppercase font-semibold leading-tight font-sans">
                    Nov<br/>2020
                  </div>
                </div>
                
                <a href="#" className="inline-flex items-center gap-2 text-neutral-900 font-semibold text-sm px-6 py-3 rounded-full bg-white border border-gray-200 transition-all duration-300 hover:bg-gold hover:text-white hover:border-gold hover:-translate-y-1 shadow-sm hover:shadow-[0_8px_15px_rgba(200,160,10,0.2)]">
                  {isES ? 'Ver receta completa' : 'View full recipe'}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-[0.9] relative z-10 flex items-center justify-center p-12 lg:p-0 min-h-[400px]">
              
              {/* Main Image */}
              <div className="w-[280px] h-[280px] lg:w-[380px] lg:h-[380px] rounded-full overflow-hidden border-[12px] border-white shadow-[0_15px_35px_rgba(0,0,0,0.15)] relative z-20">
                <img 
                  src="./images/recetas/tiramisu.jpg" 
                  alt="Tiramisú" 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              
              {/* Badge */}
              <div className="absolute top-8 left-4 lg:top-[10%] lg:left-[5%] w-[100px] h-[100px] lg:w-[140px] lg:h-[140px] rounded-full overflow-hidden border-8 border-white shadow-[0_10px_25px_rgba(0,0,0,0.12)] z-30 bg-white flex items-center justify-center">
                <img 
                  src="./images/hero/slide-cracker.jpg" 
                  alt="Producto Gustossi" 
                  className="w-[80%] h-[80%] object-contain"
                />
              </div>
              
              {/* Author Tag */}
              <div className="absolute top-12 right-4 lg:top-[15%] lg:right-[15%] bg-white px-4 py-2 rounded-full text-xs font-bold text-neutral-900 shadow-[0_5px_15px_rgba(0,0,0,0.1)] z-40 flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-[#c8440a]" />
                Chef Gustossi
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
