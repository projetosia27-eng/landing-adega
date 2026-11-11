import React from 'react';
import { MessageCircle } from 'lucide-react';
import { AdegaConfig } from '../types';

interface WhatsAppFloatProps {
  config: AdegaConfig;
}

export const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({ config }) => {
  const whatsappMessage = encodeURIComponent(`Olá! Estou no site da ${config.name} e gostaria de consultar a carta de vinhos.`);
  const whatsappUrl = `https://wa.me/${config.whatsapp}?text=${whatsappMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_30px_rgba(37,211,102,0.6)] transition-all duration-300 transform hover:scale-110 border-2 border-white/20 group"
      title="Atendimento WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current transition-transform group-hover:rotate-12" />
      <span className="absolute right-14 bg-[#12060A]/95 text-[#F7EFEA] font-oswald text-xs px-3 py-1.5 rounded-xl border border-[#25D366]/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
        Pedir no WhatsApp
      </span>
    </a>
  );
};
