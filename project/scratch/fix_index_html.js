const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
let lines = fs.readFileSync(filePath, 'utf8').split('\n');

let replaced = false;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('// Hide unauthorized sections/cards from DOM')) {
        console.log('Original line:', lines[i+1]);
        lines[i+1] = "            document.querySelectorAll(\"[onclick*='showView']\").forEach(el => {";
        console.log('New line:', lines[i+1]);
        replaced = true;
        break;
    }
}

if (!replaced) {
    console.error('Target comment line not found!');
    process.exit(1);
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Replacement finished!');
