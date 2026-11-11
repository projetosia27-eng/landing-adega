import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroScrollCanvas } from './components/HeroScrollCanvas';
import { CategoriesBar } from './components/CategoriesBar';
import { HighlightsSection } from './components/HighlightsSection';
import { CombosSection } from './components/CombosSection';
import { InfoStripSection } from './components/InfoStripSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { ConfigDrawer } from './components/ConfigDrawer';
import { defaultConfig, AdegaConfig } from './types';

export default function App() {
  const [config, setConfig] = useState<AdegaConfig>(() => {
    try {
      const saved = localStorage.getItem('adega_caieiras_config');
      return saved ? JSON.parse(saved) : defaultConfig;
    } catch {
      return defaultConfig;
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const handleSaveConfig = (newConfig: AdegaConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('adega_caieiras_config', JSON.stringify(newConfig));
    } catch (err) {
      console.error('Failed to save adega config', err);
    }
  };

  // IntersectionObserver for subtle section entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#12060A] text-[#F7EFEA] font-poppins relative selection:bg-[#D62839] selection:text-white">
      {/* Header Fixo */}
      <Header config={config} onOpenConfig={() => setIsConfigOpen(true)} />

      {/* Hero com Vídeo/Canvas controlado pelo scroll (Intacto com apenas atualização de textos das lâminas 2 e 3) */}
      <HeroScrollCanvas config={config} />

      {/* Conteúdo da Landing Page de Delivery (Abaixo da Hero) */}
      <main className="relative z-20 bg-[#12060A]">
        {/* 2. Nova Faixa de Categorias (logo após a hero) */}
        <CategoriesBar
          config={config}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 3. Seção "Nossos Destaques" (principal) */}
        <HighlightsSection
          config={config}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 4. Combos e Ofertas (faixa curta com 3 cards texto) */}
        <CombosSection config={config} />

        {/* 5. Faixa de Informações (substitui o FAQ) */}
        <InfoStripSection config={config} />

        {/* 6. Contato */}
        <ContactSection config={config} />
      </main>

      {/* 7. Rodapé */}
      <Footer config={config} />

      {/* Botão flutuante de WhatsApp (48px) */}
      <WhatsAppFloat config={config} />

      {/* Drawer de Personalização */}
      <ConfigDrawer
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        config={config}
        onSave={handleSaveConfig}
      />
    </div>
  );
}
