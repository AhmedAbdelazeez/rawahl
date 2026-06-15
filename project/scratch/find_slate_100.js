const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
console.log('Total occurrences of text-slate-100:');
lines.forEach((line, idx) => {
    if (line.includes('text-slate-100')) {
        console.log(`${idx + 1}: ${line.trim()}`);
    }
});
