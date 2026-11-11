import React from 'react';
import { X, Check, RefreshCw, Settings, Wine } from 'lucide-react';
import { AdegaConfig, defaultConfig } from '../types';

interface ConfigDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: AdegaConfig;
  onSave: (newConfig: AdegaConfig) => void;
}

export const ConfigDrawer: React.FC<ConfigDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formState, setFormState] = React.useState<AdegaConfig>(config);

  React.useEffect(() => {
    setFormState(config);
  }, [config]);

  if (!isOpen) return null;

  const handleChange = (field: keyof AdegaConfig, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleProductChange = (index: number, field: string, value: string) => {
    setFormState((prev) => {
      const updatedProds = [...prev.produtos];
      updatedProds[index] = { ...updatedProds[index], [field]: value };
      return { ...prev, produtos: updatedProds };
    });
  };

  const handleReset = () => {
    setFormState(defaultConfig);
    onSave(defaultConfig);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formState);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-[#12060A] border-l border-[#2A0A12] h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#2A0A12] mb-6">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#D62839]" />
              <h2 className="font-oswald text-xl font-bold text-[#F7EFEA] uppercase">
                Dados da Adega (Objeto Central)
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#1A070E] text-[#CDB9B9] hover:text-white flex items-center justify-center border border-[#2A0A12]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="font-poppins text-xs text-[#CDB9B9]/80 mb-6">
            Altere todos os dados do negócio centralizados. Todas as seções e botões do WhatsApp são atualizados automaticamente.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="font-oswald text-xs uppercase tracking-wider text-[#F7EFEA] block mb-1">
                Nome da Adega
              </label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full bg-[#1A070E] border border-[#2A0A12] focus:border-[#D62839] rounded-xl px-4 py-2.5 text-sm text-[#F7EFEA] font-poppins focus:outline-none"
                placeholder="Ex: Adega Caieiras"
                required
              />
            </div>

            <div>
              <label className="font-oswald text-xs uppercase tracking-wider text-[#F7EFEA] block mb-1">
                Cidade / Bairro
              </label>
              <input
                type="text"
                value={formState.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full bg-[#1A070E] border border-[#2A0A12] focus:border-[#D62839] rounded-xl px-4 py-2.5 text-sm text-[#F7EFEA] font-poppins focus:outline-none"
                placeholder="Ex: Caieiras, SP"
                required
              />
            </div>

            <div>
              <label className="font-oswald text-xs uppercase tracking-wider text-[#F7EFEA] block mb-1">
                Endereço Completo
              </label>
              <input
                type="text"
                value={formState.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full bg-[#1A070E] border border-[#2A0A12] focus:border-[#D62839] rounded-xl px-4 py-2.5 text-sm text-[#F7EFEA] font-poppins focus:outline-none"
                placeholder="Ex: Av. Professor Carvalho Pinto, 450 - Centro, Caieiras - SP"
                required
              />
            </div>

            <div>
              <label className="font-oswald text-xs uppercase tracking-wider text-[#F7EFEA] block mb-1">
                Número do WhatsApp (com DDI e DDD)
              </label>
              <input
                type="text"
                value={formState.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                className="w-full bg-[#1A070E] border border-[#2A0A12] focus:border-[#D62839] rounded-xl px-4 py-2.5 text-sm text-[#F7EFEA] font-poppins focus:outline-none"
                placeholder="Ex: 5511999998888"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-oswald text-xs uppercase tracking-wider text-[#F7EFEA] block mb-1">
                  Instagram
                </label>
                <input
                  type="text"
                  value={formState.instagram}
                  onChange={(e) => handleChange('instagram', e.target.value)}
                  className="w-full bg-[#1A070E] border border-[#2A0A12] focus:border-[#D62839] rounded-xl px-3 py-2 text-xs text-[#F7EFEA] font-poppins focus:outline-none"
                  placeholder="@adegacaieiras"
                />
              </div>

              <div>
                <label className="font-oswald text-xs uppercase tracking-wider text-[#F7EFEA] block mb-1">
                  E-mail
                </label>
                <input
                  type="text"
                  value={formState.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-[#1A070E] border border-[#2A0A12] focus:border-[#D62839] rounded-xl px-3 py-2 text-xs text-[#F7EFEA] font-poppins focus:outline-none"
                  placeholder="contato@adegacaieiras.com.br"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#2A0A12]">
              <h3 className="font-oswald text-sm font-bold text-[#D9B36C] uppercase mb-3 flex items-center gap-2">
                <Wine className="w-4 h-4" />
                Produtos em Destaque
              </h3>

              <div className="space-y-4">
                {formState.produtos.map((prod, idx) => (
                  <div key={prod.id} className="bg-[#1A070E] p-3 rounded-xl border border-[#2A0A12]">
                    <div className="font-oswald text-xs text-[#F7EFEA] mb-1">
                      Produto {idx + 1}: {prod.nome}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={prod.nome}
                        onChange={(e) => handleProductChange(idx, 'nome', e.target.value)}
                        className="bg-[#12060A] border border-[#2A0A12] rounded-lg px-2.5 py-1 text-xs text-[#F7EFEA]"
                        placeholder="Nome"
                      />
                      <input
                        type="text"
                        value={prod.preco}
                        onChange={(e) => handleProductChange(idx, 'preco', e.target.value)}
                        className="bg-[#12060A] border border-[#2A0A12] text-[#D9B36C] rounded-lg px-2.5 py-1 text-xs font-bold"
                        placeholder="Preço R$"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 flex gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-2.5 bg-[#1A070E] hover:bg-[#2A0A12] text-[#CDB9B9] font-oswald text-xs uppercase tracking-wider rounded-xl border border-[#2A0A12] flex items-center justify-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Restaurar Padroes
              </button>

              <button
                type="submit"
                className="flex-1 py-2.5 bg-[#D62839] hover:bg-[#b81d2d] text-white font-oswald text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-1 font-bold"
              >
                <Check className="w-4 h-4" />
                Aplicar Mudanças
              </button>
            </div>

          </form>
        </div>

        <div className="text-center pt-4 border-t border-[#2A0A12] text-[11px] font-poppins text-[#CDB9B9]/60">
          Dados centralizados para "Adega Caieiras".
        </div>

      </div>
    </div>
  );
};
