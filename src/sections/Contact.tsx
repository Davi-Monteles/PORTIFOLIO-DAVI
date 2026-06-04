import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { label: 'WHATSAPP', url: 'https://wa.me/5598984162981' },
  { label: 'EMAIL', url: 'mailto:davimonteles62@gmail.com' },
  { label: 'GITHUB', url: 'https://github.com/thestable9-hue' },
  { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/davi-monteles-9888333a8/' },
  { label: 'CONTRA', url: 'https://contra.com/davi_monteles_ly96d0y2/work?r=davi_monteles_ly96d0y2' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 50, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 75%', once: true },
          }
        );
      }

      if (subRef.current) {
        gsap.fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 75%', once: true },
          }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.4,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 75%', once: true },
          }
        );
      }

      if (socialRef.current) {
        gsap.fromTo(
          socialRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            delay: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 75%', once: true },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ backgroundColor: '#05070A' }}
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none aurora-layer" />
      <div className="absolute inset-0 pointer-events-none aurora-bottom" />
      <div className="absolute inset-0 pointer-events-none tech-grid opacity-50" />
      {/* Side aurora accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 100% 50%, rgba(30,77,255,0.06) 0%, transparent 60%)' }}
      />
      <div
        className="mx-auto text-center"
        style={{ maxWidth: 1280, padding: '200px 48px' }}
      >
        {/* End divider */}
        <div className="flex items-center justify-center mb-16 relative z-10">
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(75,225,255,0.2))' }} />
          <span
            className="font-mono uppercase mx-4"
            style={{ fontSize: 9, color: '#4BE1FF', letterSpacing: '0.15em' }}
          >
            &mdash; END OF SHOWCASE &mdash;
          </span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(270deg, transparent, rgba(75,225,255,0.2))' }} />
        </div>

        {/* Meta label */}
        <span className="section-label block mb-12">06</span>

        {/* Title */}
        <h2
          ref={titleRef}
          className="font-serif font-normal uppercase relative z-10"
          style={{
            fontSize: 'clamp(56px, 10vw, 160px)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            opacity: 0,
          }}
        >
          <span className="block" style={{ color: '#F3F1EA' }}>NEED A SYSTEM,</span>
          <span className="block">
            <span style={{ color: '#F3F1EA' }}>NOT JUST A </span>
            <span className="text-gradient-useful" style={{ textShadow: '0 0 40px rgba(126,255,107,0.3)' }}>PAGE?</span>
          </span>
        </h2>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="font-sans font-normal mx-auto mt-8"
          style={{
            fontSize: 18,
            color: '#5C5C62',
            maxWidth: 480,
            lineHeight: 1.7,
            opacity: 0,
          }}
        >
           Let's build a website, AI workflow or internal tool that actually helps your operation.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap justify-center gap-4 mt-12 relative z-10">
          <a
            href="https://wa.me/5598984162981"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-xs font-medium tracking-widest no-underline transition-colors duration-300"
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
            WHATSAPP &rarr;
          </a>
          <a
            href="mailto:davimonteles62@gmail.com"
            className="inline-block font-sans text-xs font-medium tracking-widest no-underline transition-colors duration-300"
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
            EMAIL &rarr;
          </a>
          <a
            href="https://github.com/thestable9-hue"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-xs font-medium tracking-widest no-underline bg-transparent transition-colors duration-300"
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
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/davi-monteles-9888333a8/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-xs font-medium tracking-widest no-underline bg-transparent transition-colors duration-300"
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
            LINKEDIN
          </a>
        </div>

        {/* Social links */}
        <div
          ref={socialRef}
          className="flex flex-wrap justify-center gap-6 mt-8"
          style={{ opacity: 0 }}
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono uppercase no-underline transition-colors duration-300 hover:text-cream"
              style={{ fontSize: 11, letterSpacing: '0.08em', color: '#5C5C62' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-40">
          <p
            className="font-mono"
            style={{ fontSize: 10, color: '#5C5C62', letterSpacing: '0.08em' }}
          >
            &copy; 2026 DAVI MONTELES
          </p>
          <p
            className="font-mono mt-2"
            style={{ fontSize: 10, color: '#5C5C62', letterSpacing: '0.08em' }}
          >
            BUILT WITH INTENT
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact .mx-auto {
            padding: 120px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
