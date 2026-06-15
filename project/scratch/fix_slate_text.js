const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Temporarily replace SVG track paths with text-slate-200 to keep progress tracks light grey
content = content.replace(/class="text-slate-100"/g, 'class="text-slate-200"');

// 2. Revert all other text-slate-100 classes (which were globally corrupted from text-slate-800) back to text-slate-800
content = content.replace(/text-slate-100/g, 'text-slate-800');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Restored text colors successfully!');
