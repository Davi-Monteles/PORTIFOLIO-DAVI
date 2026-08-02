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
  status: string;
  statusDetail: string;
  problem: string;
  solution: string;
  stack: string[];
  demonstrates: string;
  image: string;
  video?: string;
  objectPosition?: string;
  demoUrl?: string;
  demoLabel?: string;
}

const ALL_PROJECTS: Project[] = [
  {
    category: 'AGENTE DE STATS ESPORTIVOS EM TEMPO REAL',
    title: 'BetsCount',
    shortDesc: 'Um projeto de agente no WhatsApp para rastrear estatísticas de jogadores ao vivo com contexto isolado por usuário.',
    number: '01 / 08',
    year: '2026',
    status: 'FERRAMENTA INTERNA PRIVADA',
    statusDetail: 'Projeto privado - sem link público.',
    problem: 'Operadores de trading esportivo monitorando jogos ao vivo precisam de estatísticas em tempo real, mas as ferramentas que usam frequentemente travam ou lagam, forçando contagem manual sob pressão.',
    solution: 'Um projeto funcional de agente estruturado em torno de contexto por usuário, memória isolada e fluxos de acompanhamento ao vivo.',
    stack: ['NODE.JS', 'WHATSAPP API (BAILEYS)', 'SUPABASE', 'CLAUDE API'],
    demonstrates: 'Isolamento de dados, fluxos em tempo real e integrações conversacionais',
    image: '/projetos/betcounts.png',
  },
  {
    category: 'INTELIGÊNCIA DE LEADS',
    title: 'Lead OS',
    shortDesc: 'Um piloto de automação para pesquisar, qualificar e organizar oportunidades de negócio.',
    number: '02 / 08',
    year: '2026',
    status: 'PILOTO DE AUTOMAÇÃO',
    statusDetail: 'Sem link público disponível.',
    problem: 'Empresas perdem horas pesquisando leads manualmente, pontuando-os de forma inconsistente e perdendo prospects de alto valor em planilhas e caixas de entrada bagunçadas.',
    solution: 'Um piloto de automação que estrutura pesquisa, validação, pontuação e etapas de contato em um fluxo.',
    stack: ['PYTHON', 'N8N', 'GOOGLE SHEETS', 'APIs', 'APIFY', 'WHATSAPP API', 'AI AGENTS'],
    demonstrates: 'Automação de processos, lógica de pontuação e integração de APIs',
    image: '/projetos/lead inteligence.png',
  },
  {
    category: 'OPERACIONAL DE FITNESS',
    title: 'PowerFit',
    shortDesc: 'Um protótipo funcional para personal trainers com gestão de alunos, treinos e agenda.',
    number: '03 / 08',
    year: '2026',
    status: 'PROTÓTIPO FUNCIONAL',
    statusDetail: 'Sem link público disponível.',
    problem: 'Personal trainers gerenciam alunos em ferramentas fragmentadas — grupos de WhatsApp, fichas de papel, múltiplos apps. Nenhum lugar único para treinos, progresso e agendamento.',
    solution: 'Um protótipo funcional de produto que reúne gestão de alunos, estrutura de treinos e agenda em uma interface.',
    stack: ['REACT', 'NODE.JS', 'POSTGRESQL', 'TAILWIND'],
    demonstrates: 'Design de produto, desenvolvimento full-stack e ferramentas operacionais',
    image: '/projetos/powerfit.jpeg',
    objectPosition: 'center 30%',
  },
  {
    category: 'AGENTE DE IA PARA NEGÓCIOS',
    title: 'Max AI',
    shortDesc: 'Um protótipo de assistente de IA para comunicação e fluxo de serviço de negócios locais.',
    number: '04 / 08',
    year: '2026',
    status: 'PROTÓTIPO CONCEITUAL',
    statusDetail: 'Sem link público disponível.',
    problem: 'Negócios locais perdem clientes devido a respostas lentas, mensagens perdidas e fluxo de serviço desorganizado. A equipe fica sobrecarregada com comunicação repetitiva.',
    solution: 'Um protótipo que explora fluxos conversacionais para consultas, agendamentos e comunicação de serviço.',
    stack: ['OPENAI', 'N8N', 'WHATSAPP API', 'WEBHOOKS'],
    demonstrates: 'Design de agente de IA, automação de fluxo e UX conversacional',
    image: '/projetos/max-ai.png',
  },
  {
    category: 'CONCEITO WEB CINEMATOGRÁFICO',
    title: 'Scary Movie 6',
    shortDesc: 'Um protótipo visual focado em atmosfera, movimento, tipografia e narrativa.',
    number: '05 / 08',
    year: '2026',
    status: 'PROTÓTIPO VISUAL',
    statusDetail: 'Prévia em vídeo disponível nesta página.',
    problem: 'A maioria das landing pages é visualmente plana. Elas comunicam informação mas não criam resposta emocional, atmosfera ou memorabilidade.',
    solution: 'Um protótipo visual que explora movimento cinematográfico, tipografia e narrativa de entretenimento.',
    stack: ['NEXT.JS', 'GSAP', 'TAILWIND'],
    demonstrates: 'Motion design, desenvolvimento front-end e narrativa visual',
    image: '/assets/case-scary-movie.jpg',
    video: '/projetos/scary-movie.mp4',
  },
  {
    category: 'FERRAMENTA OPERACIONAL',
    title: 'Sheets Ops',
    shortDesc: 'Uma ferramenta interna privada para organização de fluxos de trabalho e operações diárias.',
    number: '06 / 08',
    year: '2026',
    status: 'FERRAMENTA INTERNA PRIVADA',
    statusDetail: 'Projeto privado - sem link público.',
    problem: 'Pequenos negócios e equipes precisam de ferramentas operacionais mas não têm orçamento para software sob medida. Usam planilhas de forma pobre — desestruturadas, propensas a erro, difíceis de manter.',
    solution: 'Uma ferramenta interna baseada em planilhas, com fluxos organizados, cálculos e lógica de validação.',
    stack: ['GOOGLE APPS SCRIPT', 'SHEETS', 'FORMS'],
    demonstrates: 'Design de processos, automação com ferramentas acessíveis e organização de dados',
    image: '/assets/case-sheets-ops.jpg',
    objectPosition: 'center 40%',
  },
  {
    category: 'IA PARA NEGÓCIOS LOCAIS',
    title: 'Barbershop AI',
    shortDesc: 'Um piloto de automação para comunicação com clientes e organização de serviços.',
    number: '07 / 08',
    year: '2026',
    status: 'PILOTO DE AUTOMAÇÃO',
    statusDetail: 'Sem link público disponível.',
    problem: 'Barbearias perdem agendamentos, não acompanham preferências de clientes e têm dificuldade em responder a pedidos de reserva rapidamente.',
    solution: 'Um piloto de automação que explora fluxos conversacionais para reservas, lembretes e preferências.',
    stack: ['N8N', 'OPENAI', 'WHATSAPP API'],
    demonstrates: 'Automação conversacional, design de fluxo e atendimento local',
    image: '/projetos/barbershop-ai.png',
  },
  {
    category: 'CAPTURA DE LEADS / DEMO PARA NEGÓCIOS LOCAIS',
    title: 'Automotive Demo',
    shortDesc: 'Uma demo de apresentação para serviços automotivos, focada em captação de leads e confiança visual.',
    number: '08 / 08',
    year: '2026',
    status: 'DEMO DE APRESENTAÇÃO',
    statusDetail: 'Sem link público disponível.',
    problem: 'Negócios de serviços automotivos geralmente dependem apenas de Instagram ou WhatsApp, sem uma página estruturada para explicar serviços, capturar interesse e guiar clientes até um orçamento.',
    solution: 'Uma demo de apresentação que explora comunicação de serviços, sinais de confiança e fluxo de captação.',
    stack: ['WEB DESIGN', 'LANDING PAGE', 'CAPTURA DE LEADS', 'DIREÇÃO VISUAL'],
    demonstrates: 'Direção de landing page, fluxos de captação e posicionamento de serviços',
    image: '/projetos/automotive-demo.png',
  },
];

void ALL_PROJECTS;

const PUBLIC_PROJECTS: Project[] = [
  {
    category: 'INTELIGÊNCIA DE LEADS B2B',
    title: 'Lead Intelligence OS',
    shortDesc: 'Ferramenta interna funcional para pesquisar, validar, pontuar e organizar leads B2B.',
    number: '01 / 05',
    year: '2026',
    status: 'FERRAMENTA FUNCIONAL LOCAL',
    statusDetail: 'Executada localmente; sem demonstração pública.',
    problem: 'Pesquisa, validação, scoring e organização podem ficar fragmentados em diferentes etapas.',
    solution: 'Ferramenta local que integra pesquisa, validação, scoring e organização. O fluxo atual trabalha com lotes de aproximadamente 20 leads.',
    stack: ['PYTHON', 'POSTGRESQL', 'SUPABASE', 'APIS DE LLM', 'WEB SCRAPING'],
    demonstrates: 'Pipeline de dados, scoring e automação de processos',
    image: '/projetos/lead inteligence.png',
  },
  {
    category: 'AGENTE MULTIUSUÁRIO',
    title: 'BetsCount',
    shortDesc: 'Estudo de caso de uma ferramenta privada com contexto isolado e persistência.',
    number: '02 / 05',
    year: '2026',
    status: 'ESTUDO DE CASO COM USO REAL',
    statusDetail: 'Código privado; nenhum dado de usuário é exposto.',
    problem: 'Operadores precisam consultar informações em tempo real sem compartilhar contexto entre usuários.',
    solution: 'Ferramenta privada hospedada na Northflank, com usuários reais, testada com cinco operadores simultâneos e contexto isolado por usuário.',
    stack: ['PYTHON', 'POSTGRESQL', 'SUPABASE', 'APIS', 'NORTHFLANK'],
    demonstrates: 'Isolamento de contexto, persistência e fluxos multiusuário',
    image: '/projetos/betcounts.png',
  },
  {
    category: 'OPERAÇÕES DE COMUNIDADE',
    title: 'Servidor e Bot Discord',
    shortDesc: 'Servidor e bot construídos e entregues para um cliente real.',
    number: '03 / 05',
    year: '2026',
    status: 'PROJETO PRIVADO PARA CLIENTE',
    statusDetail: 'Código e detalhes da comunidade permanecem privados.',
    problem: 'Comunidades precisam de cargos, permissões e automações para operar de forma organizada.',
    solution: 'Servidor e bot Discord construídos sob medida, com estrutura de cargos, permissões e automações.',
    stack: ['NODE.JS', 'DISCORD.JS', 'APIS', 'AUTOMAÇÃO'],
    demonstrates: 'Entrega para cliente, permissões e automação',
    image: '/assets/lab-reportazap.jpg',
  },
  {
    category: 'EXPERIÊNCIA FITNESS',
    title: 'PowerFit',
    shortDesc: 'Piloto funcional remunerado para cliente real, com demonstração pública.',
    number: '04 / 05',
    year: '2026',
    status: 'PILOTO FUNCIONAL REMUNERADO',
    statusDetail: 'Demonstração pública disponível.',
    problem: 'Personal trainers gerenciam alunos, treinos e rotinas em ferramentas fragmentadas.',
    solution: 'A versão pública usa React, JavaScript, Vite e armazenamento local. A modelagem e integração com Supabase/PostgreSQL fizeram parte do projeto, mas não estão integralmente conectadas à demonstração.',
    stack: ['REACT', 'JAVASCRIPT', 'VITE', 'SUPABASE', 'POSTGRESQL'],
    demonstrates: 'Produto full-stack, interface e modelagem de dados',
    image: '/projetos/powerfit.jpeg',
    demoUrl: 'https://powerfit-app.vercel.app',
    demoLabel: 'ABRIR DEMO',
  },
  {
    category: 'BUSCA POR VAGAS',
    title: 'Hunter Jobs',
    shortDesc: 'Ferramenta interna funcional que pesquisa, filtra, pontua e organiza oportunidades.',
    number: '05 / 05',
    year: '2026',
    status: 'FERRAMENTA INTERNA FUNCIONAL',
    statusDetail: 'Uma edição pública sanitizada está sendo preparada.',
    problem: 'Buscar vagas em várias fontes cria pesquisa repetitiva e dificulta a priorização.',
    solution: 'Ferramenta de uso próprio que organiza oportunidades por aderência, senioridade e prioridade, com dashboard e tiers.',
    stack: ['PYTHON', 'WEB SCRAPING', 'APIS DE LLM', 'DASHBOARD WEB'],
    demonstrates: 'Scoring, automação e organização de oportunidades',
    image: '/assets/lab-lead-capture.jpg',
  },
];

export default function CaseStudiesPt() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
            color: '#8D939C',
            maxWidth: 520,
            lineHeight: 1.7,
            opacity: 0,
          }}
        >
          Projetos selecionados, ferramentas funcionais e protótipos que mostram como transformo problemas em software.
        </p>
      </div>

      <div
        ref={gridRef}
        className="mx-auto grid grid-cols-1 md:grid-cols-2"
        style={{ maxWidth: 1280, padding: '0 48px', gap: 32 }}
      >
        {PUBLIC_PROJECTS.map((project, i) => (
          <article
            key={project.title}
            aria-labelledby={'project-' + i} className="group relative overflow-hidden transition-all duration-400"
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
                  filter: 'brightness(1.13) contrast(1.06)',
                  transform: hoveredIndex === i ? 'scale(1.03)' : 'scale(1)',
                  objectPosition: project.objectPosition || 'center',
                }}
                autoPlay={!prefersReducedMotion}
                muted
                loop
                playsInline
                preload="metadata"
                poster={project.image}
                aria-label={'Prévia em vídeo de ' + project.title}
              />
            ) : (
              <img
                src={project.image}
                alt={'Prévia de ' + project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-600"
                style={{
                  filter: 'brightness(1.13) contrast(1.06)',
                  transform: hoveredIndex === i ? 'scale(1.03)' : 'scale(1)',
                  objectPosition: project.objectPosition || 'center',
                }}
                loading="lazy"
              />
            )}

            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(5,7,10,0.82) 0%, rgba(5,7,10,0.48) 42%, rgba(5,7,10,0.08) 72%, transparent 100%)',
              }}
            />

            <div
              className="absolute top-4 right-4 font-mono uppercase transition-opacity duration-300"
              style={{
                fontSize: 10,
                color: '#F0EDE6',
                letterSpacing: '0.08em',
                backgroundColor: 'rgba(5,7,10,0.74)',
                border: '1px solid rgba(240,237,230,0.28)',
                padding: '5px 8px',
                opacity: 1,
              }}
            >
              {project.status}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8" style={{ background: 'linear-gradient(to top, rgba(5,7,10,0.38), transparent)' }}>
              <span
                className="font-mono uppercase block mb-2"
                style={{ fontSize: 10, color: '#7FFF6B', letterSpacing: '0.1em' }}
              >
                {project.category}
              </span>
              <h3
                id={'project-' + i}
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
                style={{ fontSize: 14, color: '#D2D8DE', lineHeight: 1.6, maxWidth: 400, textShadow: '0 1px 14px rgba(0,0,0,0.75)' }}
              >
                {project.shortDesc}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-20" style={{ maxWidth: 1280, padding: '0 48px' }}>
        <div className="divider" />
      </div>

      <div className="mx-auto" style={{ maxWidth: 1280, padding: '0 48px' }}>
        {PUBLIC_PROJECTS.map((project, i) => (
          <div
            key={`detail-${project.title}`}
            ref={(el) => { panelsRef.current[i] = el; }}
            className="project-detail grid grid-cols-1 lg:grid-cols-2"
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
                style={{ fontSize: 11, color: '#8D939C', letterSpacing: '0.1em' }}
              >
                {project.category} &mdash; {project.year}
              </span>
              <span className="font-mono inline-block mt-5" style={{ fontSize: 10, color: '#F0EDE6', letterSpacing: '0.08em', border: '1px solid rgba(240,237,230,0.2)', padding: '5px 8px' }}>{project.status}</span>
              <p className="font-sans mt-3" style={{ fontSize: 14, color: '#8D939C', lineHeight: 1.6 }}>{project.statusDetail}</p>
              {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-block font-mono mt-6" style={{ fontSize: 11, color: '#0D0D0F', backgroundColor: '#7FFF6B', letterSpacing: '0.1em', padding: '12px 16px' }}>{project.demoLabel} <span aria-hidden="true">&rarr;</span></a>}
            </div>

            <div>
              <div>
                <span
                  className="font-mono uppercase block mb-3"
                  style={{ fontSize: 10, color: '#7FFF6B', letterSpacing: '0.1em' }}
                >
                  PROBLEMA
                </span>
                <p className="font-sans font-normal" style={{ fontSize: 15, color: '#8D939C', lineHeight: 1.7 }}>
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
                        color: '#8D939C',
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
                  FOCO
                </span>
                <p className="font-sans font-normal" style={{ fontSize: 15, color: '#8D939C', lineHeight: 1.7 }}>
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
          #case-studies .project-detail {
            gap: 32px !important;
            padding: 48px 0 !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
