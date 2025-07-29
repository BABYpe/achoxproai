import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AchoX Pro',
    short_name: 'AchoX Pro',
    description: 'شريكك الذكي في إدارة المشاريع الهندسية والفعاليات.',
    start_url: '/',
    display: 'standalone',
    background_color: '#111827', // dark theme background
    theme_color: '#FFD700', // primary color
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
  }
}