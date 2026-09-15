// Export Report (Excel / PDF) for the department & service KPI views.
// One generic implementation reused by every department/service, since they
// all render KPI cards through the same #sector-kpis-grid container and the
// same service-detail-banner (see _KpiDashboard.cshtml, applyKpiFilters() in app.js).

const RAWAHEL_BRAND = {
    colorHex: 'B0841A',
    nameAr: 'شركة رواحل المشاعر',
    nameEn: 'RAWAHEL AL MASHAER CO.',
    logoUrl: 'https://www.rawahel.com.sa/wp-content/themes/tl4s-raoaa_rawahel/images/logo.png'
};

const EXCELJS_CDN_URL = 'https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.4.0/exceljs.min.js';
let exceljsLoadPromise = null;

function loadExcelJsLibrary() {
    if (typeof ExcelJS !== 'undefined') return Promise.resolve();
    if (exceljsLoadPromise) return exceljsLoadPromise;
    exceljsLoadPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = EXCELJS_CDN_URL;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('exceljs-load-failed'));
        document.head.appendChild(script);
    });
    return exceljsLoadPromise;
}

function reportIsEnglish() {
    return document.documentElement.lang === 'en';
}

function classifyStatusColor(el) {
    if (!el) return { hex: '94A3B8', label: '' };
    const cls = el.className || '';
    const label = (el.textContent || '').trim();
    if (/emerald|green/.test(cls)) return { hex: '10B981', label };
    if (/amber|yellow/.test(cls)) return { hex: 'F59E0B', label };
    if (/rose|red/.test(cls)) return { hex: 'F43F5E', label };
    if (/sky|blue/.test(cls)) return { hex: '0EA5E9', label };
    return { hex: '94A3B8', label };
}

// Reads the KPI cards currently displayed for the active department/service
// (moved into #sector-kpis-grid by applyKpiFilters()) plus the banner text
// that already carries a clean title/badge/description for that view.
function collectReportData() {
    const grid = document.getElementById('sector-kpis-grid');
    const cards = grid
        ? Array.from(grid.querySelectorAll('.glass-card[id^="card-"]')).filter(c => !c.classList.contains('hidden'))
        : [];

    const items = cards.map(card => {
        const rows = card.querySelectorAll(':scope > div');
        const row1Spans = rows[0] ? rows[0].querySelectorAll(':scope > span') : [];
        const row2Spans = rows[1] ? rows[1].querySelectorAll(':scope > span') : [];

        const title = row1Spans[0] ? row1Spans[0].textContent.trim() : card.id.replace('card-', '');
        const status = classifyStatusColor(row1Spans[1] || null);
        const value = row2Spans[0] ? row2Spans[0].textContent.trim() : '--';
        const detail = row2Spans[1] ? row2Spans[1].textContent.trim() : '';

        return { title, value, detail, status };
    });

    const titleEl = document.getElementById('service-banner-title');
    const badgeEl = document.getElementById('service-banner-badge');
    const descEl = document.getElementById('service-banner-desc');

    const isEn = reportIsEnglish();
    const now = new Date();
    const locale = isEn ? 'en-US' : 'ar-SA-u-nu-latn';
    const dateStr = now.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });

    return {
        isEn,
        departmentTitle: titleEl ? titleEl.textContent.trim() : (isEn ? 'Department Report' : 'تقرير الإدارة'),
        departmentBadge: badgeEl ? badgeEl.textContent.trim() : '',
        departmentDesc: descEl ? descEl.textContent.trim() : '',
        generatedBy: (window.RAWAHEL_DATA && window.RAWAHEL_DATA.userName) || '',
        dateStr,
        timeStr,
        items
    };
}

function buildReportFileName(data, ext) {
    const safe = data.departmentTitle.replace(/[\\/:*?"<>|]/g, '').trim().replace(/\s+/g, '_');
    const dateTag = new Date().toISOString().slice(0, 10);
    return `Rawahel_${safe || 'Report'}_${dateTag}.${ext}`;
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
}

async function exportReportToExcel(data) {
    try {
        await loadExcelJsLibrary();
    } catch (e) {
        alert(data.isEn
            ? 'Failed to load the Excel export library. Check your internet connection and try again.'
            : 'تعذر تحميل مكتبة تصدير الإكسل. يرجى التحقق من الاتصال بالإنترنت والمحاولة مجدداً.');
        return;
    }

    const isEn = data.isEn;
    const wb = new ExcelJS.Workbook();
    wb.creator = RAWAHEL_BRAND.nameEn;
    wb.created = new Date();

    const ws = wb.addWorksheet(isEn ? 'Report' : 'التقرير', {
        views: [{ rightToLeft: !isEn }]
    });

    ws.columns = [{ width: 5 }, { width: 34 }, { width: 20 }, { width: 32 }, { width: 16 }];

    const thinBorder = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
    };

    ws.mergeCells('A1:E2');
    const bandCell = ws.getCell('A1');
    bandCell.value = `${RAWAHEL_BRAND.nameAr}   |   ${RAWAHEL_BRAND.nameEn}`;
    bandCell.font = { size: 15, bold: true, color: { argb: 'FFFFFFFF' } };
    bandCell.alignment = { vertical: 'middle', horizontal: 'center' };
    bandCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + RAWAHEL_BRAND.colorHex } };
    ws.getRow(1).height = 24;
    ws.getRow(2).height = 24;

    try {
        const logoResp = await fetch(RAWAHEL_BRAND.logoUrl);
        const logoBuf = await logoResp.arrayBuffer();
        const imgId = wb.addImage({ buffer: logoBuf, extension: 'png' });
        ws.addImage(imgId, { tl: { col: 4.15, row: 0.15 }, ext: { width: 56, height: 56 } });
    } catch (e) {
        // Logo is a nice-to-have; the gold company-name band above already carries the identity.
    }

    let r = 4;
    ws.mergeCells(`A${r}:E${r}`);
    ws.getCell(`A${r}`).value = data.departmentTitle;
    ws.getCell(`A${r}`).font = { size: 14, bold: true, color: { argb: 'FF1E293B' } };
    ws.getCell(`A${r}`).alignment = { horizontal: 'center' };
    r++;

    if (data.departmentDesc) {
        ws.mergeCells(`A${r}:E${r}`);
        ws.getCell(`A${r}`).value = data.departmentDesc;
        ws.getCell(`A${r}`).font = { size: 10, italic: true, color: { argb: 'FF64748B' } };
        ws.getCell(`A${r}`).alignment = { horizontal: 'center', wrapText: true };
        r++;
    }

    r++;
    ws.mergeCells(`A${r}:B${r}`);
    ws.getCell(`A${r}`).value = (isEn ? 'Generated: ' : 'تاريخ الإصدار: ') + data.dateStr + ' - ' + data.timeStr;
    ws.getCell(`A${r}`).font = { size: 9, color: { argb: 'FF64748B' } };
    ws.mergeCells(`D${r}:E${r}`);
    ws.getCell(`D${r}`).value = (isEn ? 'Prepared by: ' : 'أعد بواسطة: ') + (data.generatedBy || '-');
    ws.getCell(`D${r}`).font = { size: 9, color: { argb: 'FF64748B' } };
    ws.getCell(`D${r}`).alignment = { horizontal: 'right' };
    r += 2;

    const headerRow = ws.getRow(r);
    const headers = isEn
        ? ['#', 'Indicator', 'Value', 'Details', 'Status']
        : ['#', 'المؤشر', 'القيمة', 'التفاصيل', 'الحالة'];
    headers.forEach((h, i) => {
        const cell = headerRow.getCell(i + 1);
        cell.value = h;
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + RAWAHEL_BRAND.colorHex } };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.border = thinBorder;
    });
    headerRow.height = 22;
    r++;

    data.items.forEach((item, idx) => {
        const row = ws.getRow(r);
        row.getCell(1).value = idx + 1;
        row.getCell(2).value = item.title;
        row.getCell(3).value = item.value;
        row.getCell(4).value = item.detail;
        row.getCell(5).value = item.status.label || '-';

        for (let c = 1; c <= 5; c++) {
            const cell = row.getCell(c);
            cell.border = thinBorder;
            cell.alignment = {
                horizontal: (c === 2 || c === 4) ? (isEn ? 'left' : 'right') : 'center',
                vertical: 'middle',
                wrapText: true
            };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: idx % 2 === 0 ? 'FFFFFFFF' : 'FFFAF6EC' } };
        }
        row.getCell(2).font = { bold: true };
        row.getCell(5).font = { bold: true, color: { argb: 'FF' + item.status.hex } };
        r++;
    });

    r++;
    ws.mergeCells(`A${r}:E${r}`);
    ws.getCell(`A${r}`).value = isEn
        ? 'Confidential - internal use for Rawahel Al Mashaer Co. only.'
        : 'وثيقة سرية - للاستخدام الداخلي لشركة رواحل المشاعر فقط.';
    ws.getCell(`A${r}`).font = { size: 8, italic: true, color: { argb: 'FF94A3B8' } };
    ws.getCell(`A${r}`).alignment = { horizontal: 'center' };

    const buffer = await wb.xlsx.writeBuffer();
    downloadBlob(
        new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
        buildReportFileName(data, 'xlsx')
    );
}

function escapeReportHtml(str) {
    return String(str == null ? '' : str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function buildPrintableReportHtml(data) {
    const isEn = data.isEn;
    const dir = isEn ? 'ltr' : 'rtl';
    const lang = isEn ? 'en' : 'ar';
    const font = isEn ? "'Outfit'" : "'Tajawal'";

    const rowsHtml = data.items.map((item, idx) => `
        <tr>
            <td class="idx">${idx + 1}</td>
            <td class="title">${escapeReportHtml(item.title)}</td>
            <td class="value">${escapeReportHtml(item.value)}</td>
            <td class="detail">${escapeReportHtml(item.detail)}</td>
            <td class="status"><span class="status-pill" style="background:#${item.status.hex}1a; color:#${item.status.hex}; border:1px solid #${item.status.hex}55;">${escapeReportHtml(item.status.label || '-')}</span></td>
        </tr>`).join('');

    return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="utf-8">
<title>${escapeReportHtml(data.departmentTitle)} - Rawahel</title>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&family=Outfit:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; }
  body { font-family: ${font}, sans-serif; margin: 0; padding: 0; color: #1e293b; background: #fff; }
  .page { padding: 14mm 12mm; }
  .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #${RAWAHEL_BRAND.colorHex}; padding-bottom: 12px; margin-bottom: 18px; }
  .header .brand { display: flex; align-items: center; gap: 12px; }
  .header img { width: 54px; height: auto; }
  .header .names .ar-name { font-weight: 900; font-size: 15px; color: #1e293b; }
  .header .names .en-name { font-size: 10px; letter-spacing: .05em; color: #${RAWAHEL_BRAND.colorHex}; font-weight: 700; }
  .header .meta { text-align: ${isEn ? 'right' : 'left'}; font-size: 10px; color: #64748b; line-height: 1.6; }
  .title-block { margin-bottom: 14px; }
  .dept-badge { display: inline-block; font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 999px; background: #faf6ec; color: #${RAWAHEL_BRAND.colorHex}; border: 1px solid #eadcb8; margin-bottom: 6px; }
  h1 { font-size: 19px; margin: 4px 0; }
  .desc { font-size: 11px; color: #64748b; max-width: 720px; margin: 4px 0 0; }
  table { width: 100%; border-collapse: collapse; margin-top: 10px; }
  thead th { background: #${RAWAHEL_BRAND.colorHex}; color: #fff; font-size: 10.5px; padding: 8px 10px; text-align: ${isEn ? 'left' : 'right'}; }
  thead th.idx, thead th.value, thead th.status { text-align: center; }
  tbody td { padding: 7px 10px; font-size: 11px; border-bottom: 1px solid #eef1f5; }
  tbody tr:nth-child(even) { background: #faf9f6; }
  td.idx, td.value, td.status { text-align: center; }
  td.title { font-weight: 700; }
  td.value { font-weight: 800; color: #1e293b; }
  .status-pill { font-size: 9.5px; font-weight: 800; padding: 3px 9px; border-radius: 999px; }
  .footer { margin-top: 22px; padding-top: 10px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 9px; color: #94a3b8; }
  @page { size: A4; margin: 0; }
</style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="brand">
        <img src="${RAWAHEL_BRAND.logoUrl}" alt="Rawahel" />
        <div class="names">
          <div class="ar-name">${RAWAHEL_BRAND.nameAr}</div>
          <div class="en-name">${RAWAHEL_BRAND.nameEn}</div>
        </div>
      </div>
      <div class="meta">
        <div>${isEn ? 'Generated' : 'تاريخ الإصدار'}: ${data.dateStr} - ${data.timeStr}</div>
        <div>${isEn ? 'Prepared by' : 'أعد بواسطة'}: ${escapeReportHtml(data.generatedBy || '-')}</div>
      </div>
    </div>
    <div class="title-block">
      ${data.departmentBadge ? `<div class="dept-badge">${escapeReportHtml(data.departmentBadge)}</div>` : ''}
      <h1>${escapeReportHtml(data.departmentTitle)}</h1>
      ${data.departmentDesc ? `<p class="desc">${escapeReportHtml(data.departmentDesc)}</p>` : ''}
    </div>
    <table>
      <thead>
        <tr>
          <th class="idx">#</th>
          <th>${isEn ? 'Indicator' : 'المؤشر'}</th>
          <th class="value">${isEn ? 'Value' : 'القيمة'}</th>
          <th>${isEn ? 'Details' : 'التفاصيل'}</th>
          <th class="status">${isEn ? 'Status' : 'الحالة'}</th>
        </tr>
      </thead>
      <tbody>${rowsHtml}</tbody>
    </table>
    <div class="footer">
      <span>${isEn ? 'Confidential - internal use for Rawahel Al Mashaer Co. only.' : 'وثيقة سرية - للاستخدام الداخلي لشركة رواحل المشاعر فقط.'}</span>
      <span>Rawahel Performance Dashboard</span>
    </div>
  </div>
</body>
</html>`;
}

function exportReportToPdf(data) {
    const win = window.open('', '_blank');
    if (!win) {
        alert(data.isEn
            ? 'Please allow pop-ups for this site to export the PDF report.'
            : 'يرجى السماح بالنوافذ المنبثقة لهذا الموقع لتصدير تقرير PDF.');
        return;
    }
    win.document.open();
    win.document.write(buildPrintableReportHtml(data));
    win.document.close();

    const triggerPrint = () => {
        try { win.focus(); win.print(); } catch (e) { /* window may already be closed by the user */ }
    };
    win.onload = () => setTimeout(triggerPrint, 350);
    setTimeout(triggerPrint, 1200);
}

function toggleExportMenu(event) {
    if (event) event.stopPropagation();
    const menu = document.getElementById('export-report-menu');
    if (menu) menu.classList.toggle('hidden');
}

document.addEventListener('click', (e) => {
    const menu = document.getElementById('export-report-menu');
    const btn = document.getElementById('export-report-btn');
    if (!menu || menu.classList.contains('hidden')) return;
    if (menu.contains(e.target) || (btn && btn.contains(e.target))) return;
    menu.classList.add('hidden');
});

function handleExportReport(type) {
    const menu = document.getElementById('export-report-menu');
    if (menu) menu.classList.add('hidden');

    const data = collectReportData();
    if (!data.items.length) {
        alert(reportIsEnglish()
            ? 'No KPI data is available to export for this view yet.'
            : 'لا توجد بيانات مؤشرات متاحة للتصدير في هذه الشاشة حالياً.');
        return;
    }

    if (type === 'excel') {
        exportReportToExcel(data);
    } else if (type === 'pdf') {
        exportReportToPdf(data);
    }
}
