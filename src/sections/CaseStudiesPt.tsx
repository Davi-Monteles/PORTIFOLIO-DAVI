import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  category: string;
  title: string;
  shortDesc: string;
  number: string;
  year: string;
  problem: string;
  solution: string;
  stack: string[];
  demonstrates: string;
  image: string;
  video?: string;
  objectPosition?: string;
}

const PROJECTS: Project[] = [
  {
    category: 'AGENTE DE STATS ESPORTIVOS EM TEMPO REAL',
    title: 'BetsCount',
    shortDesc: 'Um agente de IA multi-usuário no WhatsApp que rastreia estatísticas ao vivo por jogador, com memória isolada e contexto de partida ativo para cada operador.',
    number: '01 / 08',
    year: '2026',
    problem: 'Operadores de trading esportivo monitorando jogos ao vivo precisam de estatísticas em tempo real, mas as ferramentas que usam frequentemente travam ou lagam, forçando contagem manual sob pressão.',
    solution: 'Um agente de IA multi-usuário no WhatsApp que rastreia estatísticas de partida ao vivo por jogador, com memória totalmente isolada e contexto de jogo ativo por usuário. Testado com 5 operadores simultâneos antes de ir para produção.',
    stack: ['NODE.JS', 'WHATSAPP API (BAILEYS)', 'SUPABASE', 'CLAUDE API'],
    demonstrates: 'Arquitetura multi-tenant, isolamento de dados em tempo real, deploy em produção, confiabilidade de IA sob carga concorrente',
    image: '/projetos/betcounts.png',
  },
  {
    category: 'INTELIGÊNCIA DE LEADS',
    title: 'Lead OS',
    shortDesc: 'Um sistema de pesquisa e scoring de leads construído para encontrar, qualificar e organizar oportunidades de negócio.',
    number: '02 / 08',
    year: '2026',
    problem: 'Empresas perdem horas pesquisando leads manualmente, pontuando-os de forma inconsistente e perdendo prospects de alto valor em planilhas e caixas de entrada bagunçadas.',
    solution: 'Um sistema autônomo de prospecção B2B com um agente de IA que pesquisa, valida, pontua e faz contato com leads via WhatsApp — com regras de segurança anti-ban, deduplicação e um funil de outreach estruturado do contato inicial ao fechamento.',
    stack: ['PYTHON', 'N8N', 'GOOGLE SHEETS', 'APIs', 'APIFY', 'WHATSAPP API', 'AI AGENTS'],
    demonstrates: 'Automação de processos, lógica de scoring de leads, integração de APIs, pensamento sistêmico para negócios',
    image: '/projetos/lead inteligence.png',
  },
  {
    category: 'OPERACIONAL DE FITNESS',
    title: 'PowerFit',
    shortDesc: 'Uma plataforma operacional de fitness para personal trainers com gestão de alunos, estrutura de treinos e agendamento.',
    number: '03 / 08',
    year: '2026',
    problem: 'Personal trainers gerenciam alunos em ferramentas fragmentadas — grupos de WhatsApp, fichas de papel, múltiplos apps. Nenhum lugar único para treinos, progresso e agendamento.',
    solution: 'Uma plataforma centralizada de operações fitness com gestão de alunos, estruturação de treinos, lógica de agendamento e uma interface de produto limpa que substitui o caos.',
    stack: ['REACT', 'NODE.JS', 'POSTGRESQL', 'TAILWIND'],
    demonstrates: 'Design de produto, desenvolvimento full-stack, ferramentas operacionais, pensamento centrado no usuário',
    image: '/projetos/powerfit.jpeg',
    objectPosition: 'center 30%',
  },
  {
    category: 'AGENTE DE IA PARA NEGÓCIOS',
    title: 'Max AI',
    shortDesc: 'Um conceito de assistente de IA para operações, comunicação e fluxo de serviço de negócios locais.',
    number: '04 / 08',
    year: '2026',
    problem: 'Negócios locais perdem clientes devido a respostas lentas, mensagens perdidas e fluxo de serviço desorganizado. A equipe fica sobrecarregada com comunicação repetitiva.',
    solution: 'Um assistente de IA que gerencia consultas de clientes, agenda compromissos e administra a comunicação de serviço através de fluxos conversacionais integrados com ferramentas de negócio.',
    stack: ['OPENAI', 'N8N', 'WHATSAPP API', 'WEBHOOKS'],
    demonstrates: 'Design de agente de IA, automação de fluxos, orquestração de APIs, UX conversacional',
    image: '/projetos/max-ai.png',
  },
  {
    category: 'CONCEITO WEB CINEMATOGRÁFICO',
    title: 'Scary Movie 6',
    shortDesc: 'Um conceito de landing page cinematográfica focado em atmosfera, movimento, tipografia e storytelling visual.',
    number: '05 / 08',
    year: '2026',
    problem: 'A maioria das landing pages é visualmente plana. Elas comunicam informação mas não criam resposta emocional, atmosfera ou memorabilidade.',
    solution: 'Um conceito de landing page cinematográfica construído para clima, atmosfera e storytelling no estilo de entretenimento. Prova que o craft de front-end pode criar impacto emocional.',
    stack: ['NEXT.JS', 'GSAP', 'TAILWIND'],
    demonstrates: 'Design de movimento, craft de front-end cinematográfico, storytelling visual, direção criativa',
    image: '/assets/case-scary-movie.jpg',
    video: '/projetos/scary-movie.mp4',
  },
  {
    category: 'FERRAMENTA OPERACIONAL',
    title: 'Sheets Ops',
    shortDesc: 'Um sistema prático baseado em planilhas para organização de fluxos de trabalho e operações diárias.',
    number: '06 / 08',
    year: '2026',
    problem: 'Pequenos negócios e equipes precisam de ferramentas operacionais mas não têm orçamento para software sob medida. Usam planilhas de forma pobre — desestruturadas, propensas a erro, difíceis de manter.',
    solution: 'Um sistema Google Sheets propositalmente construído com fluxos de trabalho estruturados, cálculos automatizados, lógica de validação e arquitetura de dados limpa para operações diárias.',
    stack: ['GOOGLE APPS SCRIPT', 'SHEETS', 'FORMS'],
    demonstrates: 'Pensamento sistêmico prático, automação com ferramentas limitadas, design de processos',
    image: '/assets/case-sheets-ops.jpg',
    objectPosition: 'center 40%',
  },
  {
    category: 'IA PARA NEGÓCIOS LOCAIS',
    title: 'Barbershop AI',
    shortDesc: 'Um fluxo de suporte orientado por IA para comunicação com clientes e organização de serviços.',
    number: '07 / 08',
    year: '2026',
    problem: 'Barbearias perdem agendamentos, não acompanham preferências de clientes e têm dificuldade em responder a pedidos de reserva rapidamente.',
    solution: 'Um fluxo de suporte leve orientado por IA para comunicação com clientes — gerenciando reservas, lembretes, preferências e consultas de serviço através de respostas conversacionais automatizadas.',
    stack: ['N8N', 'OPENAI', 'WHATSAPP API'],
    demonstrates: 'IA para negócios locais, automação de fluxos, design de solução de baixo custo',
    image: '/projetos/barbershop-ai.png',
  },
  {
    category: 'CAPTURA DE LEADS / DEMO PARA NEGÓCIOS LOCAIS',
    title: 'Automotive Demo',
    shortDesc: 'Uma landing/demo premium para serviços automotivos construída para testar captura de leads, confiança visual e fluxo de conversão para negócios locais.',
    number: '08 / 08',
    year: '2026',
    problem: 'Negócios de serviços automotivos geralmente dependem apenas de Instagram ou WhatsApp, sem uma página estruturada para explicar serviços, capturar interesse e guiar clientes até um orçamento.',
    solution: 'Uma experiência de landing/demo refinada projetada para apresentar serviços claramente, criar confiança e direcionar clientes interessados para captura de leads ou fluxo no WhatsApp.',
    stack: ['WEB DESIGN', 'LANDING PAGE', 'CAPTURA DE LEADS', 'DIREÇÃO VISUAL'],
    demonstrates: 'Posicionamento de negócio local, landing pages focadas em conversão, criação de demo de vendas, pensamento de fluxo de leads',
    image: '/projetos/automotive-demo.png',
  },
];

export default function CaseStudiesPt() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true },
          }
        );
      }

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
          }
        );
      }

      panelsRef.current.forEach((panel) => {
        if (!panel) return;
        gsap.fromTo(
          panel,
          { opacity: 0, y: 40, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: panel, start: 'top 75%', once: true },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="case-studies" className="relative" style={{ backgroundColor: '#0B111A' }}>
      <div className="absolute inset-0 pointer-events-none section-nebula-bg" />
      <div
        ref={headerRef}
        className="mx-auto"
        style={{ maxWidth: 1280, padding: '140px 48px 0' }}
      >
        <span className="section-label block mb-6">03</span>
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
          TRABALHOS SELECIONADOS
        </h2>
        <p
          className="font-sans font-normal mt-4 mb-20"
          style={{
            fontSize: 16,
            color: '#5C5C62',
            maxWidth: 520,
            lineHeight: 1.7,
            opacity: 0,
          }}
        >
          Sistemas e produtos construídos para operações reais, clientes reais, resultados reais.
        </p>
      </div>

      <div
        ref={gridRef}
        className="mx-auto grid grid-cols-1 md:grid-cols-2"
        style={{ maxWidth: 1280, padding: '0 48px', gap: 32 }}
      >
        {PROJECTS.map((project, i) => (
          <div
            key={project.title}
            className="group relative overflow-hidden cursor-pointer transition-all duration-400"
            style={{
              borderRadius: 4,
              aspectRatio: '16/10',
              border: hoveredIndex === i ? '1px solid rgba(75,225,255,0.2)' : '1px solid rgba(75,225,255,0.08)',
              opacity: 0,
              boxShadow: hoveredIndex === i ? '0 0 40px rgba(75,225,255,0.1), inset 0 0 20px rgba(30,77,255,0.05)' : 'none',
              transform: hoveredIndex === i ? 'translateY(-4px)' : 'translateY(0)',
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {project.video ? (
              <video
                src={project.video}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-600"
                style={{
                  transform: hoveredIndex === i ? 'scale(1.03)' : 'scale(1)',
                  objectPosition: project.objectPosition || 'center',
                }}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-600"
                style={{
                  transform: hoveredIndex === i ? 'scale(1.03)' : 'scale(1)',
                  objectPosition: project.objectPosition || 'center',
                }}
                loading="lazy"
              />
            )}

            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(13,13,15,0.95) 0%, rgba(13,13,15,0.3) 40%, transparent 70%)',
              }}
            />

            <div
              className="absolute top-4 right-4 font-mono uppercase transition-opacity duration-300"
              style={{
                fontSize: 10,
                color: '#F0EDE6',
                letterSpacing: '0.1em',
                opacity: hoveredIndex === i ? 1 : 0,
              }}
            >
              VER &rarr;
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span
                className="font-mono uppercase block mb-2"
                style={{ fontSize: 10, color: '#7FFF6B', letterSpacing: '0.1em' }}
              >
                {project.category}
              </span>
              <h3
                className="font-serif font-normal"
                style={{
                  fontSize: 'clamp(24px, 3vw, 40px)',
                  color: '#F0EDE6',
                  lineHeight: 1.1,
                }}
              >
                {project.title}
              </h3>
              <p
                className="font-sans font-normal mt-2"
                style={{ fontSize: 14, color: '#5C5C62', lineHeight: 1.6, maxWidth: 400 }}
              >
                {project.shortDesc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-20" style={{ maxWidth: 1280, padding: '0 48px' }}>
        <div className="divider" />
      </div>

      <div className="mx-auto" style={{ maxWidth: 1280, padding: '0 48px' }}>
        {PROJECTS.map((project, i) => (
          <div
            key={`detail-${project.title}`}
            ref={(el) => { panelsRef.current[i] = el; }}
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{
              gap: 64,
              padding: '80px 0',
              borderTop: '1px solid rgba(75,225,255,0.08)',
              opacity: 0,
            }}
          >
            <div>
              <span
                className="font-mono block"
                style={{ fontSize: 11, color: '#7FFF6B', letterSpacing: '0.1em' }}
              >
                {project.number}
              </span>
              <h3
                className="font-serif font-normal mt-4"
                style={{
                  fontSize: 'clamp(32px, 4vw, 56px)',
                  color: '#F0EDE6',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                }}
              >
                {project.title}
              </h3>
              <span
                className="font-mono block mt-3"
                style={{ fontSize: 11, color: '#5C5C62', letterSpacing: '0.1em' }}
              >
                {project.category} &mdash; {project.year}
              </span>
            </div>

            <div>
              <div>
                <span
                  className="font-mono uppercase block mb-3"
                  style={{ fontSize: 10, color: '#7FFF6B', letterSpacing: '0.1em' }}
                >
                  PROBLEMA
                </span>
                <p className="font-sans font-normal" style={{ fontSize: 15, color: '#5C5C62', lineHeight: 1.7 }}>
                  {project.problem}
                </p>
              </div>

              <div className="mt-8">
                <span
                  className="font-mono uppercase block mb-3"
                  style={{ fontSize: 10, color: '#7FFF6B', letterSpacing: '0.1em' }}
                >
                  SOLUÇÃO
                </span>
                <p className="font-sans font-normal" style={{ fontSize: 15, color: '#F0EDE6', lineHeight: 1.7 }}>
                  {project.solution}
                </p>
              </div>

              <div className="mt-8">
                <span
                  className="font-mono uppercase block mb-3"
                  style={{ fontSize: 10, color: '#7FFF6B', letterSpacing: '0.1em' }}
                >
                  STACK
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono"
                      style={{
                        fontSize: 10,
                        color: '#5C5C62',
                        border: '1px solid rgba(75,225,255,0.15)',
                        borderRadius: 2,
                        padding: '4px 10px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <span
                  className="font-mono uppercase block mb-3"
                  style={{ fontSize: 10, color: '#7FFF6B', letterSpacing: '0.1em' }}
                >
                  DEMONSTRA
                </span>
                <p className="font-sans font-normal" style={{ fontSize: 15, color: '#5C5C62', lineHeight: 1.7 }}>
                  {project.demonstrates}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #case-studies .mx-auto {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
