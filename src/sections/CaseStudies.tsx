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
    category: 'REAL-TIME SPORTS STATS AGENT',
    title: 'BetsCount',
    shortDesc: 'A multi-user WhatsApp AI agent that tracks live match stats per player, with isolated memory and active-game context for each operator.',
    number: '01 / 08',
    year: '2026',
    problem: 'Sports trading operators monitoring live games need real-time stat tracking, but the tools they use often crash or lag, forcing manual counting under pressure.',
    solution: 'A multi-user WhatsApp AI agent that tracks live match stats per player, with fully isolated memory and active-game context per user. Tested with 5 simultaneous operators before deploying to production.',
    stack: ['NODE.JS', 'WHATSAPP API (BAILEYS)', 'SUPABASE', 'CLAUDE API'],
    demonstrates: 'Multi-tenant architecture, real-time data isolation, production deployment, AI agent reliability under concurrent load',
    image: '/projetos/betcounts.png',
  },
  {
    category: 'LEAD INTELLIGENCE',
    title: 'Lead OS',
    shortDesc: 'A lead research and scoring system built to find, qualify and organize business opportunities.',
    number: '02 / 08',
    year: '2026',
    problem: 'Businesses waste hours manually researching leads, scoring them inconsistently, and losing track of high-value prospects in messy spreadsheets and inboxes.',
    solution: 'An autonomous B2B prospecting system with an AI agent that researches, validates, scores and reaches out to leads via WhatsApp — with anti-ban safety rules, deduplication, and a structured outreach funnel from cold contact to closed deal.',
    stack: ['PYTHON', 'N8N', 'GOOGLE SHEETS', 'APIs', 'APIFY', 'WHATSAPP API', 'AI AGENTS'],
    demonstrates: 'Process automation, lead scoring logic, API integration, business systems thinking',
    image: '/projetos/lead inteligence.png',
  },
  {
    category: 'FITNESS OPERATIONS',
    title: 'PowerFit',
    shortDesc: 'A fitness operations platform for personal trainers with student management, workout structure and scheduling.',
    number: '03 / 08',
    year: '2026',
    problem: 'Personal trainers manage students across fragmented tools — WhatsApp groups, paper logs, multiple apps. No single place for workouts, progress, and scheduling.',
    solution: 'A centralized fitness operations platform with student management, workout structuring, scheduling logic and a clean product interface that replaces the chaos.',
    stack: ['REACT', 'NODE.JS', 'POSTGRESQL', 'TAILWIND'],
    demonstrates: 'Product design, full-stack development, operations tooling, user-centered thinking',
    image: '/projetos/powerfit.jpeg',
    objectPosition: 'center 30%',
  },
  {
    category: 'AI BUSINESS AGENT',
    title: 'Max AI',
    shortDesc: 'An AI assistant concept for local business operations, communication and service flow.',
    number: '04 / 08',
    year: '2026',
    problem: 'Local businesses lose customers to slow response times, missed messages and disorganized service flow. Staff is overwhelmed with repetitive communication.',
    solution: 'An AI assistant that handles customer inquiries, schedules appointments and manages service communication through conversational workflows integrated with business tools.',
    stack: ['OPENAI', 'N8N', 'WHATSAPP API', 'WEBHOOKS'],
    demonstrates: 'AI agent design, workflow automation, API orchestration, conversational UX',
    image: '/projetos/max-ai.png',
  },
  {
    category: 'CINEMATIC WEB CONCEPT',
    title: 'Scary Movie 6',
    shortDesc: 'A cinematic landing page concept focused on atmosphere, motion, typography and visual storytelling.',
    number: '05 / 08',
    year: '2026',
    problem: 'Most landing pages are visually flat. They communicate information but create no emotional response, no atmosphere, no memorability.',
    solution: 'A cinematic landing page concept built for mood, atmosphere and entertainment-style storytelling. Proves that front-end craft can create emotional impact.',
    stack: ['NEXT.JS', 'GSAP', 'TAILWIND'],
    demonstrates: 'Motion design, cinematic front-end craft, visual storytelling, creative direction',
    image: '/assets/case-scary-movie.jpg',
    video: '/projetos/scary-movie.mp4',
  },
  {
    category: 'OPERATIONS TOOL',
    title: 'Sheets Ops',
    shortDesc: 'A practical spreadsheet-based system for workflow organization and daily operations.',
    number: '06 / 08',
    year: '2026',
    problem: 'Small businesses and teams need operational tools but lack budget for custom software. They default to spreadsheets used poorly — unstructured, error-prone, hard to maintain.',
    solution: 'A purpose-built Google Sheets system with structured workflows, automated calculations, validation logic and clean data architecture for daily operations.',
    stack: ['GOOGLE APPS SCRIPT', 'SHEETS', 'FORMS'],
    demonstrates: 'Practical systems thinking, automation on limited tooling, process design',
    image: '/assets/case-sheets-ops.jpg',
    objectPosition: 'center 40%',
  },
  {
    category: 'LOCAL BUSINESS AI',
    title: 'Barbershop AI',
    shortDesc: 'An AI-driven support flow for customer communication and service organization.',
    number: '07 / 08',
    year: '2026',
    problem: 'Barbershops miss appointments, lose track of customer preferences and struggle to respond to booking inquiries quickly enough.',
    solution: 'A lightweight AI-driven support flow for customer communication — handling bookings, reminders, preferences and service inquiries through automated conversational responses.',
    stack: ['N8N', 'OPENAI', 'WHATSAPP API'],
    demonstrates: 'Local business AI, workflow automation, low-cost solution design',
    image: '/projetos/barbershop-ai.png',
  },
  {
    category: 'LEAD CAPTURE / LOCAL BUSINESS DEMO',
    title: 'Automotive Demo',
    shortDesc: 'A premium automotive service landing/demo built to test lead capture, visual trust and customer conversion flow for local businesses.',
    number: '08 / 08',
    year: '2026',
    problem: 'Automotive service businesses often rely on Instagram or WhatsApp alone, with no structured page to explain services, capture interest and guide customers toward a quote.',
    solution: 'A polished landing/demo experience designed to present services clearly, create trust and route interested customers into a lead capture or WhatsApp flow.',
    stack: ['WEB DESIGN', 'LANDING PAGE', 'LEAD CAPTURE', 'VISUAL DIRECTION'],
    demonstrates: 'Local business positioning, conversion-focused landing pages, sales demo creation, lead flow thinking',
    image: '/projetos/automotive-demo.png',
  },
];

export default function CaseStudies() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
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
            color: '#5C5C62',
            maxWidth: 520,
            lineHeight: 1.7,
            opacity: 0,
          }}
        >
          Systems and products built for real operations, real customers, real outcomes.
        </p>
      </div>

      {/* Project Grid */}
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
            {/* Media */}
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

            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(13,13,15,0.95) 0%, rgba(13,13,15,0.3) 40%, transparent 70%)',
              }}
            />

            {/* Hover "VIEW" label */}
            <div
              className="absolute top-4 right-4 font-mono uppercase transition-opacity duration-300"
              style={{
                fontSize: 10,
                color: '#F0EDE6',
                letterSpacing: '0.1em',
                opacity: hoveredIndex === i ? 1 : 0,
              }}
            >
              VIEW &rarr;
            </div>

            {/* Text content */}
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

      {/* Divider after grid */}
      <div className="mx-auto mt-20" style={{ maxWidth: 1280, padding: '0 48px' }}>
        <div className="divider" />
      </div>

      {/* Detail Panels */}
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
                style={{ fontSize: 11, color: '#5C5C62', letterSpacing: '0.1em' }}
              >
                {project.category} &mdash; {project.year}
              </span>
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
                <p className="font-sans font-normal" style={{ fontSize: 15, color: '#5C5C62', lineHeight: 1.7 }}>
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

              {/* Demonstrates */}
              <div className="mt-8">
                <span
                  className="font-mono uppercase block mb-3"
                  style={{ fontSize: 10, color: '#7FFF6B', letterSpacing: '0.1em' }}
                >
                  DEMONSTRATES
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
