import fs from 'fs';
import path from 'path';

const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
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
    if (!fs.existsSync(robotsPath)) {
      console.error('robots.txt not found at path:', robotsPath);
      return res.status(404).end('robots.txt not found');
    }
    
    // Read and send the robots.txt file
    const robots = fs.readFileSync(robotsPath, 'utf8');
    return res.status(200).send(robots);
  } catch (error) {
    console.error('Error serving robots.txt:', error);
    return res.status(500).setHeader('Content-Type', 'text/plain').end('Error generating robots.txt');
  }
}
