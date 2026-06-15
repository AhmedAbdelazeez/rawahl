const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
const content = fs.readFileSync(filePath, 'utf8');

const start = content.indexOf('id="view-kpi-dashboard"');
if (start === -1) {
    console.error('view-kpi-dashboard not found');
    process.exit(1);
}

console.log('--- view-kpi-dashboard section ---');
console.log(content.substring(start, start + 3000));
