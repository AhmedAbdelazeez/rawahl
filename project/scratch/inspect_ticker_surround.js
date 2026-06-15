const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
const content = fs.readFileSync(filePath, 'utf8');

const startIdx = content.indexOf('<div class="ticker-wrap');
if (startIdx !== -1) {
    console.log('--- Surround HTML ---');
    console.log(content.substring(startIdx - 400, startIdx + 800));
} else {
    console.log('Ticker HTML element not found!');
}
