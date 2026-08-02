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
  evidenceUrl?: string;
  evidenceLabel?: string;
}

const ALL_PROJECTS: Project[] = [
  {
    category: 'REAL-TIME SPORTS STATS AGENT',
    title: 'BetsCount',
    shortDesc: 'A multi-user WhatsApp agent case study for live player-stat tracking with isolated user context.',
    number: '01 / 08',
    year: '2026',
    status: 'REAL-USE CASE STUDY',
    statusDetail: 'Private code and user data. A sanitized public case study is available.',
    problem: 'Sports trading operators monitoring live games need real-time stat tracking, but the tools they use often crash or lag, forcing manual counting under pressure.',
    solution: 'A Northflank-hosted multi-user agent used by real users. It was tested with five simultaneous operators and keeps context isolated per user. The code remains private and is presented here as a case study.',
    stack: ['PYTHON', 'POSTGRESQL', 'SUPABASE', 'APIS', 'NORTHFLANK'],
    demonstrates: 'Multi-user context isolation, conversational integrations and real-time workflows',
    image: '/projetos/betcounts.png',
    evidenceUrl: 'https://github.com/Davi-Monteles/project-case-studies/blob/main/betscount.md',
    evidenceLabel: 'VIEW CASE STUDY',
  },
  {
    category: 'LEAD INTELLIGENCE',
    title: 'Lead Intelligence OS',
    shortDesc: 'A local functional tool that researches, validates, classifies and organizes B2B leads.',
    number: '02 / 08',
    year: '2026',
    status: 'LOCAL FUNCTIONAL SYSTEM',
    statusDetail: 'Runs locally. A sanitized public case study is available.',
    problem: 'B2B prospecting can become fragmented when research, validation, scoring and contact preparation happen across disconnected steps.',
    solution: 'A local tool that combines lead research, validation, classification, scoring criteria and contact automation. Its current workflow processes batches of approximately 20 leads.',
    stack: ['PYTHON', 'N8N', 'GOOGLE SHEETS', 'APIs', 'APIFY', 'WHATSAPP API', 'AI AGENTS'],
    demonstrates: 'Lead research, scoring logic, contact automation and workflow design',
    image: '/projetos/lead inteligence.png',
    evidenceUrl: 'https://github.com/Davi-Monteles/project-case-studies/blob/main/lead-intelligence-os.md',
    evidenceLabel: 'VIEW CASE STUDY',
  },
  {
    category: 'FITNESS OPERATIONS',
    title: 'PowerFit',
    shortDesc: 'A functional web-app demo and pilot for a real client, designed for trainers and students.',
    number: '03 / 08',
    year: '2026',
    status: 'FUNCTIONAL CLIENT PILOT',
    statusDetail: 'Paid functional pilot with a public demonstration.',
    problem: 'Personal trainers manage students across fragmented tools — WhatsApp groups, paper logs, multiple apps. No single place for workouts, progress, and scheduling.',
    solution: 'A paid functional pilot for a real client that brings trainer and student experiences into one web application. The public React, JavaScript and Vite demo uses local browser storage; Supabase/PostgreSQL modeling and integration were part of the project but are not fully connected in the public version.',
    stack: ['REACT', 'JAVASCRIPT', 'VITE', 'SUPABASE', 'POSTGRESQL'],
    demonstrates: 'Full-stack product work, trainer/student experience and data modeling',
    image: '/projetos/powerfit.jpeg',
    objectPosition: 'center 30%',
    demoUrl: 'https://powerfit-app.vercel.app',
    demoLabel: 'OPEN DEMO',
  },
  {
    category: 'AI BUSINESS AGENT',
    title: 'Max AI',
    shortDesc: 'A prototype for an AI assistant supporting local-business communication and service flow.',
    number: '04 / 08',
    year: '2026',
    status: 'CONCEPT PROTOTYPE',
    statusDetail: 'No public link available.',
    problem: 'Local businesses lose customers to slow response times, missed messages and disorganized service flow. Staff is overwhelmed with repetitive communication.',
    solution: 'A prototype that explores conversational workflows for inquiries, scheduling and service communication.',
    stack: ['OPENAI', 'N8N', 'WHATSAPP API', 'WEBHOOKS'],
    demonstrates: 'AI agent design, workflow automation and conversational UX',
    image: '/projetos/max-ai.png',
  },
  {
    category: 'CINEMATIC WEB CONCEPT',
    title: 'Scary Movie 6',
    shortDesc: 'A visual prototype focused on atmosphere, motion, typography and storytelling.',
    number: '05 / 08',
    year: '2026',
    status: 'VISUAL PROTOTYPE',
    statusDetail: 'Visual preview available on this page.',
    problem: 'Most landing pages are visually flat. They communicate information but create no emotional response, no atmosphere, no memorability.',
    solution: 'A visual prototype exploring cinematic motion, typography and entertainment-style storytelling.',
    stack: ['NEXT.JS', 'GSAP', 'TAILWIND'],
    demonstrates: 'Motion design, front-end craft and visual storytelling',
    image: '/assets/case-scary-movie.jpg',
    video: '/projetos/scary-movie.mp4',
  },
  {
    category: 'OPERATIONS TOOL',
    title: 'Sheets Ops',
    shortDesc: 'A private internal tool for workflow organization and daily operations.',
    number: '06 / 08',
    year: '2026',
    status: 'PRIVATE INTERNAL TOOL',
    statusDetail: 'Private project - no public link.',
    problem: 'Small businesses and teams need operational tools but lack budget for custom software. They default to spreadsheets used poorly — unstructured, error-prone, hard to maintain.',
    solution: 'A spreadsheet-based internal tool with organized workflows, calculations and validation logic.',
    stack: ['GOOGLE APPS SCRIPT', 'SHEETS', 'FORMS'],
    demonstrates: 'Process design, automation on limited tooling and data organization',
    image: '/assets/case-sheets-ops.jpg',
    objectPosition: 'center 40%',
  },
  {
    category: 'LOCAL BUSINESS AI',
    title: 'Barbershop AI',
    shortDesc: 'An automation prototype for service and booking flows.',
    number: '07 / 08',
    year: '2026',
    status: 'AUTOMATION PROTOTYPE',
    statusDetail: 'No public link available.',
    problem: 'Barbershops miss appointments, lose track of customer preferences and struggle to respond to booking inquiries quickly enough.',
    solution: 'An automation prototype for customer-service and booking flows. It is not currently in use, had no real client and is not a production system.',
    stack: ['N8N', 'OPENAI', 'WHATSAPP API'],
    demonstrates: 'Conversational automation, workflow design and local-business service flows',
    image: '/projetos/barbershop-ai.png',
  },
  {
    category: 'LEAD CAPTURE / LOCAL BUSINESS DEMO',
    title: 'Automotive Demo',
    shortDesc: 'A presentation demo for automotive services, focused on lead capture and visual trust.',
    number: '08 / 08',
    year: '2026',
    status: 'PRESENTATION DEMO',
    statusDetail: 'No public link available.',
    problem: 'Automotive service businesses often rely on Instagram or WhatsApp alone, with no structured page to explain services, capture interest and guide customers toward a quote.',
    solution: 'A presentation demo that explores service communication, trust signals and a lead-capture flow.',
    stack: ['WEB DESIGN', 'LANDING PAGE', 'LEAD CAPTURE', 'VISUAL DIRECTION'],
    demonstrates: 'Landing-page direction, lead-capture flows and service positioning',
    image: '/projetos/automotive-demo.png',
  },
  { category: 'COMMUNITY OPERATIONS', title: 'Discord Server & Bot', shortDesc: 'A functional private project delivered for a client, covering the server and its bot.', number: '03 / 08', year: '2026', status: 'PRIVATE CLIENT PROJECT', statusDetail: 'Private code and community details. A sanitized public case study is available.', problem: 'Community operations need clear roles, permissions and repeatable automation to keep participation organized.', solution: 'A functional Discord server and bot built and delivered for a client, with automation, roles, permissions and community-operation flows. Private implementation details remain protected.', stack: ['DISCORD', 'NODE.JS', 'AUTOMATION', 'ROLE MANAGEMENT'], demonstrates: 'Client delivery, community workflows, permissions and automation design', image: '/assets/lab-reportazap.jpg', evidenceUrl: 'https://github.com/Davi-Monteles/project-case-studies/blob/main/discord-automation.md', evidenceLabel: 'VIEW CASE STUDY' },
  { category: 'JOB SEARCH WORKFLOW', title: 'Hunter Jobs', shortDesc: 'A functional internal tool that researches, filters and classifies job opportunities.', number: '05 / 08', year: '2026', status: 'FUNCTIONAL INTERNAL TOOL', statusDetail: 'A sanitized public version is available.', problem: 'Searching for roles across multiple sources creates repetitive research and makes it harder to organize relevant opportunities.', solution: 'A functional personal tool that researches, filters and classifies opportunities to support a more organized job-search workflow.', stack: ['PYTHON', 'AUTOMATION', 'APIS', 'AI WORKFLOWS'], demonstrates: 'Personal workflow design, opportunity classification and automation', image: '/assets/lab-lead-capture.jpg', evidenceUrl: 'https://github.com/Davi-Monteles/hunter-jobs', evidenceLabel: 'VIEW REPOSITORY' },
];

const PUBLIC_PROJECT_TITLES = ['Lead Intelligence OS', 'BetsCount', 'Discord Server & Bot', 'PowerFit', 'Hunter Jobs'];
const PUBLIC_PROJECTS: Project[] = PUBLIC_PROJECT_TITLES.map((title, index) => ({ ...(ALL_PROJECTS.find((project) => project.title === title) as Project), number: String(index + 1).padStart(2, '0') + ' / 05' }));

export default function CaseStudies() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      // Header entrance
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

      // Grid cards entrance
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

      // Detail panels entrance
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
      {/* Section Header */}
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
          SELECTED WORK
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
          Selected projects, functional tools, and prototypes that show how I turn problems into software.
        </p>
      </div>

      {/* Project Grid */}
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
            {/* Media */}
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
                aria-label={'Video preview of ' + project.title}
              />
            ) : (
              <img
                src={project.image}
                alt={'Preview of ' + project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-600"
                style={{
                  filter: 'brightness(1.13) contrast(1.06)',
                  transform: hoveredIndex === i ? 'scale(1.03)' : 'scale(1)',
                  objectPosition: project.objectPosition || 'center',
                }}
                loading="lazy"
              />
            )}

            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(5,7,10,0.82) 0%, rgba(5,7,10,0.48) 42%, rgba(5,7,10,0.08) 72%, transparent 100%)',
              }}
            />
            <span className="absolute top-4 right-4 font-mono uppercase" style={{ fontSize: 9, color: '#F0EDE6', letterSpacing: '0.08em', border: '1px solid rgba(240,237,230,0.2)', backgroundColor: 'rgba(5,7,10,0.68)', padding: '5px 8px' }}>
              {project.status}
            </span>

            {/* Text content */}
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

      {/* Divider after grid */}
      <div className="mx-auto mt-20" style={{ maxWidth: 1280, padding: '0 48px' }}>
        <div className="divider" />
      </div>

      {/* Detail Panels */}
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
            {/* Left: Title */}
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
              {project.evidenceUrl && <a href={project.evidenceUrl} target="_blank" rel="noopener noreferrer" className="inline-block font-mono mt-6" style={{ fontSize: 11, color: '#0D0D0F', backgroundColor: '#7FFF6B', letterSpacing: '0.1em', padding: '12px 16px' }}>{project.evidenceLabel} <span aria-hidden="true">&rarr;</span></a>}
            </div>

            {/* Right: Details */}
            <div>
              {/* Problem */}
              <div>
                <span
                  className="font-mono uppercase block mb-3"
                  style={{ fontSize: 10, color: '#7FFF6B', letterSpacing: '0.1em' }}
                >
                  PROBLEM
                </span>
                <p className="font-sans font-normal" style={{ fontSize: 15, color: '#8D939C', lineHeight: 1.7 }}>
                  {project.problem}
                </p>
              </div>

              {/* Solution */}
              <div className="mt-8">
                <span
                  className="font-mono uppercase block mb-3"
                  style={{ fontSize: 10, color: '#7FFF6B', letterSpacing: '0.1em' }}
                >
                  SOLUTION
                </span>
                <p className="font-sans font-normal" style={{ fontSize: 15, color: '#F0EDE6', lineHeight: 1.7 }}>
                  {project.solution}
                </p>
              </div>

              {/* Stack */}
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

              {/* Demonstrates */}
              <div className="mt-8">
                <span
                  className="font-mono uppercase block mb-3"
                  style={{ fontSize: 10, color: '#7FFF6B', letterSpacing: '0.1em' }}
                >
                  FOCUS
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
