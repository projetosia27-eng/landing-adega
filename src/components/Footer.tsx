import React from 'react';
import { Wine, Instagram, Facebook, ShieldAlert, ArrowUp } from 'lucide-react';
import { AdegaConfig } from '../types';

interface FooterProps {
  config: AdegaConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0305] border-t border-[#2A0A12] text-[#CDB9B9] pt-16 pb-12 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D62839] to-[#7A1428] flex items-center justify-center border border-[#E8508C]/40">
                <Wine className="w-5 h-5 text-[#F7EFEA]" />
              </div>
              <span className="font-oswald text-2xl font-bold tracking-wider text-[#F7EFEA] uppercase">
                {config.name}
              </span>
            </div>
            <p className="font-poppins text-xs text-[#CDB9B9]/80 leading-relaxed">
              Conveniência e delivery de bebidas em {config.location}. Vinhos, cervejas geladas, destilados, energéticos, gelo e carvão entregues na sua porta.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://instagram.com/${config.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1A070E] border border-[#2A0A12] hover:border-[#D62839] flex items-center justify-center text-[#F7EFEA] hover:text-[#E8508C] transition-colors"
                title="Siga no Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#1A070E] border border-[#2A0A12] hover:border-[#D62839] flex items-center justify-center text-[#F7EFEA] hover:text-[#E8508C] transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <span className="font-poppins text-xs text-[#E8508C] ml-1">
                {config.instagram}
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links updated to: Início, Categorias, Destaques, Combos, Contato */}
          <div>
            <h3 className="font-oswald text-sm font-bold tracking-widest text-[#F7EFEA] uppercase mb-4">
              Navegação
            </h3>
            <ul className="space-y-2.5 font-poppins text-xs">
              <li><a href="#hero" className="hover:text-[#F7EFEA] transition-colors">Início</a></li>
              <li><a href="#categorias" className="hover:text-[#F7EFEA] transition-colors">Categorias</a></li>
              <li><a href="#destaques" className="hover:text-[#F7EFEA] transition-colors">Nossos Destaques</a></li>
              <li><a href="#combos" className="hover:text-[#F7EFEA] transition-colors">Combos e Ofertas</a></li>
              <li><a href="#contato" className="hover:text-[#F7EFEA] transition-colors">Contato & Mapa</a></li>
            </ul>
          </div>

          {/* Col 3: Atendimento & Delivery */}
          <div>
            <h3 className="font-oswald text-sm font-bold tracking-widest text-[#F7EFEA] uppercase mb-4">
              Atendimento
            </h3>
            <ul className="space-y-2.5 font-poppins text-xs">
              <li>{config.hours}</li>
              <li className="text-[#E8508C] pt-1 font-semibold">Entrega Expressa em Caieiras</li>
              <li className="text-[#D9B36C]">Pagamento em Pix, Cartão ou Dinheiro</li>
            </ul>
          </div>

          {/* Col 4: Retorno ao Topo */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-oswald text-sm font-bold tracking-widest text-[#F7EFEA] uppercase mb-4">
                Localização
              </h3>
              <p className="font-poppins text-xs text-[#CDB9B9]/90 leading-relaxed">
                {config.address}
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 self-start inline-flex items-center gap-2 px-4 py-2 bg-[#1A070E] hover:bg-[#2A0A12] border border-[#5A1020] text-[#F7EFEA] text-xs font-oswald uppercase tracking-wider rounded-full transition-all hover:scale-105"
            >
              Voltar ao Topo
              <ArrowUp className="w-3.5 h-3.5 text-[#D62839]" />
            </button>
          </div>

        </div>

        {/* Legal Disclaimer Banner */}
        <div className="pt-8 border-t border-[#2A0A12] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-poppins text-[#CDB9B9]/70">
          <div className="flex items-center gap-2 text-[#D9B36C]">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>
              Beba com moderação. Venda proibida para menores de 18 anos.
            </span>
          </div>

          <div>
            © 2026 <strong className="text-[#F7EFEA]">{config.name}</strong>. Todos os direitos reservados.
          </div>
        </div>

      </div>
    </footer>
  );
};
