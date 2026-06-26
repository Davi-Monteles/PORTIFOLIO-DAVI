import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01',
    title: 'Entender o problema',
    description:
      'Antes de escrever código, estudo o processo de negócio. O que leva tempo demais? O que se perde? Onde os clientes desistem?',
  },
  {
    num: '02',
    title: 'Projetar o sistema',
    description:
      'Mapeio o fluxo, a estrutura de dados e a lógica de automação. A interface vem depois que o sistema está claro. A forma segue a função.',
  },
  {
    num: '03',
    title: 'Construir com foco',
    description:
      'Sem inchaço de funcionalidades. Sem tecnologia por tecnologia. Construo o que resolve o problema, testo rápido e itero com base no uso real.',
  },
  {
    num: '04',
    title: 'Entregar e otimizar',
    description:
      'O lançamento é só o começo. Monitoro, ajusto e melhoro com base em como o sistema realmente se comporta no mundo real.',
  },
];

export default function HowIWorkPt() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 75%', once: true },
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%', once: true },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-i-work"
      ref={sectionRef}
      style={{ backgroundColor: '#05070A' }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: 1280, padding: '140px 48px' }}
      >
        <div ref={headerRef}>
          <span className="section-label block mb-6">04</span>
          <h2
            className="font-serif font-normal uppercase"
            style={{
              fontSize: 'clamp(48px, 7vw, 120px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              color: '#F0EDE6',
              opacity: 0,
            }}
          >
            COMO TRABALHO
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-20"
          style={{ gap: 32 }}
        >
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(22,22,25,0.5)',
                border: '1px solid rgba(92,92,98,0.08)',
                borderRadius: 4,
                padding: 32,
                opacity: 0,
                boxShadow: '0 0 0 rgba(126,255,107,0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 40px rgba(126,255,107,0.04)';
                e.currentTarget.style.borderColor = 'rgba(92,92,98,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 rgba(126,255,107,0)';
                e.currentTarget.style.borderColor = 'rgba(92,92,98,0.08)';
              }}
            >
              <span
                className="font-mono"
                style={{ fontSize: 11, color: '#7FFF6B' }}
              >
                {step.num}
              </span>
              <h3
                className="font-sans font-medium mt-3"
                style={{ fontSize: 18, color: '#F0EDE6' }}
              >
                {step.title}
              </h3>
              <p
                className="font-sans font-normal mt-2"
                style={{ fontSize: 14, color: '#5C5C62', lineHeight: 1.7 }}
              >
                {step.description}
              </p>
              <div className="mt-6" style={{ height: 1, backgroundColor: 'rgba(92,92,98,0.1)' }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #how-i-work .mx-auto {
            padding: 80px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
