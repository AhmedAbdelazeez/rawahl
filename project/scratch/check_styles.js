const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
const content = fs.readFileSync(filePath, 'utf8');

const matches = [];
let idx = 0;
while ((idx = content.indexOf('#kpis-container', idx)) !== -1) {
    matches.push(idx);
    idx += 15;
}

console.log('Matches found:', matches.length);
matches.forEach((m, i) => {
    console.log(`--- Match ${i + 1} ---`);
    console.log(content.substring(m - 100, m + 600));
});
