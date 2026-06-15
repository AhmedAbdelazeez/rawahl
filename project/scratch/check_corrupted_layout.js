const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
const content = fs.readFileSync(filePath, 'utf8');

const start = content.indexOf('<div id="view-overview"');
if (start === -1) {
    console.error('view-overview not found');
    process.exit(1);
}

// Print 6000 characters from start to inspect the HTML
console.log('--- view-overview section HTML ---');
console.log(content.substring(start, start + 6000));
