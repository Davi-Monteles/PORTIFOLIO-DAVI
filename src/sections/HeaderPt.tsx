import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const NAV_LINKS = [
  { label: 'PROJETOS', target: 'case-studies' },
  { label: 'PROCESSO', target: 'how-i-work' },
  { label: 'CONTATO', target: 'contact' },
];

export default function HeaderPt() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const header = headerRef.current;
    if (!header) return;

    gsap.fromTo(
      header,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, delay: 0.2, ease: 'power3.out' }
    );

    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between gap-3 h-14 transition-all duration-400"
      style={{
        padding: '0 clamp(12px, 4vw, 48px)',
        opacity: 0,
        backgroundColor: scrolled ? 'rgba(13,13,15,0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid rgba(92,92,98,0.1)',
      }}
    >
      <div className="flex flex-col flex-shrink-0">
        <span
          className="font-mono text-sm font-medium tracking-widest"
          style={{ color: '#F0EDE6', letterSpacing: '0.12em' }}
        >
          DM
        </span>
        <span
          className="font-mono tracking-widest"
          style={{ color: '#8D939C', fontSize: 9, letterSpacing: '0.12em' }}
        >
          DIGITAL SYSTEMS
        </span>
      </div>

      <nav className="flex flex-shrink-0 items-center gap-2 sm:gap-4 md:gap-8">
        {NAV_LINKS.map((link) => (
          <button
            key={link.label}
            onClick={() => scrollTo(link.target)}
            className={'relative font-sans text-[10px] sm:text-xs font-medium tracking-widest uppercase bg-transparent border-none cursor-pointer transition-colors duration-300 hover:text-acid-green ' + (link.target === 'how-i-work' ? 'hidden sm:inline-block' : '')}
            style={{ color: '#F0EDE6', letterSpacing: '0.06em' }}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
