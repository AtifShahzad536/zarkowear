import fs from 'fs';
import path from 'path';

const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  
  // Handle OPTIONS for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // Check if file exists
    if (!fs.existsSync(sitemapPath)) {
      console.error('Sitemap not found at path:', sitemapPath);
      return res.status(404).end('Sitemap not found');
    }
    
    // Read and send the sitemap
    const sitemap = fs.readFileSync(sitemapPath, 'utf8');
    return res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error serving sitemap:', error);
    return res.status(500).setHeader('Content-Type', 'text/plain').end('Error generating sitemap');
  }
}
