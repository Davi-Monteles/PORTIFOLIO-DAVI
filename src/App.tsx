import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Header from './sections/Header';
import Hero from './sections/Hero';
import Manifesto from './sections/Manifesto';
import CaseStudies from './sections/CaseStudies';
import About from './sections/About';
import HowIWork from './sections/HowIWork';
import Capabilities from './sections/Capabilities';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative">
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <CaseStudies />
        <About />
        <HowIWork />
        <Capabilities />
        <Contact />
      </main>
    </div>
  );
}
