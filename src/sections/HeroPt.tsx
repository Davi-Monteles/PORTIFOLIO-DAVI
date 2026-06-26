import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const FOCUS_VALUES = ['SISTEMAS DE LEADS', 'FLUXOS DE IA', 'EXPERIÊNCIAS WEB', 'AUTOMAÇÃO'];
const LOG_MESSAGES = [
  'Pipeline inicializado',
  'Loop do agente ativo',
  'Health check: OK',
];

export default function HeroPt() {
  const metaRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [focusIndex, setFocusIndex] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(metaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
      .fromTo(line1Ref.current, { opacity: 0, y: 40, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 }, 0.4)
      .fromTo(line2Ref.current, { opacity: 0, y: 40, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 }, 0.55)
      .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.8)
      .fromTo(tagsRef.current?.children || [], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 }, 1)
      .fromTo(ctasRef.current?.children || [], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 1.1)
      .fromTo(cardRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.8 }, 0.9)
      .fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.3);

    const focusInterval = setInterval(() => {
      setFocusIndex((prev) => (prev + 1) % FOCUS_VALUES.length);
    }, 3000);

    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % LOG_MESSAGES.length);
    }, 3500);

    const onScroll = () => {
      if (window.scrollY > 50 && scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.3 });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      tl.kill();
      clearInterval(focusInterval);
      clearInterval(logInterval);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById('case-studies');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-start overflow-hidden"
      style={{ backgroundColor: '#05070A' }}
    >
      <div className="absolute inset-0 pointer-events-none aurora-hero-bg" />
      <div className="absolute inset-0 pointer-events-none aurora-top" />
      <div className="absolute inset-0 pointer-events-none tech-grid opacity-80" />
      
      <div className="absolute inset-0 pointer-events-none starfield-layer" />

      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '30%',
          background: 'linear-gradient(to top, #05070A 0%, transparent 100%)',
        }}
      />

      <div
        className="relative z-10 w-full"
        style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px' }}
      >
        <span ref={metaRef} className="section-label block mb-8" style={{ opacity: 0 }}>
          01
        </span>

        <h1 className="font-serif uppercase" style={{ lineHeight: 0.9, letterSpacing: '-0.02em' }}>
          <span
            ref={line1Ref}
            className="block font-normal"
            style={{
              fontSize: 'clamp(56px, 10vw, 160px)',
              color: '#F3F1EA',
              opacity: 0,
            }}
          >
            DIGITAL SYSTEMS
          </span>
          <span
            ref={line2Ref}
            className="block font-normal"
            style={{
              fontSize: 'clamp(56px, 10vw, 160px)',
              opacity: 0,
            }}
          >
            <span style={{ color: '#F3F1EA' }}>NADA DE </span>
            <span className="text-gradient-green">GENÉRICO</span>
          </span>
        </h1>

        <p
          ref={subRef}
          className="font-sans font-normal mt-8"
          style={{
            fontSize: 18,
            lineHeight: 1.7,
            color: '#5C5C62',
            maxWidth: 560,
            opacity: 0,
          }}
        >
          Crio sites, fluxos de IA, automações e ferramentas internas que ajudam negócios
          a operar melhor, capturar mais oportunidades e se mover mais rápido.
        </p>

        <div ref={tagsRef} className="flex flex-wrap items-center gap-4 mt-6">
          {['WEB', 'IA', 'AUTOMAÇÃO', 'SISTEMAS'].map((tag, i) => {
            const dotColors = ['#7FFF6B', '#7FFF6B', '#5DD3D8', '#7FFF6B'];
            return (
              <div key={tag} className="flex items-center gap-2" style={{ opacity: 0 }}>
                <span
                  className="inline-block rounded-full flex-shrink-0"
                  style={{ width: 3, height: 3, backgroundColor: dotColors[i] }}
                />
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: 10, letterSpacing: '0.08em', color: '#5C5C62' }}
                >
                  {tag}
                </span>
              </div>
            );
          })}
        </div>

        <div ref={ctasRef} className="flex flex-col sm:flex-row gap-4 mt-12">
          <button
            onClick={scrollToWork}
            className="font-sans text-xs font-medium tracking-widest border-none cursor-pointer transition-colors duration-300"
            style={{
              color: '#0D0D0F',
              backgroundColor: '#7FFF6B',
              padding: '12px 28px',
              borderRadius: 2,
              letterSpacing: '0.06em',
              opacity: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#9AFF8A')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#7FFF6B')}
          >
            VER TRABALHOS &rarr;
          </button>
          <button
            onClick={scrollToContact}
            className="font-sans text-xs font-medium tracking-widest bg-transparent cursor-pointer transition-colors duration-300"
            style={{
              color: '#F0EDE6',
              border: '1px solid rgba(240,237,230,0.2)',
              padding: '12px 28px',
              borderRadius: 2,
              letterSpacing: '0.06em',
              opacity: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(240,237,230,0.5)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(240,237,230,0.2)')}
          >
            VAMOS CONSTRUIR
          </button>
        </div>
      </div>

      <div
        ref={cardRef}
        className="hidden lg:block absolute z-10"
        style={{
          right: 48,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 280,
          opacity: 0,
        }}
      >
        <div
          style={{
            background: 'rgba(11,17,26,0.6)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(75,225,255,0.08)',
            borderRadius: 4,
            padding: 20,
            boxShadow: '0 0 80px rgba(75,225,255,0.04)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono uppercase" style={{ fontSize: 10, color: '#5C5C62', letterSpacing: '0.08em' }}>
              STATUS DO SISTEMA
            </span>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full animate-pulse-dot" style={{ backgroundColor: '#7FFF6B' }} />
              <span className="font-mono" style={{ fontSize: 9, color: '#7FFF6B' }}>ATIVO</span>
            </div>
          </div>

          <div className="divider mb-3" />

          <div className="mb-1">
            <div className="flex justify-between items-center py-1.5">
              <span className="font-mono uppercase" style={{ fontSize: 10, color: '#5C5C62', letterSpacing: '0.08em' }}>STATUS</span>
              <span className="font-mono" style={{ fontSize: 11, color: '#F0EDE6' }}>CONSTRUINDO</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="font-mono uppercase" style={{ fontSize: 10, color: '#5C5C62', letterSpacing: '0.08em' }}>FOCO</span>
              <span className="font-mono" style={{ fontSize: 11, color: '#F0EDE6' }}>{FOCUS_VALUES[focusIndex]}</span>
            </div>
          </div>

          <div className="divider my-3" />

          <div>
            {[
              { label: 'PROJETOS', value: '6+' },
              { label: 'SISTEMAS', value: '3' },
              { label: 'FOCO', value: 'WEB/IA' },
            ].map((m) => (
              <div key={m.label} className="flex justify-between items-center py-1.5">
                <span className="font-mono uppercase" style={{ fontSize: 10, color: '#5C5C62', letterSpacing: '0.08em' }}>{m.label}</span>
                <span className="font-mono" style={{ fontSize: 11, color: '#F0EDE6' }}>{m.value}</span>
              </div>
            ))}
          </div>

          <div className="divider my-3" />

          <div className="mb-2">
            <div className="font-mono" style={{ fontSize: 10, color: '#5C5C62' }}>
              {LOG_MESSAGES[logIndex]}
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <span className="font-mono" style={{ fontSize: 9, color: '#5C5C62' }}>DM.SYS // v3.0</span>
          </div>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{ opacity: 0 }}
      >
        <div
          className="relative overflow-hidden"
          style={{ width: 1, height: 40, backgroundColor: 'rgba(92,92,98,0.3)' }}
        >
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: '40%',
              background: 'linear-gradient(to bottom, transparent, #7FFF6B)',
              animation: 'scrollPulse 2s ease infinite',
            }}
          />
        </div>
        <div
          className="rounded-full mt-1"
          style={{
            width: 4,
            height: 4,
            border: '1px solid rgba(240,237,230,0.2)',
          }}
        />
        <style>{`
          @keyframes scrollPulse {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(250%); }
          }
        `}</style>
      </div>
    </section>
  );
}
