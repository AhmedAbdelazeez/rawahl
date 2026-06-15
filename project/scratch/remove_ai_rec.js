const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
let content = fs.readFileSync(filePath, 'utf8');

// The block of HTML to remove
const targetBlock = `<div class="flex items-start gap-2.5 bg-gradient-to-r from-amber-500/10 to-transparent p-3 rounded-xl border border-[#b0841a]/20">
                                        <i class="fa-solid fa-robot text-[#fcd34d] mt-0.5 shrink-0 animate-pulse"></i>
                                        <div>
                                            <strong class="text-[#fcd34d] block mb-0.5">توصيات الذكاء الاصطناعي لتطوير الأداء</strong>
                                            <span>نقترح توجيه 15% من الحافلات الاحتياطية لرحلات التأجير السياحي خلال عطلة نهاية الأسبوع لزيادة استغلال المقاعد بنسبة 6% وتحقيق عوائد هامشية إضافية.</span>
                                        </div>
                                    </div>`;

// Let's normalize space to avoid line-ending issues during search
const cleanContent = content.replace(/\r\n/g, '\n');
const cleanTarget = targetBlock.replace(/\r\n/g, '\n');

if (cleanContent.includes(cleanTarget)) {
    content = cleanContent.replace(cleanTarget, '');
    console.log('Successfully removed the AI recommendation block!');
} else {
    // If exact match fails, let's find the header text and remove the enclosing div
    const targetText = 'توصيات الذكاء الاصطناعي لتطوير الأداء';
    const index = cleanContent.indexOf(targetText);
    if (index !== -1) {
        // Find the start of the enclosing div before targetText
        const startDiv = cleanContent.lastIndexOf('<div', index);
        // Find the end of the enclosing div after targetText
        const endDiv = cleanContent.indexOf('</div>', index) + 6;
        
        if (startDiv !== -1 && endDiv !== -1) {
            const block = cleanContent.substring(startDiv, endDiv);
            content = cleanContent.replace(block, '');
            console.log('Removed enclosing block via index tracing!');
        } else {
            console.error('Could not trace enclosing div boundaries.');
        }
    } else {
        console.error('AI recommendation text not found in file!');
    }
}

fs.writeFileSync(filePath, content, 'utf8');
