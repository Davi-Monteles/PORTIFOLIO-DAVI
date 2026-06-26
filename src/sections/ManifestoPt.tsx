import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const THESIS_POINTS = [
  {
    num: '01',
    statement: 'Sites genéricos estão mortos.',
    explanation:
      'Uma landing page sem processo, automação e lógica de negócio é só wallpaper digital. Fica bonita e não muda nada.',
  },
  {
    num: '02',
    statement: 'IA sem processo é ruído.',
    explanation:
      'Chatbots que não levam a lugar nenhum, agentes sem fluxo de trabalho, automação sem objetivo. IA é ferramenta, não estratégia.',
  },
  {
    num: '03',
    statement: 'Negócios precisam de sistemas úteis.',
    explanation:
      'Captura de leads que realmente converte. Ferramentas internas que economizam horas. Sites que funcionam, não só que ficam bonitos.',
  },
  {
    num: '04',
    statement: 'Construo para resultados, não para aplausos.',
    explanation:
      'Todo projeto é medido por se melhora operações, aumenta alcance ou remove atritos. Design serve à função.',
  },
];

export default function ManifestoPt() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 75%', once: true },
          }
        );
      }

      if (pointsRef.current) {
        gsap.fromTo(
          pointsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: pointsRef.current, start: 'top 70%', once: true },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#070B12',
        borderTop: '1px solid rgba(75,225,255,0.08)',
        borderBottom: '1px solid rgba(75,225,255,0.08)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none section-nebula-bg" />
      <div className="absolute inset-0 pointer-events-none aurora-glow-subtle opacity-20" />
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-2"
        style={{
          maxWidth: 1280,
          padding: '140px 48px',
          gap: 64,
        }}
      >
        <div>
          <span className="section-label block mb-6">02</span>
          <h2
            ref={titleRef}
            className="font-serif font-normal uppercase"
            style={{
              fontSize: 'clamp(48px, 7vw, 120px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              color: '#F3F1EA',
              opacity: 0,
            }}
          >
            A TESE
          </h2>
        </div>

        <div ref={pointsRef}>
          {THESIS_POINTS.map((point, i) => (
            <div
              key={point.num}
              className="py-8"
              style={{
                borderTop: i === 0 ? '1px solid rgba(75,225,255,0.1)' : 'none',
                borderBottom: '1px solid rgba(75,225,255,0.1)',
                opacity: 0,
              }}
            >
              <span
                className="font-mono"
                style={{ fontSize: 11, color: '#7FFF6B', letterSpacing: '0.1em' }}
              >
                {point.num}
              </span>
              <p
                className="font-sans font-medium mt-2"
                style={{ fontSize: 18, lineHeight: 1.6, color: '#F3F1EA' }}
              >
                {point.statement}
              </p>
              <p
                className="font-sans font-normal mt-2"
                style={{ fontSize: 15, lineHeight: 1.7, color: '#A6ADB5' }}
              >
                {point.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .mx-auto {
            padding: 80px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
