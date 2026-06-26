import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '6+', label: 'PROJETOS' },
  { value: '3', label: 'SISTEMAS ATIVOS' },
  { value: '18', label: 'ANOS' },
];

export default function AboutPt() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.about-animate'),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ backgroundColor: '#0B111A' }}
      className="py-20 md:py-40 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none aurora-glow-subtle opacity-30" />
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
        <div
          className="about-animate relative w-full aspect-[4/5] overflow-hidden order-2 md:order-1"
          style={{
            borderRadius: '4px',
            border: '1px solid rgba(75, 225, 255, 0.15)',
            boxShadow: '0 0 40px rgba(75, 225, 255, 0.06), 0 0 80px rgba(30, 77, 255, 0.04)',
          }}
        >
          <img
            src="/davi-profile-2.jpeg"
            alt="Davi Monteles"
            className="w-full h-full object-cover transition-all duration-500"
            style={{ filter: 'grayscale(0.2) contrast(1.1) brightness(1.05)' }}
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(5,7,10,0.75) 0%, transparent 50%)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(75,225,255,0.4), transparent)' }}
          />
        </div>

        <div className="text-left order-1 md:order-2">
          <span className="about-animate section-label block mb-8">03 / SOBRE</span>

          <p className="about-animate font-sans text-[15px] font-normal leading-relaxed" style={{ color: '#878A8C' }}>
            <span className="block text-off-white font-medium text-lg mb-4">
              Sou Davi Monteles, um builder de 18 anos do Brasil trabalhando na interseção entre web, IA e automação.
            </span>
            Construo sistemas digitais práticos: sites que comunicam claramente, fluxos de IA que suportam operações e ferramentas que ajudam pequenas equipes a se mover mais rápido.
          </p>

          <p className="about-animate font-sans text-[15px] font-normal leading-relaxed mt-6" style={{ color: '#878A8C' }}>
            Estou no início da minha carreira, mas aprendo construindo, testando e entregando projetos reais. Já trabalho com clientes reais, automatizando o atendimento deles com IA.
          </p>

          <div className="about-animate flex flex-wrap gap-8 md:gap-12 mt-10">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-3xl text-off-white">{stat.value}</div>
                <div
                  className="font-mono text-[10px] tracking-widest mt-1"
                  style={{ color: '#878A8C', letterSpacing: '0.08em' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
