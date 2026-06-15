const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
const content = fs.readFileSync(filePath, 'utf8');

const startIdx = content.indexOf('ticker-wrap');
if (startIdx !== -1) {
    console.log('--- Ticker Section ---');
    console.log(content.substring(startIdx - 100, startIdx + 1000));
} else {
    console.log('Ticker not found!');
}
