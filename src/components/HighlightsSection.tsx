import React, { useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { AdegaConfig, DeliveryProduct } from '../types';

interface HighlightsSectionProps {
  config: AdegaConfig;
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const HighlightsSection: React.FC<HighlightsSectionProps> = ({
  config,
  selectedCategory,
  onSelectCategory,
}) => {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImgError = (id: string | number) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  const filteredProducts = selectedCategory === 'todos'
    ? config.produtos
    : config.produtos.filter((p) => p.categoria === selectedCategory);

  const fullMenuMessage = encodeURIComponent(`Olá! Vim pelo site da ${config.name} e gostaria de ver o cardápio completo de delivery.`);
  const fullMenuWhatsappUrl = `https://wa.me/${config.whatsapp}?text=${fullMenuMessage}`;

  return (
    <section id="destaques" className="py-20 bg-[#12060A] relative z-25 reveal-on-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="font-oswald text-xs tracking-[0.25em] text-[#E8508C] uppercase block mb-1">
              Catálogo de Delivery
            </span>
            <h2 className="font-oswald text-3xl sm:text-5xl font-bold text-[#F7EFEA] uppercase">
              Nossos <span className="font-playfair italic text-[#E8508C] lowercase font-normal">destaques</span>
            </h2>
            <p className="font-playfair italic text-lg text-[#D9B36C] mt-1">
              Os mais pedidos em {config.location}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
            {config.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-oswald uppercase tracking-wider transition-all border shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#D62839] text-white border-[#D62839] shadow-lg shadow-[#D62839]/30 font-bold'
                    : 'bg-white/[0.04] text-[#CDB9B9] border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="mr-1.5">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid: 4 cols desktop, 2 tablet, 1/2 mobile. 7 products + 1 final card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((prod: DeliveryProduct, index: number) => {
            const itemMessage = encodeURIComponent(`Olá! Gostaria de pedir o produto "${prod.nome}" por R$ ${prod.preco} na ${config.name}.`);
            const itemWhatsappUrl = `https://wa.me/${config.whatsapp}?text=${itemMessage}`;
            const hasError = imgErrors[prod.id];
            const isBeer = prod.categoria === 'cervejas';
            const isPriority = index < 4;

            return (
              <div
                key={prod.id}
                className="group relative bg-[#1A070E] border border-white/[0.12] hover:border-[#D62839]/60 rounded-[20px] p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(214,40,57,0.3)]"
              >
                <div>
                  {/* Image container: aspect-ratio 3/4, 16px corners */}
                  <div className="relative w-full aspect-[3/4] rounded-[16px] overflow-hidden bg-[#12060A] mb-4 border border-white/5">
                    {/* Badge / Selo pill in top-left */}
                    {prod.badge && (
                      <span className="absolute top-3 left-3 z-10 bg-[#D9B36C] text-[#12060A] text-[10px] font-oswald uppercase tracking-wider px-2.5 py-1 rounded-full font-bold shadow-md">
                        {prod.badge}
                      </span>
                    )}

                    {!hasError ? (
                      <img
                        src={`/images/${prod.image}.png`}
                        alt={prod.nome}
                        width={400}
                        height={533}
                        loading={isPriority ? "eager" : "lazy"}
                        decoding="async"
                        fetchPriority={isPriority ? "high" : "low"}
                        onError={() => handleImgError(prod.id)}
                        className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                          isBeer ? 'object-contain bg-[#12060A] p-2' : 'object-cover'
                        }`}
                      />
                    ) : (
                      /* Fallback block with emoji in wine gradient */
                      <div className="w-full h-full bg-gradient-to-br from-[#5A1020] to-[#12060A] flex items-center justify-center text-4xl shadow-inner">
                        {prod.icon}
                      </div>
                    )}
                  </div>

                  {/* Short name in 1 line */}
                  <h3 className="font-oswald text-base font-bold text-[#F7EFEA] group-hover:text-[#E8508C] transition-colors truncate uppercase mb-1" title={prod.nome}>
                    {prod.nome}
                  </h3>
                </div>

                {/* Bottom Row: Gold Price & Red Pill Button "Pedir" */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 mt-auto">
                  <div className="flex flex-col">
                    <span className="font-poppins text-[9px] text-[#CDB9B9] uppercase">Preço</span>
                    <span className="font-oswald text-xl font-bold text-[#D9B36C] tracking-wide">
                      R$ {prod.preco}
                    </span>
                  </div>

                  <a
                    href={itemWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#D62839] hover:bg-[#b81d2d] text-white font-oswald text-xs tracking-wider uppercase rounded-full shadow-md transition-all hover:scale-105 shrink-0"
                    title={`Pedir ${prod.nome}`}
                  >
                    <span>Pedir</span>
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </a>
                </div>

              </div>
            );
          })}

          {/* 8th Card: "Veja o cardápio completo no WhatsApp" (Visible when 'todos' or matching grid) */}
          {selectedCategory === 'todos' && (
            <div className="group relative bg-gradient-to-br from-[#2A0A12] via-[#5A1020] to-[#12060A] border border-[#E8508C]/40 hover:border-[#D62839] rounded-[20px] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(214,40,57,0.4)]">
              <div className="text-center my-auto py-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D62839]/20 border border-[#D62839]/60 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  📋
                </div>
                <h3 className="font-oswald text-xl font-bold text-[#F7EFEA] uppercase mb-2">
                  Cardápio Completo
                </h3>
                <p className="font-poppins text-xs text-[#CDB9B9] mb-6">
                  Mais de 100 rótulos e destilados exclusivos disponíveis em nosso atendimento direto.
                </p>
              </div>

              <a
                href={fullMenuWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#D62839] hover:bg-[#b81d2d] text-white font-oswald text-xs tracking-wider uppercase rounded-full shadow-lg transition-all text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                Ver no WhatsApp
              </a>
            </div>
          )}
        </div>

        {/* Final CTA Button */}
        <div className="text-center">
          <a
            href={fullMenuWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D62839] to-[#7A1428] hover:from-[#b81d2d] hover:to-[#5A1020] text-white font-oswald text-base tracking-widest uppercase rounded-full shadow-2xl hover:shadow-[#D62839]/40 transition-all hover:scale-105 border border-[#E8508C]/40"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            Ver Cardápio Completo no WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
