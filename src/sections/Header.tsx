import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const NAV_LINKS = [
  { label: 'WORK', target: 'case-studies' },
  { label: 'PROCESS', target: 'how-i-work' },
  { label: 'CONTACT', target: 'contact' },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
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
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between h-14 transition-all duration-400"
      style={{
        padding: '0 48px',
        opacity: 0,
        backgroundColor: scrolled ? 'rgba(13,13,15,0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid rgba(92,92,98,0.1)',
      }}
    >
      {/* Left: Logo */}
      <div className="flex flex-col">
        <span
          className="font-mono text-sm font-medium tracking-widest"
          style={{ color: '#F0EDE6', letterSpacing: '0.12em' }}
        >
          DM
        </span>
        <span
          className="font-mono tracking-widest"
          style={{ color: '#5C5C62', fontSize: 9, letterSpacing: '0.12em' }}
        >
          DIGITAL SYSTEMS
        </span>
      </div>

      {/* Right: Nav */}
      <nav className="flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <button
            key={link.label}
            onClick={() => scrollTo(link.target)}
            className="relative font-sans text-xs font-medium tracking-widest uppercase bg-transparent border-none cursor-pointer transition-colors duration-300 hover:text-acid-green"
            style={{ color: '#F0EDE6', letterSpacing: '0.06em' }}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
