import React, { useState, useEffect } from 'react';
import { Wine, MessageCircle, Settings } from 'lucide-react';
import { AdegaConfig } from '../types';

interface HeaderProps {
  config: AdegaConfig;
  onOpenConfig: () => void;
}

export const Header: React.FC<HeaderProps> = ({ config, onOpenConfig }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappMessage = encodeURIComponent(`Olá! Vim pelo site da ${config.name} e gostaria de consultar o cardápio completo de delivery.`);
  const whatsappUrl = `https://wa.me/${config.whatsapp}?text=${whatsappMessage}`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#12060A]/95 border-b border-[#2A0A12] py-3 shadow-2xl' 
        : 'bg-gradient-to-b from-[#12060A]/95 via-[#12060A]/50 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        
        {/* Brand logo & title */}
        <a href="#hero" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D62839] to-[#7A1428] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 border border-[#E8508C]/30">
            <Wine className="w-5 h-5 text-[#F7EFEA]" />
          </div>
          <div className="flex flex-col">
            <span className="font-oswald text-xl sm:text-2xl font-bold tracking-wider text-[#F7EFEA] group-hover:text-[#E8508C] transition-colors uppercase leading-none drop-shadow-md">
              {config.name}
            </span>
            <span className="font-playfair text-xs italic text-[#E8508C] tracking-widest opacity-90 mt-0.5">
              {config.subtitle} · {config.location}
            </span>
          </div>
        </a>

        {/* Navigation Links updated to: Início, Categorias, Destaques, Combos, Contato */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <a 
            href="#hero" 
            className="text-[#CDB9B9] hover:text-[#F7EFEA] transition-colors whitespace-nowrap shrink-0 uppercase tracking-widest font-oswald text-xs hover:border-b-2 hover:border-[#D62839] pb-1"
          >
            Início
          </a>
          <a 
            href="#categorias" 
            className="text-[#CDB9B9] hover:text-[#F7EFEA] transition-colors whitespace-nowrap shrink-0 uppercase tracking-widest font-oswald text-xs hover:border-b-2 hover:border-[#D62839] pb-1"
          >
            Categorias
          </a>
          <a 
            href="#destaques" 
            className="text-[#CDB9B9] hover:text-[#F7EFEA] transition-colors whitespace-nowrap shrink-0 uppercase tracking-widest font-oswald text-xs hover:border-b-2 hover:border-[#D62839] pb-1"
          >
            Destaques
          </a>
          <a 
            href="#combos" 
            className="text-[#CDB9B9] hover:text-[#F7EFEA] transition-colors whitespace-nowrap shrink-0 uppercase tracking-widest font-oswald text-xs hover:border-b-2 hover:border-[#D62839] pb-1"
          >
            Combos
          </a>
          <a 
            href="#contato" 
            className="text-[#CDB9B9] hover:text-[#F7EFEA] transition-colors whitespace-nowrap shrink-0 uppercase tracking-widest font-oswald text-xs hover:border-b-2 hover:border-[#D62839] pb-1"
          >
            Contato
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenConfig}
            title="Personalizar dados da Adega"
            className="w-10 h-10 rounded-full bg-[#1A070E] hover:bg-[#2A0A12] border border-[#5A1020] text-[#CDB9B9] hover:text-[#F7EFEA] flex items-center justify-center transition-all hover:scale-105"
          >
            <Settings className="w-4 h-4" />
          </button>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Falar no WhatsApp"
            className="w-11 h-11 rounded-full bg-[#D62839] hover:bg-[#b81d2d] text-white flex items-center justify-center shadow-lg hover:shadow-[#D62839]/40 transition-all transform hover:scale-110 border border-[#E8508C]/40 group"
          >
            <MessageCircle className="w-5 h-5 fill-current transition-transform group-hover:rotate-12" />
          </a>
        </div>
      </div>
    </header>
  );
};
