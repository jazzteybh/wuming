import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://wumingai.app'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/career-entry`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/monthly-entry`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/compatibility`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ]
}
