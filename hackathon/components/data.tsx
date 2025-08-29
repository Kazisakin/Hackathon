import fs from 'fs';
import fetch from 'node-fetch';

const API_URL = 'https://testing.asets.io/convert/v1/isometric:process'; 
const AUTH_TOKEN = 'Bearer idsv-dashboard-demo-2025';
const OUTPUT_PATH = '/Users/kazisakin/Desktop/MY GITS/Hackathon/hackathon/components/data.json';

async function fetchAndSaveData() {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${"idsv-dashboard-demo-2025"}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.error('Failed to fetch:', response.status, response.statusText);
    return;
  }

  const data = await response.json();
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2), 'utf8');
  console.log('Data saved to', OUTPUT_PATH);
}

fetchAndSaveData();