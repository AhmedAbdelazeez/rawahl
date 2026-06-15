const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
const content = fs.readFileSync(filePath, 'utf8');

const styleStart = content.indexOf('<style>');
if (styleStart !== -1) {
    console.log('--- Start of Style Block ---');
    console.log(content.substring(styleStart, styleStart + 1500));
} else {
    console.log('Style block not found!');
}
