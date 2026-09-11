type PortfolioLocale = 'en' | 'pt-BR';

const SITE_URL = 'https://davimonteles.vercel.app';

const metadata = {
  en: {
    title: 'Davi Monteles | Junior Developer - Applied AI & Automation',
    description: 'Portfolio of Davi Monteles, a Brazil-based junior developer focused on applied AI, automation, integrations and full-stack software.',
    locale: 'en_US',
    path: '',
    jobTitle: 'Junior Developer - Applied AI, Automation and Integrations',
  },
  'pt-BR': {
    title: 'Davi Monteles | Desenvolvedor Júnior - IA Aplicada e Automação',
    description: 'Portfólio de Davi Monteles, desenvolvedor júnior focado em IA aplicada, automação, integrações e software full-stack.',
    locale: 'pt_BR',
    path: '/pt',
    jobTitle: 'Desenvolvedor Júnior - IA Aplicada, Automação e Integrações',
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
    knowsAbout: ['Applied AI', 'Automation', 'API integrations', 'Node.js', 'TypeScript', 'Python', 'React', 'PostgreSQL'],
  });
}
