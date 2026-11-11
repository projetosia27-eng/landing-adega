import React, { useState } from 'react';
import { Wine, ChevronLeft, ChevronRight, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import { AdegaConfig } from '../types';

interface AboutSectionProps {
  config: AdegaConfig;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ config }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "Nossa adega",
      desc: `Instalações climatizadas no centro de Caieiras para manter a qualidade, acidez e taninos de cada rótulo no ponto ideal de degustação.`,
      image: "/src/assets/images/adega_ambience_1_1794355895284.jpg"
    },
    {
      title: "Nossa equipe",
      desc: "Sommeliers experientes e apaixonados, prontos para ajudar na escolha da garrafa perfeita para jantares, churrascos ou presentes.",
      image: "/src/assets/images/adega_sommelier_team_1794355896551.jpg"
    },
    {
      title: "Degustações",
      desc: "Encontros intimistas para apreciadores em Caieiras descobrirem novos produtores artesanais e vinhos internacionais premiados.",
      image: "/src/assets/images/adega_tasting_event_1794355895946.jpg"
    }
  ];

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="sobre" className="py-24 bg-wine-section relative overflow-hidden reveal-on-scroll">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#5A1020]/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#2A0A12] border border-[#5A1020] text-[#D62839] mb-4 shadow-md">
            <Wine className="w-6 h-6" />
          </div>

          <h2 className="font-oswald text-3xl sm:text-5xl font-bold tracking-wider text-[#F7EFEA] uppercase">
            Amamos o que servimos
          </h2>
          
          <div className="flex items-center justify-center gap-3 my-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#E8508C]" />
            <span className="font-playfair italic text-xl sm:text-2xl text-[#E8508C]">
              Nossa história
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#E8508C]" />
          </div>

          <p className="font-poppins text-base text-[#CDB9B9]/90 leading-relaxed mt-6">
            Localizada em <strong className="text-[#F7EFEA] font-semibold">{config.location}</strong>, a <strong className="text-[#F7EFEA] font-semibold">{config.name}</strong> nasceu da paixão por proporcionar momentos inesquecíveis através do vinho. Nossa missão é trazer curadoria de sommelier diretamente para o seu dia a dia.
          </p>

          <div className="mt-8 flex flex-col items-center">
            <span className="font-playfair italic text-2xl text-[#D9B36C]">
              {config.name}
            </span>
            <span className="font-oswald text-xs tracking-[0.2em] text-[#CDB9B9]/70 uppercase mt-1">
              Curadoria de Sommeliers
            </span>
          </div>
        </div>

        {/* Features icons row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#12060A]/60 border border-[#2A0A12] p-6 rounded-2xl flex items-start gap-4">
            <div className="p-3 bg-[#D62839]/10 border border-[#D62839]/30 rounded-xl text-[#D62839] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-oswald text-lg text-[#F7EFEA] mb-1">Procedência Garantida</h3>
              <p className="font-poppins text-xs text-[#CDB9B9]/80 leading-relaxed">
                Importações diretas e vinícolas renomadas com garantia de autenticidade.
              </p>
            </div>
          </div>

          <div className="bg-[#12060A]/60 border border-[#2A0A12] p-6 rounded-2xl flex items-start gap-4">
            <div className="p-3 bg-[#E8508C]/10 border border-[#E8508C]/30 rounded-xl text-[#E8508C] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-oswald text-lg text-[#F7EFEA] mb-1">Guarda Climatizada</h3>
              <p className="font-poppins text-xs text-[#CDB9B9]/80 leading-relaxed">
                Armazenamento com temperatura e umidade rigorosamente monitoradas.
              </p>
            </div>
          </div>

          <div className="bg-[#12060A]/60 border border-[#2A0A12] p-6 rounded-2xl flex items-start gap-4">
            <div className="p-3 bg-[#D9B36C]/10 border border-[#D9B36C]/30 rounded-xl text-[#D9B36C] shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-oswald text-lg text-[#F7EFEA] mb-1">Atendimento Sommelier</h3>
              <p className="font-poppins text-xs text-[#CDB9B9]/80 leading-relaxed">
                Orientação personalizada para sugerir o vinho perfeito para cada prato.
              </p>
            </div>
          </div>
        </div>

        {/* Carousel of 3 drop-shape photos with captions & circular red arrows */}
        <div className="relative mt-12 bg-[#12060A]/80 border border-[#2A0A12] rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Image side - Drop Shape frame */}
            <div className="lg:col-span-7 relative group">
              <div className="relative aspect-[4/3] w-full overflow-hidden shadow-2xl transition-all duration-500 border-2 border-[#5A1020]/40 rounded-[2rem]">
                <img
                  src={slides[activeSlide].image}
                  alt={slides[activeSlide].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12060A] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="font-oswald text-xs tracking-widest text-[#E8508C] uppercase block mb-1">
                    Conheça a {config.name}
                  </span>
                  <h4 className="font-oswald text-2xl font-bold text-[#F7EFEA]">
                    {slides[activeSlide].title}
                  </h4>
                </div>
              </div>
            </div>

            {/* Description & Navigation side */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full py-4">
              <div>
                <span className="font-oswald text-xs tracking-[0.25em] text-[#D9B36C] uppercase block mb-2">
                  0{activeSlide + 1} / 0{slides.length}
                </span>
                <h3 className="font-oswald text-3xl font-bold text-[#F7EFEA] uppercase mb-4">
                  {slides[activeSlide].title}
                </h3>
                <p className="font-poppins text-sm text-[#CDB9B9]/90 leading-relaxed mb-6">
                  {slides[activeSlide].desc}
                </p>
              </div>

              {/* Controls with circular red arrows */}
              <div className="flex items-center gap-4 pt-6 border-t border-[#2A0A12]">
                <button
                  onClick={handlePrev}
                  aria-label="Anterior"
                  className="w-12 h-12 rounded-full bg-[#D62839] hover:bg-[#b81d2d] text-white flex items-center justify-center shadow-lg hover:shadow-[#D62839]/40 transition-all hover:scale-110 border border-[#E8508C]/40"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Próximo"
                  className="w-12 h-12 rounded-full bg-[#D62839] hover:bg-[#b81d2d] text-white flex items-center justify-center shadow-lg hover:shadow-[#D62839]/40 transition-all hover:scale-110 border border-[#E8508C]/40"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="ml-auto flex gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeSlide === idx ? 'w-8 bg-[#E8508C]' : 'w-2 bg-[#2A0A12] hover:bg-[#5A1020]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
