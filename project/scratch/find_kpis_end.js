const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
const content = fs.readFileSync(filePath, 'utf8');

const startTag = '<div id="kpis-container">';
const startIdx = content.indexOf(startTag);
if (startIdx === -1) {
    console.error('startTag not found');
    process.exit(1);
}

// Track divs to find the matching closing tag
let depth = 1;
let idx = startIdx + startTag.length;
while (depth > 0 && idx < content.length) {
    const nextOpen = content.indexOf('<div', idx);
    const nextClose = content.indexOf('</div>', idx);
    
    if (nextClose === -1) {
        break;
    }
    
    if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        idx = nextOpen + 4;
    } else {
        depth--;
        idx = nextClose + 6;
    }
}

const closingIdx = idx;
console.log('Start index of kpis-container:', startIdx);
console.log('Closing index of kpis-container:', closingIdx);
console.log('Text around closing:', content.substring(closingIdx - 200, closingIdx + 200));

// Let's count line numbers
const startLine = content.substring(0, startIdx).split('\n').length;
const closingLine = content.substring(0, closingIdx).split('\n').length;
console.log('Start Line:', startLine);
console.log('Closing Line:', closingLine);
