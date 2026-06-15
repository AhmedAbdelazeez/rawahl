const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
const content = fs.readFileSync(filePath, 'utf8');

const styleStart = content.indexOf('<style>');
const styleEnd = content.indexOf('</style>', styleStart);

if (styleStart !== -1 && styleEnd !== -1) {
    console.log('--- Style Block Contents ---');
    console.log(content.substring(styleStart, styleEnd + 8));
} else {
    console.log('Style block not found!');
}
