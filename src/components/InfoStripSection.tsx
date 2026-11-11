import React from 'react';
import { AdegaConfig } from '../types';

interface InfoStripSectionProps {
  config: AdegaConfig;
}

export const InfoStripSection: React.FC<InfoStripSectionProps> = ({ config }) => {
  return (
    <section className="py-12 bg-[#12060A] border-b border-[#2A0A12] relative z-20 reveal-on-scroll">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.infoItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/[0.03] border border-white/[0.1] p-5 rounded-2xl flex items-center gap-4 transition-all hover:border-[#D62839]/30"
            >
              <div className="w-12 h-12 rounded-xl bg-[#2A0A12] border border-[#5A1020] flex items-center justify-center text-2xl shrink-0">
                {item.icon}
              </div>
              <div className="font-poppins text-xs text-[#F7EFEA] font-medium leading-snug">
                {item.text}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
