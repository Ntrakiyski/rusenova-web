import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gloriarusenova.dev'

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
  ]

  // ML project pages
  const mlProjects = [
    'rag-evaluation-system',
    'fraud-detection-system',
    'ai-meeting-assistant'
  ]

  const mlPages = mlProjects.map(slug => ({
    url: `${baseUrl}/ml/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Product design project pages
  const pdProjects = [
    'tide',
    'telenor',
    'epam',
    'mentormate'
  ]

  const pdPages = pdProjects.map(slug => ({
    url: `${baseUrl}/product-design/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...mlPages, ...pdPages]
}
