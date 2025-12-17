const solutionImages: Record<string, string> ={
  'software-development': '/images/solutions/software-development.jpg',
  'web-development': '/images/solutions/web-development.jpg',
  'app-development': '/images/solutions/app-development.jpg',
  'digital-marketing': '/images/solutions/digital-marketing.png',
  'seo': '/images/solutions/seo.png',
  'data-analytics': '/images/solutions/data-analytics.png',
  'ui-ux-design': '/images/solutions/ui-ux-design.jpg',
};

export const getSolutionImage = (slug: string): string => {
  return solutionImages[slug as keyof typeof solutionImages] || '/images/solutions/default-solutions.jpg';
};