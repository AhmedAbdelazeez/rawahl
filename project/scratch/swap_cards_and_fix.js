const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Original length:', content.length);

// 1. Swap the two sections inside view-overview:
// Section A: Executive Summary Section (starts with <!-- Executive Summary Section and ends before <!-- Two Executive Business Cards Section -->)
// Section B: Two Executive Business Cards Section (starts with <!-- Two Executive Business Cards Section --> and ends before </div> that closes view-overview)

const startViewOverview = content.indexOf('<div id="view-overview" class="view-container">');
if (startViewOverview === -1) {
    console.error('view-overview not found');
    process.exit(1);
}

const startA = content.indexOf('<!-- Executive Summary Section (News Feed / Management Summary) -->', startViewOverview);
const startB = content.indexOf('<!-- Two Executive Business Cards Section -->', startA);

// Find closing </div> of view-overview (which is right before <!-- ================= قطاع النقل التخصصي -->)
const endB = content.indexOf('<!-- ================= قطاع النقل التخصصي (Specialized Transportation View) ================= -->');
if (startA === -1 || startB === -1 || endB === -1) {
    console.error('Swap indices not found', { startA, startB, endB });
    process.exit(1);
}

// Locate the last closing div of view-overview before the Specialized Transportation View comment
const lastDivIdx = content.lastIndexOf('</div>', endB);
if (lastDivIdx === -1) {
    console.error('Closing div of view-overview not found');
    process.exit(1);
}

// Slice the two sections
const sectionA = content.substring(startA, startB);
const sectionB = content.substring(startB, lastDivIdx);

console.log('Section A length:', sectionA.length);
console.log('Section B length:', sectionB.length);

// 2. Make Cards in Section B Clickable
let modifiedSectionB = sectionB;

// Replace Card 1 div start tag to add onclick and cursor-pointer
const card1Search = `<!-- Card 1: Specialized Transportation (النقل التخصصي) -->
                    <div class="glass-card p-6 rounded-3xl border-2 border-[#b0841a]/50 relative overflow-hidden flex flex-col justify-between min-h-[350px] bg-gradient-to-br from-white to-[#faf6ec]/50 group">`;

const card1Replace = `<!-- Card 1: Specialized Transportation (النقل التخصصي) -->
                    <div onclick="if(isTransportationManager) { showView('transportation-sector'); } else { alert(document.documentElement.lang === 'en' ? 'Access Denied: You do not have permissions for Specialized Transportation.' : 'عذراً: ليس لديك صلاحية للوصول إلى قطاع النقل التخصصي.'); }" class="glass-card p-6 rounded-3xl border-2 border-[#b0841a]/50 relative overflow-hidden flex flex-col justify-between min-h-[350px] bg-gradient-to-br from-white to-[#faf6ec]/50 group cursor-pointer">`;

modifiedSectionB = modifiedSectionB.replace(card1Search, card1Replace);

// Replace Card 2 div start tag to add onclick and cursor-pointer
const card2Search = `<!-- Card 2: Tourism & Pilgrim Services (السياحة وخدمات المعتمرين) -->
                    <div class="glass-card p-6 rounded-3xl border-2 border-[#b0841a]/50 relative overflow-hidden flex flex-col justify-between min-h-[350px] bg-gradient-to-br from-white to-[#faf6ec]/50 group">`;

const card2Replace = `<!-- Card 2: Tourism & Pilgrim Services (السياحة وخدمات المعتمرين) -->
                    <div onclick="if(isPilgrimServicesManager) { showView('pilgrim-sector'); } else { alert(document.documentElement.lang === 'en' ? 'Access Denied: You do not have permissions for Tourism & Pilgrim Services.' : 'عذراً: ليس لديك صلاحية للوصول إلى قطاع السياحة وخدمات المعتمرين.'); }" class="glass-card p-6 rounded-3xl border-2 border-[#b0841a]/50 relative overflow-hidden flex flex-col justify-between min-h-[350px] bg-gradient-to-br from-white to-[#faf6ec]/50 group cursor-pointer">`;

modifiedSectionB = modifiedSectionB.replace(card2Search, card2Replace);

// Re-assemble view-overview with swapped sections (Section B on top of Section A)
const newOverviewContent = modifiedSectionB + '\n\n                ' + sectionA;
content = content.substring(0, startA) + newOverviewContent + content.substring(lastDivIdx);

console.log('Swapped and modified overview. New length:', content.length);


// 3. Fix CSS Style Selectors to apply to both #kpis-container and #sector-kpis-grid
const cssReplacements = [
    {
        old: `#kpis-container .glass-card {
            min-height: 12rem !important;`,
        new: `#kpis-container .glass-card, #sector-kpis-grid .glass-card {
            min-height: 12rem !important;`
    },
    {
        old: `#kpis-container .glass-card span[data-i18n] {
            font-size: 0.875rem !important;
            font-weight: 850 !important;
            color: #0f172a !important;
        }`,
        new: `#kpis-container .glass-card span[data-i18n], #sector-kpis-grid .glass-card span[data-i18n] {
            font-size: 0.875rem !important;
            font-weight: 850 !important;
            color: #0f172a !important;
        }`
    },
    {
        old: `#kpis-container .glass-card span[id^="val-"] {
            font-size: 2.25rem !important;
            font-weight: 900 !important;
            margin-top: 0.5rem !important;
            margin-bottom: 0.5rem !important;
        }`,
        new: `#kpis-container .glass-card span[id^="val-"], #sector-kpis-grid .glass-card span[id^="val-"] {
            font-size: 2.25rem !important;
            font-weight: 900 !important;
            margin-top: 0.5rem !important;
            margin-bottom: 0.5rem !important;
            color: #0f172a !important;
        }`
    },
    {
        old: `#kpis-container .glass-card span[id^="target-val-"],
        #kpis-container .glass-card .text-slate-500 {
            font-size: 0.75rem !important;
            font-weight: 700 !important;
        }`,
        new: `#kpis-container .glass-card span[id^="target-val-"], #sector-kpis-grid .glass-card span[id^="target-val-"],
        #kpis-container .glass-card .text-slate-500, #sector-kpis-grid .glass-card .text-slate-500 {
            font-size: 0.75rem !important;
            font-weight: 700 !important;
            color: #475569 !important;
        }`
    },
    {
        old: `#kpis-container .glass-card .text-\\[9px\\] {
            font-size: 0.75rem !important;
            font-weight: 800 !important;
        }`,
        new: `#kpis-container .glass-card .text-\\[9px\\], #sector-kpis-grid .glass-card .text-\\[9px\\] {
            font-size: 0.75rem !important;
            font-weight: 800 !important;
        }`
    }
];

let appliedCssCount = 0;
cssReplacements.forEach(r => {
    // Normalize spaces and line breaks for exact match
    const normalizedOld = r.old.replace(/\r\n/g, '\n').replace(/\s+/g, ' ');
    const normalizedContent = content.replace(/\r\n/g, '\n');
    
    // Find index by comparing normalized text chunks
    let found = false;
    let startIdx = 0;
    while ((startIdx = normalizedContent.indexOf(r.old.split('\n')[0].trim(), startIdx)) !== -1) {
        // Compare block
        const candidate = normalizedContent.substring(startIdx, startIdx + r.old.length + 100);
        if (candidate.replace(/\s+/g, ' ').includes(normalizedOld)) {
            // Replace exact text block in the original content
            const endBlockIdx = normalizedContent.indexOf('}', startIdx);
            if (endBlockIdx !== -1) {
                const originalBlock = content.substring(startIdx, endBlockIdx + 1);
                content = content.replace(originalBlock, r.new);
                found = true;
                appliedCssCount++;
                break;
            }
        }
        startIdx += 10;
    }
    
    if (!found) {
        // Fallback: direct simple string replace
        if (content.includes(r.old)) {
            content = content.replace(r.old, r.new);
            appliedCssCount++;
        } else {
            console.warn('CSS block not matched directly, attempting line split matches...', r.old.split('\n')[0]);
            // Try matching line by line
            const lines = content.split('\n');
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].includes(r.old.split('\n')[0].trim())) {
                    // Replace target selector line
                    const targetSelectorLine = r.old.split('\n')[0].trim();
                    const replacementSelectorLine = r.new.split('\n')[0].trim();
                    lines[i] = lines[i].replace(targetSelectorLine, replacementSelectorLine);
                    
                    // For target-val replacement which spans multiple lines, we also update color
                    if (targetSelectorLine.includes('target-val-')) {
                        lines[i+3] = lines[i+3].replace('font-weight: 700 !important;', 'font-weight: 700 !important;\n            color: #475569 !important;');
                    }
                    if (targetSelectorLine.includes('val-')) {
                        lines[i+4] = lines[i+4].replace('margin-bottom: 0.5rem !important;', 'margin-bottom: 0.5rem !important;\n            color: #0f172a !important;');
                    }
                    
                    content = lines.join('\n');
                    appliedCssCount++;
                    break;
                }
            }
        }
    }
});

console.log(`Applied ${appliedCssCount} CSS rule adjustments.`);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Swapping, clicking, and styling fixes completed successfully!');
