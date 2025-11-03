import fs from 'fs';
import path from 'path';

const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');

export default function handler(req, res) {
  try {
    // Set headers first
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    
    // Read and send the sitemap
    const sitemap = fs.readFileSync(sitemapPath, 'utf8');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error serving sitemap:', error);
    res.status(500).setHeader('Content-Type', 'text/plain').end('Error generating sitemap');
  }
}
