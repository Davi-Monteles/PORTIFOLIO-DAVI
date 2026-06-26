import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import HeaderPt from './sections/HeaderPt';
import HeroPt from './sections/HeroPt';
import ManifestoPt from './sections/ManifestoPt';
import CaseStudiesPt from './sections/CaseStudiesPt';
import AboutPt from './sections/AboutPt';
import HowIWorkPt from './sections/HowIWorkPt';
import CapabilitiesPt from './sections/CapabilitiesPt';
import ContactPt from './sections/ContactPt';

gsap.registerPlugin(ScrollTrigger);

export default function AppPt() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

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
      <HeaderPt />
      <main>
        <HeroPt />
        <ManifestoPt />
        <CaseStudiesPt />
        <AboutPt />
        <HowIWorkPt />
        <CapabilitiesPt />
        <ContactPt />
      </main>
    </div>
  );
}
