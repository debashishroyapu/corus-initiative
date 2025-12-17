const industryImages: Record<string, string> = {
  'healthcare-pharmaceuticals': '/Images/industries/Healthcare%20&%20Pharmaceuticals.png',
  'finance-banking': '/Images/industries/Finance%20&%20Banking.png',
  'education-e-learning': '/Images/industries/Education%20&%20E-Learning.png',
  'e-commerce-retail': '/Images/industries/E-Commerce%20&%20Retail2.png',
  'manufacturing-supply-chain': '/Images/industries/Manufacturing.png',
  'real-estate-construction': '/Images/industries/Real%20Estate%20&%20Construction%20(3).png',
  'logistics-transportation': '/Images/industries/Logistic.png',
  'travel-hospitality': '/Images/industries/Travel%20&%20Hospitality.png',
  'entertainment-media': '/Images/industries/entertrainment.png',
  'government-public-sector':'/images/industries/goverment and public.png',
};

// Function to get image by slug
export const getIndustryImage = (slug: string): string => {
  return industryImages[slug as keyof typeof industryImages] || '/Images/industries/default-industry.jpg';
};
