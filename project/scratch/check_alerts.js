const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
const content = fs.readFileSync(filePath, 'utf8');

console.log('Contains Warning Alert:', content.includes('تنبيهات الإدارة والمتابعة'));
console.log('Contains AI Recs:', content.includes('توصيات الذكاء الاصطناعي'));

const startIdx = content.indexOf('موجز الإدارة التنفيذية والتحليل الذكي');
if (startIdx !== -1) {
    console.log('--- News Feed Section HTML ---');
    console.log(content.substring(startIdx, startIdx + 1500));
} else {
    console.log('News feed title not found!');
}
