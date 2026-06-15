const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
let content = fs.readFileSync(filePath, 'utf8');

// Define replacements to convert the dark slate card into a light gold/white card
const replacements = [
    {
        old: 'bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-6 text-slate-200 border-2 border-[#b0841a]/60 shadow-xl relative overflow-hidden',
        new: 'bg-gradient-to-br from-white to-[#faf6ec]/50 rounded-3xl p-6 text-slate-800 border-2 border-[#b0841a]/50 shadow-md relative overflow-hidden'
    },
    {
        old: 'bg-[#b0841a]/25 text-[#fcd34d] text-[10px] px-3.5 py-1.5 rounded-full font-black border border-[#b0841a]/40 inline-block',
        new: 'bg-[#b0841a]/10 text-[#b0841a] text-[10px] px-3.5 py-1.5 rounded-full font-black border border-[#b0841a]/30 inline-block'
    },
    {
        old: 'text-xl font-black text-white mt-1',
        new: 'text-xl font-black text-slate-950 mt-1'
    },
    {
        old: 'space-y-3 mt-4 text-xs font-semibold text-neutral-300 leading-relaxed max-h-60 overflow-y-auto pr-1',
        new: 'space-y-3 mt-4 text-xs font-semibold text-slate-600 leading-relaxed max-h-60 overflow-y-auto pr-1'
    },
    {
        old: 'bg-slate-800/40 p-3 rounded-xl border border-slate-700/30',
        new: 'bg-slate-50 p-3 rounded-xl border border-slate-200'
    },
    {
        old: 'text-white block mb-0.5',
        new: 'text-slate-950 block mb-0.5'
    },
    {
        old: 'bg-slate-800/50 p-4 rounded-2xl border border-slate-700/40 flex items-center justify-between',
        new: 'bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between'
    },
    {
        old: 'text-xl font-black text-white',
        new: 'text-xl font-black text-slate-950'
    },
    {
        old: 'text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/20 font-black',
        new: 'text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200 font-black'
    },
    {
        old: 'text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-lg border border-amber-500/20 font-black',
        new: 'text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg border border-amber-200 font-black'
    },
    {
        old: 'text-xs text-[#fcd34d] font-bold mt-1',
        new: 'text-xs text-[#b0841a] font-bold mt-1'
    },
    {
        old: 'relative w-16 h-16 flex items-center justify-center bg-slate-900 rounded-full p-1 border border-slate-700',
        new: 'relative w-16 h-16 flex items-center justify-center bg-white rounded-full p-1 border border-slate-200'
    },
    {
        old: 'text-slate-800',
        new: 'text-slate-100'
    },
    {
        old: 'text-xs font-black text-white',
        new: 'text-xs font-black text-slate-800'
    },
    {
        old: 'text-[10px] text-slate-400 block font-bold',
        new: 'text-[10px] text-slate-500 block font-bold'
    }
];

// Apply replacements
let replacedCount = 0;
replacements.forEach(r => {
    // Escape regex characters
    const escapedOld = r.old.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedOld, 'g');
    if (content.match(regex)) {
        content = content.replace(regex, r.new);
        replacedCount++;
    }
});

console.log(`Applied ${replacedCount} theme color replacements.`);
fs.writeFileSync(filePath, content, 'utf8');
