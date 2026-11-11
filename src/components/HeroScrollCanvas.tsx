import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MessageCircle, ChevronDown, Wine, Download } from 'lucide-react';
import { AdegaConfig } from '../types';
import { extractVideoFrames } from '../utils/frameExtractor';

interface HeroScrollCanvasProps {
  config: AdegaConfig;
}

const DESKTOP_SCALE = 0.85;
const MOBILE_SCALE = 1.0;
const FRAME_COUNT = 60;

export const HeroScrollCanvas: React.FC<HeroScrollCanvasProps> = ({ config }) => {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // References for the 4 discrete text brackets (updated without React re-render)
  const bracket1Ref = useRef<HTMLDivElement>(null);
  const bracket2Ref = useRef<HTMLDivElement>(null);
  const bracket3Ref = useRef<HTMLDivElement>(null);
  const bracket4Ref = useRef<HTMLDivElement>(null);
  const currentBracketIndexRef = useRef<number>(-1);

  const [loading, setLoading] = useState(true);
  const [devMode, setDevMode] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState({ count: 0, total: 60 });
  const [extractedBlobs, setExtractedBlobs] = useState<Blob[]>([]);

  const framesRef = useRef<(ImageBitmap | null)[]>(new Array(FRAME_COUNT).fill(null));
  const currentFrameIndexRef = useRef(0);
  const targetFrameIndexRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);
  const isHeroVisibleRef = useRef(true);
  const hasScrolledRef = useRef(false);

  const isDebug = typeof window !== 'undefined' && (
    new URLSearchParams(window.location.search).get('debug') === '1' ||
    new URLSearchParams(window.location.search).get('dev') === '1'
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDev = new URLSearchParams(window.location.search).get('dev') === '1';
      setDevMode(isDev);
    }
  }, []);

  // Nearest frame selector: guarantees immediate, jitter-free image display at all times
  const getBestAvailableBitmap = useCallback((targetIdx: number): ImageBitmap | null => {
    const frames = framesRef.current;
    if (!frames || frames.length === 0) return null;
    if (frames[targetIdx]) return frames[targetIdx];

    let closestIdx = -1;
    let minDistance = Infinity;

    for (let i = 0; i < frames.length; i++) {
      if (frames[i]) {
        const dist = Math.abs(i - targetIdx);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = i;
        }
      }
    }

    return closestIdx >= 0 ? frames[closestIdx] : null;
  }, []);

  // Update text brackets visibility directly via DOM (ZERO React re-renders during 60 FPS scroll)
  const updateTextBrackets = useCallback((p: number) => {
    let activeIdx = 0;
    if (p < 0.23) activeIdx = 1;
    else if (p >= 0.25 && p <= 0.48) activeIdx = 2;
    else if (p >= 0.52 && p <= 0.73) activeIdx = 3;
    else if (p >= 0.77) activeIdx = 4;
    else activeIdx = 0; // transition buffer gap

    if (activeIdx !== currentBracketIndexRef.current) {
      currentBracketIndexRef.current = activeIdx;

      const setVisibility = (el: HTMLDivElement | null, isVisible: boolean, isLeft: boolean) => {
        if (!el) return;
        if (isVisible) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.style.pointerEvents = 'auto';
        } else {
          el.style.opacity = '0';
          el.style.transform = isLeft ? 'translateY(-20px)' : 'translateY(20px)';
          el.style.pointerEvents = 'none';
        }
      };

      setVisibility(bracket1Ref.current, activeIdx === 1, true);
      setVisibility(bracket2Ref.current, activeIdx === 2, false);
      setVisibility(bracket3Ref.current, activeIdx === 3, true);
      setVisibility(bracket4Ref.current, activeIdx === 4, false);
    }
  }, []);

  // 1. Setup Static WebP Frames Loading with IndexedDB & Video Fallback
  useEffect(() => {
    let isMounted = true;
    const isMobile = window.innerWidth <= 768;
    const frameWidth = isMobile ? 720 : 960;
    const cacheKey = `${config.videoUrl}_v4_60_w_${frameWidth}`;

    const loaderTimeout = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 1200);

    const startLoading = async () => {
      const video = videoRef.current;
      if (!video) return;

      try {
        const { blobs } = await extractVideoFrames({
          videoElement: video,
          frameCount: FRAME_COUNT,
          targetWidth: frameWidth,
          cacheKey,
          onFirstFrameReady: (firstBitmap) => {
            if (isMounted) {
              framesRef.current[0] = firstBitmap;
              setLoading(false);
              clearTimeout(loaderTimeout);
            }
          },
          onFrameExtracted: (index, bitmap, blob) => {
            if (isMounted) {
              framesRef.current[index] = bitmap;
              if (blob) {
                setExtractedBlobs((prev) => {
                  const updated = [...prev];
                  updated[index] = blob;
                  return updated;
                });
              }
            }
          },
          onProgress: (count, total) => {
            if (isMounted) {
              setExtractionProgress({ count, total });
            }
          },
          isDebug,
        });

        if (isMounted) {
          setExtractedBlobs(blobs);
          setLoading(false);
          clearTimeout(loaderTimeout);
        }
      } catch (err) {
        console.warn('[HeroScrollCanvas] Frame load warning:', err);
        if (isMounted) setLoading(false);
      }
    };

    startLoading();

    return () => {
      isMounted = false;
      clearTimeout(loaderTimeout);
    };
  }, [config.videoUrl, isDebug]);

  // 2. Setup Canvas Size & Optimized DPR for mobile (prevents GPU memory bottlenecks)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeTimer: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const isMobile = window.innerWidth <= 768;
        // Restrict mobile DPR to 1.25 for buttery smooth rendering without GPU thrashing
        const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75);
        canvas.width = Math.floor(window.innerWidth * dpr);
        canvas.height = Math.floor(window.innerHeight * dpr);
      }, 150);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // 3. Pause rendering loop when Hero section leaves viewport
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isHeroVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.01 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  // 4. Smooth Passive Scroll Calculation & High-Performance RAF Loop
  useEffect(() => {
    const heroEl = heroRef.current;
    const canvas = canvasRef.current;
    if (!heroEl || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

    // Passive scroll position tracker (uncoupled from heavy DOM reads)
    let rawP = 0;
    const onScroll = () => {
      const rect = heroEl.getBoundingClientRect();
      const totalScrollable = heroEl.offsetHeight - window.innerHeight;
      rawP = totalScrollable > 0 ? clamp(-rect.top / totalScrollable, 0, 1) : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // High performance render loop: pure compositor animation with zero React overhead
    const render = () => {
      if (isHeroVisibleRef.current) {
        const p = rawP;

        // Animate top progress bar directly via GPU transform
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${p})`;
        }

        // Hide scroll hint once scrolling starts
        if (p > 0.02 && !hasScrolledRef.current) {
          hasScrolledRef.current = true;
          if (scrollHintRef.current) {
            scrollHintRef.current.style.opacity = '0';
          }
        }

        // Update text bracket visibility via DOM
        updateTextBrackets(p);

        targetFrameIndexRef.current = p * (FRAME_COUNT - 1);

        // Smooth Lerp 0.2 factor
        currentFrameIndexRef.current += (targetFrameIndexRef.current - currentFrameIndexRef.current) * 0.2;
        const frameIdx = Math.round(clamp(currentFrameIndexRef.current, 0, FRAME_COUNT - 1));

        // Draw image frame
        const currentBitmap = getBestAvailableBitmap(frameIdx);

        if (currentBitmap) {
          const isMobile = window.innerWidth <= 768;

          ctx.fillStyle = '#12060A';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const canvasRatio = canvas.width / canvas.height;
          const frameRatio = currentBitmap.width / currentBitmap.height;

          let drawW: number;
          let drawH: number;
          let dx: number;
          let dy: number;

          if (isMobile) {
            // Efeito cinematográfico no mobile:
            // 1. Zoom dinâmico suave conforme o scroll avança (de 1.0x a 1.14x)
            const dynamicZoom = 1.0 + (p * 0.14);

            // 2. Altura proporcional elegante para a taça não ficar desproporcionalmente gigante
            drawH = canvas.height * 0.74 * dynamicZoom;
            drawW = drawH * frameRatio;

            // 3. Ponto focal inteligente: a taça e o fluxo de vinho ficam centralizados,
            // garantindo que a taça INTEIRA fique visível sem ser cortada na borda direita
            const focusX = 0.58;
            dx = (canvas.width * 0.5) - (drawW * focusX);
            dy = (canvas.height - drawH) / 2;
          } else {
            // Desktop: mantém a escala original intacta
            drawW = canvas.width * DESKTOP_SCALE;
            drawH = drawW / frameRatio;

            if (drawH < canvas.height * DESKTOP_SCALE) {
              drawH = canvas.height * DESKTOP_SCALE;
              drawW = drawH * frameRatio;
            }

            dx = (canvas.width - drawW) / 2;
            dy = (canvas.height - drawH) / 2;
          }

          ctx.drawImage(currentBitmap, dx, dy, drawW, drawH);
        }
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [getBestAvailableBitmap, updateTextBrackets]);

  const downloadDevFrames = () => {
    if (extractedBlobs.length === 0) {
      alert('Nenhum frame extraído ainda.');
      return;
    }
    extractedBlobs.forEach((blob, i) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const frameNum = String(i + 1).padStart(4, '0');
        a.download = `frame_${frameNum}.webp`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  const whatsappMessage1 = encodeURIComponent(`Olá! Vim pelo site da ${config.name} e gostaria de fazer um pedido.`);
  const whatsappUrl1 = `https://wa.me/${config.whatsapp}?text=${whatsappMessage1}`;

  const whatsappMessage4 = encodeURIComponent(`Olá! Quero pedir pelo delivery da ${config.name}.`);
  const whatsappUrl4 = `https://wa.me/${config.whatsapp}?text=${whatsappMessage4}`;

  return (
    <>
      {/* Hidden Video Source for fallback */}
      <video
        ref={videoRef}
        src={config.videoUrl}
        muted
        playsInline
        preload="auto"
        className="hidden pointer-events-none"
      />

      {/* GPU Accelerated Top Progress Bar (ScaleX transform) */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 w-full h-[2px] bg-[#E8508C] z-[60] origin-left pointer-events-none transition-transform duration-75 shadow-[0_0_8px_#E8508C]"
        style={{ transform: 'scaleX(0)' }}
      />

      {/* Dev Mode Download Button (?dev=1) */}
      {devMode && (
        <div className="fixed bottom-20 left-6 z-[80] bg-[#1A070E] border border-[#D62839] p-3 rounded-2xl shadow-2xl flex flex-col gap-2">
          <span className="font-oswald text-[10px] text-[#D9B36C] uppercase tracking-wider">
            Dev Mode · Frames: {extractionProgress.count}/{extractionProgress.total}
          </span>
          <button
            onClick={downloadDevFrames}
            className="px-3 py-1.5 bg-[#D62839] hover:bg-[#b81d2d] text-white text-xs font-oswald uppercase rounded-lg flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Baixar frames WebP
          </button>
        </div>
      )}

      {/* Lightweight Logo Loader Screen */}
      <div
        className={`fixed inset-0 z-[100] bg-[#12060A] flex flex-col items-center justify-center gap-4 transition-opacity duration-500 pointer-events-none ${
          loading ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D62839] to-[#7A1428] flex items-center justify-center animate-pulse shadow-2xl border border-[#E8508C]/40">
          <Wine className="w-8 h-8 text-[#F7EFEA]" />
        </div>
        <span className="font-oswald text-xl tracking-widest text-[#F7EFEA] uppercase">
          {config.name}
        </span>
        <span className="font-playfair text-sm italic text-[#CDB9B9]">
          {config.location} · Conveniência & Delivery...
        </span>
      </div>

      {/* Hero 400vh Sticky Section */}
      <section id="hero" ref={heroRef} className="relative h-[400vh] w-full">
        <div className="hero-sticky flex items-center justify-center overflow-hidden">
          
          <canvas id="heroCanvas" ref={canvasRef} />

          {/* Vignette Gradients via CSS (runs on GPU, saves canvas drawing time) */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#12060A] to-transparent z-[5]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#12060A] to-transparent z-[5]" />

          {/* Text Overlays - Discretely placed on sides */}
          <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between z-10">
            
            {/* Scroll Bracket 1: 0% - 20% */}
            <div
              ref={bracket1Ref}
              className="max-w-md bg-gradient-to-r from-[#12060A]/85 via-[#12060A]/40 to-transparent p-6 sm:p-8 rounded-2xl border-l-2 border-[#D62839] transition-all duration-500 pointer-events-auto"
            >
              <span className="text-xs font-oswald tracking-[0.25em] text-[#E8508C] uppercase block mb-2">
                Adega & Conveniência em {config.location}
              </span>
              <h1 className="font-oswald text-3xl sm:text-5xl font-bold leading-tight text-[#F7EFEA] uppercase drop-shadow-lg mb-4">
                Vinhos e destilados <br />
                <span className="font-playfair italic font-normal text-[#E8508C] capitalize">
                  que contam histórias.
                </span>
              </h1>
              <a
                href={whatsappUrl1}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#D62839] hover:bg-[#b81d2d] text-white font-oswald text-sm tracking-wider uppercase rounded-full shadow-lg transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                Chamar no WhatsApp
              </a>
            </div>

            {/* Scroll Bracket 2: 25% - 45% */}
            <div
              ref={bracket2Ref}
              className="max-w-md text-right bg-gradient-to-l from-[#12060A]/85 via-[#12060A]/40 to-transparent p-6 sm:p-8 rounded-2xl border-r-2 border-[#E8508C] transition-all duration-500 ml-auto opacity-0 translate-y-5 pointer-events-none"
            >
              <span className="text-xs font-oswald tracking-[0.25em] text-[#D9B36C] uppercase block mb-2">
                Cardápio Completo
              </span>
              <h2 className="font-oswald text-2xl sm:text-4xl font-bold text-[#F7EFEA] uppercase mb-3">
                Seleção <span className="font-playfair italic text-[#E8508C] lowercase">para toda ocasião.</span>
              </h2>
              <p className="font-poppins text-sm text-[#CDB9B9]/90 leading-relaxed">
                Vinhos, cervejas, destilados e muito mais. Tudo para o seu brinde ou festa.
              </p>
            </div>

            {/* Scroll Bracket 3: 50% - 70% */}
            <div
              ref={bracket3Ref}
              className="max-w-md bg-gradient-to-r from-[#12060A]/85 via-[#12060A]/50 to-transparent p-6 sm:p-8 rounded-2xl border-l-2 border-[#D9B36C] transition-all duration-500 opacity-0 -translate-y-5 pointer-events-none"
            >
              <span className="text-xs font-oswald tracking-[0.25em] text-[#E8508C] uppercase block mb-2">
                Delivery Rápido
              </span>
              <h2 className="font-oswald text-2xl sm:text-4xl font-bold text-[#F7EFEA] uppercase mb-3">
                Gelado <span className="font-playfair italic text-[#D9B36C] lowercase">e na sua porta.</span>
              </h2>
              <p className="font-poppins text-sm text-[#CDB9B9]/90 leading-relaxed mb-4">
                Entrega rápida em Caieiras e região. Bebidas estalando de geladas no ponto de beber.
              </p>
            </div>

            {/* Scroll Bracket 4: 75% - 100% */}
            <div
              ref={bracket4Ref}
              className="max-w-md text-right bg-gradient-to-l from-[#12060A]/85 via-[#12060A]/50 to-transparent p-6 sm:p-8 rounded-2xl border-r-2 border-[#D62839] transition-all duration-500 ml-auto opacity-0 translate-y-5 pointer-events-none"
            >
              <span className="text-xs font-oswald tracking-[0.25em] text-[#D62839] uppercase block mb-2">
                Pronto para Entregar
              </span>
              <h2 className="font-oswald text-3xl sm:text-4xl font-bold text-[#F7EFEA] uppercase mb-4">
                Escolha <span className="font-playfair italic text-[#E8508C] lowercase">o seu.</span>
              </h2>
              <a
                href={whatsappUrl4}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#D62839] hover:bg-[#b81d2d] text-white font-oswald text-sm tracking-wider uppercase rounded-full shadow-xl transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                Pedir no WhatsApp
              </a>
            </div>

          </div>

          {/* Scroll Down Indicator */}
          <div
            ref={scrollHintRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 transition-opacity duration-500 pointer-events-none opacity-80 animate-bounce"
          >
            <span className="font-oswald text-[10px] tracking-[0.3em] uppercase text-[#CDB9B9]">
              Role
            </span>
            <div className="w-5 h-8 rounded-full border border-[#E8508C]/50 flex items-start justify-center p-1">
              <div className="w-1 h-2 bg-[#D62839] rounded-full animate-pulse" />
            </div>
            <ChevronDown className="w-4 h-4 text-[#E8508C]" />
          </div>

        </div>
      </section>
    </>
  );
};
