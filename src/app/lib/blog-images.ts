const blogImages: Record<string, string> = {
'future-of-web-development':'/images/blogs/future-web-dev.jpeg',
'why-ui-ux-matters':'/images/blogs/ui-ux-design.png',
'scaling-with-custom-software':'/images/blogs/custom-software.jpeg',

};

// Function to get image by slug
export const getBlogImages = (slug: string): string => {
  return blogImages[slug as keyof typeof blogImages] 
};
