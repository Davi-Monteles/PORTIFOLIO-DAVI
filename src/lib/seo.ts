type PortfolioLocale = 'en' | 'pt-BR';

const SITE_URL = 'https://davimonteles.vercel.app';

const metadata = {
  en: {
    title: 'Davi Monteles | Junior Full-Stack & Applied AI Developer',
    description: 'Portfolio of Davi Monteles, a Brazil-based junior developer building full-stack applications, AI workflows and automation tools.',
    locale: 'en_US',
    path: '',
    jobTitle: 'Junior Full-Stack and Applied AI Developer',
  },
  'pt-BR': {
    title: 'Davi Monteles | Desenvolvedor Full-Stack Junior e IA Aplicada',
    description: 'Portfolio de Davi Monteles, desenvolvedor júnior no Brasil construindo aplicações full-stack, fluxos de IA e ferramentas de automação.',
    locale: 'pt_BR',
    path: '/pt',
    jobTitle: 'Desenvolvedor Full-Stack Junior e IA Aplicada',
  },
} as const;

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

export function applyPortfolioSeo(locale: PortfolioLocale) {
  const current = metadata[locale];
  const canonicalUrl = `${SITE_URL}${current.path}`;

  document.documentElement.lang = locale;
  document.title = current.title;

  let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;

  setMeta('name', 'description', current.description);
  setMeta('property', 'og:title', current.title);
  setMeta('property', 'og:description', current.description);
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('property', 'og:locale', current.locale);
  setMeta('name', 'twitter:card', 'summary');
  setMeta('name', 'twitter:title', current.title);
  setMeta('name', 'twitter:description', current.description);

  let structuredData = document.getElementById('portfolio-person-schema') as HTMLScriptElement | null;
  if (!structuredData) {
    structuredData = document.createElement('script');
    structuredData.id = 'portfolio-person-schema';
    structuredData.type = 'application/ld+json';
    document.head.appendChild(structuredData);
  }

  structuredData.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Davi Monteles',
    url: canonicalUrl,
    jobTitle: current.jobTitle,
    description: current.description,
    address: { '@type': 'PostalAddress', addressCountry: 'BR' },
    sameAs: [
      'https://github.com/Davi-Monteles',
      'https://www.linkedin.com/in/davi-monteles-9888333a8/',
    ],
    knowsAbout: ['Full-stack development', 'Python', 'Applied AI', 'Automation', 'API integrations'],
  });
}
