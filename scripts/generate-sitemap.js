import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://optenary.in';
const today = new Date().toISOString().split('T')[0];

const routes = [
  // Core Brand Pages
  { path: '/', priority: '1.0', changefreq: 'weekly', lastmod: today },
  { path: '/about', priority: '0.8', changefreq: 'monthly', lastmod: today },
  { path: '/services/web-development', priority: '0.9', changefreq: 'weekly', lastmod: today },
  { path: '/services/mobile-development', priority: '0.9', changefreq: 'weekly', lastmod: today },
  { path: '/services/custom-software', priority: '0.9', changefreq: 'weekly', lastmod: today },
  { path: '/services/desktop-development', priority: '0.9', changefreq: 'weekly', lastmod: today },
  { path: '/services/ai-agents-automation', priority: '0.9', changefreq: 'weekly', lastmod: today },
  { path: '/services/shopify-development', priority: '0.9', changefreq: 'weekly', lastmod: today },
  { path: '/services/wordpress-development', priority: '0.9', changefreq: 'weekly', lastmod: today },
  { path: '/services/custom-ecommerce-development', priority: '0.9', changefreq: 'weekly', lastmod: today },
  
  // Local SEO Geo Pages
  { path: '/web-development-company-india', priority: '0.8', changefreq: 'monthly', lastmod: today },
  { path: '/mobile-app-developer-surat', priority: '0.8', changefreq: 'monthly', lastmod: today },
  { path: '/ai-automation-agency-india', priority: '0.8', changefreq: 'monthly', lastmod: today },

  // Trust & Portfolio Pages
  { path: '/projects', priority: '0.8', changefreq: 'weekly', lastmod: today },
  { path: '/integrations', priority: '0.7', changefreq: 'monthly', lastmod: today },
  { path: '/blog', priority: '0.8', changefreq: 'daily', lastmod: today },
  { path: '/blog/cost-of-mobile-app-india', priority: '0.7', changefreq: 'monthly', lastmod: '2025-05-24' },
  { path: '/blog/native-vs-hybrid-app', priority: '0.7', changefreq: 'monthly', lastmod: '2025-05-20' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly', lastmod: today },
  { path: '/faq', priority: '0.6', changefreq: 'monthly', lastmod: today },
  
  // Legal
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly', lastmod: today },
  { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly', lastmod: today }
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${routes.map(r => `  <url>
    <loc>${BASE_URL}${r.path}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf-8');
console.log(`✅ Sitemap successfully generated with ${routes.length} canonical URLs at: ${outputPath}`);
