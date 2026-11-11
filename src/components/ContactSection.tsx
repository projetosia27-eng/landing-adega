import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation } from 'lucide-react';
import { AdegaConfig } from '../types';

interface ContactSectionProps {
  config: AdegaConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
  const whatsappMessage = encodeURIComponent(`Olá! Gostaria de entrar em contato com a ${config.name}.`);
  const whatsappUrl = `https://wa.me/${config.whatsapp}?text=${whatsappMessage}`;
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${config.name} ${config.address}`)}`;

  return (
    <section id="contato" className="py-20 bg-wine-section relative overflow-hidden reveal-on-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-oswald text-xs tracking-[0.25em] text-[#E8508C] uppercase block mb-2">
            Loja Física & Atendimento
          </span>
          <h2 className="font-oswald text-3xl sm:text-5xl font-bold text-[#F7EFEA] uppercase">
            Contato & <span className="font-playfair italic text-[#E8508C] lowercase font-normal">localização</span>
          </h2>
          <p className="font-poppins text-sm text-[#CDB9B9]/90 mt-3">
            Peça pelo delivery ou venha nos visitar em Caieiras, SP.
          </p>
        </div>

        {/* Three Contact Cards with Icons in Red Circles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          
          {/* Item 1: Endereço */}
          <div className="bg-[#12060A]/90 border border-[#2A0A12] p-8 rounded-3xl text-center shadow-xl hover:border-[#D62839]/40 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-full bg-[#D62839] text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#D62839]/30 border border-[#E8508C]/40 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="font-oswald text-xl font-bold text-[#F7EFEA] uppercase mb-2">
                Endereço em Caieiras
              </h3>
              <p className="font-poppins text-sm text-[#CDB9B9]/90 leading-relaxed mb-4">
                {config.address}
              </p>
            </div>
            
            <a
              href={mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-[#D62839] text-[#F7EFEA] hover:text-white font-oswald text-xs tracking-wider uppercase rounded-full transition-all border border-white/20 mt-2"
            >
              <Navigation className="w-3.5 h-3.5" />
              Como Chegar
            </a>
          </div>

          {/* Item 2: Telefone & WhatsApp */}
          <div className="bg-[#12060A]/90 border border-[#2A0A12] p-8 rounded-3xl text-center shadow-xl hover:border-[#D62839]/40 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-full bg-[#D62839] text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#D62839]/30 border border-[#E8508C]/40 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="font-oswald text-xl font-bold text-[#F7EFEA] uppercase mb-2">
                WhatsApp / Pedidos
              </h3>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-oswald text-2xl font-bold text-[#D9B36C] hover:text-[#E8508C] transition-colors block mb-2"
              >
                +{config.whatsapp.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4')}
              </a>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#D62839] hover:bg-[#b81d2d] text-white font-oswald text-xs tracking-wider uppercase rounded-full shadow-lg transition-all mt-2"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              Chamar no WhatsApp
            </a>
          </div>

          {/* Item 3: E-mail & Horários */}
          <div className="bg-[#12060A]/90 border border-[#2A0A12] p-8 rounded-3xl text-center shadow-xl hover:border-[#D62839]/40 transition-all group flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-full bg-[#D62839] text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#D62839]/30 border border-[#E8508C]/40 group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="font-oswald text-xl font-bold text-[#F7EFEA] uppercase mb-2">
                E-mail & Horários
              </h3>
              <p className="font-poppins text-sm text-[#CDB9B9]/90 mb-2">
                {config.email}
              </p>
            </div>

            <span className="font-poppins text-xs text-[#E8508C] flex items-center justify-center gap-1.5 pt-3 border-t border-[#2A0A12]">
              <Clock className="w-3.5 h-3.5" />
              {config.hours}
            </span>
          </div>

        </div>
      </div>

      {/* Full-width Google Maps iframe of Caieiras, SP with dark wine filter */}
      <div className="w-full h-96 relative border-t-2 border-b-2 border-[#5A1020]">
        <iframe
          title={`Mapa da ${config.name} em Caieiras, SP`}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.2662056073147!2d-46.74311892376662!3d-23.36056340360814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cee54fa8dfa52b%3A0x6b107b539c38c414!2sCaieiras%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.6) sepia(0.2) hue-rotate(-20deg)' }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute top-4 left-4 bg-[#12060A]/95 backdrop-blur-md px-4 py-2 rounded-xl border border-[#D62839]/40 text-xs font-oswald tracking-widest text-[#F7EFEA] uppercase shadow-xl">
          📍 {config.name} — Caieiras, SP
        </div>
      </div>
    </section>
  );
};
