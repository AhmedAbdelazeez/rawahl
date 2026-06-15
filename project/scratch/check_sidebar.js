const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
const content = fs.readFileSync(filePath, 'utf8');

// Find the sidebar element (usually <aside> or <div class="sidebar")
const start = content.indexOf('<aside');
const end = content.indexOf('</aside>', start);
if (start !== -1 && end !== -1) {
    console.log('--- Sidebar Content ---');
    console.log(content.substring(start, end + 8));
} else {
    console.log('Sidebar element not found');
}
