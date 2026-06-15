const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
const content = fs.readFileSync(filePath, 'utf8');

const startIdx = content.indexOf('<div class="ticker-wrap');
if (startIdx !== -1) {
    console.log('--- Ticker HTML Section ---');
    console.log(content.substring(startIdx, startIdx + 1200));
} else {
    console.log('Ticker HTML element not found!');
}
