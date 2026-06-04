import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LabProject {
  title: string;
  description: string;
  status: 'LIVE' | 'PROTOTYPE';
  stack: string;
  image: string;
}

const LAB_PROJECTS: LabProject[] = [
  {
    title: 'SpotifyAgent',
    description:
      'Experimental music recommendation agent. Preference interpretation and intelligent playlist generation through conversational interaction.',
    status: 'PROTOTYPE',
    stack: 'PYTHON \u00B7 OPENAI \u00B7 SPOTIFY API',
    image: '/assets/lab-spotify-agent.jpg',
  },
  {
    title: 'ReportaZap',
    description:
      'WhatsApp-based reporting flow for triage and case organization. Structured intake, automatic categorization and routing.',
    status: 'LIVE',
    stack: 'N8N \u00B7 WHATSAPP API \u00B7 SHEETS',
    image: '/assets/lab-reportazap.jpg',
  },
  {
    title: 'Lead Capture & Follow-up',
    description:
      'Practical lead capture system with automated contact flow, follow-up sequences and lead-loss reduction.',
    status: 'LIVE',
    stack: 'NEXT.JS \u00B7 N8N \u00B7 SMTP',
    image: '/assets/lab-lead-capture.jpg',
  },
  {
    title: 'Custom Sheets System',
    description:
      'Operations tool built in Google Sheets for structured workflow support, data organization and process tracking.',
    status: 'LIVE',
    stack: 'APPS SCRIPT \u00B7 SHEETS \u00B7 FORMS',
    image: '/assets/lab-sheets-ops.jpg',
  },
  {
    title: 'Dental Clinic Concept',
    description:
      'Trust-building landing page concept for professional dental services. Clean, clinical, conversion-focused.',
    status: 'PROTOTYPE',
    stack: 'NEXT.JS \u00B7 TAILWIND',
    image: '/assets/lab-dental.jpg',
  },
  {
    title: 'Automation Hub',
    description:
      'Central dashboard for monitoring and managing multiple automation workflows across projects.',
    status: 'PROTOTYPE',
    stack: 'REACT \u00B7 NODE \u00B7 WEBSOCKETS',
    image: '/assets/lab-automation-hub.jpg',
  },
];

export default function Labs() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.labs-header'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.querySelectorAll('.lab-card'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="labs"
      ref={sectionRef}
      style={{ backgroundColor: '#10151C' }}
      className="py-24 md:py-40 px-6 relative overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 md:px-8 mb-12">
        <span className="labs-header section-label block mb-4">04 / LABORATORY</span>
        <h2
          className="labs-header font-serif font-normal uppercase text-off-white"
          style={{
            fontSize: 'min(6vw, 80px)',
            lineHeight: 1,
            letterSpacing: '0.02em',
          }}
        >
          PROTOTYPES & INTERNAL SYSTEMS
        </h2>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={cardsRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-6 md:px-8 pb-8"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {LAB_PROJECTS.map((project) => (
          <div
            key={project.title}
            className="lab-card flex-shrink-0 overflow-hidden group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            style={{
              width: 360,
              scrollSnapAlign: 'start',
              borderRadius: 4,
              border: '1px solid rgba(135,138,140,0.1)',
              background: 'rgba(10,10,10,0.4)',
            }}
          >
            {/* Image */}
            <div className="overflow-hidden" style={{ height: 200 }}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Status */}
              <div className="flex items-center gap-2">
                <span
                  className="w-1 h-1 rounded-full"
                  style={{
                    backgroundColor:
                      project.status === 'LIVE' ? '#7AFF6B' : '#878A8C',
                  }}
                />
                <span
                  className="font-mono text-[9px] tracking-widest"
                  style={{
                    color: project.status === 'LIVE' ? '#7AFF6B' : '#878A8C',
                    letterSpacing: '0.08em',
                  }}
                >
                  {project.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-sans text-base font-medium text-off-white mt-2">
                {project.title}
              </h3>

              {/* Description */}
              <p
                className="font-sans text-[13px] font-normal leading-relaxed mt-2 line-clamp-2"
                style={{ color: '#878A8C' }}
              >
                {project.description}
              </p>

              {/* Stack */}
              <p className="font-mono text-[9px] mt-3" style={{ color: '#878A8C' }}>
                {project.stack}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .lab-card {
            width: 280px !important;
          }
          .lab-card > div:first-child {
            height: 160px !important;
          }
        }
      `}</style>
    </section>
  );
}
