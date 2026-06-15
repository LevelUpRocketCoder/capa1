import { useState, useEffect, FormEvent } from 'react';
import { X, Sparkles, Send } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface ContactModalProps {
  currentLang: Language;
  isOpen: boolean;
  onClose: () => void;
  prefilledProduct?: string;
}

export default function ContactModal({ currentLang, isOpen, onClose, prefilledProduct }: ContactModalProps) {
  const t = TRANSLATIONS[currentLang];
  const isES = currentLang === 'ES';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  // Sync prefilled product with message form
  useEffect(() => {
    if (prefilledProduct) {
      setFormData((prev) => ({
        ...prev,
        message: isES 
          ? `Buen día, me gustaría recibir precios, disponibilidad de stock y especificaciones técnicas para el producto gourmet: ${prefilledProduct}.`
          : `Hello, I would like to request commercial quotes, stock availability and packaging details for: ${prefilledProduct}.`
      }));
    } else {
      setFormData((prev) => ({ ...prev, message: '' }));
    }
  }, [prefilledProduct, isES]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate real API submission
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Auto close after some seconds
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 3500);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#1a1411] border border-white/10 max-w-lg w-full rounded-sm overflow-hidden shadow-2xl relative">
        
        {/* Border decorative gold line */}
        <div className="h-1 bg-gradient-to-r from-gold via-white to-gold" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white p-1.5 transition-colors"
          aria-label="Cerrar formulario"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10 space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold tracking-widest text-gold font-manrope block">
              {isES ? 'Contacto Directo' : 'Direct Inquiry'}
            </span>
            <h3 className="text-2xl md:text-3xl font-accent font-bold uppercase text-white">
              {t.quotationTitle}
            </h3>
            <p className="text-xs text-white/60 leading-relaxed font-sans">
              {t.quotationSubtitle}
            </p>
          </div>

          {success ? (
            <div className="bg-gold/10 border border-gold/45 p-6 text-center space-y-3 rounded-sm">
              <Sparkles className="w-8 h-8 text-gold mx-auto animate-bounce" />
              <p className="text-sm text-white font-bold font-manrope uppercase">
                {t.successMsg}
              </p>
              <p className="text-xs text-white/50">
                {isES ? 'Le responderemos a su correo o WhatsApp comercial en menos de 15 minutos.' : 'We will reply to your inbox or business WhatsApp within 15 minutes.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-manrope">
              <div className="space-y-1">
                <label className="block text-[10px] text-white/50 uppercase tracking-wider">{t.nameField}</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={isES ? 'Ej. Hotel Cochabamba' : 'e.g. Grand Plaza Hotel'}
                  className="w-full bg-black/30 border border-white/10 focus:border-gold p-3 rounded-sm text-white outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] text-white/50 uppercase tracking-wider">{t.emailField}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="ejemplo@empresa.com"
                    className="w-full bg-black/30 border border-white/10 focus:border-gold p-3 rounded-sm text-white outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] text-white/50 uppercase tracking-wider">{t.phoneField}</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+591 7000-0000"
                    className="w-full bg-black/30 border border-white/10 focus:border-gold p-3 rounded-sm text-white outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] text-white/50 uppercase tracking-wider">{t.messageField}</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-black/30 border border-white/10 focus:border-gold p-3 rounded-sm text-white outline-none resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 text-center bg-gold hover:bg-gold/90 text-neutral-900 font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {sending ? (
                  <span>{isES ? 'ENVIANDO...' : 'SENDING...'}</span>
                ) : (
                  <>
                    <span>{t.submitBtn}</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="text-[10px] text-center text-white/30 border-t border-white/5 pt-4">
            {isES ? 'Industrias Gustossi S.R.L. se compromete a proteger su privacidad comercial.' : 'Industrias Gustossi S.R.L. values your wholesale data privacy.'}
          </div>
        </div>
      </div>
    </div>
  );
}
