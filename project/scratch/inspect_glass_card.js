const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
const content = fs.readFileSync(filePath, 'utf8');

const matches = [];
let idx = 0;
while ((idx = content.indexOf('glass-card', idx)) !== -1) {
    matches.push(idx);
    idx += 10;
}

console.log('Matches found:', matches.length);
matches.slice(0, 10).forEach((m, i) => {
    console.log(`--- Match ${i + 1} ---`);
    console.log(content.substring(m - 50, m + 200));
});
