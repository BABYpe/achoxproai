import { MetadataRoute } from 'next';
import { ROUTES } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://achox-pro.com';

  // Static routes
  const staticRoutes = [
    ROUTES.HOME,
    ROUTES.LOGIN,
    ROUTES.REGISTER,
    '/privacy',
    '/terms',
    '/contact-sales',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  // Dynamic routes (e.g., projects) - fetch from a source in a real app
  // const projects = await fetchProjectsFromDB();
  // const projectRoutes = projects.map(project => ({
  //   url: `${baseUrl}${ROUTES.PROJECTS}/${project.id}`,
  //   lastModified: project.updatedAt,
  // }));

  return [
    ...staticRoutes,
    // ...projectRoutes,
  ];
}