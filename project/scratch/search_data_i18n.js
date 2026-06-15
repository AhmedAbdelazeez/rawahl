const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
const content = fs.readFileSync(filePath, 'utf8');

const regex = /[^{}]*data-i18n[^{}]*\{[^}]*\}/g;
const matches = content.match(regex);
console.log('CSS matching data-i18n:', matches);
