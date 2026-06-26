import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    title: 'O QUE CONSTRUO',
    items: [
      'Sites & landing pages',
      'Agentes de IA & fluxos',
      'Sistemas de captura de leads',
      'Ferramentas internas',
      'Pipelines de automação',
      'Protótipos de produto',
    ],
  },
  {
    title: 'TECNOLOGIA',
    items: [
      'Next.js / React / TypeScript',
      'Python',
      'Node.js',
      'PostgreSQL',
      'n8n / Automação',
      'APIs & integrações',
    ],
  },
  {
    title: 'DESIGN',
    items: [
      'Design UI/UX',
      'Movimento & interação',
      'Sistemas de design',
      'Prototipagem',
      'Direção de marca',
      'Identidade visual',
    ],
  },
];

export default function CapabilitiesPt() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const catsRef = useRef<HTMLDivElement>(null);

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

      if (catsRef.current) {
        gsap.fromTo(
          catsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: catsRef.current, start: 'top 75%', once: true },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#070B12',
        borderTop: '1px solid rgba(75,225,255,0.08)',
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: 1280, padding: '140px 48px' }}
      >
        <div ref={headerRef}>
          <span className="section-label block mb-6">05</span>
          <h2
            className="font-serif font-normal uppercase"
            style={{
              fontSize: 'clamp(48px, 7vw, 120px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              color: '#F3F1EA',
              opacity: 0,
            }}
          >
            CAPACIDADES
          </h2>
        </div>

        <div
          ref={catsRef}
          className="grid grid-cols-1 md:grid-cols-3 mt-20"
          style={{ gap: 64 }}
        >
          {CATEGORIES.map((cat) => (
            <div key={cat.title} style={{ opacity: 0 }}>
              <span
                className="font-mono uppercase block mb-5"
                style={{ fontSize: 11, color: '#7FFF6B', letterSpacing: '0.1em' }}
              >
                {cat.title}
              </span>
              <ul className="list-none p-0 m-0">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="font-sans py-1.5"
                    style={{ fontSize: 16, color: '#F3F1EA', lineHeight: 2.2 }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section .mx-auto {
            padding: 80px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
