import fs from 'fs';
import path from 'path';

const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');

export default function handler(req, res) {
  try {
    // Set headers
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    
    // Read and send the robots.txt file
    const robots = fs.readFileSync(robotsPath, 'utf8');
    res.status(200).send(robots);
  } catch (error) {
    console.error('Error serving robots.txt:', error);
    res.status(500).end('Error generating robots.txt');
  }
}
