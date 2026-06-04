import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MARQUEE_TEXT = 'SELECTED WORK \u00B7 SELECTED WORK \u00B7 SELECTED WORK \u00B7 SELECTED WORK \u00B7 ';

export default function SelectedWorkMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = marqueeRef.current;
    if (!section || !wrapper) return;

    const textSpans = wrapper.querySelectorAll<HTMLSpanElement>('.sw-marquee-text');
    if (textSpans.length < 2) return;

    const span1 = textSpans[0];
    let totalWidth = span1.offsetWidth;
    let x = 0;
    let isRunning = false;

    const ticker = (_time: number, deltaTime: number) => {
      if (!isRunning) return;
      x -= deltaTime * 0.5 * 0.1;
      if (x <= -totalWidth) {
        x = x + totalWidth;
      }
      gsap.set(textSpans, { x });
    };

    // Intersection observer to start/stop
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isRunning = true;
          } else {
            isRunning = false;
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    gsap.ticker.add(ticker);

    const handleResize = () => {
      totalWidth = span1.offsetWidth;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      gsap.ticker.remove(ticker);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full overflow-hidden flex items-center"
      style={{
        height: 64,
        backgroundColor: '#10151C',
        borderTop: '1px solid rgba(75,225,255,0.1)',
        borderBottom: '1px solid rgba(75,225,255,0.1)',
      }}
    >
      <div ref={marqueeRef} className="flex whitespace-nowrap">
        <span
          className="sw-marquee-text flex-shrink-0 font-serif text-5xl md:text-[48px] uppercase tracking-wide text-off-white"
          style={{ letterSpacing: '0.02em', lineHeight: 1 }}
        >
          {MARQUEE_TEXT}
        </span>
        <span
          className="sw-marquee-text flex-shrink-0 font-serif text-5xl md:text-[48px] uppercase tracking-wide text-off-white"
          style={{ letterSpacing: '0.02em', lineHeight: 1 }}
        >
          {MARQUEE_TEXT}
        </span>
      </div>
    </div>
  );
}
