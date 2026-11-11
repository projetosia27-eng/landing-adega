import React from 'react';
import { AdegaConfig } from '../types';

interface CategoriesBarProps {
  config: AdegaConfig;
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoriesBar: React.FC<CategoriesBarProps> = ({
  config,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section id="categorias" className="py-8 bg-[#12060A] border-b border-[#2A0A12] relative z-30 reveal-on-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-4">
          <span className="font-oswald text-xs tracking-[0.25em] text-[#E8508C] uppercase block">
            Navegue por Categorias
          </span>
          <span className="font-poppins text-[11px] text-[#CDB9B9]/70 hidden sm:inline">
            Clique para filtrar os produtos abaixo
          </span>
        </div>

        {/* Scrollable Horizontal Pill Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x touch-pan-x">
          {config.categories.map((cat) => {
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const dest = document.getElementById('destaques');
                  if (dest) dest.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`snap-start flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-oswald uppercase tracking-wider whitespace-nowrap transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? 'bg-[#D62839] text-white border-[#D62839] shadow-lg shadow-[#D62839]/30 scale-105 font-bold'
                    : 'bg-white/[0.06] text-[#F7EFEA] border-white/[0.14] hover:bg-[#D62839]/80 hover:border-[#D62839] hover:text-white'
                }`}
              >
                <span className="text-base leading-none">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
