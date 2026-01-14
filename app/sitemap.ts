import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.nairatax.ng';
  const currentDate = new Date().toISOString();
  const routes = ['freelancer', 'business', 'creator', 'investment'];

  return [
    { url: baseUrl, lastModified: currentDate, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    ...routes.map(route => ({
      url: `${baseUrl}/calculators/${route}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: route === 'employee' ? 1.0 : 0.9,
    })),
  ];
}
