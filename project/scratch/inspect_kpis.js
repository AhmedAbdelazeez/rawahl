const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
const content = fs.readFileSync(filePath, 'utf8');

const start = content.indexOf('id="kpis-container"');
const end = content.indexOf('<script>', start);
const sub = content.substring(start, end);

const sectionMatches = [...sub.matchAll(/id="(section-[^"]+)"/g)].map(m => m[1]);
console.log('Section IDs:', sectionMatches);

const cardMatches = [...sub.matchAll(/id="(card-[^"]+)"/g)].map(m => m[1]);
console.log('Card IDs:', cardMatches);
