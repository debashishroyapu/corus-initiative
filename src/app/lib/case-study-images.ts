const caseStudyImages: Record<string, string> = {

'ecommerce-boost':'/images/case-studies/real-time.jpeg',
'superstore-sales-performance-dashboard':'/images/case-studies/superstore-sales-performance-dashboard.jpeg',
 'healthcare-platform':'/images/case-studies/telemedicine-platform.png',
 'fintech-dashboard':'/images/case-studies/fintech-dashboard.png'

};

export const caseStudyImage = (slug: string): string => {
  return caseStudyImages[slug as keyof typeof caseStudyImages] 
};
