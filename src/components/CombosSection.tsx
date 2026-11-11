import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { AdegaConfig, ComboItem } from '../types';

interface CombosSectionProps {
  config: AdegaConfig;
}

export const CombosSection: React.FC<CombosSectionProps> = ({ config }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleImgError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      ref={sectionRef}
      id="combos"
      className="py-16 bg-[#1A070E] border-t border-b border-[#2A0A12] relative z-20 reveal-on-scroll"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-oswald text-xs tracking-[0.25em] text-[#E8508C] uppercase block mb-1">
              Combos Práticos & Economia
            </span>
            <h2 className="font-oswald text-3xl sm:text-4xl font-bold text-[#F7EFEA] uppercase">
              Combos & <span className="font-playfair italic text-[#E8508C] lowercase font-normal">ofertas</span>
            </h2>
            <p className="font-playfair italic text-base text-[#D9B36C] mt-1">
              Economize e monte sua noite
            </p>
          </div>
          <span className="font-poppins text-xs text-[#CDB9B9]/85">
            Kits montados para entrega imediata em Caieiras
          </span>
        </div>

        {/* 4 Cards (2x2 on desktop, 1 col mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.combos.map((combo: ComboItem) => {
            const message = encodeURIComponent(`Olá! Gostaria de pedir o combo "${combo.title}" por R$ ${combo.price} na ${config.name}.`);
            const whatsappUrl = `https://wa.me/${config.whatsapp}?text=${message}`;
            const hasError = imgErrors[combo.id];

            return (
              <div
                key={combo.id}
                className="bg-[#12060A] border border-white/[0.12] hover:border-[#D62839]/50 rounded-[20px] p-5 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  {/* Image container: aspect-ratio 1/1, object-fit cover */}
                  <div className="relative w-full aspect-square rounded-[16px] overflow-hidden bg-[#1A070E] mb-4 border border-white/5">
                    {isVisible && !hasError ? (
                      <img
                        src={`/images/${combo.image}.png`}
                        alt={combo.title}
                        width={500}
                        height={500}
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                        onError={() => handleImgError(combo.id)}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#5A1020] to-[#12060A] flex items-center justify-center text-4xl shadow-inner">
                        {combo.icon}
                      </div>
                    )}
                  </div>

                  <h3 className="font-oswald text-lg font-bold text-[#F7EFEA] uppercase mb-1">
                    {combo.title}
                  </h3>
                  <p className="font-poppins text-xs text-[#CDB9B9]/80 leading-relaxed mb-4 line-clamp-2">
                    {combo.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 mt-auto">
                  <div>
                    <span className="font-poppins text-[9px] text-[#CDB9B9] uppercase block">
                      A partir de
                    </span>
                    <span className="font-oswald text-xl font-bold text-[#D9B36C]">
                      R$ {combo.price}
                    </span>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#D62839] hover:bg-[#b81d2d] text-white font-oswald text-xs tracking-wider uppercase rounded-full shadow-md transition-all hover:scale-105 shrink-0"
                  >
                    <span>Pedir combo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
