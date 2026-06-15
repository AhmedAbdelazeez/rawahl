const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
const content = fs.readFileSync(filePath, 'utf8');

const startIdx = content.indexOf('<div id="view-overview"');
const endCommentIdx = content.indexOf('<!-- ================= قطاع النقل التخصصي');

if (startIdx === -1 || endCommentIdx === -1) {
    console.error('Indices not found');
    process.exit(1);
}

const sub = content.substring(startIdx, endCommentIdx);
console.log('Overview section HTML length:', sub.length);

// Count <div> and </div> tags
const openDivs = (sub.match(/<div/g) || []).length;
const closeDivs = (sub.match(/<\/div>/g) || []).length;
console.log('Open div tags:', openDivs);
console.log('Close div tags:', closeDivs);

// Count <section> and </section> tags
const openSections = (sub.match(/<section/g) || []).length;
const closeSections = (sub.match(/<\/section>/g) || []).length;
console.log('Open section tags:', openSections);
console.log('Close section tags:', closeSections);

// Print the last 1500 chars of the sub-content to see the closing tags
console.log('--- Last 1500 chars of overview view ---');
console.log(sub.substring(sub.length - 1500));
