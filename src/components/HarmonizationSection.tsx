import React from 'react';
import { Quote, Utensils, Flame, Sparkles } from 'lucide-react';

export const HarmonizationSection: React.FC = () => {
  return (
    <section id="harmonizacao" className="py-24 bg-[#12060A] relative overflow-hidden reveal-on-scroll">
      {/* Soft crimson ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#7A1428]/30 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title with fine decorative line */}
        <div className="flex items-center gap-6 mb-12">
          <div>
            <span className="font-oswald text-xs tracking-[0.25em] text-[#E8508C] uppercase block mb-1">
              Guia do Sommelier
            </span>
            <h2 className="font-oswald text-3xl sm:text-5xl font-bold text-[#F7EFEA] uppercase">
              Recomendamos <span className="font-playfair italic text-[#E8508C] lowercase font-normal">para harmonizar</span>
            </h2>
          </div>
          {/* Fine decorative line beside title */}
          <div className="hidden sm:block flex-1 h-[1px] bg-gradient-to-r from-[#E8508C] via-[#5A1020] to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Sommelier tip / testimonial card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#1A070E] border border-[#2A0A12] p-8 rounded-3xl relative shadow-2xl">
              <Quote className="w-12 h-12 text-[#D62839]/20 absolute top-6 right-6" />
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D62839]/10 border border-[#D62839]/30 text-[#D62839] text-xs font-oswald uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Dica da Semana
              </div>

              <h3 className="font-playfair text-xl sm:text-2xl italic text-[#F7EFEA] leading-snug mb-4">
                "Um Barolo encorpado exige a textura e o sal de queijos curados e embutidos artesanais para revelar sua verdadeira elegância."
              </h3>

              <p className="font-poppins text-sm text-[#CDB9B9]/90 leading-relaxed mb-6">
                Para valorizar os taninos de vinhos tintos estruturados, monte uma tábua com Jamón Ibérico, Gorgonzola picante, nozes glaceadas e noz-moscada. O equilíbrio de gordura e acidez potencializa os aromas frutados no paladar.
              </p>

              {/* Avatar + Author info */}
              <div className="flex items-center gap-4 pt-6 border-t border-[#2A0A12]">
                <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-br from-[#D62839] via-[#E8508C] to-[#D9B36C] shrink-0">
                  <img
                    src="/src/assets/images/adega_sommelier_team_1794355896551.jpg"
                    alt="Sommelier da Adega"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-oswald text-base font-bold text-[#F7EFEA]">
                    Marcelo de Alencar
                  </h4>
                  <span className="font-poppins text-xs text-[#E8508C]">
                    Sommelier Chefe · WSET Level 3
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Harmonization Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#12060A] border border-[#2A0A12] p-4 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D62839]/10 flex items-center justify-center text-[#D62839] shrink-0">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-oswald text-xs uppercase text-[#F7EFEA] block">Tábuas Frias</span>
                  <span className="font-poppins text-[11px] text-[#CDB9B9]">Jamón & Parmesão</span>
                </div>
              </div>

              <div className="bg-[#12060A] border border-[#2A0A12] p-4 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D9B36C]/10 flex items-center justify-center text-[#D9B36C] shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-oswald text-xs uppercase text-[#F7EFEA] block">Carnes Nobres</span>
                  <span className="font-poppins text-[11px] text-[#CDB9B9]">Ancho & Cordeiro</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Charcuterie Board Photo */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#5A1020]/50 shadow-2xl group">
              <img
                src="/src/assets/images/charcuterie_board_wine_1794355896097.jpg"
                alt="Tábua de frios artesanal para harmonização com vinho"
                referrerPolicy="no-referrer"
                className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12060A] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="font-oswald text-xs tracking-widest text-[#D9B36C] uppercase block mb-1">
                    Experiência Gastronômica
                  </span>
                  <h4 className="font-oswald text-2xl font-bold text-[#F7EFEA]">
                    Tábua Gourmet & Taça de Vinho Selecionado
                  </h4>
                </div>
                <span className="hidden sm:inline-block font-playfair italic text-sm text-[#E8508C] bg-[#12060A]/80 px-4 py-2 rounded-full border border-[#5A1020]">
                  Peça o Kit Harmonizado
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
