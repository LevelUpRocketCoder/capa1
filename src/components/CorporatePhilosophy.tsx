import { useState } from 'react';
import { Language } from '../types';
import { PHILOSOPHY_DATA } from '../data';

interface CorporatePhilosophyProps {
  currentLang: Language;
}

export default function CorporatePhilosophy({ currentLang }: CorporatePhilosophyProps) {
  const [activeTab, setActiveTab] = useState('mision');
  const data = PHILOSOPHY_DATA[currentLang];

  const activeContent = activeTab === 'mision'
    ? data.mision
    : activeTab === 'vision'
    ? data.vision
    : null;

  const activeValores = activeTab === 'valores' ? data.valores : null;

  return (
    <section id="filosofia" className="py-24 px-6 md:px-16 lg:px-24 bg-[#0f0e0b] text-white relative">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <span className="font-luxurious text-gold text-3xl md:text-4xl block mb-2">
            {data.title}
          </span>
          <h2 className="font-accent text-3xl md:text-4xl font-bold uppercase tracking-tight">
            {data.subtitle}
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {data.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 text-xs font-bold font-manrope uppercase tracking-wider transition-all duration-300 rounded-sm border ${
                activeTab === tab.id
                  ? 'bg-gold text-white border-gold'
                  : 'bg-transparent text-white/50 border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeContent && (
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-accent text-2xl md:text-3xl font-bold uppercase text-gold mb-6">
              {activeContent.title}
            </h3>
            <p className="text-white/75 leading-relaxed text-base md:text-lg font-sans">
              {activeContent.content}
            </p>
          </div>
        )}

        {activeValores && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {activeValores.map((v, i) => (
              <div key={i} className="bg-white/5 border border-white/8 p-6 rounded-sm">
                <h4 className="font-accent text-lg font-bold uppercase text-gold mb-3">{v.title}</h4>
                <p className="text-white/65 text-sm leading-relaxed font-sans">{v.desc}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
