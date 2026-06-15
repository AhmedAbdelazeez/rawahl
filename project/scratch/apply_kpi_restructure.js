const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'Pages', 'Index.cshtml');
let content = fs.readFileSync(filePath, 'utf8');

console.log('Original content length:', content.length);

// 1. Sidebar Nav Restructuring
const sidebarStartToken = '<div class="sidebar-header" data-i18n="sidebar-business-areas">';
const sidebarEndToken = '<div class="sidebar-header" data-i18n="sidebar-company-depts">';

const sidebarStartIdx = content.indexOf(sidebarStartToken);
const sidebarEndIdx = content.indexOf(sidebarEndToken);

if (sidebarStartIdx === -1 || sidebarEndIdx === -1) {
    console.error('Sidebar tokens not found');
    process.exit(1);
}

const newSidebarNav = `<div class="sidebar-header" data-i18n="sidebar-business-areas">قطاعات الأعمال الحيوية</div>
                    
                    @if (Model.IsTransportationManager)
                    {
                        <a href="javascript:void(0)" onclick="showView('transportation-sector')" id="lnk-transportation-sector">
                            <i class="fa-solid fa-bus"></i>
                            <span data-i18n="nav-transportation">قطاع النقل التخصصي</span>
                        </a>
                    }
                    
                    @if (Model.IsPilgrimServicesManager)
                    {
                        <a href="javascript:void(0)" onclick="showView('pilgrim-sector')" id="lnk-pilgrim-sector">
                            <i class="fa-solid fa-kaaba"></i>
                            <span data-i18n="nav-pilgrim-services">قطاع خدمات المعتمرين</span>
                        </a>
                    }

                    `;

content = content.substring(0, sidebarStartIdx) + newSidebarNav + content.substring(sidebarEndIdx);
console.log('Sidebar replaced. New content length:', content.length);


// 2. Executive Top Panel and Pilgrim Services Card Grids
const kpiContainerTag = '<div id="kpis-container">';
const kpiContainerStartIdx = content.indexOf(kpiContainerTag);
if (kpiContainerStartIdx === -1) {
    console.error('kpis-container not found');
    process.exit(1);
}

// Track matching closing </div> of kpis-container
let depth = 1;
let idx = kpiContainerStartIdx + kpiContainerTag.length;
while (depth > 0 && idx < content.length) {
    const nextOpen = content.indexOf('<div', idx);
    const nextClose = content.indexOf('</div>', idx);
    
    if (nextClose === -1) {
        break;
    }
    
    if (nextOpen !== -1 && nextOpen < nextClose) {
        depth++;
        idx = nextOpen + 4;
    } else {
        depth--;
        idx = nextClose + 6;
    }
}

const kpiContainerClosingIdx = idx - 6; // index of the </div> closing tag

const execTopPanelHtml = `<!-- 4 Top Executive KPIs for Sector/Department/Service -->
                <div id="executive-top-panel" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-start">
                    <!-- Revenue -->
                    <div class="glass-card p-5 rounded-2xl border-l-4 border-[#b0841a] flex flex-col justify-between h-32 bg-white">
                        <span class="text-xs text-slate-500 font-bold flex items-center gap-1"><i class="fa-solid fa-coins text-[#b0841a]"></i> <span data-i18n="exec-top-revenue">إجمالي الإيرادات</span></span>
                        <span id="exec-top-revenue-val" class="text-2xl font-black text-slate-900 mt-2">--</span>
                        <span id="exec-top-revenue-sub" class="text-[9px] text-slate-400 font-bold">--</span>
                    </div>
                    <!-- Growth -->
                    <div class="glass-card p-5 rounded-2xl border-l-4 border-[#b0841a] flex flex-col justify-between h-32 bg-white">
                        <span class="text-xs text-slate-500 font-bold flex items-center gap-1"><i class="fa-solid fa-chart-line text-[#b0841a]"></i> <span data-i18n="exec-top-growth">معدل النمو</span></span>
                        <span id="exec-top-growth-val" class="text-2xl font-black text-slate-900 mt-2">--</span>
                        <span id="exec-top-growth-sub" class="text-[9px] text-slate-400 font-bold">--</span>
                    </div>
                    <!-- Achievement -->
                    <div class="glass-card p-5 rounded-2xl border-l-4 border-[#b0841a] flex flex-col justify-between h-32 bg-white">
                        <span class="text-xs text-slate-500 font-bold flex items-center gap-1"><i class="fa-solid fa-bullseye text-[#b0841a]"></i> <span data-i18n="exec-top-achievement">نسبة تحقيق المستهدف</span></span>
                        <span id="exec-top-achievement-val" class="text-2xl font-black text-slate-900 mt-2">--</span>
                        <div class="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                            <div id="exec-top-achievement-bar" class="bg-gradient-to-r from-[#b0841a] to-[#8c6510] h-1.5 rounded-full" style="width: 0%"></div>
                        </div>
                    </div>
                    <!-- Transactions -->
                    <div class="glass-card p-5 rounded-2xl border-l-4 border-[#b0841a] flex flex-col justify-between h-32 bg-white">
                        <span class="text-xs text-slate-500 font-bold flex items-center gap-1"><i class="fa-solid fa-gears text-[#b0841a]"></i> <span data-i18n="exec-top-transactions">إجمالي العمليات</span></span>
                        <span id="exec-top-transactions-val" class="text-2xl font-black text-slate-900 mt-2">--</span>
                        <span id="exec-top-transactions-sub" class="text-[9px] text-slate-400 font-bold">--</span>
                    </div>
                </div>

                `;

const pilgrimServicesCardsHtml = `
                    <!-- 7. خدمة إصدار التأشيرات -->
                    <div id="section-service-visa" class="kpi-group-wrapper mb-6 text-start">
                        <div class="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
                            <span class="w-1.5 h-4 bg-[#b0841a] rounded-full"></span>
                            <h3 class="text-xs font-black text-slate-800" data-i18n="group-service-visa-title">مؤشرات خدمة إصدار التأشيرات</h3>
                        </div>
                        <div id="grid-service-visa" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <!-- Visa Processing Time -->
                            <div id="card-visa-processing-time" class="glass-card p-5 rounded-2xl flex flex-col justify-between h-40">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="text-[11px] font-black text-slate-800" data-i18n="card-visa-processing-time-title">وقت معالجة التأشيرات</span>
                                    <span id="flag-visa-processing-time" class="text-[9px] font-bold px-2 py-0.5 rounded-full">--</span>
                                </div>
                                <div class="my-2 flex flex-col items-center justify-center">
                                    <span class="text-3xl font-black text-slate-900" id="val-visa-processing-time">--</span>
                                    <span class="text-[10px] text-slate-500 font-bold mt-1.5">المستهدف: <span id="target-val-visa-processing-time">--</span></span>
                                </div>
                            </div>
                            <!-- Visa Approval Rate -->
                            <div id="card-visa-approval-rate" class="glass-card p-5 rounded-2xl flex flex-col justify-between h-40">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="text-[11px] font-black text-slate-800" data-i18n="card-visa-approval-rate-title">نسبة قبول التأشيرات</span>
                                    <span id="flag-visa-approval-rate" class="text-[9px] font-bold px-2 py-0.5 rounded-full">--</span>
                                </div>
                                <div class="my-2 flex flex-col items-center justify-center">
                                    <span class="text-3xl font-black text-slate-900" id="val-visa-approval-rate">--</span>
                                    <span class="text-[10px] text-slate-500 font-bold mt-1.5">المستهدف: <span id="target-val-visa-approval-rate">--</span></span>
                                </div>
                            </div>
                            <!-- Visa Count -->
                            <div id="card-visa-count" class="glass-card p-5 rounded-2xl flex flex-col justify-between h-40">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="text-[11px] font-black text-slate-800" data-i18n="card-visa-count-title">عدد التأشيرات المصدرة</span>
                                    <span id="flag-visa-count" class="text-[9px] font-bold px-2 py-0.5 rounded-full">--</span>
                                </div>
                                <div class="my-2 flex flex-col items-center justify-center">
                                    <span class="text-3xl font-black text-slate-900" id="val-visa-count">--</span>
                                    <span class="text-[10px] text-slate-500 font-bold mt-1.5">المستهدف: <span id="target-val-visa-count">--</span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 8. خدمة حجز وإقامة الفنادق -->
                    <div id="section-service-hotels" class="kpi-group-wrapper mb-6 text-start">
                        <div class="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
                            <span class="w-1.5 h-4 bg-[#b0841a] rounded-full"></span>
                            <h3 class="text-xs font-black text-slate-800" data-i18n="group-service-hotels-title">مؤشرات خدمة حجز وإقامة الفنادق</h3>
                        </div>
                        <div id="grid-service-hotels" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <!-- Hotel Occupancy -->
                            <div id="card-hotel-occupancy" class="glass-card p-5 rounded-2xl flex flex-col justify-between h-40">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="text-[11px] font-black text-slate-800" data-i18n="card-hotel-occupancy-title">نسبة إشغال الفنادق</span>
                                    <span id="flag-hotel-occupancy" class="text-[9px] font-bold px-2 py-0.5 rounded-full">--</span>
                                </div>
                                <div class="my-2 flex flex-col items-center justify-center">
                                    <span class="text-3xl font-black text-slate-900" id="val-hotel-occupancy">--</span>
                                    <span class="text-[10px] text-slate-500 font-bold mt-1.5">المستهدف: <span id="target-val-hotel-occupancy">--</span></span>
                                </div>
                            </div>
                            <!-- Hotel Cancel Rate -->
                            <div id="card-hotel-cancel-rate" class="glass-card p-5 rounded-2xl flex flex-col justify-between h-40">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="text-[11px] font-black text-slate-800" data-i18n="card-hotel-cancel-rate-title">معدل إلغاء الحجوزات</span>
                                    <span id="flag-hotel-cancel-rate" class="text-[9px] font-bold px-2 py-0.5 rounded-full">--</span>
                                </div>
                                <div class="my-2 flex flex-col items-center justify-center">
                                    <span class="text-3xl font-black text-slate-900" id="val-hotel-cancel-rate">--</span>
                                    <span class="text-[10px] text-slate-500 font-bold mt-1.5">المستهدف: <span id="target-val-hotel-cancel-rate">--</span></span>
                                </div>
                            </div>
                            <!-- Guest Rating -->
                            <div id="card-hotel-rating" class="glass-card p-5 rounded-2xl flex flex-col justify-between h-40">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="text-[11px] font-black text-slate-800" data-i18n="card-hotel-rating-title">تقييم رضا النزلاء عن الإقامة</span>
                                    <span id="flag-hotel-rating" class="text-[9px] font-bold px-2 py-0.5 rounded-full">--</span>
                                </div>
                                <div class="my-2 flex flex-col items-center justify-center">
                                    <span class="text-3xl font-black text-slate-900" id="val-hotel-rating">--</span>
                                    <span class="text-[10px] text-slate-500 font-bold mt-1.5">المستهدف: <span id="target-val-hotel-rating">--</span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 9. خدمة نقل المعتمرين -->
                    <div id="section-service-transport" class="kpi-group-wrapper mb-6 text-start">
                        <div class="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
                            <span class="w-1.5 h-4 bg-[#b0841a] rounded-full"></span>
                            <h3 class="text-xs font-black text-slate-800" data-i18n="group-service-transport-title">مؤشرات خدمة نقل المعتمرين</h3>
                        </div>
                        <div id="grid-service-transport" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <!-- Pilgrim Transport Ops Plan -->
                            <div id="card-pilgrim-ops-plan" class="glass-card p-5 rounded-2xl flex flex-col justify-between h-40">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="text-[11px] font-black text-slate-800" data-i18n="card-pilgrim-ops-plan-title">الالتزام بجدول نقل المعتمرين</span>
                                    <span id="flag-pilgrim-ops-plan" class="text-[9px] font-bold px-2 py-0.5 rounded-full">--</span>
                                </div>
                                <div class="my-2 flex flex-col items-center justify-center">
                                    <span class="text-3xl font-black text-slate-900" id="val-pilgrim-ops-plan">--</span>
                                    <span class="text-[10px] text-slate-500 font-bold mt-1.5">المستهدف: <span id="target-val-pilgrim-ops-plan">--</span></span>
                                </div>
                            </div>
                            <!-- Pilgrim Transport Safety Rate -->
                            <div id="card-pilgrim-safety-rate" class="glass-card p-5 rounded-2xl flex flex-col justify-between h-40">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="text-[11px] font-black text-slate-800" data-i18n="card-pilgrim-safety-rate-title">معدل السلامة في نقل المعتمرين</span>
                                    <span id="flag-pilgrim-safety-rate" class="text-[9px] font-bold px-2 py-0.5 rounded-full">--</span>
                                </div>
                                <div class="my-2 flex flex-col items-center justify-center">
                                    <span class="text-3xl font-black text-slate-900" id="val-pilgrim-safety-rate">--</span>
                                    <span class="text-[10px] text-slate-500 font-bold mt-1.5">المستهدف: <span id="target-val-pilgrim-safety-rate">--</span></span>
                                </div>
                            </div>
                            <!-- Pilgrim Transport Shuttle Util -->
                            <div id="card-pilgrim-shuttle-util" class="glass-card p-5 rounded-2xl flex flex-col justify-between h-40">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="text-[11px] font-black text-slate-800" data-i18n="card-pilgrim-shuttle-util-title">نسبة تشغيل حافلات المعتمرين</span>
                                    <span id="flag-pilgrim-shuttle-util" class="text-[9px] font-bold px-2 py-0.5 rounded-full">--</span>
                                </div>
                                <div class="my-2 flex flex-col items-center justify-center">
                                    <span class="text-3xl font-black text-slate-900" id="val-pilgrim-shuttle-util">--</span>
                                    <span class="text-[10px] text-slate-500 font-bold mt-1.5">المستهدف: <span id="target-val-pilgrim-shuttle-util">--</span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 10. خدمة الضيافة والتموين الإعاشة -->
                    <div id="section-service-hospitality" class="kpi-group-wrapper mb-6 text-start">
                        <div class="flex items-center gap-2 mb-4 border-b border-slate-200 pb-2">
                            <span class="w-1.5 h-4 bg-[#b0841a] rounded-full"></span>
                            <h3 class="text-xs font-black text-slate-800" data-i18n="group-service-hospitality-title">مؤشرات خدمة الضيافة والتموين الإعاشة</h3>
                        </div>
                        <div id="grid-service-hospitality" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <!-- Meal Delivery On-Time -->
                            <div id="card-meal-delivery-ontime" class="glass-card p-5 rounded-2xl flex flex-col justify-between h-40">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="text-[11px] font-black text-slate-800" data-i18n="card-meal-delivery-ontime-title">التزام تسليم الوجبات في الوقت</span>
                                    <span id="flag-meal-delivery-ontime" class="text-[9px] font-bold px-2 py-0.5 rounded-full">--</span>
                                </div>
                                <div class="my-2 flex flex-col items-center justify-center">
                                    <span class="text-3xl font-black text-slate-900" id="val-meal-delivery-ontime">--</span>
                                    <span class="text-[10px] text-slate-500 font-bold mt-1.5">المستهدف: <span id="target-val-meal-delivery-ontime">--</span></span>
                                </div>
                            </div>
                            <!-- Food Safety Compliance -->
                            <div id="card-food-safety-compliance" class="glass-card p-5 rounded-2xl flex flex-col justify-between h-40">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="text-[11px] font-black text-slate-800" data-i18n="card-food-safety-compliance-title">الامتثال لمعايير سلامة الأغذية</span>
                                    <span id="flag-food-safety-compliance" class="text-[9px] font-bold px-2 py-0.5 rounded-full">--</span>
                                </div>
                                <div class="my-2 flex flex-col items-center justify-center">
                                    <span class="text-3xl font-black text-slate-900" id="val-food-safety-compliance">--</span>
                                    <span class="text-[10px] text-slate-500 font-bold mt-1.5">المستهدف: <span id="target-val-food-safety-compliance">--</span></span>
                                </div>
                            </div>
                            <!-- Hospitality Satisfaction -->
                            <div id="card-hospitality-satisfaction" class="glass-card p-5 rounded-2xl flex flex-col justify-between h-40">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="text-[11px] font-black text-slate-800" data-i18n="card-hospitality-satisfaction-title">رضا المعتمرين عن خدمات الضيافة</span>
                                    <span id="flag-hospitality-satisfaction" class="text-[9px] font-bold px-2 py-0.5 rounded-full">--</span>
                                </div>
                                <div class="my-2 flex flex-col items-center justify-center">
                                    <span class="text-3xl font-black text-slate-900" id="val-hospitality-satisfaction">--</span>
                                    <span class="text-[10px] text-slate-500 font-bold mt-1.5">المستهدف: <span id="target-val-hospitality-satisfaction">--</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
`;

// Insert the Executive panel and cards
content = content.substring(0, kpiContainerStartIdx) + execTopPanelHtml + kpiContainerTag + content.substring(kpiContainerStartIdx + kpiContainerTag.length, kpiContainerClosingIdx) + pilgrimServicesCardsHtml + content.substring(kpiContainerClosingIdx);
console.log('KPIs container updated. New content length:', content.length);


// 3. Client JavaScript Section Replacement
const scriptStartIdx = content.indexOf('<script>');
if (scriptStartIdx === -1) {
    console.error('script tag not found');
    process.exit(1);
}

const newJsCode = `<script>
        const allowedDepts = @Html.Raw(System.Text.Json.JsonSerializer.Serialize(Model.AllowedDepartmentCodes));
        const isTransportationManager = @Model.IsTransportationManager.ToString().ToLower();
        const isPilgrimServicesManager = @Model.IsPilgrimServicesManager.ToString().ToLower();
        
        try {
            AOS.init({ duration: 800, once: true });
        } catch (e) {
            console.warn("AOS animation library could not be loaded:", e);
        }

        // الهيكل الافتراضي لإعدادات الـ 34 مؤشراً بالكامل (target, excellent limits, good limits)
        const defaultSettings = {
            'rev-growth': { target: 150, excellentMin: 142.5, goodMin: 112.5 },
            'ebitda': { target: 35, excellentMin: 33.25, goodMin: 26.25 },
            'cashflow': { target: 50, excellentMin: 47.5, goodMin: 37.5 },
            'roa': { target: 12, excellentMin: 11.4, goodMin: 9.0 },
            'cust-ret': { target: 85, excellentMin: 80.75, goodMin: 63.75 },
            'nps': { target: 70, excellentMin: 66.5, goodMin: 52.5 },
            'new-contracts': { target: 15, excellentMin: 14.25, goodMin: 11.25 },
            'ops-plan': { target: 90, excellentMin: 85.5, goodMin: 67.5 },
            'fleet-ready': { target: 95, excellentMin: 90.25, goodMin: 71.25 },
            'fleet-util': { target: 85, excellentMin: 80.75, goodMin: 63.75 },
            'hr-ret': { target: 90, excellentMin: 85.5, goodMin: 67.5 },
            'it-autom': { target: 80, excellentMin: 76.0, goodMin: 60.0 },
            'critical-succession': { target: 80, excellentMin: 76.0, goodMin: 60.0 },
            'saudization': { target: 35, excellentMin: 33.25, goodMin: 26.25 },
            'hse-ltifr': { target: 1.5, excellentMax: 1.5, goodMax: 2.0 },
            'hse-accidents': { target: 0, excellentMax: 0, goodMax: 1 },
            'audit-comp': { target: 95, excellentMin: 90.25, goodMin: 71.25 },
            'strat-goals': { target: 85, excellentMin: 80.75, goodMin: 63.75 },
            'strat-init': { target: 90, excellentMin: 85.5, goodMin: 67.5 },
            'risk-handling': { target: 90, excellentMin: 85.5, goodMin: 67.5 },
            'gov-maturity': { target: 95, excellentMin: 90.25, goodMin: 71.25 },
            'strat-goals-achieve': { target: 85, excellentMin: 80.75, goodMin: 63.75 },
            // 12 new pilgrim services metrics
            'visa-processing-time': { target: 24, excellentMax: 24, goodMax: 48 },
            'visa-approval-rate': { target: 98, excellentMin: 98, goodMin: 95 },
            'visa-count': { target: 15000, excellentMin: 15000, goodMin: 12000 },
            'hotel-occupancy': { target: 85, excellentMin: 85, goodMin: 75 },
            'hotel-cancel-rate': { target: 5, excellentMax: 5, goodMax: 10 },
            'hotel-rating': { target: 90, excellentMin: 90, goodMin: 80 },
            'pilgrim-ops-plan': { target: 95, excellentMin: 95, goodMin: 90 },
            'pilgrim-safety-rate': { target: 100, excellentMin: 100, goodMin: 99 },
            'pilgrim-shuttle-util': { target: 90, excellentMin: 90, goodMin: 80 },
            'meal-delivery-ontime': { target: 98, excellentMin: 98, goodMin: 95 },
            'food-safety-compliance': { target: 100, excellentMin: 100, goodMin: 98 },
            'hospitality-satisfaction': { target: 90, excellentMin: 90, goodMin: 80 }
        };

        const kpiSettings = { ...defaultSettings };
        function loadSettings() {
            const saved = localStorage.getItem('kpi_settings');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    Object.keys(defaultSettings).forEach(key => {
                        if (parsed[key]) kpiSettings[key] = parsed[key];
                    });
                } catch (e) {
                    console.error("Error loading targets from localStorage:", e);
                }
            }
        }
        loadSettings();

        // التوطين والترجمة للغات المعتمدة
        const translations = {
            'ar': {
                'langToggleText': 'English (EN)',
                'sidebar-logo-text': 'شركة رواحل المشاعر',
                'sidebar-business-areas': 'قطاعات الأعمال الحيوية',
                'sidebar-company-depts': 'إدارات وأقسام الشركة',
                'nav-overview': 'الرئيسية والتحليل الموحد',
                'nav-transportation': 'قطاع النقل التخصصي',
                'nav-pilgrim-services': 'قطاع خدمات المعتمرين',
                'show-all-departments': 'عرض جميع الإدارات والأقسام',
                'sidebar-settings': 'إعدادات المستهدفات',
                'sidebar-copyright': 'نظام رواحل القياسي المعتمد © 2026',
                'header-title': 'نظام مراقبة الأداء لشركة رواحل',
                'header-subtitle': 'لوحة تفاعلية حية متصلة بقاعدة البيانات ومطابقة لألوان الهوية الرسمية',
                'header-ceo-name': 'غسان عراقي',
                'header-ceo-role': 'المدير العام (CEO)',
                'ticker-perf-label': 'الأداء العام لشركة رواحل:',
                'ticker-perf-desc': 'معدل إنجاز قطاعات التشغيل',
                'ticker-may': 'لشهر مايو.',
                'ticker-revenue-label': 'نمو الإيرادات:',
                'ticker-revenue-desc': 'حققنا نسبة نمو بقيمة',
                'ticker-ebitda-label': 'هامش EBITDA التشغيلي:',
                'ticker-ebitda-desc': 'أداء مالي متزن ويسجل',
                'ticker-fleet-label': 'جاهزية الأسطول الحالية:',
                'ticker-fleet-desc': 'جاهزية حافلات التشغيل ترتفع لـ',
                'ticker-fleet-total': '(إجمالي 1,240 حافلة).',
                'ticker-nps-label': 'رضا العملاء NPS:',
                'ticker-nps-desc': 'نقاط رضا ضيوف الرحمن تسجل',
                'ticker-ops-label': 'الالتزام بالخطة التشغيلية:',
                'ticker-ops-desc': 'نسبة الالتزام بجدول رحلات النقل بلغت',
                'summary-badge': 'نظرة عامة على الأداء الموحد',
                'summary-title': 'مصفوفة مؤشرات الأداء لشركة رواحل',
                'summary-desc': 'اختر قطاع الأعمال من اليسار أو تفقد المؤشرات التنفيذية للقطاعات.',
                'summary-total': 'إجمالي المؤشرات',
                'summary-excellent': 'ممتاز 🟢',
                'summary-good': 'جيد 🟡',
                'summary-bad': 'ضعيف 🔴',
                'summary-avg-label': 'متوسط الأداء المالي والتشغيلي المجمع للقطاعات',
                'overview-sector-perf': 'كفاءة أداء القطاع الكلية',
                'chart-flags-title': 'توزيع تقييم مؤشرات الأداء الحالية (الأعلام)',
                
                // Top Executive translations
                'exec-top-revenue': 'إجمالي الإيرادات',
                'exec-top-growth': 'معدل النمو',
                'exec-top-achievement': 'نسبة تحقيق المستهدف',
                'exec-top-transactions': 'إجمالي العمليات',

                // Sector & Service translations
                'group-finance-title': 'مؤشرات الأداء المالي',
                'card-rev-growth-title': 'إجمالي الإيرادات ومعدل النمو',
                'card-ebitda-title': 'هامش EBITDA التشغيلي',
                'card-cashflow-title': 'التفوق النقدى التشغيلي',
                'card-roa-title': 'العائد على الأصول ROA',
                'group-commercial-title': 'مؤشرات الأداء التجاري والعملاء',
                'card-cust-ret-title': 'نسبة الاحتفاظ بالعملاء',
                'card-nps-title': 'صافي نقاط رضا العملاء NPS',
                'card-new-contracts-title': 'عدد العقود الاستراتيجية الجديدة',
                'group-ops-title': 'مؤشرات العمليات وأسطول الحافلات',
                'card-ops-plan-title': 'الالتزام بالخطة التشغيلية',
                'card-fleet-ready-title': 'نسبة جاهزية أسطول الحافلات',
                'card-fleet-util-title': 'نسبة استغلال أسطول مقاعد الحافلات',
                'group-support-title': 'مؤشرات الموارد البشرية، الـ HSE، والتحول الرقمي المسانده',
                'support-hr-title': 'الموارد البشرية والتحول الرقمي',
                'val-hr-ret-label': 'معدل الاحتفاظ بالموظفين الكوادر',
                'val-it-autom-label': 'تنفيذ مشاريع التحول الرقمي وأتمتة الورش',
                'val-critical-succession-label': 'خطط الإحلال والتعاقب للوظائف الحرجة',
                'val-saudization-label': 'نسبة التوطين والسعوده بالشركة',
                'support-hse-title': 'السلامة HSE والامتثال والتدقيق',
                'val-hse-ltifr-label': 'معدل حوادث العمل LTIFR',
                'val-hse-accidents-label': 'حوادث جسيمة للحافلات بالطرق',
                'val-audit-comp-label': 'نسبة الامتثال للوائح والتراخيص',
                'group-strategy-perf-title': 'مؤشرات الاستراتيجية والمشاريع PMO والحوكمة',
                'support-strategy-title': 'الاستراتيجية والمشاريع',
                'val-strat-goals-label': 'تحقيق أهداف الاستراتيجية والتوسع',
                'val-strat-init-label': 'معدل إنجاز مبادرات مكتب PMO',
                'support-risk-gov-title': 'إدارة المخاطر والحوكمة',
                'val-risk-handling-label': 'نسبة معالجة المخاطر المؤسسية',
                'val-gov-maturity-label': 'مستوى تطبيق حوكمة الشركات',
                'val-strat-goals-achieve-label': 'نسبة تحقيق الأهداف الاستراتيجية الموحدة',
                
                // Pilgrim services translations
                'group-service-visa-title': 'مؤشرات خدمة إصدار التأشيرات',
                'card-visa-processing-time-title': 'وقت معالجة التأشيرات',
                'card-visa-approval-rate-title': 'نسبة قبول التأشيرات',
                'card-visa-count-title': 'عدد التأشيرات المصدرة',
                'group-service-hotels-title': 'مؤشرات خدمة حجز وإقامة الفنادق',
                'card-hotel-occupancy-title': 'نسبة إشغال الفنادق',
                'card-hotel-cancel-rate-title': 'معدل إلغاء الحجوزات',
                'card-hotel-rating-title': 'تقييم رضا النزلاء عن الإقامة',
                'group-service-transport-title': 'مؤشرات خدمة نقل المعتمرين',
                'card-pilgrim-ops-plan-title': 'الالتزام بجدول نقل المعتمرين',
                'card-pilgrim-safety-rate-title': 'معدل السلامة في نقل المعتمرين',
                'card-pilgrim-shuttle-util-title': 'نسبة تشغيل حافلات المعتمرين',
                'group-service-hospitality-title': 'مؤشرات خدمة الضيافة والتموين الإعاشة',
                'card-meal-delivery-ontime-title': 'التزام تسليم الوجبات في الوقت',
                'card-food-safety-compliance-title': 'الامتثال لمعايير سلامة الأغذية',
                'card-hospitality-satisfaction-title': 'رضا المعتمرين عن خدمات الضيافة'
            },
            'en': {
                'langToggleText': 'العربية (AR)',
                'sidebar-logo-text': 'Rawahel Al Mashaer Co.',
                'sidebar-business-areas': 'Core Business Sectors',
                'sidebar-company-depts': 'Company Departments',
                'nav-overview': 'Overview Dashboard',
                'nav-transportation': 'Specialized Transportation',
                'nav-pilgrim-services': 'Tourism & Pilgrim Services',
                'show-all-departments': 'Show All Departments',
                'sidebar-settings': 'KPI Target Settings',
                'sidebar-copyright': 'Rawahel Standard Approved System © 2026',
                'header-title': 'Performance Monitoring System for Rawahel Co.',
                'header-subtitle': 'Live interactive dashboard aligned with Rawahel corporate brand identity',
                'header-ceo-name': 'Ghassan Iraqi',
                'header-ceo-role': 'General Manager (CEO)',
                'ticker-perf-label': 'Rawahel Overall Performance:',
                'ticker-perf-desc': 'All sectors average completion rate records',
                'ticker-may': 'for the month of May.',
                'ticker-revenue-label': 'Revenue Growth:',
                'ticker-revenue-desc': 'Achieved growth of',
                'ticker-ebitda-label': 'Operating EBITDA Margin:',
                'ticker-ebitda-desc': 'Balanced financial performance recording',
                'ticker-fleet-label': 'Current Fleet Readiness:',
                'ticker-fleet-desc': 'Active operational buses readiness rises to',
                'ticker-fleet-total': '(Total 1,240 buses).',
                'ticker-nps-label': 'Customer Satisfaction NPS:',
                'ticker-nps-desc': 'Pilgrim satisfaction points score',
                'ticker-ops-label': 'Ops Plan Commitment:',
                'ticker-ops-desc': 'Bus transport route schedule commitment reached',
                'summary-badge': 'Unified Performance Overview',
                'summary-title': 'Performance Indicators Matrix for Rawahel Co.',
                'summary-desc': 'Choose one of the business sectors from the sidebar to inspect detailed performance.',
                'summary-total': 'Total KPIs',
                'summary-excellent': 'Excellent 🟢',
                'summary-good': 'Good 🟡',
                'summary-bad': 'Poor 🔴',
                'summary-avg-label': 'Combined Financial & Operational Performance Averages',
                'overview-sector-perf': 'Sector Performance Average',
                'chart-flags-title': 'Distribution of Current Evaluation Indicators (Flags)',
                
                // Top Executive translations
                'exec-top-revenue': 'Total Revenue',
                'exec-top-growth': 'Growth Rate',
                'exec-top-achievement': 'Target Achievement',
                'exec-top-transactions': 'Total Transactions',

                // Sector & Service translations
                'group-finance-title': 'Financial Performance Indicators',
                'card-rev-growth-title': 'Total Revenue & Growth Rate',
                'card-ebitda-title': 'EBITDA Margin',
                'card-cashflow-title': 'Operating Cash Flow',
                'card-roa-title': 'Return on Assets ROA',
                'group-commercial-title': 'Commercial & Customer Indicators',
                'card-cust-ret-title': 'Customer Retention Rate',
                'card-nps-title': 'Net Promoter Score NPS',
                'card-new-contracts-title': 'New Strategic Contracts Count',
                'group-ops-title': 'Operations & Bus Fleet Indicators',
                'card-ops-plan-title': 'Operational Plan Commitment',
                'card-fleet-ready-title': 'Fleet Readiness Rate',
                'card-fleet-util-title': 'Fleet Utilization Rate',
                'group-support-title': 'HR, HSE, and Digital Support Indicators',
                'support-hr-title': 'Human Resources & Tech Support',
                'val-hr-ret-label': 'Employee Retention Rate',
                'val-it-autom-label': 'Digital Transformation Projects',
                'val-critical-succession-label': 'Critical Succession Plan Rate',
                'val-saudization-label': 'Saudization Percentage',
                'support-hse-title': 'HSE Safety & Auditing',
                'val-hse-ltifr-label': 'LTIFR Accident Rate',
                'val-hse-accidents-label': 'Serious Accidents (Target 0)',
                'val-audit-comp-label': 'Policy Compliance Rate',
                'group-strategy-perf-title': 'Strategy & Governance PMO Indicators',
                'support-strategy-title': 'Strategy & Projects',
                'val-strat-goals-label': 'General Strategic Goals',
                'val-strat-init-label': 'PMO Initiatives Completion',
                'support-risk-gov-title': 'Risk Management & Governance',
                'val-risk-handling-label': 'Corporate Risk Treatment Rate',
                'val-gov-maturity-label': 'Governance Implementation Rate',
                'val-strat-goals-achieve-label': 'Strategic Goals Achievement Rate',
                
                // Pilgrim services translations
                'group-service-visa-title': 'Visa Issuance Service KPIs',
                'card-visa-processing-time-title': 'Visa Processing Time',
                'card-visa-approval-rate-title': 'Visa Approval Rate',
                'card-visa-count-title': 'Issued Visas Count',
                'group-service-hotels-title': 'Hotel Booking & Accommodation KPIs',
                'card-hotel-occupancy-title': 'Hotel Occupancy Rate',
                'card-hotel-cancel-rate-title': 'Booking Cancellation Rate',
                'card-hotel-rating-title': 'Guest Satisfaction Rating',
                'group-service-transport-title': 'Pilgrim Transport Service KPIs',
                'card-pilgrim-ops-plan-title': 'Pilgrim Route Plan Compliance',
                'card-pilgrim-safety-rate-title': 'Pilgrim Transport Safety Rate',
                'card-pilgrim-shuttle-util-title': 'Pilgrim Bus Utilization Rate',
                'group-service-hospitality-title': 'Hospitality & Catering Service KPIs',
                'card-meal-delivery-ontime-title': 'On-Time Meal Delivery Rate',
                'card-food-safety-compliance-title': 'Food Safety Compliance Score',
                'card-hospitality-satisfaction-title': 'Pilgrim Catering Satisfaction'
            }
        };

        let currentView = 'overview';
        let flagsPieChart = null, sectorChartInstance = null;
        const kpiCurrentFlags = {};

        // دالة فحص وتعيين الأعلام الملونة اللامعة والملفتة بناء على النطاقات المخصصة في Settings
        function evaluateFlag(key, value) {
            const config = kpiSettings[key];
            if (!config) return 'excellent';

            let isInverse = false;
            if (key === 'hse-ltifr' || key === 'hse-accidents' || key === 'visa-processing-time' || key === 'hotel-cancel-rate') isInverse = true;

            if (isInverse) {
                if (value <= config.excellentMax) return 'excellent';
                if (value <= config.goodMax) return 'good';
                return 'bad';
            } else {
                if (value >= config.excellentMin) return 'excellent';
                if (value >= config.goodMin) return 'good';
                return 'bad';
            }
        }

        // تطبيق العلم والستايل الملون للبطاقة
        function applyFlagStyle(flagId, key, value) {
            const el = document.getElementById(flagId);
            if (!el) return 'excellent';

            const flag = evaluateFlag(key, value);
            const isEn = document.documentElement.lang === 'en';
            
            if (flag === 'excellent') {
                el.innerText = isEn ? "🟢 Excellent" : "🟢 ممتاز";
                el.className = "text-xs font-black px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-3xs";
            } else if (flag === 'good') {
                el.innerText = isEn ? "🟡 Good" : "🟡 جيد";
                el.className = "text-xs font-black px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 shadow-3xs";
            } else {
                el.innerText = isEn ? "🔴 Poor" : "🔴 ضعيف";
                el.className = "text-xs font-black px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200 shadow-3xs animate-pulse";
            }
            kpiCurrentFlags[key] = flag;
            return flag;
        }

        // دالة تبديل المشاهد (SPA View Router Controller)
        function showView(viewName) {
            const isEn = document.documentElement.lang === 'en';
            
            // 1. RBAC Check on views
            if (viewName === 'transportation-sector' && !isTransportationManager) {
                alert(isEn ? "Access Denied: You do not have permissions for Specialized Transportation." : "عذراً: ليس لديك صلاحية للوصول إلى قطاع النقل التخصصي.");
                return;
            }
            if (viewName === 'pilgrim-sector' && !isPilgrimServicesManager) {
                alert(isEn ? "Access Denied: You do not have permissions for Tourism & Pilgrim Services." : "عذراً: ليس لديك صلاحية للوصول إلى قطاع السياحة وخدمات المعتمرين.");
                return;
            }
            if (['service-visa', 'service-hotels', 'service-transport', 'service-hospitality'].includes(viewName) && !isPilgrimServicesManager) {
                alert(isEn ? "Access Denied: You do not have permissions for Pilgrim Services." : "عذراً: ليس لديك صلاحية للوصول إلى خدمات المعتمرين.");
                return;
            }

            if (viewName !== 'overview' && viewName !== 'departments' && viewName !== 'transportation-sector' && viewName !== 'pilgrim-sector' && !viewName.startsWith('service-')) {
                const uiToDbMapping = {
                    'contracts': 'contracts',
                    'hajj': 'hajj',
                    'leasing': 'leasing',
                    'dept-finance': 'finance',
                    'dept-commercial': 'commercial',
                    'dept-ops': 'operations',
                    'dept-support': 'hr',
                    'dept-hse': 'hse',
                    'dept-strategy': 'pmo'
                };
                const dbCode = uiToDbMapping[viewName];
                if (dbCode && !allowedDepts.includes(dbCode)) {
                    alert(isEn ? "Access Denied: You do not have permissions for this section." : "عذراً: ليس لديك صلاحية للوصول إلى هذا القسم.");
                    return;
                }
            }

            currentView = viewName;
            
            document.querySelectorAll('aside a').forEach(a => {
                a.classList.remove('bg-sidebar-active');
            });
            
            let highlightName = viewName;
            if (viewName.startsWith('dept-')) {
                highlightName = 'departments';
            }
            
            const activeLnk = document.getElementById(\`lnk-\${highlightName}\`);
            if (activeLnk) {
                activeLnk.classList.add('bg-sidebar-active');
            }

            const viewOverview = document.getElementById('view-overview');
            const viewTransportationSector = document.getElementById('view-transportation-sector');
            const viewPilgrimSector = document.getElementById('view-pilgrim-sector');
            const viewKpiDashboard = document.getElementById('view-kpi-dashboard');
            const viewDepartmentsGrid = document.getElementById('view-departments-grid');
            
            viewOverview.classList.add('hidden');
            if (viewTransportationSector) viewTransportationSector.classList.add('hidden');
            if (viewPilgrimSector) viewPilgrimSector.classList.add('hidden');
            viewKpiDashboard.classList.add('hidden');
            viewDepartmentsGrid.classList.add('hidden');
            
            if (viewName === 'overview') {
                viewOverview.classList.remove('hidden');
                document.getElementById('header-main-title').innerText = isEn ? 'Performance Monitoring Dashboard' : 'نظام مراقبة الأداء لشركة رواحل';
                setTimeout(() => { simulateKpiData(true); }, 50);
            } else if (viewName === 'transportation-sector') {
                if (viewTransportationSector) viewTransportationSector.classList.remove('hidden');
                document.getElementById('header-main-title').innerText = isEn ? 'Specialized Transportation Portal' : 'بوابة قطاع النقل التخصصي';
            } else if (viewName === 'pilgrim-sector') {
                if (viewPilgrimSector) viewPilgrimSector.classList.remove('hidden');
                document.getElementById('header-main-title').innerText = isEn ? 'Tourism & Pilgrim Services Portal' : 'بوابة قطاع السياحة وخدمات المعتمرين';
            } else if (viewName === 'departments') {
                viewDepartmentsGrid.classList.remove('hidden');
                document.getElementById('header-main-title').innerText = isEn ? 'Company Departments' : 'كافة إدارات وأقسام شركة رواحل';
            } else {
                viewKpiDashboard.classList.remove('hidden');
                applyKpiFilters(viewName);
            }
        }

        // تصفية كروت الأداء وبناء سيكشن قطاع الأعمال المحدد
        const sectorMapping = {
            'contracts': ['new-contracts', 'cust-ret', 'audit-comp', 'strat-goals', 'strat-init'],
            'hajj': ['fleet-ready', 'ops-plan', 'nps', 'hse-accidents', 'hse-ltifr'],
            'leasing': ['rev-growth', 'ebitda', 'cashflow', 'roa', 'fleet-util'],
            // Departments mapping
            'dept-finance': ['rev-growth', 'ebitda', 'cashflow', 'roa'],
            'dept-commercial': ['cust-ret', 'nps', 'new-contracts'],
            'dept-ops': ['ops-plan', 'fleet-ready', 'fleet-util'],
            'dept-support': ['hr-ret', 'it-autom', 'critical-succession', 'saudization'],
            'dept-hse': ['hse-ltifr', 'hse-accidents', 'audit-comp'],
            'dept-strategy': ['strat-goals', 'strat-init', 'risk-handling', 'gov-maturity', 'strat-goals-achieve'],
            // Pilgrim services
            'service-visa': ['visa-processing-time', 'visa-approval-rate', 'visa-count'],
            'service-hotels': ['hotel-occupancy', 'hotel-cancel-rate', 'hotel-rating'],
            'service-transport': ['pilgrim-ops-plan', 'pilgrim-safety-rate', 'pilgrim-shuttle-util'],
            'service-hospitality': ['meal-delivery-ontime', 'food-safety-compliance', 'hospitality-satisfaction']
        };

        const cardOriginalGrids = {
            'rev-growth': 'grid-finance',
            'ebitda': 'grid-finance',
            'cashflow': 'grid-finance',
            'roa': 'grid-finance',
            'cust-ret': 'grid-commercial',
            'nps': 'grid-commercial',
            'new-contracts': 'grid-commercial',
            'ops-plan': 'grid-ops',
            'fleet-ready': 'grid-ops',
            'fleet-util': 'grid-ops',
            'hr-ret': 'grid-support-hr',
            'it-autom': 'grid-support-hr',
            'critical-succession': 'grid-support-hr',
            'saudization': 'grid-support-hr',
            'hse-ltifr': 'grid-support-hse',
            'hse-accidents': 'grid-support-hse',
            'audit-comp': 'grid-support-hse',
            'strat-goals': 'grid-strategy-gov',
            'strat-init': 'grid-strategy-gov',
            'risk-handling': 'grid-strategy-gov',
            'gov-maturity': 'grid-strategy-gov',
            'strat-goals-achieve': 'grid-strategy-gov',
            // Pilgrim service cards
            'visa-processing-time': 'grid-service-visa',
            'visa-approval-rate': 'grid-service-visa',
            'visa-count': 'grid-service-visa',
            'hotel-occupancy': 'grid-service-hotels',
            'hotel-cancel-rate': 'grid-service-hotels',
            'hotel-rating': 'grid-service-hotels',
            'pilgrim-ops-plan': 'grid-service-transport',
            'pilgrim-safety-rate': 'grid-service-transport',
            'pilgrim-shuttle-util': 'grid-service-transport',
            'meal-delivery-ontime': 'grid-service-hospitality',
            'food-safety-compliance': 'grid-service-hospitality',
            'hospitality-satisfaction': 'grid-service-hospitality'
        };

        function applyKpiFilters(viewName) {
            const isEn = document.documentElement.lang === 'en';
            const titleText = document.getElementById('view-kpi-title-text');
            const sectorChartContainer = document.getElementById('sector-chart-container');
            const breadcrumbContainer = document.getElementById('view-kpi-breadcrumb');
            const breadcrumbCurrent = document.getElementById('breadcrumb-current');
            const sectorGrid = document.getElementById('sector-kpis-grid');
            const kpisContainer = document.getElementById('kpis-container');

            sectorChartContainer.classList.remove('hidden');
            
            let sectorTitle = '';
            let isDept = viewName.startsWith('dept-');
            let isService = viewName.startsWith('service-');
            let isTransportDept = ['contracts', 'hajj', 'leasing', 'dept-finance', 'dept-commercial', 'dept-ops', 'dept-support', 'dept-hse', 'dept-strategy'].includes(viewName);

            // 1. إرجاع جميع الكروت لحاوياتها الأصلية أولاً لتفادي تداخل الترتيب
            Object.keys(cardOriginalGrids).forEach(cardId => {
                const cardEl = document.getElementById(\`card-\${cardId}\`);
                const originalGridId = cardOriginalGrids[cardId];
                const originalGridEl = document.getElementById(originalGridId);
                if (cardEl && originalGridEl && cardEl.parentElement !== originalGridEl) {
                    originalGridEl.appendChild(cardEl);
                }
            });

            // 2. Breadcrumbs Routing and Layout setup
            if (isTransportDept || isService) {
                breadcrumbContainer.classList.remove('hidden');
                
                const breadcrumbRoot = breadcrumbContainer.querySelector('span[onclick]');
                const backBtn = breadcrumbContainer.querySelector('button');
                
                if (isTransportDept) {
                    if (breadcrumbRoot) {
                        breadcrumbRoot.setAttribute('onclick', "showView('transportation-sector')");
                        breadcrumbRoot.innerHTML = \`<i class="fa-solid fa-bus me-1"></i>\${isEn ? 'Specialized Transportation' : 'قطاع النقل التخصصي'}\`;
                    }
                    if (backBtn) {
                        backBtn.setAttribute('onclick', "showView('transportation-sector')");
                        backBtn.querySelector('span').innerText = isEn ? 'Back to Transportation' : 'العودة لقطاع النقل';
                    }
                } else if (isService) {
                    if (breadcrumbRoot) {
                        breadcrumbRoot.setAttribute('onclick', "showView('pilgrim-sector')");
                        breadcrumbRoot.innerHTML = \`<i class="fa-solid fa-kaaba me-1"></i>\${isEn ? 'Tourism & Pilgrim Services' : 'قطاع خدمات المعتمرين'}\`;
                    }
                    if (backBtn) {
                        backBtn.setAttribute('onclick', "showView('pilgrim-sector')");
                        backBtn.querySelector('span').innerText = isEn ? 'Back to Pilgrim Services' : 'العودة لخدمات المعتمرين';
                    }
                }

                if (viewName === 'contracts') sectorTitle = isEn ? 'Contracts & Agreements' : 'قطاع العقود والاتفاقيات';
                else if (viewName === 'hajj') sectorTitle = isEn ? 'Hajj & Umrah Transport' : 'قطاع الحج والعمرة للنقل';
                else if (viewName === 'leasing') sectorTitle = isEn ? 'Rental & Operation' : 'قطاع الإيجار والتشغيل';
                else if (viewName === 'dept-finance') sectorTitle = isEn ? 'Financial Department' : 'الإدارة المالية';
                else if (viewName === 'dept-commercial') sectorTitle = isEn ? 'Commercial & Customer Department' : 'الإدارة التجارية والعملاء';
                else if (viewName === 'dept-ops') sectorTitle = isEn ? 'Operations & Fleet Department' : 'إدارة العمليات وأسطول الحافلات';
                else if (viewName === 'dept-support') sectorTitle = isEn ? 'HR & Digital Transformation Department' : 'إدارة الموارد البشرية والتحول الرقمي';
                else if (viewName === 'dept-hse') sectorTitle = isEn ? 'Safety, HSE & Compliance Department' : 'إدارة السلامة والامتثال والتدقيق';
                else if (viewName === 'dept-strategy') sectorTitle = isEn ? 'Strategy, PMO & Governance Department' : 'إدارة الاستراتيجية والمشاريع والحوكمة';
                
                else if (viewName === 'service-visa') sectorTitle = isEn ? 'Visa Issuance Service' : 'خدمة إصدار التأشيرات';
                else if (viewName === 'service-hotels') sectorTitle = isEn ? 'Hotel Booking & Accommodation' : 'خدمة حجز وإقامة الفنادق';
                else if (viewName === 'service-transport') sectorTitle = isEn ? 'Pilgrim Transport Service' : 'خدمة نقل المعتمرين';
                else if (viewName === 'service-hospitality') sectorTitle = isEn ? 'Hospitality & Catering Service' : 'خدمة الضيافة والتموين الإعاشة';

                breadcrumbCurrent.innerText = sectorTitle;
                titleText.innerText = sectorTitle;
            } else {
                breadcrumbContainer.classList.add('hidden');
            }

            document.getElementById('sector-chart-title').innerText = isEn ? 'Comparative Analysis: Actual Performance vs Target' : 'تحليل مقارنة الأداء الفعلي بالمستهدف الأساسي';

            const allowedKpis = sectorMapping[viewName] || [];

            // 3. Render 4 Top Executive KPIs for Sector/Department/Service
            const execData = {
                'contracts': { revenue: '45.0', growth: '+6.5%', achievement: '93%', transactions: '1,240' },
                'hajj': { revenue: '62.5', growth: '+11.2%', achievement: '90%', transactions: '8,500' },
                'leasing': { revenue: '35.0', growth: '+7.1%', achievement: '89%', transactions: '2,680' },
                'dept-finance': { revenue: '142.5', growth: '+8.2%', achievement: '91%', transactions: '12,420' },
                'dept-commercial': { revenue: '45.0', growth: '+6.5%', achievement: '93%', transactions: '1,240' },
                'dept-ops': { revenue: '97.5', growth: '+9.3%', achievement: '92%', transactions: '11,180' },
                'dept-support': { revenue: '142.5', growth: '+8.2%', achievement: '91%', transactions: '12,420' },
                'dept-hse': { revenue: '142.5', growth: '+8.2%', achievement: '95%', transactions: '12,420' },
                'dept-strategy': { revenue: '142.5', growth: '+8.2%', achievement: '91%', transactions: '12,420' },
                
                'service-visa': { revenue: '15.2', growth: '+14.5%', achievement: '95%', transactions: '16,420' },
                'service-hotels': { revenue: '28.4', growth: '+12.1%', achievement: '88%', transactions: '5,200' },
                'service-transport': { revenue: '35.8', growth: '+10.5%', achievement: '91%', transactions: '45,800' },
                'service-hospitality': { revenue: '10.1', growth: '+15.2%', achievement: '92%', transactions: '70,400' }
            };
            const currentExec = execData[viewName] || { revenue: '0.0', growth: '0%', achievement: '0%', transactions: '0' };
            safeSetText('exec-top-revenue-val', currentExec.revenue + ' ' + (isEn ? 'M SAR' : 'مليون ر.س'));
            safeSetText('exec-top-growth-val', currentExec.growth);
            safeSetText('exec-top-achievement-val', currentExec.achievement);
            safeSetText('exec-top-transactions-val', currentExec.transactions + ' ' + (isEn ? 'ops' : 'عملية'));
            
            safeSetText('exec-top-revenue-sub', isEn ? 'Cumulative for current view' : 'تراكمي للمشاهدة الحالية');
            safeSetText('exec-top-growth-sub', isEn ? 'Vs previous month' : 'مقارنة بالشهر السابق');
            safeSetText('exec-top-transactions-sub', isEn ? 'Operational transactions' : 'معاملات تشغيلية مسجلة');
            
            const achievePct = parseInt(currentExec.achievement) || 0;
            const topBar = document.getElementById('exec-top-achievement-bar');
            if (topBar) topBar.style.width = achievePct + '%';

            // 4. Show/Hide Grids and place cards dynamically
            if (!isDept) {
                kpisContainer.classList.add('hidden');
                sectorGrid.classList.remove('hidden');
                sectorGrid.innerHTML = '';

                document.querySelectorAll('[id^="card-"]').forEach(card => {
                    const cardId = card.id.replace('card-', '');
                    if (allowedKpis.includes(cardId)) {
                        card.classList.remove('hidden');
                        sectorGrid.appendChild(card);
                    } else {
                        card.classList.add('hidden');
                    }
                });
            } else {
                sectorGrid.classList.add('hidden');
                kpisContainer.classList.remove('hidden');
                
                document.querySelectorAll('.kpi-group-wrapper').forEach(grp => grp.classList.add('hidden'));
                
                document.querySelectorAll('[id^="card-"]').forEach(card => {
                    const cardId = card.id.replace('card-', '');
                    if (allowedKpis.includes(cardId)) {
                        card.classList.remove('hidden');
                        const wrapper = card.closest('.kpi-group-wrapper');
                        if (wrapper) wrapper.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            }

            setTimeout(() => { buildSectorChart(viewName); }, 80);
        }

        // بناء المخطط البياني للقطاع (يعرض القيم الفعلية والمستهدفة جنباً لجنب)
        function buildSectorChart(sectorKey) {
            if (typeof Chart === 'undefined') return;

            const canvas = document.getElementById('sectorChart');
            if (!canvas) return;

            try {
                if (sectorChartInstance) sectorChartInstance.destroy();
                const ctx = canvas.getContext('2d');
                const isEn = document.documentElement.lang === 'en';
                const fontName = isEn ? 'Outfit' : 'Tajawal';

                const allowedKpis = sectorMapping[sectorKey] || [];
                const chartLabels = [];
                const actualData = [];
                const targetData = [];

                allowedKpis.forEach(key => {
                    const elVal = document.getElementById(\`val-\${key}\`);
                    if (elVal) {
                        const valText = elVal.innerText;
                        const valNum = parseFloat(valText.replace(/[^0-9.]/g, '')) || 0;
                        
                        let kpiName = key;
                        const cardTitle = document.querySelector(\`#card-\${key} span[data-i18n]\`);
                        if (cardTitle) kpiName = cardTitle.innerText;

                        chartLabels.push(kpiName);
                        actualData.push(valNum);
                        
                        const targetVal = kpiSettings[key] ? kpiSettings[key].target : 0;
                        targetData.push(targetVal);
                    }
                });

                const actualGradient = ctx.createLinearGradient(0, 0, 0, 400);
                actualGradient.addColorStop(0, '#b0841a');
                actualGradient.addColorStop(1, '#8c6510');

                const targetGradient = ctx.createLinearGradient(0, 0, 0, 400);
                targetGradient.addColorStop(0, '#cbd5e1');
                targetGradient.addColorStop(1, '#94a3b8');

                sectorChartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: chartLabels,
                        datasets: [
                            { 
                                label: isEn ? 'Actual Performance' : 'الأداء الفعلي الحالي', 
                                data: actualData, 
                                backgroundColor: actualGradient, 
                                borderRadius: 6,
                                barPercentage: 0.8,
                                categoryPercentage: 0.7
                            },
                            { 
                                label: isEn ? 'Target Value' : 'المستهدف الأساسي', 
                                data: targetData, 
                                backgroundColor: targetGradient, 
                                borderRadius: 6,
                                barPercentage: 0.8,
                                categoryPercentage: 0.7
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { labels: { color: '#0f172a', font: { family: fontName, size: 11, weight: 'bold' } } }
                        },
                        scales: {
                            y: { 
                                grid: { color: 'rgba(0, 0, 0, 0.06)' }, 
                                ticks: { color: '#1e293b', font: { family: fontName, size: 10, weight: 'bold' } } 
                            },
                            x: { 
                                grid: { color: 'rgba(0, 0, 0, 0.03)' }, 
                                ticks: { color: '#1e293b', font: { family: fontName, size: 10, weight: 'bold' } } 
                            }
                        }
                    }
                });
            } catch (e) {
                console.error("Error creating sector chart:", e);
            }
        }

        // حساب معدلات إنجاز القطاعات
        function calculateSectorAvg(sectorKey) {
            const kpis = sectorMapping[sectorKey] || [];
            let sum = 0;
            let count = 0;

            kpis.forEach(key => {
                const el = document.getElementById(\`val-\${key}\`);
                if (el) {
                    const text = el.innerText;
                    const val = parseFloat(text.replace(/[^0-9.]/g, '')) || 0;
                    const config = kpiSettings[key];
                    if (config) {
                        let ratio = 100;
                        if (key === 'hse-ltifr' || key === 'hse-accidents' || key === 'visa-processing-time' || key === 'hotel-cancel-rate') {
                            ratio = val <= config.target ? 100 : Math.max(0, 100 - (val - config.target) * 40);
                        } else {
                            ratio = (val / config.target) * 100;
                        }
                        sum += Math.min(ratio, 120);
                        count++;
                    }
                }
            });

            return count > 0 ? Math.round(sum / count) : 0;
        }

        // توليد الأرقام ومطابقتها وعرض الأعلام وقيمها المزامنة
        function simulateKpiData(useActualData = true) {
            const revGrowthNum = useActualData ? @(Model.TotalRevenue / 118.75 * 100 - 100) : 20;
            const ebitda = @Model.Ebitda;
            const cashflow = @Model.CashFlow;
            const roa = @Model.Roa;
            const custRet = @Model.CustRetention;
            const nps = @Model.Nps;
            const newContracts = @Model.NewContracts;
            const opsPlan = @Model.OpsPlan;
            const fleetReady = @Model.FleetReady;
            const fleetUtil = @Model.FleetUtil;
            const hrRet = @Model.HrRetention;
            const itAutom = @Model.ItAutomation;
            const criticalSuccession = @Model.CriticalSuccession;
            const saudization = @Model.Saudization;
            const ltifr = @Model.Ltifr;
            const accidents = @Model.Accidents;
            const auditComp = @Model.AuditCompliance;
            const stratGoals = @Model.StrategicGoals;
            const stratInit = @Model.StrategicInitiatives;
            const riskHandling = @Model.RiskHandling;
            const govMaturity = @Model.GovMaturity;
            const stratGoalsAchieve = @Model.StratGoalsAchieve;

            // Simulated pilgrim service metrics values
            const visaProcessingTime = 18.5;
            const visaApprovalRate = 99.1;
            const visaCount = 16420;
            const hotelOccupancy = 88.5;
            const hotelCancelRate = 4.2;
            const hotelRating = 92.0;
            const pilgrimOpsPlan = 96.2;
            const pilgrimSafetyRate = 100;
            const pilgrimShuttleUtil = 91.5;
            const mealDeliveryOntime = 98.5;
            const foodSafetyCompliance = 99.8;
            const hospitalitySatisfaction = 91.0;

            const baseRevenue = 118.75; 
            const currentRevenue = parseFloat((baseRevenue * (1 + revGrowthNum / 100)).toFixed(1));

            const isEn = document.documentElement.lang === 'en';
            const sarUnit = isEn ? 'M SAR' : 'مليون ر.س';

            // 2. حقن القيم داخل خلايا الـ HTML
            safeSetText('val-rev-growth', currentRevenue + ' ' + sarUnit);
            safeSetText('val-ebitda', ebitda + '%');
            safeSetText('val-cashflow', cashflow + (isEn ? ' M' : ' مليون ر.س'));
            safeSetText('val-roa', roa + '%');
            safeSetText('val-cust-ret', custRet + '%');
            safeSetText('val-nps', nps);
            safeSetText('val-new-contracts', newContracts);
            safeSetText('val-ops-plan', opsPlan + '%');
            safeSetText('val-fleet-ready', fleetReady + '%');
            safeSetText('val-fleet-util', fleetUtil + '%');
            
            safeSetText('val-hr-ret', hrRet + '%');
            safeSetText('val-it-autom', itAutom + '%');
            safeSetText('val-critical-succession', criticalSuccession + '%');
            safeSetText('val-saudization', saudization + '%');
            safeSetText('val-hse-ltifr', ltifr);
            safeSetText('val-hse-accidents', accidents);
            safeSetText('val-audit-comp', auditComp + '%');
            safeSetText('val-strat-goals', stratGoals + '%');
            safeSetText('val-strat-init', stratInit + '%');
            safeSetText('val-risk-handling', riskHandling + '%');
            safeSetText('val-gov-maturity', govMaturity + '%');
            safeSetText('val-strat-goals-achieve', stratGoalsAchieve + '%');

            // Pilgrim Services HTML Inject
            safeSetText('val-visa-processing-time', visaProcessingTime + (isEn ? ' hrs' : ' ساعة'));
            safeSetText('val-visa-approval-rate', visaApprovalRate + '%');
            safeSetText('val-visa-count', visaCount.toLocaleString());
            safeSetText('val-hotel-occupancy', hotelOccupancy + '%');
            safeSetText('val-hotel-cancel-rate', hotelCancelRate + '%');
            safeSetText('val-hotel-rating', hotelRating + '%');
            safeSetText('val-pilgrim-ops-plan', pilgrimOpsPlan + '%');
            safeSetText('val-pilgrim-safety-rate', pilgrimSafetyRate + '%');
            safeSetText('val-pilgrim-shuttle-util', pilgrimShuttleUtil + '%');
            safeSetText('val-meal-delivery-ontime', mealDeliveryOntime + '%');
            safeSetText('val-food-safety-compliance', foodSafetyCompliance + '%');
            safeSetText('val-hospitality-satisfaction', hospitalitySatisfaction + '%');

            // حقن القيم بالخلاصة في الهوم بيج
            safeSetText('val-rev-growth-sum', currentRevenue + ' ' + sarUnit);
            safeSetText('val-ebitda-sum', ebitda + '%');
            safeSetText('val-fleet-ready-sum', fleetReady + '%');
            safeSetText('val-nps-sum', nps);
            safeSetText('val-saudization-sum', saudization + '%');
            safeSetText('val-hse-accidents-sum', accidents);

            // 3. احتساب أعلام وتقييمات الـ 34 مؤشراً
            let flagCounter = { excellent: 0, good: 0, bad: 0 };
            const trackFlag = (key, val) => {
                const flag = evaluateFlag(key, val);
                flagCounter[flag]++;
            };

            trackFlag('rev-growth', currentRevenue);
            trackFlag('ebitda', ebitda);
            trackFlag('cashflow', cashflow);
            trackFlag('roa', roa);
            trackFlag('cust-ret', custRet);
            trackFlag('nps', nps);
            trackFlag('new-contracts', newContracts);
            trackFlag('ops-plan', opsPlan);
            trackFlag('fleet-ready', fleetReady);
            trackFlag('fleet-util', fleetUtil);
            trackFlag('hr-ret', hrRet);
            trackFlag('it-autom', itAutom);
            trackFlag('critical-succession', criticalSuccession);
            trackFlag('saudization', saudization);
            trackFlag('hse-ltifr', ltifr);
            trackFlag('hse-accidents', accidents);
            trackFlag('audit-comp', auditComp);
            trackFlag('strat-goals', stratGoals);
            trackFlag('strat-init', stratInit);
            trackFlag('risk-handling', riskHandling);
            trackFlag('gov-maturity', govMaturity);
            trackFlag('strat-goals-achieve', stratGoalsAchieve);

            // Pilgrim services flags
            trackFlag('visa-processing-time', visaProcessingTime);
            trackFlag('visa-approval-rate', visaApprovalRate);
            trackFlag('visa-count', visaCount);
            trackFlag('hotel-occupancy', hotelOccupancy);
            trackFlag('hotel-cancel-rate', hotelCancelRate);
            trackFlag('hotel-rating', hotelRating);
            trackFlag('pilgrim-ops-plan', pilgrimOpsPlan);
            trackFlag('pilgrim-safety-rate', pilgrimSafetyRate);
            trackFlag('pilgrim-shuttle-util', pilgrimShuttleUtil);
            trackFlag('meal-delivery-ontime', mealDeliveryOntime);
            trackFlag('food-safety-compliance', foodSafetyCompliance);
            trackFlag('hospitality-satisfaction', hospitalitySatisfaction);

            // تطبيق الستايل للأعلام الفردية بالكروت
            const applyFlags = () => {
                applyFlagStyle('flag-rev-growth', 'rev-growth', currentRevenue);
                applyFlagStyle('flag-ebitda', 'ebitda', ebitda);
                applyFlagStyle('flag-cashflow', 'cashflow', cashflow);
                applyFlagStyle('flag-roa', 'roa', roa);
                applyFlagStyle('flag-cust-ret', 'cust-ret', custRet);
                applyFlagStyle('flag-nps', 'nps', nps);
                applyFlagStyle('flag-new-contracts', 'new-contracts', newContracts);
                applyFlagStyle('flag-ops-plan', 'ops-plan', opsPlan);
                applyFlagStyle('flag-fleet-ready', 'fleet-ready', fleetReady);
                applyFlagStyle('flag-fleet-util', 'fleet-util', fleetUtil);
                applyFlagStyle('flag-hr-ret', 'hr-ret', hrRet);
                applyFlagStyle('flag-it-autom', 'it-autom', itAutom);
                applyFlagStyle('flag-critical-succession', 'critical-succession', criticalSuccession);
                applyFlagStyle('flag-saudization', 'saudization', saudization);
                applyFlagStyle('flag-hse-ltifr', 'hse-ltifr', ltifr);
                applyFlagStyle('flag-hse-accidents', 'hse-accidents', accidents);
                applyFlagStyle('flag-audit-comp', 'audit-comp', auditComp);
                applyFlagStyle('flag-strat-goals', 'strat-goals', stratGoals);
                applyFlagStyle('flag-strat-init', 'strat-init', stratInit);
                applyFlagStyle('flag-risk-handling', 'risk-handling', riskHandling);
                applyFlagStyle('flag-gov-maturity', 'gov-maturity', govMaturity);
                applyFlagStyle('flag-strat-goals-achieve', 'strat-goals-achieve', stratGoalsAchieve);

                // Pilgrim individual flags
                applyFlagStyle('flag-visa-processing-time', 'visa-processing-time', visaProcessingTime);
                applyFlagStyle('flag-visa-approval-rate', 'visa-approval-rate', visaApprovalRate);
                applyFlagStyle('flag-visa-count', 'visa-count', visaCount);
                applyFlagStyle('flag-hotel-occupancy', 'hotel-occupancy', hotelOccupancy);
                applyFlagStyle('flag-hotel-cancel-rate', 'hotel-cancel-rate', hotelCancelRate);
                applyFlagStyle('flag-hotel-rating', 'hotel-rating', hotelRating);
                applyFlagStyle('flag-pilgrim-ops-plan', 'pilgrim-ops-plan', pilgrimOpsPlan);
                applyFlagStyle('flag-pilgrim-safety-rate', 'pilgrim-safety-rate', pilgrimSafetyRate);
                applyFlagStyle('flag-pilgrim-shuttle-util', 'pilgrim-shuttle-util', pilgrimShuttleUtil);
                applyFlagStyle('flag-meal-delivery-ontime', 'meal-delivery-ontime', mealDeliveryOntime);
                applyFlagStyle('flag-food-safety-compliance', 'food-safety-compliance', foodSafetyCompliance);
                applyFlagStyle('flag-hospitality-satisfaction', 'hospitality-satisfaction', hospitalitySatisfaction);

                // تطبيق الأعلام على الكروت الملخصة في الهوم بيج
                applyFlagStyle('summary-flag-rev-growth', 'rev-growth', currentRevenue);
                applyFlagStyle('summary-flag-ebitda', 'ebitda', ebitda);
                applyFlagStyle('summary-flag-fleet-ready', 'fleet-ready', fleetReady);
                applyFlagStyle('summary-flag-nps', 'nps', nps);
                applyFlagStyle('summary-flag-saudization', 'saudization', saudization);
                applyFlagStyle('summary-flag-hse-accidents', 'hse-accidents', accidents);
            };
            applyFlags();

            // حقن وتحديث المستهدفات في كروت الـ KPIs والملخصات
            Object.keys(kpiSettings).forEach(key => {
                const targetVal = kpiSettings[key].target;
                let unitStr = '';
                if (['rev-growth', 'cashflow'].includes(key)) unitStr = isEn ? ' M' : ' مليون ر.س';
                else if (['new-contracts', 'hse-accidents', 'nps', 'hse-ltifr', 'visa-processing-time', 'visa-count'].includes(key)) unitStr = '';
                else unitStr = '%';
                
                safeSetText(\`target-val-\${key}\`, targetVal + unitStr);
            });

            // تحديث مستهدفات الخلاصة بالهوم بيج
            safeSetText('target-val-rev-growth-sum', kpiSettings['rev-growth'].target + (isEn ? ' M' : ' مليون ر.س'));
            safeSetText('target-val-ebitda-sum', kpiSettings['ebitda'].target + '%');
            safeSetText('target-val-fleet-ready-sum', kpiSettings['fleet-ready'].target + '%');
            safeSetText('target-val-nps-sum', kpiSettings['nps'].target);
            safeSetText('target-val-saudization-sum', kpiSettings['saudization'].target + '%');
            safeSetText('target-val-hse-accidents-sum', kpiSettings['hse-accidents'].target);

            // عرض الأرقام المجمعة بالملخص
            safeSetText('count-excellent', flagCounter.excellent);
            safeSetText('count-good', flagCounter.good);
            safeSetText('count-bad', flagCounter.bad);
            safeSetText('count-total', flagCounter.excellent + flagCounter.good + flagCounter.bad);

            // حساب كفاءة قطاعات الأعمال
            const contractsAvg = calculateSectorAvg('contracts');
            const hajjAvg = calculateSectorAvg('hajj');
            const leasingAvg = calculateSectorAvg('leasing');

            safeSetText('sector-perf-contracts', contractsAvg + '%');
            safeSetText('sector-perf-hajj', hajjAvg + '%');
            safeSetText('sector-perf-leasing', leasingAvg + '%');

            // حساب الأداء العام الموحد
            const overallAvg = Math.round((contractsAvg + hajjAvg + leasingAvg) / 3);
            
            safeSetText('radial-progress-val', overallAvg + '%');
            const radialPath = document.getElementById('radial-progress-path');
            if (radialPath) radialPath.setAttribute('stroke-dasharray', \`\${overallAvg}, 100\`);

            // تحديث نصوص الشريط الإخباري اللانهائي
            safeSetText('ticker-total-perf', overallAvg + '%');
            safeSetText('ticker-total-perf-dup', overallAvg + '%');
            safeSetText('ticker-rev-growth', currentRevenue + ' ' + sarUnit);
            safeSetText('ticker-rev-growth-dup', currentRevenue + ' ' + sarUnit);
            safeSetText('ticker-ebitda', ebitda + '%');
            safeSetText('ticker-ebitda-dup', ebitda + '%');
            safeSetText('ticker-fleet-ready', fleetReady + '%');
            safeSetText('ticker-fleet-ready-dup', fleetReady + '%');

            // تحديث الرسوم البيانية الكبرى للملخص
            if (typeof Chart !== 'undefined') {
                if (flagsPieChart) {
                    try {
                        flagsPieChart.data.datasets[0].data = [flagCounter.excellent, flagCounter.good, flagCounter.bad];
                        flagsPieChart.update();
                    } catch (e) { console.error(e); }
                }
            }
        }

        // فتح نافذة تفاصيل مجموعة الأعلام
        function openKpiGroupModal(flagType) {
            const isEn = document.documentElement.lang === 'en';
            let title = '';
            let indicatorClass = '';

            if (flagType === 'all') {
                title = isEn ? 'All Performance Indicators' : 'جميع مؤشرات الأداء';
                indicatorClass = 'bg-blue-500';
            } else if (flagType === 'excellent') {
                title = isEn ? 'Excellent Performance KPIs 🟢' : 'مؤشرات الأداء الممتاز 🟢';
                indicatorClass = 'bg-emerald-500 animate-pulse';
            } else if (flagType === 'good') {
                title = isEn ? 'Good Performance KPIs 🟡' : 'مؤشرات الأداء الجيد 🟡';
                indicatorClass = 'bg-amber-500';
            } else if (flagType === 'bad') {
                title = isEn ? 'Poor Performance KPIs 🔴' : 'مؤشرات الأداء الضعيف 🔴';
                indicatorClass = 'bg-red-500 animate-pulse';
            }

            const indicator = document.getElementById('kpiGroupIndicator');
            if (indicator) indicator.className = \`w-2.5 h-2.5 rounded-full \${indicatorClass}\`;

            const headerTitle = document.getElementById('kpiGroupHeaderTitle');
            if (headerTitle) headerTitle.innerText = title;

            const matchedItems = [];
            const valMap = {
                'rev-growth': parseFloat(document.getElementById('val-rev-growth').innerText.replace(/[^0-9.]/g, '')) || 0,
                'ebitda': @Model.Ebitda,
                'cashflow': @Model.CashFlow,
                'roa': @Model.Roa,
                'cust-ret': @Model.CustRetention,
                'nps': @Model.Nps,
                'new-contracts': @Model.NewContracts,
                'ops-plan': @Model.OpsPlan,
                'fleet-ready': @Model.FleetReady,
                'fleet-util': @Model.FleetUtil,
                'hr-ret': @Model.HrRetention,
                'it-autom': @Model.ItAutomation,
                'critical-succession': @Model.CriticalSuccession,
                'saudization': @Model.Saudization,
                'hse-ltifr': @Model.Ltifr,
                'hse-accidents': @Model.Accidents,
                'audit-comp': @Model.AuditCompliance,
                'strat-goals': @Model.StrategicGoals,
                'strat-init': @Model.StrategicInitiatives,
                'risk-handling': @Model.RiskHandling,
                'gov-maturity': @Model.GovMaturity,
                'strat-goals-achieve': @Model.StratGoalsAchieve,
                // Pilgrim services
                'visa-processing-time': parseFloat(document.getElementById('val-visa-processing-time')?.innerText) || 18.5,
                'visa-approval-rate': parseFloat(document.getElementById('val-visa-approval-rate')?.innerText) || 99.1,
                'visa-count': parseFloat(document.getElementById('val-visa-count')?.innerText.replace(/,/g, '')) || 16420,
                'hotel-occupancy': parseFloat(document.getElementById('val-hotel-occupancy')?.innerText) || 88.5,
                'hotel-cancel-rate': parseFloat(document.getElementById('val-hotel-cancel-rate')?.innerText) || 4.2,
                'hotel-rating': parseFloat(document.getElementById('val-hotel-rating')?.innerText) || 92.0,
                'pilgrim-ops-plan': parseFloat(document.getElementById('val-pilgrim-ops-plan')?.innerText) || 96.2,
                'pilgrim-safety-rate': parseFloat(document.getElementById('val-pilgrim-safety-rate')?.innerText) || 100,
                'pilgrim-shuttle-util': parseFloat(document.getElementById('val-pilgrim-shuttle-util')?.innerText) || 91.5,
                'meal-delivery-ontime': parseFloat(document.getElementById('val-meal-delivery-ontime')?.innerText) || 98.5,
                'food-safety-compliance': parseFloat(document.getElementById('val-food-safety-compliance')?.innerText) || 99.8,
                'hospitality-satisfaction': parseFloat(document.getElementById('val-hospitality-satisfaction')?.innerText) || 91.0
            };

            Object.keys(valMap).forEach(key => {
                const mainFlag = kpiCurrentFlags[key];
                const currentValStr = document.getElementById(\`val-\${key}\`) ? document.getElementById(\`val-\${key}\`).innerText : valMap[key];

                if (flagType === 'all' || mainFlag === flagType) {
                    let kpiName = key;
                    const cardTitle = document.querySelector(\`#card-\${key} span[data-i18n]\`) || document.querySelector(\`div[onclick*="\${key}"] span[data-i18n]\`);
                    if (cardTitle) kpiName = cardTitle.innerText;

                    matchedItems.push({
                        parentKey: key,
                        title: kpiName,
                        value: currentValStr,
                        flag: mainFlag
                    });
                }
            });

            const groupSubtitle = document.getElementById('kpiGroupSubtitle');
            if (groupSubtitle) {
                groupSubtitle.innerText = isEn ? \`Showing \${matchedItems.length} KPIs in this category\` : \`تم العثور على \${matchedItems.length} مؤشر أداء\`;
            }

            const listContainer = document.getElementById('kpiGroupList');
            if (listContainer) {
                listContainer.innerHTML = '';
                if (matchedItems.length === 0) {
                    listContainer.innerHTML = \`<div class="text-center text-xs text-slate-500 py-6">\${isEn ? 'No KPIs found.' : 'لا توجد مؤشرات في هذه الفئة حالياً.'}</div>\`;
                } else {
                    matchedItems.forEach(item => {
                        let badgeClass = "bg-slate-100 text-slate-700";
                        let badgeIcon = "⚪";
                        if (item.flag === 'excellent') {
                            badgeClass = "bg-emerald-100 text-emerald-700 border border-emerald-200";
                            badgeIcon = isEn ? "🟢 Excellent" : "🟢 ممتاز";
                        } else if (item.flag === 'good') {
                            badgeClass = "bg-amber-100 text-amber-700 border border-amber-200";
                            badgeIcon = isEn ? "🟡 Good" : "🟡 جيد";
                        } else if (item.flag === 'bad') {
                            badgeClass = "bg-rose-100 text-rose-700 border border-rose-200";
                            badgeIcon = isEn ? "🔴 Poor" : "🔴 ضعيف";
                        }

                        const itemHtml = \`
                            <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between shadow-3xs">
                                <div class="text-start">
                                    <span class="text-xs font-black text-slate-800 block">\${item.title}</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="text-sm font-black text-slate-900 font-mono">\${item.value}</span>
                                    <span class="text-[9px] font-black px-2 py-0.5 rounded-full \${badgeClass}">\${badgeIcon}</span>
                                </div>
                            </div>
                        \`;
                        listContainer.innerHTML += itemHtml;
                    });
                }
            }

            const modal = document.getElementById('kpiGroupModal');
            const overlay = document.getElementById('kpiGroupOverlay');
            const box = document.getElementById('kpiGroupBox');
            
            if (modal && overlay && box) {
                modal.classList.remove('hidden');
                setTimeout(() => {
                    overlay.classList.remove('opacity-0');
                    box.classList.remove('scale-90', 'opacity-0');
                    box.classList.add('scale-100', 'opacity-100');
                }, 50);
            }
        }

        function closeKpiGroupModal() {
            const modal = document.getElementById('kpiGroupModal');
            const overlay = document.getElementById('kpiGroupOverlay');
            const box = document.getElementById('kpiGroupBox');
            
            if (modal && overlay && box) {
                box.classList.remove('scale-100', 'opacity-100');
                box.classList.add('scale-90', 'opacity-0');
                overlay.classList.add('opacity-0');
                
                setTimeout(() => { modal.classList.add('hidden'); }, 300);
            }
        }

        function safeSetText(id, text) {
            const el = document.getElementById(id);
            if (el) el.innerText = text;
        }

        function toggleLanguage() {
            const currentLang = document.documentElement.getAttribute('lang') === 'ar' ? 'en' : 'ar';
            applyLanguage(currentLang);
            localStorage.setItem('lang', currentLang);
        }

        function applyLanguage(lang) {
            document.documentElement.setAttribute('lang', lang);
            document.documentElement.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
            
            const dictionary = translations[lang];
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (dictionary[key]) el.innerText = dictionary[key];
            });
            
            const langTextEl = document.getElementById('langToggleText');
            if (langTextEl) langTextEl.innerText = lang === 'en' ? 'العربية (AR)' : 'English (EN)';
            
            if (typeof Chart !== 'undefined') {
                const fontName = lang === 'en' ? 'Outfit' : 'Tajawal';
                if (flagsPieChart) {
                    flagsPieChart.options.plugins.legend.labels.font.family = fontName;
                    flagsPieChart.data.labels = lang === 'en' ? ['Excellent 🟢', 'Good 🟡', 'Poor 🔴'] : ['ممتاز 🟢', 'جيد 🟡', 'ضعيف 🔴'];
                    flagsPieChart.update();
                }
            }
            
            // تحديث عنوان المشاهد
            if (currentView.startsWith('dept-') || currentView.startsWith('service-') || ['contracts', 'hajj', 'leasing'].includes(currentView)) {
                const titleText = document.getElementById('view-kpi-title-text');
                const breadcrumbCurrent = document.getElementById('breadcrumb-current');
                let deptNameAr = '';
                let deptNameEn = '';
                if (currentView === 'contracts') {
                    deptNameAr = 'قطاع العقود والاتفاقيات';
                    deptNameEn = 'Contracts & Agreements';
                } else if (currentView === 'hajj') {
                    deptNameAr = 'قطاع الحج والعمرة للنقل';
                    deptNameEn = 'Hajj & Umrah Transport';
                } else if (currentView === 'leasing') {
                    deptNameAr = 'قطاع الإيجار والتشغيل';
                    deptNameEn = 'Rental & Operation';
                } else if (currentView === 'dept-finance') {
                    deptNameAr = 'الإدارة المالية';
                    deptNameEn = 'Financial Department';
                } else if (currentView === 'dept-commercial') {
                    deptNameAr = 'الإدارة التجارية والعملاء';
                    deptNameEn = 'Commercial & Customer Department';
                } else if (currentView === 'dept-ops') {
                    deptNameAr = 'إدارة العمليات وأسطول الحافلات';
                    deptNameEn = 'Operations & Fleet Department';
                } else if (currentView === 'dept-support') {
                    deptNameAr = 'إدارة الموارد البشرية والتحول الرقمي';
                    deptNameEn = 'HR & Digital Transformation Department';
                } else if (currentView === 'dept-hse') {
                    deptNameAr = 'إدارة السلامة والامتثال والتدقيق';
                    deptNameEn = 'Safety, HSE & Compliance Department';
                } else if (currentView === 'dept-strategy') {
                    deptNameAr = 'إدارة الاستراتيجية والمشاريع والحوكمة';
                    deptNameEn = 'Strategy, PMO & Governance Department';
                } else if (currentView === 'service-visa') {
                    deptNameAr = 'خدمة إصدار التأشيرات';
                    deptNameEn = 'Visa Issuance Service';
                } else if (currentView === 'service-hotels') {
                    deptNameAr = 'خدمة حجز وإقامة الفنادق';
                    deptNameEn = 'Hotel Booking & Accommodation';
                } else if (currentView === 'service-transport') {
                    deptNameAr = 'خدمة نقل المعتمرين';
                    deptNameEn = 'Pilgrim Transport Service';
                } else if (currentView === 'service-hospitality') {
                    deptNameAr = 'خدمة الضيافة والتموين الإعاشة';
                    deptNameEn = 'Hospitality & Catering Service';
                }
                const currentName = lang === 'en' ? deptNameEn : deptNameAr;
                if (titleText) titleText.innerText = currentName;
                if (breadcrumbCurrent) breadcrumbCurrent.innerText = currentName;
            } else if (currentView === 'departments') {
                document.getElementById('header-main-title').innerText = lang === 'en' ? 'Company Departments' : 'كافة إدارات وأقسام شركة رواحل';
            } else if (currentView === 'overview') {
                document.getElementById('header-main-title').innerText = lang === 'en' ? 'Performance Monitoring Dashboard' : 'نظام مراقبة الأداء لشركة رواحل';
            }
            
            simulateKpiData(true);
        }

        document.addEventListener("DOMContentLoaded", function() {
            if (typeof Chart !== 'undefined') {
                try {
                    const ctxPie = document.getElementById('doughnutFlagsChart').getContext('2d');
                    flagsPieChart = new Chart(ctxPie, {
                        type: 'doughnut',
                        data: {
                            labels: ['ممتاز 🟢', 'جيد 🟡', 'ضعيف 🔴'],
                            datasets: [{ data: [0, 0, 0], backgroundColor: ['#059669', '#ca9b29', '#be123c'], borderWidth: 1, borderColor: '#ffffff' }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { position: 'bottom', labels: { color: '#0f172a', font: { family: 'Tajawal', size: 10 } } } }
                        }
                    });
                } catch (e) { console.error(e); }
            }

            // Hide unauthorized sections/cards from DOM
            document.querySelectorAll('[onclick^="showView(\'"]').forEach(el => {
                const match = el.getAttribute('onclick').match(/showView\\('([^']+)'\\)/);
                if (match) {
                    const viewName = match[1];
                    if (viewName !== 'overview' && viewName !== 'departments') {
                        let isAllowed = true;
                        
                        if (viewName === 'transportation-sector' && !isTransportationManager) isAllowed = false;
                        if (viewName === 'pilgrim-sector' && !isPilgrimServicesManager) isAllowed = false;
                        if (['service-visa', 'service-hotels', 'service-transport', 'service-hospitality'].includes(viewName) && !isPilgrimServicesManager) isAllowed = false;

                        const uiToDbMapping = {
                            'contracts': 'contracts',
                            'hajj': 'hajj',
                            'leasing': 'leasing',
                            'dept-finance': 'finance',
                            'dept-commercial': 'commercial',
                            'dept-ops': 'operations',
                            'dept-support': 'hr',
                            'dept-hse': 'hse',
                            'dept-strategy': 'pmo'
                        };
                        const dbCode = uiToDbMapping[viewName];
                        if (dbCode && !allowedDepts.includes(dbCode)) {
                            isAllowed = false;
                        }
                        
                        if (!isAllowed) {
                            el.style.display = 'none';
                        }
                    }
                }
            });

            const savedLang = localStorage.getItem('lang') || 'ar';
            applyLanguage(savedLang);
            showView('overview');
        });

        function openProfileModal() {
            const modal = document.getElementById('profileModal');
            const overlay = document.getElementById('profileModalOverlay');
            const box = document.getElementById('profileModalBox');
            if (modal && overlay && box) {
                modal.classList.remove('hidden');
                setTimeout(() => {
                    overlay.classList.remove('opacity-0');
                    box.classList.remove('scale-90', 'opacity-0');
                    box.classList.add('scale-100', 'opacity-100');
                }, 50);
            }
        }

        function closeProfileModal() {
            const modal = document.getElementById('profileModal');
            const overlay = document.getElementById('profileModalOverlay');
            const box = document.getElementById('profileModalBox');
            if (modal && overlay && box) {
                box.classList.remove('scale-100', 'opacity-100');
                box.classList.add('scale-90', 'opacity-0');
                overlay.classList.add('opacity-0');
                setTimeout(() => { modal.classList.add('hidden'); }, 300);
            }
        }
    </script>`;

content = content.substring(0, scriptStartIdx) + newJsCode + '\n</body>\n</html>\n';
console.log('Script updated. Final content length:', content.length);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Index.cshtml restructuring fully successful!');
