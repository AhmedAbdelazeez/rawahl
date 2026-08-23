// Main Application Dashboard Logic, Routing, Filters, and Simulator
// Default Settings threshold configurations
const defaultSettings = {
    'comp-ops-rate': { target: 95, excellentMin: 95, goodMin: 90 },
    'comp-violations-count': { target: 0, excellentMax: 0, goodMax: 3 },
    'comp-closure-rate': { target: 95, excellentMin: 95, goodMin: 90 },
    'comp-resolution-time': { target: 5, excellentMax: 3, goodMax: 5 },
    'comp-contract-rate': { target: 95, excellentMin: 95, goodMin: 90 },
    'comp-policies-rate': { target: 95, excellentMin: 95, goodMin: 90 },
    'comp-audit-results': { target: 90, excellentMin: 90, goodMin: 80 },
    'comp-critical-findings': { target: 0, excellentMax: 0, goodMax: 1 },
    'comp-monthly-rate': { target: 95, excellentMin: 95, goodMin: 90 },
    'comp-improvement-rate': { target: 90, excellentMin: 90, goodMin: 80 },

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
    'hr-saudization': { target: 35, excellentMin: 33.25, goodMin: 26.25 },
    'hr-count': { target: 1500, excellentMin: 1500, goodMin: 1200 },
    'hr-growth': { target: 10, excellentMin: 10, goodMin: 5 },
    'hr-absence': { target: 3.0, excellentMax: 3.0, goodMax: 5.0 },
    'hr-training': { target: 25, excellentMin: 25, goodMin: 20 },
    'hr-appraisal': { target: 95, excellentMin: 95, goodMin: 90 },
    'it-autom': { target: 80, excellentMin: 76.0, goodMin: 60.0 },
    'it-uptime': { target: 99.9, excellentMin: 99.9, goodMin: 99.0 },
    'it-ticket-time': { target: 2, excellentMax: 2, goodMax: 4 },
    'it-incidents': { target: 0, excellentMax: 0, goodMax: 1 },
    'it-satisfaction': { target: 90, excellentMin: 90, goodMin: 80 },
    'it-backup': { target: 100, excellentMin: 100, goodMin: 95 },
    'it-projects': { target: 95, excellentMin: 95, goodMin: 90 },
    'proc-cycle': { target: 7, excellentMax: 7, goodMax: 10 },
    'proc-savings': { target: 10, excellentMin: 10, goodMin: 5 },
    'proc-supplier': { target: 90, excellentMin: 90, goodMin: 80 },
    'proc-budget': { target: 95, excellentMin: 95, goodMin: 90 },
    'proc-spare-parts': { target: 98, excellentMin: 98, goodMin: 95 },
    'proc-inventory': { target: 99, excellentMin: 99, goodMin: 95 },
    'proc-contracts': { target: 30, excellentMin: 30, goodMin: 25 },
    'hse-ltifr': { target: 1.5, excellentMax: 1.5, goodMax: 2.0 },
    'hse-accidents': { target: 0, excellentMax: 0, goodMax: 1 },
    'audit-comp': { target: 95, excellentMin: 90.25, goodMin: 71.25 },
    'hse-training-hours': { target: 120, excellentMin: 120, goodMin: 100 },
    'hse-inspection-completion': { target: 95, excellentMin: 95, goodMin: 90 },
    'hse-near-miss': { target: 50, excellentMin: 50, goodMin: 40 },
    'hse-waste-recycling': { target: 40, excellentMin: 40, goodMin: 30 },
    'strat-goals': { target: 85, excellentMin: 80.75, goodMin: 63.75 },
    'strat-init': { target: 90, excellentMin: 85.5, goodMin: 67.5 },
    'risk-handling': { target: 90, excellentMin: 85.5, goodMin: 67.5 },
    'gov-maturity': { target: 95, excellentMin: 90.25, goodMin: 71.25 },
    'strat-goals-achieve': { target: 85, excellentMin: 80.75, goodMin: 63.75 },
    'strat-milestones': { target: 90, excellentMin: 85.5, goodMin: 67.5 },
    'strat-budget': { target: 95, excellentMin: 90.25, goodMin: 71.25 },
    
    // pilgrim services metrics
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
    'hospitality-satisfaction': { target: 90, excellentMin: 90, goodMin: 80 },
    
    // 22 new service KPIs
    'visa-integration-uptime': { target: 99, excellentMin: 99, goodMin: 95 },
    'visa-data-error-rate': { target: 2.0, excellentMax: 2.0, goodMax: 5.0 },
    'visa-complaints-rate': { target: 3.0, excellentMax: 3.0, goodMax: 8.0 },
    'hotel-average-room-rate': { target: 350.0, excellentMin: 350.0, goodMin: 300.0 },
    'hotel-overbooking-incidents': { target: 0, excellentMax: 0, goodMax: 2 },
    'hotel-contract-compliance': { target: 95.0, excellentMin: 95.0, goodMin: 90.0 },
    'pilgrim-bus-maintenance-adherence': { target: 95.0, excellentMin: 95.0, goodMin: 90.0 },
    'pilgrim-trip-duration': { target: 5.0, excellentMax: 5.0, goodMax: 6.0 },
    'pilgrim-satisfaction': { target: 90.0, excellentMin: 90.0, goodMin: 80.0 },
    'meal-waste-percentage': { target: 5.0, excellentMax: 5.0, goodMax: 10.0 },
    'hospitality-staff-compliance': { target: 98.0, excellentMin: 98.0, goodMin: 95.0 },
    'hospitality-complaints': { target: 5, excellentMax: 5, goodMax: 10 },
    'contracts-renewal-rate': { target: 90.0, excellentMin: 90.0, goodMin: 80.0 },
    'contracts-turnaround-time': { target: 3.0, excellentMax: 3.0, goodMax: 5.0 },
    'contracts-legal-disputes': { target: 0, excellentMax: 0, goodMax: 1 },
    'hajj-driver-adherence': { target: 98.0, excellentMin: 98.0, goodMin: 95.0 },
    'hajj-fuel-efficiency': { target: 90.0, excellentMin: 90.0, goodMin: 80.0 },
    'hajj-safety-training-rate': { target: 95.0, excellentMin: 95.0, goodMin: 90.0 },
    'rental-fleet-utilization': { target: 85.0, excellentMin: 85.0, goodMin: 75.0 },
    'rental-revenue-per-bus': { target: 12000, excellentMin: 12000, goodMin: 10000 },
    'rental-contract-satisfaction': { target: 90.0, excellentMin: 90.0, goodMin: 80.0 },
    'rental-maintenance-adherence': { target: 95.0, excellentMin: 95.0, goodMin: 90.0 },
    'rental-safety-compliance': { target: 98.0, excellentMin: 98.0, goodMin: 95.0 },
    'rental-active-contracts': { target: 40, excellentMin: 40, goodMin: 30 },
    
    // 20 new KPIs
    'ops-d-15': { target: 60, excellentMax: 60, goodMax: 90 },
    'ops-d-16': { target: 30, excellentMax: 30, goodMax: 45 },
    'ops-d-17': { target: 5, excellentMax: 5, goodMax: 8 },
    'ops-d-18': { target: 100, excellentMin: 100, goodMin: 95 },
    'ops-d-19': { target: 100, excellentMin: 100, goodMin: 95 },
    'ops-d-20': { target: 2, excellentMax: 2, goodMax: 4 },
    'ops-d-21': { target: 45, excellentMax: 45, goodMax: 60 },
    'ops-d-22': { target: 50, excellentMax: 50, goodMax: 70 },
    'ops-d-23': { target: 60, excellentMax: 60, goodMax: 80 },
    'ops-d-24': { target: 100, excellentMin: 100, goodMin: 95 },
    'ops-d-25': { target: 100, excellentMin: 100, goodMin: 95 },
    'ops-d-26': { target: 100, excellentMin: 100, goodMin: 95 },
    'ops-d-27': { target: 100, excellentMin: 100, goodMin: 95 },
    'ops-d-28': { target: 100, excellentMin: 100, goodMin: 95 },
    'ops-d-29': { target: 0, excellentMax: 0, goodMax: 1 },
    'ops-d-30': { target: 100, excellentMin: 100, goodMin: 95 },
    'ops-d-31': { target: 100, excellentMin: 98, goodMin: 95 },
    'ops-d-32': { target: 100, excellentMin: 99, goodMin: 95 },
    'com-d-10': { target: 100, excellentMin: 98, goodMin: 95 },
    'hse-d-15': { target: 0, excellentMax: 0, goodMax: 2 },
    
    // MOHU Diversity
    'mohu-div-1': { target: 80, excellentMin: 80, goodMin: 70 },
    'mohu-div-2': { target: 40, excellentMin: 40, goodMin: 30 },
    'mohu-div-3': { target: 90, excellentMin: 90, goodMin: 80 },
    'mohu-div-4': { target: 85, excellentMin: 85, goodMin: 75 },
    'mohu-div-5': { target: 15, excellentMin: 15, goodMin: 10 },
    'mohu-div-6': { target: 20, excellentMin: 20, goodMin: 15 },
    'mohu-div-7': { target: 50, excellentMin: 50, goodMin: 40 },
    'mohu-div-8': { target: 95, excellentMin: 95, goodMin: 90 },
    'mohu-div-9': { target: 98, excellentMin: 98, goodMin: 95 },
    'mohu-div-10': { target: 10, excellentMin: 10, goodMin: 5 },
    
    // MOHU Experience
    'mohu-exp-1': { target: 90, excellentMin: 90, goodMin: 80 },
    'mohu-exp-2': { target: 95, excellentMin: 95, goodMin: 85 },
    'mohu-exp-3': { target: 100, excellentMin: 100, goodMin: 95 },
    'mohu-exp-4': { target: 85, excellentMin: 85, goodMin: 75 },
    'mohu-exp-5': { target: 15, excellentMax: 15, goodMax: 30 },
    'mohu-exp-6': { target: 90, excellentMin: 90, goodMin: 80 },
    'mohu-exp-7': { target: 92, excellentMin: 92, goodMin: 85 },
    'mohu-exp-8': { target: 98, excellentMin: 98, goodMin: 90 },
    'mohu-exp-9': { target: 0, excellentMax: 0, goodMax: 2 },
    'mohu-exp-10': { target: 5, excellentMax: 5, goodMax: 15 },
    
    // MOHU Compliance
    'mohu-comp-1': { target: 0, excellentMax: 0, goodMax: 5 },
    'mohu-comp-2': { target: 100, excellentMin: 100, goodMin: 90 },
    'mohu-comp-3': { target: 100, excellentMin: 100, goodMin: 95 },
    'mohu-comp-4': { target: 100, excellentMin: 100, goodMin: 98 },
    'mohu-comp-5': { target: 100, excellentMin: 100, goodMin: 98 },
    'mohu-comp-6': { target: 100, excellentMin: 100, goodMin: 95 },
    'mohu-comp-7': { target: 100, excellentMin: 100, goodMin: 95 },
    'mohu-comp-8': { target: 0, excellentMax: 0, goodMax: 1000 },
    'mohu-comp-9': { target: 100, excellentMin: 100, goodMin: 95 },
    'mohu-comp-10': { target: 95, excellentMin: 95, goodMin: 85 },
    
    // MOHU Data Quality
    'mohu-data-1': { target: 100, excellentMin: 100, goodMin: 98 },
    'mohu-data-2': { target: 100, excellentMin: 100, goodMin: 98 },
    'mohu-data-3': { target: 100, excellentMin: 100, goodMin: 98 },
    'mohu-data-4': { target: 100, excellentMin: 100, goodMin: 98 },
    'mohu-data-5': { target: 100, excellentMin: 100, goodMin: 98 },
    'mohu-data-6': { target: 100, excellentMin: 100, goodMin: 98 },
    'mohu-data-7': { target: 100, excellentMin: 100, goodMin: 98 },
    'mohu-data-8': { target: 100, excellentMin: 100, goodMin: 98 },
    'mohu-data-9': { target: 100, excellentMin: 100, goodMin: 98 },
    'mohu-data-10': { target: 100, excellentMin: 100, goodMin: 98 },

    // Internal Audit - Operational Analysis KPIs
    'audit-plan-execution': { target: 90, excellentMin: 90, goodMin: 80 },
    'operational-compliance-rate': { target: 95, excellentMin: 95, goodMin: 90 },
    'total-audited-processes': { target: 100, excellentMin: 100, goodMin: 80 },
    'passed-processes-count': { target: 95, excellentMin: 95, goodMin: 80 },
    'critical-findings-count': { target: 0, excellentMax: 0, goodMax: 1 },
    'recommendations-count': { target: 50, excellentMin: 50, goodMin: 40 },
    'risk-mitigation-rate': { target: 90, excellentMin: 90, goodMin: 80 },

    // Tourism Department KPIs
    'tourism-hotel-occupancy': { target: 85, excellentMin: 85, goodMin: 75 },
    'tourism-cancel-rate': { target: 5, excellentMax: 5, goodMax: 10 },
    'tourism-guest-rating': { target: 4.5, excellentMin: 4.5, goodMin: 4.0 },
    'tourism-tours-completed': { target: 15, excellentMin: 15, goodMin: 10 },
    'tourism-revpar': { target: 750, excellentMin: 750, goodMin: 600 },
    'tourism-lead-time': { target: 24, excellentMax: 24, goodMax: 36 },
    'tourism-active-guides': { target: 5, excellentMin: 5, goodMin: 3 },

    // Operations Department KPIs
    'ops-plan-adherence': { target: 95, excellentMin: 95, goodMin: 90 },
    'ops-fleet-util': { target: 85, excellentMin: 85, goodMin: 75 },
    'ops-breakdown-response': { target: 30, excellentMax: 30, goodMax: 45 },
    'ops-violations': { target: 0, excellentMax: 0, goodMax: 2 },
    'ops-passenger-satisfaction': { target: 90, excellentMin: 90, goodMin: 80 },
    'ops-scheduled-trips': { target: 100, excellentMin: 100, goodMin: 80 },
    'ops-fuel-efficiency': { target: 95, excellentMin: 95, goodMin: 90 }
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

// Global routing and charting states
window.currentView = 'overview';
window.previousView = 'overview';
window.flagsPieChart = null;
window.sectorChartInstance = null;
window.kpiCurrentFlags = {};

// Evaluate flags based on settings configurations
function evaluateFlag(key, value) {
    const config = kpiSettings[key];
    if (!config) return 'excellent';

    let isInverse = false;
    if (key === 'hse-ltifr' || key === 'hse-accidents' || key === 'visa-processing-time' || key === 'hotel-cancel-rate' || key === 'comp-violations-count' || key === 'comp-resolution-time' || key === 'comp-critical-findings' || key === 'tourism-cancel-rate' || key === 'tourism-lead-time' || key === 'ops-breakdown-response' || key === 'ops-violations' || ['ops-d-15', 'ops-d-16', 'ops-d-17', 'ops-d-20', 'ops-d-21', 'ops-d-22', 'ops-d-23', 'ops-d-29', 'hse-d-15', 'critical-findings-count', 'hr-absence', 'it-ticket-time', 'it-incidents', 'proc-cycle', 'mohu-exp-5', 'mohu-exp-9', 'mohu-exp-10', 'mohu-comp-1', 'mohu-comp-8'].includes(key)) isInverse = true;

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

// Styling classes for evaluation flags (ممتاز، جيد، ضعيف)
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
    window.kpiCurrentFlags[key] = flag;
    return flag;
}

// Mappings for SPA view sectors
const sectorMapping = {
    'dept-compliance': ['comp-ops-rate', 'comp-violations-count', 'comp-closure-rate', 'comp-resolution-time', 'comp-contract-rate', 'comp-policies-rate', 'comp-audit-results', 'comp-critical-findings', 'comp-monthly-rate', 'comp-improvement-rate'],

    'contracts': ['new-contracts', 'cust-ret', 'audit-comp', 'contracts-renewal-rate', 'contracts-turnaround-time', 'contracts-legal-disputes'],
    'hajj': ['fleet-ready', 'ops-plan', 'nps', 'hajj-driver-adherence', 'hajj-fuel-efficiency', 'hajj-safety-training-rate'],
    'leasing': ['rental-fleet-utilization', 'rental-revenue-per-bus', 'rental-contract-satisfaction', 'rental-maintenance-adherence', 'rental-safety-compliance', 'rental-active-contracts'],
    
    'service-contracts': ['new-contracts', 'cust-ret', 'audit-comp', 'contracts-renewal-rate', 'contracts-turnaround-time', 'contracts-legal-disputes'],
    'service-hajj-transport': ['fleet-ready', 'ops-plan', 'nps', 'hajj-driver-adherence', 'hajj-fuel-efficiency', 'hajj-safety-training-rate'],
    'service-umrah-transport': ['pilgrim-ops-plan', 'pilgrim-safety-rate', 'pilgrim-shuttle-util', 'pilgrim-bus-maintenance-adherence', 'pilgrim-trip-duration', 'pilgrim-satisfaction'],
    'service-leasing': ['rental-fleet-utilization', 'rental-revenue-per-bus', 'rental-contract-satisfaction', 'rental-maintenance-adherence', 'rental-safety-compliance', 'rental-active-contracts'],

    'dept-tourism': ['tourism-hotel-occupancy', 'tourism-cancel-rate', 'tourism-guest-rating', 'tourism-tours-completed', 'tourism-revpar', 'tourism-lead-time', 'tourism-active-guides'],
    'dept-ops': ['ops-plan-adherence', 'ops-fleet-util', 'ops-breakdown-response', 'ops-violations', 'ops-passenger-satisfaction', 'ops-scheduled-trips', 'ops-fuel-efficiency'],
    'dept-commercial': ['customer-retention', 'new-contracts', 'contract-renewal-rate', 'contract-turnaround', 'legal-disputes', 'customer-acquisition-cost', 'contract-value-growth'],
    'dept-sales': ['sales-active-customers', 'sales-new-customers', 'sales-retention', 'sales-growth', 'sales-top-segment', 'sales-fleet-buses', 'sales-fleet-seats'],
    'dept-fleet': ['fleet-total', 'fleet-available', 'fleet-active', 'fleet-maintenance', 'fleet-inactive', 'fleet-util', 'fleet-ready', 'fleet-total-trips', 'fleet-completed-trips', 'fleet-maint-rate', 'fleet-mttr', 'fleet-parts-cost', 'fleet-total-seating', 'fleet-avg-age', 'fleet-modernization', 'fleet-type-variety', 'fleet-avg-capacity'],
    'dept-hr': ['hr-ret', 'hr-saudization', 'hr-count', 'hr-growth', 'hr-absence', 'hr-training', 'hr-appraisal'],
    'dept-it': ['it-autom', 'it-uptime', 'it-ticket-time', 'it-incidents', 'it-satisfaction', 'it-backup', 'it-projects'],
    'dept-procurement': ['proc-cycle', 'proc-savings', 'proc-supplier', 'proc-budget', 'proc-spare-parts', 'proc-inventory', 'proc-contracts'],
    'dept-finance': ['total-revenue', 'ebitda-margin', 'net-profit-margin', 'operating-cashflow', 'roa', 'budget-variance', 'working-capital'],
    'dept-strategy': ['strat-goals', 'strat-init', 'risk-handling', 'gov-maturity', 'strat-goals-achieve', 'strat-milestones', 'strat-budget'],
    'dept-audit': ['audit-plan-execution', 'operational-compliance-rate', 'total-audited-processes', 'passed-processes-count', 'critical-findings-count', 'recommendations-count', 'risk-mitigation-rate'],
    'dept-hse': ['hse-ltifr', 'hse-accidents', 'audit-comp'],
    
    'service-visa': ['visa-processing-time', 'visa-approval-rate', 'visa-count', 'visa-integration-uptime', 'visa-data-error-rate', 'visa-complaints-rate'],
    'service-hotels': ['hotel-occupancy', 'hotel-cancel-rate', 'hotel-rating', 'hotel-average-room-rate', 'hotel-overbooking-incidents', 'hotel-contract-compliance'],
    'service-transport': ['pilgrim-ops-plan', 'pilgrim-safety-rate', 'pilgrim-shuttle-util', 'pilgrim-bus-maintenance-adherence', 'pilgrim-trip-duration', 'pilgrim-satisfaction'],
    'service-hospitality': ['meal-delivery-ontime', 'food-safety-compliance', 'hospitality-satisfaction', 'meal-waste-percentage', 'hospitality-staff-compliance', 'hospitality-complaints'],
    'service-mohu-diversity': ['mohu-div-1', 'mohu-div-2', 'mohu-div-3', 'mohu-div-4', 'mohu-div-5', 'mohu-div-6', 'mohu-div-7'],
    'service-mohu-experience': ['mohu-exp-1', 'mohu-exp-2', 'mohu-exp-3', 'mohu-exp-4', 'mohu-exp-5', 'mohu-exp-6', 'mohu-exp-7'],
    'service-mohu-compliance': ['mohu-comp-1', 'mohu-comp-2', 'mohu-comp-3', 'mohu-comp-4', 'mohu-comp-5', 'mohu-comp-6', 'mohu-comp-7'],
    'service-mohu-data': ['mohu-data-1', 'mohu-data-2', 'mohu-data-3', 'mohu-data-4', 'mohu-data-5', 'mohu-data-6', 'mohu-data-7']
};

const cardOriginalGrids = {
    'comp-ops-rate': 'grid-compliance',
    'comp-violations-count': 'grid-compliance',
    'comp-closure-rate': 'grid-compliance',
    'comp-resolution-time': 'grid-compliance',
    'comp-contract-rate': 'grid-compliance',
    'comp-policies-rate': 'grid-compliance',
    'comp-audit-results': 'grid-compliance',
    'comp-critical-findings': 'grid-compliance',
    'comp-monthly-rate': 'grid-compliance',
    'comp-improvement-rate': 'grid-compliance',

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
    'hr-saudization': 'grid-support-hr',
    'hr-count': 'grid-support-hr',
    'hr-growth': 'grid-support-hr',
    'hr-absence': 'grid-support-hr',
    'hr-training': 'grid-support-hr',
    'hr-appraisal': 'grid-support-hr',
    'it-autom': 'grid-support-it',
    'it-uptime': 'grid-support-it',
    'it-ticket-time': 'grid-support-it',
    'it-incidents': 'grid-support-it',
    'it-satisfaction': 'grid-support-it',
    'it-backup': 'grid-support-it',
    'it-projects': 'grid-support-it',
    'proc-cycle': 'grid-support-proc',
    'proc-savings': 'grid-support-proc',
    'proc-supplier': 'grid-support-proc',
    'proc-budget': 'grid-support-proc',
    'proc-spare-parts': 'grid-support-proc',
    'proc-inventory': 'grid-support-proc',
    'proc-contracts': 'grid-support-proc',
    'hse-ltifr': 'grid-support-hse',
    'hse-accidents': 'grid-support-hse',
    'audit-comp': 'grid-support-hse',
    'hse-training-hours': 'grid-support-hse',
    'hse-inspection-completion': 'grid-support-hse',
    'hse-near-miss': 'grid-support-hse',
    'hse-waste-recycling': 'grid-support-hse',
    'strat-goals': 'grid-strategy-gov',
    'strat-init': 'grid-strategy-gov',
    'risk-handling': 'grid-strategy-gov',
    'gov-maturity': 'grid-strategy-gov',
    'strat-goals-achieve': 'grid-strategy-gov',
    'strat-milestones': 'grid-strategy-gov',
    'strat-budget': 'grid-strategy-gov',

    // Operational Audits
    'audit-plan-execution': 'grid-audit',
    'operational-compliance-rate': 'grid-audit',
    'total-audited-processes': 'grid-audit',
    'passed-processes-count': 'grid-audit',
    'critical-findings-count': 'grid-audit',
    'recommendations-count': 'grid-audit',
    'risk-mitigation-rate': 'grid-audit',
    
    'visa-processing-time': 'grid-service-visa',
    'visa-approval-rate': 'grid-service-visa',
    'visa-count': 'grid-service-visa',
    'visa-integration-uptime': 'grid-service-visa',
    'visa-data-error-rate': 'grid-service-visa',
    'visa-complaints-rate': 'grid-service-visa',
    
    'hotel-occupancy': 'grid-service-hotels',
    'hotel-cancel-rate': 'grid-service-hotels',
    'hotel-rating': 'grid-service-hotels',
    'hotel-average-room-rate': 'grid-service-hotels',
    'hotel-overbooking-incidents': 'grid-service-hotels',
    'hotel-contract-compliance': 'grid-service-hotels',
    
    'pilgrim-ops-plan': 'grid-service-transport',
    'pilgrim-safety-rate': 'grid-service-transport',
    'pilgrim-shuttle-util': 'grid-service-transport',
    'pilgrim-bus-maintenance-adherence': 'grid-service-transport',
    'pilgrim-trip-duration': 'grid-service-transport',
    'pilgrim-satisfaction': 'grid-service-transport',
    
    'meal-delivery-ontime': 'grid-service-hospitality',
    'food-safety-compliance': 'grid-service-hospitality',
    'hospitality-satisfaction': 'grid-service-hospitality',
    'meal-waste-percentage': 'grid-service-hospitality',
    'hospitality-staff-compliance': 'grid-service-hospitality',
    'hospitality-complaints': 'grid-service-hospitality',

    'contracts-renewal-rate': 'hidden-service-kpis-container',
    'contracts-turnaround-time': 'hidden-service-kpis-container',
    'contracts-legal-disputes': 'hidden-service-kpis-container',
    'hajj-driver-adherence': 'hidden-service-kpis-container',
    'hajj-fuel-efficiency': 'hidden-service-kpis-container',
    'hajj-safety-training-rate': 'hidden-service-kpis-container',
    'rental-fleet-utilization': 'hidden-service-kpis-container',
    'rental-revenue-per-bus': 'hidden-service-kpis-container',
    'rental-contract-satisfaction': 'hidden-service-kpis-container',
    'rental-maintenance-adherence': 'hidden-service-kpis-container',
    'rental-safety-compliance': 'hidden-service-kpis-container',
    'rental-active-contracts': 'hidden-service-kpis-container',

    'ops-d-15': 'hidden-service-kpis-container',
    'ops-d-16': 'hidden-service-kpis-container',
    'ops-d-17': 'hidden-service-kpis-container',
    'ops-d-18': 'hidden-service-kpis-container',
    'ops-d-19': 'hidden-service-kpis-container',
    'ops-d-20': 'hidden-service-kpis-container',
    'ops-d-21': 'hidden-service-kpis-container',
    'ops-d-22': 'hidden-service-kpis-container',
    'ops-d-23': 'hidden-service-kpis-container',
    'ops-d-24': 'hidden-service-kpis-container',
    'ops-d-25': 'hidden-service-kpis-container',
    'ops-d-26': 'hidden-service-kpis-container',
    'ops-d-27': 'hidden-service-kpis-container',
    'ops-d-28': 'hidden-service-kpis-container',
    'ops-d-29': 'hidden-service-kpis-container',
    'ops-d-30': 'hidden-service-kpis-container',
    'ops-d-31': 'hidden-service-kpis-container',
    'ops-d-32': 'hidden-service-kpis-container',
    'com-d-10': 'hidden-service-kpis-container',
    'hse-d-15': 'hidden-service-kpis-container'
};

// Router show view logic
function showView(viewName, isPopState) {
    const isEn = document.documentElement.lang === 'en';
    const allowedDepts = window.RAWAHEL_DATA.allowedDepts;
    const isTransportationManager = window.RAWAHEL_DATA.isTransportationManager;
    const isPilgrimServicesManager = window.RAWAHEL_DATA.isPilgrimServicesManager;

    let isAllowed = true;

    // RBAC validation on views access
    if (viewName === 'sectors' || viewName === 'transportation-sector' || viewName === 'transportation-services' || viewName === 'transportation-departments') {
        const transDepts = ['contracts', 'hajj', 'umrah', 'leasing', 'finance', 'commercial', 'sales', 'operations', 'fleet', 'maintenance', 'storage', 'hr', 'hse', 'audit', 'pmo'];
        const hasTransAccess = isTransportationManager || transDepts.some(d => allowedDepts.includes(d));
        if (!hasTransAccess) isAllowed = false;
    }

    if (viewName === 'pilgrim-sector') {
        const pilgrimDepts = ['tourism', 'visa', 'hotels', 'transport', 'hospitality'];
        const hasPilgrimAccess = isPilgrimServicesManager || pilgrimDepts.some(d => allowedDepts.includes(d));
        if (!hasPilgrimAccess) isAllowed = false;
    }

    const uiToDbMapping = {
        'contracts': 'contracts',
        'hajj': 'hajj',
        'leasing': 'leasing',
        'dept-finance': 'finance',
        'dept-commercial': 'commercial',
        'dept-sales': 'sales',
        'dept-ops': 'operations',
        'dept-fleet': 'fleet',
        'dept-hr': 'hr',
        'dept-it': 'hr',
        'dept-procurement': 'hr',
        'dept-hse': 'hse',
        'dept-audit': 'audit',
        'dept-strategy': 'pmo',
        'dept-tourism': 'tourism',
        'service-contracts': 'contracts',
        'service-hajj-transport': 'hajj',
        'service-umrah-transport': 'umrah',
        'service-leasing': 'leasing',
        'service-visa': 'visa',
        'service-hotels': 'hotels',
        'service-transport': 'transport',
        'service-hospitality': 'hospitality',
        'dept-mohu-standards': 'tourism',
        'service-mohu-diversity': 'tourism',
        'service-mohu-experience': 'tourism',
        'service-mohu-compliance': 'tourism',
        'service-mohu-data': 'tourism'
    };

    const dbCode = uiToDbMapping[viewName];
    if (dbCode) {
        const isPilgrimDept = ['tourism', 'visa', 'hotels', 'transport', 'hospitality'].includes(dbCode);
        const isTransDept = ['contracts', 'hajj', 'umrah', 'leasing', 'finance', 'commercial', 'sales', 'operations', 'fleet', 'maintenance', 'storage', 'hr', 'hse', 'audit', 'pmo'].includes(dbCode);
        
        let hasAccess = false;
        if (isPilgrimDept && isPilgrimServicesManager) {
            hasAccess = true;
        } else if (isTransDept && isTransportationManager) {
            hasAccess = true;
        } else if (allowedDepts.includes(dbCode)) {
            hasAccess = true;
        }

        if (!hasAccess) isAllowed = false;
    }

    if (!isAllowed) {
        alert(isEn ? "Access Denied: You do not have permissions for this section." : "عذراً: ليس لديك صلاحية للوصول إلى هذا القسم.");
        return;
    }

    if (!isPopState) {
        history.pushState({ view: viewName }, "", "#" + viewName);
    }

    if (viewName !== window.currentView) {
        if (viewName.startsWith('dept-') || viewName.startsWith('service-') || ['contracts', 'hajj', 'leasing'].includes(viewName)) {
            window.previousView = window.currentView;
        }
    }
    window.currentView = viewName;
    
    document.querySelectorAll('aside a').forEach(a => {
        a.classList.remove('bg-sidebar-active');
    });
    
    let highlightName = viewName;
    if (viewName.startsWith('dept-')) {
        highlightName = 'departments';
    }
    
    const activeLnk = document.getElementById(`lnk-${highlightName}`);
    if (activeLnk) {
        activeLnk.classList.add('bg-sidebar-active');
    }

    const viewOverview = document.getElementById('view-overview');
    const viewSectors = document.getElementById('view-sectors');
    const viewTransportationSector = document.getElementById('view-transportation-sector');
    const viewPilgrimSector = document.getElementById('view-pilgrim-sector');
    const viewKpiDashboard = document.getElementById('view-kpi-dashboard');
    const viewDepartmentsGrid = document.getElementById('view-departments-grid');
    const viewDeptCompliance = document.getElementById('view-dept-compliance');
    const viewDeptProjects = document.getElementById('view-dept-projects');
    const viewProjectShuttle = document.getElementById('view-project-shuttle');
    const viewProjectMakkahTour = document.getElementById('view-project-makkah-tour');
    const viewTransportationServices = document.getElementById('view-transportation-services');
    const viewTransportationDepartments = document.getElementById('view-transportation-departments');
    const viewDeptMohuStandards = document.getElementById('view-dept-mohu-standards');
    
    // Portal Integration Views
    const viewDeptProjectsDynamic = document.getElementById('view-dept-projects-dynamic');
    const viewDeptFleetDynamic = document.getElementById('view-dept-fleet-dynamic');
    const viewPortalKpis = document.getElementById('view-portal-kpis');
    
    viewOverview.classList.add('hidden');
    if (viewSectors) viewSectors.classList.add('hidden');
    if (viewTransportationSector) viewTransportationSector.classList.add('hidden');
    if (viewPilgrimSector) viewPilgrimSector.classList.add('hidden');
    viewKpiDashboard.classList.add('hidden');
    viewDepartmentsGrid.classList.add('hidden');
    if (viewDeptCompliance) viewDeptCompliance.classList.add('hidden');
    if (viewDeptProjects) viewDeptProjects.classList.add('hidden');
    if (viewProjectShuttle) viewProjectShuttle.classList.add('hidden');
    if (viewProjectMakkahTour) viewProjectMakkahTour.classList.add('hidden');
    if (viewTransportationServices) viewTransportationServices.classList.add('hidden');
    if (viewTransportationDepartments) viewTransportationDepartments.classList.add('hidden');
    if (viewDeptMohuStandards) viewDeptMohuStandards.classList.add('hidden');
    
    if (viewDeptProjectsDynamic) viewDeptProjectsDynamic.classList.add('hidden');
    if (viewDeptFleetDynamic) viewDeptFleetDynamic.classList.add('hidden');
    if (viewPortalKpis) viewPortalKpis.classList.add('hidden');
    


    if (viewName === 'overview') {
        viewOverview.classList.remove('hidden');
        document.getElementById('header-main-title').innerText = isEn ? 'Performance Monitoring Dashboard' : 'نظام مراقبة الأداء لشركة رواحل المشاعر';
        setTimeout(() => { simulateKpiData(true); }, 50);
    } else if (viewName === 'sectors') {
        if (viewSectors) viewSectors.classList.remove('hidden');
        document.getElementById('header-main-title').innerText = isEn ? 'Company Sectors' : 'قطاعات شركة رواحل المشاعر';
    } else if (viewName === 'transportation-sector') {
        if (viewTransportationSector) viewTransportationSector.classList.remove('hidden');
        document.getElementById('header-main-title').innerText = isEn ? 'Specialized Transportation Portal' : 'بوابة رواحل للنقل التخصصي';
    } else if (viewName === 'transportation-services') {
        if (viewTransportationServices) viewTransportationServices.classList.remove('hidden');
        document.getElementById('header-main-title').innerText = isEn ? 'Specialized Transportation Services' : 'خدمات قطاع النقل التخصصي';
    } else if (viewName === 'transportation-departments') {
        if (viewTransportationDepartments) viewTransportationDepartments.classList.remove('hidden');
        document.getElementById('header-main-title').innerText = isEn ? 'Specialized Transportation Departments' : 'إدارات قطاع النقل التخصصي';
    } else if (viewName === 'pilgrim-sector') {
        if (viewPilgrimSector) viewPilgrimSector.classList.remove('hidden');
        document.getElementById('header-main-title').innerText = isEn ? 'Tourism & Pilgrim Services Portal' : 'بوابة رواحل لخدمات العمرة والسياحة';
    } else if (viewName === 'dept-mohu-standards') {
        if (viewDeptMohuStandards) viewDeptMohuStandards.classList.remove('hidden');
        document.getElementById('header-main-title').innerText = isEn ? 'MOHU New Standards System' : 'التطبيق الكلي لنظام المعايير الجديدة';
    } else if (viewName === 'departments') {
        viewDepartmentsGrid.classList.remove('hidden');
        document.getElementById('header-main-title').innerText = isEn ? 'Company Departments' : 'كافة إدارات شركة رواحل';
    } else if (viewName === 'dept-compliance') {
        if (viewDeptCompliance) viewDeptCompliance.classList.remove('hidden');
        document.getElementById('header-main-title').innerText = isEn ? 'Compliance & Governance Monitoring' : 'إدارة الامتثال والحوكمة';
        
        const compBackBtn = document.getElementById('compliance-back-btn');
        if (compBackBtn) {
            let backAction = "showView('departments')";
            let backText = isEn ? 'Back to Departments' : 'العودة للإدارات';
            
            if (window.previousView === 'transportation-departments') {
                backAction = "showView('transportation-departments')";
                backText = isEn ? 'Back to Departments' : 'العودة لقائمة الإدارات';
            } else if (window.previousView === 'transportation-sector') {
                backAction = "showView('transportation-sector')";
                backText = isEn ? 'Back to Transportation' : 'العودة للنقل التخصصي';
            }
            compBackBtn.setAttribute('onclick', backAction);
            const compBackTextSpan = compBackBtn.querySelector('span[data-i18n]');
            if (compBackTextSpan) compBackTextSpan.innerText = backText;
        }
        
        setTimeout(() => { if (window.initComplianceCharts) window.initComplianceCharts(); }, 100);
        setTimeout(() => { if (window.initComplianceCharts) window.initComplianceCharts(); }, 300);
    } else if (viewName === 'dept-projects') {
        if (viewDeptProjects) viewDeptProjects.classList.remove('hidden');
        document.getElementById('header-main-title').innerText = isEn ? 'Project Management Office' : 'إدارة المشاريع الاستراتيجية';
        if (window.PortalIntegration) {
            window.PortalIntegration.resetViews();
            window.PortalIntegration.load();
        }
    } else if (viewName === 'project-shuttle') {
        if (viewProjectShuttle) viewProjectShuttle.classList.remove('hidden');
        document.getElementById('header-main-title').innerText = isEn ? 'Shuttle Transport Project Details' : 'مشروع النقل الترددي  - التفاصيل';
        setTimeout(() => { if (window.initShuttleCharts) window.initShuttleCharts(); }, 100);
    } else if (viewName === 'project-makkah-tour') {
        if (viewProjectMakkahTour) viewProjectMakkahTour.classList.remove('hidden');
        document.getElementById('header-main-title').innerText = isEn ? 'Makkah Tour Project Details' : 'مشروع جولة مكة - التفاصيل';
        setTimeout(() => { if (window.initMakkahTourCharts) window.initMakkahTourCharts(); }, 100);
    } else if (viewName === 'dept-fleet') {
        viewKpiDashboard.classList.remove('hidden');
        applyKpiFilters(viewName);

        if (window.PortalIntegration) window.PortalIntegration.load();
    } else {
        viewKpiDashboard.classList.remove('hidden');
        applyKpiFilters(viewName);
    }
}

// Move card elements dynamically inside views
function applyKpiFilters(viewName) {
    const isEn = document.documentElement.lang === 'en';
    const titleText = document.getElementById('view-kpi-title-text');
    const sectorChartContainer = document.getElementById('sector-chart-container');
    const breadcrumbContainer = document.getElementById('view-kpi-breadcrumb');
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    const sectorGrid = document.getElementById('sector-kpis-grid');
    const kpisContainer = document.getElementById('kpis-container');

    let isService = viewName.startsWith('service-') || ['contracts', 'hajj', 'leasing'].includes(viewName);
    let isDept = viewName.startsWith('dept-');
    let isTransportDept = ['contracts', 'hajj', 'leasing', 'dept-finance', 'dept-commercial', 'dept-sales', 'dept-ops', 'dept-hr', 'dept-it', 'dept-procurement', 'dept-hse', 'dept-strategy', 'dept-audit', 'dept-fleet', 'dept-tourism'].includes(viewName);

    sectorChartContainer.classList.remove('hidden');
    const execPanel = document.getElementById('executive-top-panel');
    if (execPanel) execPanel.classList.add('hidden');

    let sectorTitle = '';

    // 1. Move all cards back to original containers
    Object.keys(cardOriginalGrids).forEach(cardId => {
        const cardEl = document.getElementById(`card-${cardId}`);
        const originalGridId = cardOriginalGrids[cardId];
        const originalGridEl = document.getElementById(originalGridId);
        if (cardEl) {
            if (originalGridEl && cardEl.parentElement !== originalGridEl) {
                originalGridEl.appendChild(cardEl);
            } else if (!originalGridEl && kpisContainer && cardEl.parentElement !== kpisContainer) {
                kpisContainer.appendChild(cardEl);
            }
        }
    });

    // 2. Breadcrumbs and labels
    if (isTransportDept || isService) {
        breadcrumbContainer.classList.remove('hidden');
        const breadcrumbRoot = breadcrumbContainer.querySelector('span[onclick]');
        const backBtn = breadcrumbContainer.querySelector('button');
        
        if (isTransportDept) {
            if (breadcrumbRoot) {
                breadcrumbRoot.setAttribute('onclick', "showView('transportation-departments')");
                breadcrumbRoot.innerHTML = `<i class="fa-solid fa-bus me-1"></i>${isEn ? 'Specialized Transport Departments' : 'إدارات قطاع النقل التخصصي'}`;
            }
            if (backBtn) {
                backBtn.setAttribute('onclick', "showView('transportation-departments')");
                backBtn.querySelector('span').innerText = isEn ? 'Back to Departments' : 'العودة لقائمة الإدارات';
            }
        } else if (isService) {
            const isTransService = ['service-contracts', 'service-hajj-transport', 'service-umrah-transport', 'service-leasing', 'contracts', 'hajj', 'umrah', 'leasing'].includes(viewName);
            if (isTransService) {
                if (breadcrumbRoot) {
                    breadcrumbRoot.setAttribute('onclick', "showView('transportation-services')");
                    breadcrumbRoot.innerHTML = `<i class="fa-solid fa-bus me-1"></i>${isEn ? 'Specialized Transport Services' : 'خدمات قطاع النقل التخصصي'}`;
                }
                if (backBtn) {
                    backBtn.setAttribute('onclick', "showView('transportation-services')");
                    backBtn.querySelector('span').innerText = isEn ? 'Back to Services' : 'العودة للخدمات';
                }
            } else {
                if (breadcrumbRoot) {
                    breadcrumbRoot.setAttribute('onclick', "showView('pilgrim-sector')");
                    breadcrumbRoot.innerHTML = `<i class="fa-solid fa-kaaba me-1"></i>${isEn ? 'Tourism & Pilgrim Services' : 'رواحل لخدمات العمره والسياحه'}`;
                }
                if (backBtn) {
                    backBtn.setAttribute('onclick', "showView('pilgrim-sector')");
                    backBtn.querySelector('span').innerText = isEn ? 'Back to Pilgrim Services' : 'العودة لخدمات المعتمرين';
                }
            }
        }

        if (viewName === 'contracts' || viewName === 'service-contracts') sectorTitle = isEn ? 'service Contracts & Agreements' : 'خدمة العقود والاتفاقيات';
        else if (viewName === 'hajj' || viewName === 'service-hajj-transport') sectorTitle = isEn ? 'Hajj Transport Service' : 'خدمة نقل الحجاج';
        else if (viewName === 'umrah' || viewName === 'service-umrah-transport') sectorTitle = isEn ? 'Umrah Transport Service' : 'خدمة نقل المعتمرين';
        else if (viewName === 'leasing' || viewName === 'service-leasing') sectorTitle = isEn ? 'service Rental & Operations Services' : 'خدمة التاجير والتشغيل ';
        else if (viewName === 'dept-tourism') sectorTitle = isEn ? 'Tourism Department' : 'ادارة السياحة';
        else if (viewName === 'dept-ops') sectorTitle = isEn ? 'Operations Department' : 'ادارة العمليات';
        else if (viewName === 'dept-commercial') sectorTitle = isEn ? 'Commercial Department' : 'الادارة التجارية';
        else if (viewName === 'dept-sales') sectorTitle = isEn ? 'Sales Department' : 'إدارة المبيعات';
        else if (viewName === 'dept-fleet') sectorTitle = isEn ? 'Fleet Department' : 'ادارة الاسطول';
        else if (viewName === 'dept-hr') sectorTitle = isEn ? 'Human Resources Department' : 'إدارة الموارد البشرية';
        else if (viewName === 'dept-it') sectorTitle = isEn ? 'Information Technology Department' : 'إدارة تقنية المعلومات';
        else if (viewName === 'dept-procurement') sectorTitle = isEn ? 'Procurement & Support Services' : 'إدارة المشتريات والخدمات المساندة';
        else if (viewName === 'dept-finance') sectorTitle = isEn ? 'Financial Department' : 'الادارة المالية';
        else if (viewName === 'dept-strategy') sectorTitle = isEn ? 'Strategy & Performance Department' : 'والاستراتيجية والاداء';
        else if (viewName === 'dept-audit') sectorTitle = isEn ? 'Internal Audit Department' : 'التدقيق الداخلي';
        else if (viewName === 'dept-hse') sectorTitle = isEn ? 'Health, Safety & Environment (HSE)' : 'الصحة والسلامة والبيئة';
        
        else if (viewName === 'service-visa') sectorTitle = isEn ? 'Visa Issuance Service' : 'خدمة إصدار التأشيرات';
        else if (viewName === 'service-hotels') sectorTitle = isEn ? 'Hotel Booking & Accommodation' : 'خدمة حجز وإقامة الفنادق';
        else if (viewName === 'service-transport') sectorTitle = isEn ? 'Pilgrim Transport Service' : 'خدمة نقل المعتمرين';
        else if (viewName === 'service-hospitality') sectorTitle = isEn ? 'Hospitality & Catering Service' : 'خدمة الضيافة';
        else if (viewName === 'service-mohu-diversity') sectorTitle = isEn ? 'Pilgrims Diversity' : 'تنوع المعتمرين';
        else if (viewName === 'service-mohu-experience') sectorTitle = isEn ? 'Pilgrim Experience & Service Quality' : 'تجربة المعتمر وجودة الخدمة';
        else if (viewName === 'service-mohu-compliance') sectorTitle = isEn ? 'Compliance' : 'الامتثال';
        else if (viewName === 'service-mohu-data') sectorTitle = isEn ? 'Data Quality' : 'جودة البيانات';

        breadcrumbCurrent.innerText = sectorTitle;
        titleText.innerText = sectorTitle;
    } else {
        breadcrumbContainer.classList.add('hidden');
    }

    // Toggle banners and text
    const breadcrumbWrapper = document.getElementById('view-kpi-breadcrumb');
    const titleWrapper = document.getElementById('view-kpi-title-wrapper');
    const serviceBanner = document.getElementById('service-detail-banner');
    
    if (breadcrumbWrapper) breadcrumbWrapper.classList.add('hidden');
    if (titleWrapper) titleWrapper.classList.add('hidden');
    if (serviceBanner) {
        serviceBanner.classList.remove('hidden');
        
        const badgeEl = document.getElementById('service-banner-badge');
        const titleEl = document.getElementById('service-banner-title');
        const descEl = document.getElementById('service-banner-desc');
        const backBtn = document.getElementById('service-banner-back-btn');
        const backTextEl = document.getElementById('service-banner-back-text');
        
        let badge = '', title = '', desc = '', backAction = '', backText = '';
        
        if (viewName === 'contracts' || viewName === 'service-contracts') {
            badge = isEn ? 'Contracts & Agreements Services' : 'خدمات العقود والاتفاقيات';
            title = isEn ? 'Contracts & Agreements Service - Operational Analysis' : 'خدمة العقود والاتفاقيات - التحليل التشغيلي';
            desc = isEn ? 'Monitoring strategic contracts, renewal rates, turnaround times, and active legal disputes.' : 'متابعة توقيع العقود الاستراتيجية، معدل تجديد العقود، متوسط زمن توقيع العقود، والنزاعات القانونية النشطة.';
            backAction = "showView('transportation-services')";
            backText = isEn ? 'Back to Services' : 'العودة للخدمات';
        } else if (viewName === 'hajj' || viewName === 'service-hajj-transport') {
            badge = isEn ? 'Hajj Transport Services' : 'خدمات نقل الحجاج';
            title = isEn ? 'Hajj Transport Service - Operational Analysis' : 'خدمة نقل الحجاج - التحليل التشغيلي';
            desc = isEn ? 'Monitoring Hajj pilgrim transport scheduling, route compliance, fleet readiness, and driver safety.' : 'تفويج ونقل الحجاج والتزام مسارات التشغيل وجاهزية الأسطول والأمن والسلامة للحج.';
            backAction = "showView('transportation-services')";
            backText = isEn ? 'Back to Services' : 'العودة للخدمات';
        } else if (viewName === 'umrah' || viewName === 'service-umrah-transport') {
            badge = isEn ? 'Umrah Transport Services' : 'خدمات نقل المعتمرين';
            title = isEn ? 'Umrah Transport Service - Operational Analysis' : 'خدمة نقل المعتمرين - التحليل التشغيلي';
            desc = isEn ? 'Monitoring Umrah pilgrim transport scheduling, route compliance, fleet readiness, and passenger safety.' : 'تفويج ونقل المعتمرين والتزام مسارات التشغيل وجاهزية الأسطول والأمن والسلامة للعمرة.';
            backAction = "showView('transportation-services')";
            backText = isEn ? 'Back to Services' : 'العودة للخدمات';
        } else if (viewName === 'leasing' || viewName === 'service-leasing') {
            badge = isEn ? 'Bus Leasing & Operations Services' : 'خدمة التاجير والتشغيل ';
            title = isEn ? 'Rental & Operations Service - Operational Analysis' : 'خدمة التاجير والتشغيل  - التحليل التشغيلي';
            desc = isEn ? 'Monitoring daily rental fleet utilization, revenue per bus, and maintenance schedules.' : 'متابعة جاهزية أسطول الحافلات اليومية ونسب استغلال المقاعد وجداول الصيانة الدورية للتأجير.';
            backAction = "showView('transportation-services')";
            backText = isEn ? 'Back to Services' : 'العودة للخدمات';
        } else if (viewName === 'service-visa') {
            badge = isEn ? 'Electronic Visa Issuance Services' : 'خدمات إصدار التأشيرات الإلكترونية';
            title = isEn ? 'Visa Issuance Service - Operational Analysis' : 'خدمة إصدار التأشيرات - التحليل التشغيلي';
            desc = isEn ? 'Monitoring visa processing times, approval rates, issuance volumes, and integration uptime.' : 'متابعة زمن معالجة التأشيرات، نسب الموافقة، إجمالي التأشيرات، والربط الإلكتروني للفئات المختلفة.';
            backAction = "showView('pilgrim-sector')";
            backText = isEn ? 'Back to Pilgrim Services' : 'العودة لخدمات المعتمرين';
        } else if (viewName === 'service-hotels') {
            badge = isEn ? 'Hotel Booking & Accommodation Services' : 'خدمات الإسكان وحجوزات الفنادق';
            title = isEn ? 'Hotel Booking & Accommodation Service - Operational Analysis' : 'خدمة حجز وإقامة الفنادق - التحليل التشغيلي';
            desc = isEn ? 'Monitoring hotel occupancy levels, cancellation rates, room pricing, and contract compliance.' : 'متابعة نسب إشغال الفنادق، معدل إلغاء الحجوزات، متوسط أسعار الغرف، والالتزام ببنود عقود الإقامة.';
            backAction = "showView('pilgrim-sector')";
            backText = isEn ? 'Back to Pilgrim Services' : 'العودة لخدمات المعتمرين';
        } else if (viewName === 'service-transport') {
            badge = isEn ? 'Pilgrim Transport Services' : 'خدمات نقل وتفويج المعتمرين';
            title = isEn ? 'Pilgrim Transport Service - Operational Analysis' : 'خدمة نقل المعتمرين - التحليل التشغيلي';
            desc = isEn ? 'Monitoring transport schedule adherence, shuttle utilization efficiency, and passenger safety rates.' : 'متابعة الالتزام بخطط التفويج، كفاءة تشغيل حافلات المعتمرين، ومعدلات الأمان والسلامة أثناء التنقل.';
            backAction = "showView('pilgrim-sector')";
            backText = isEn ? 'Back to Pilgrim Services' : 'العودة لخدمات المعتمرين';
        } else if (viewName === 'service-hospitality') {
            badge = isEn ? 'Catering & Hospitality Services' : 'خدمات الإعاشة والضيافة';
            title = isEn ? 'Hospitality & Catering Service - Operational Analysis' : 'خدمة الضيافة والإعاشة - التحليل التشغيلي';
            desc = isEn ? 'Monitoring meal delivery punctuality, food safety standards compliance, and satisfaction levels.' : 'متابعة التزام مواعيد الوجبات، سلامة وجودة الأغذية، ونسب رضا المعتمرين عن خدمات الإعاشة.';
            backAction = "showView('pilgrim-sector')";
            backText = isEn ? 'Back to Pilgrim Services' : 'العودة لخدمات المعتمرين';
        } else if (viewName === 'service-mohu-diversity') {
            badge = isEn ? 'MOHU Standards' : 'معايير وزارة الحج والعمرة';
            title = isEn ? 'Pilgrims Diversity - Operational Analysis' : 'تنوع المعتمرين - التحليل التشغيلي';
            desc = isEn ? 'Monitoring the diversity of pilgrims, nationalities, pricing segments, and individual pilgrims ratio.' : 'يعكس مدى التزام الشركة بتقديم عروض تلائم شرائح سعرية متنوعة توافق فئاتها.';
            backAction = "showView('dept-mohu-standards')";
            backText = isEn ? 'Back to Standards' : 'العودة للمعايير';
        } else if (viewName === 'service-mohu-experience') {
            badge = isEn ? 'MOHU Standards' : 'معايير وزارة الحج والعمرة';
            title = isEn ? 'Pilgrim Experience & Quality - Operational Analysis' : 'تجربة المعتمر وجودة الخدمة - التحليل التشغيلي';
            desc = isEn ? 'Monitoring pilgrim satisfaction, service quality, and complaint resolution rates.' : 'يعكس رضا المعتمرين عن الخدمات المقدمة وجودتها، بما يشمل التفاعل معهم ومعالجة الشكاوى.';
            backAction = "showView('dept-mohu-standards')";
            backText = isEn ? 'Back to Standards' : 'العودة للمعايير';
        } else if (viewName === 'service-mohu-compliance') {
            badge = isEn ? 'MOHU Standards' : 'معايير وزارة الحج والعمرة';
            title = isEn ? 'Compliance - Operational Analysis' : 'الامتثال - التحليل التشغيلي';
            desc = isEn ? 'Monitoring adherence to ministry regulations, health policies, and safe transport.' : 'يقيس مدى التزام الشركات بالتعليمات والأنظمة ومستوى التعاون مع الوزارة في الاستجابات والتنظيم.';
            backAction = "showView('dept-mohu-standards')";
            backText = isEn ? 'Back to Standards' : 'العودة للمعايير';
        } else if (viewName === 'service-mohu-data') {
            badge = isEn ? 'MOHU Standards' : 'معايير وزارة الحج والعمرة';
            title = isEn ? 'Data Quality - Operational Analysis' : 'جودة البيانات - التحليل التشغيلي';
            desc = isEn ? 'Monitoring data accuracy across grouping, accommodation, and entry/exit ports.' : 'يقيس مدى تطابق البيانات المسجلة من قبل الشركة مع البيانات المعتمدة من الجهات الحكومية.';
            backAction = "showView('dept-mohu-standards')";
            backText = isEn ? 'Back to Standards' : 'العودة للمعايير';
        } else if (viewName.startsWith('dept-')) {
            let deptBackAction = "showView('departments')";
            if (window.previousView === 'transportation-departments') deptBackAction = "showView('transportation-departments')";

            if (viewName === 'dept-finance') {
                badge = isEn ? 'Finance Department' : 'الإدارة المالية';
                title = isEn ? 'Finance Department - Operational Analysis' : 'الإدارة المالية - التحليل التشغيلي';
                desc = isEn ? 'Monitoring revenue growth, EBITDA margin, cash flows, and return on assets.' : 'الإيرادات والربحية والتدفقات النقدية التشغيلية والعائد الكلي على الأصول المالية.';
                backAction = deptBackAction;
                backText = isEn ? 'Back to Departments' : 'العودة للإدارات';
            } else if (viewName === 'dept-commercial') {
                badge = isEn ? 'Commercial Department' : 'الإدارة التجارية والعملاء';
                title = isEn ? 'Commercial Department - Operational Analysis' : 'الادارة التجارية - التحليل التشغيلي';
                desc = isEn ? 'Monitoring commercial performance, partner retention, NPS, and new contracts.' : 'متابعة الفرع التجاري ومبيعات وعقود النقل التخصصي ورضا العملاء NPS ونسب الاحتفاظ بالشركاء.';
                backAction = deptBackAction;
                backText = isEn ? 'Back to Departments' : 'العودة للإدارات';
            } else if (viewName === 'dept-sales') {
                badge = isEn ? 'Sales Department' : 'إدارة المبيعات';
                title = isEn ? 'Sales Department - Operational Analysis' : 'إدارة المبيعات - التحليل التشغيلي';
                desc = isEn ? 'Monitoring the customer base, year-over-year growth, top customer segments, and available fleet capacity.' : 'متابعة قاعدة العملاء ونموها السنوي، وأكبر شرائح العملاء، والسعة الاستيعابية المتاحة للأسطول.';
                backAction = deptBackAction;
                backText = isEn ? 'Back to Departments' : 'العودة للإدارات';
            } else if (viewName === 'dept-ops') {
                badge = isEn ? 'Operations Department' : 'إدارة العمليات';
                title = isEn ? 'Operations Department - Operational Analysis' : 'ادارة العمليات - التحليل التشغيلي';
                desc = isEn ? 'Monitoring daily bus route scheduling, plan adherence, and operational trips.' : 'الالتزام بالخطة التشغيلية اليومية للحافلات، وتوجيه المسارات، ومتابعة الرحلات التشغيلية.';
                backAction = deptBackAction;
                backText = isEn ? 'Back to Departments' : 'العودة للإدارات';
            } else if (viewName === 'dept-fleet') {
                badge = isEn ? 'Fleet Department' : 'إدارة الأسطول';
                title = isEn ? 'Fleet Department - Operational Analysis' : 'ادارة الاسطول - التحليل التشغيلي';
                desc = isEn ? 'Monitoring daily fleet readiness, seat utilization, and periodic maintenance.' : 'متابعة جاهزية أسطول الحافلات اليومية ونسب استغلال المقاعد وجداول الصيانة الدورية.';
                backAction = deptBackAction;
                backText = isEn ? 'Back to Departments' : 'العودة للإدارات';
            } else if (viewName === 'dept-hr') {
                badge = isEn ? 'Human Resources' : 'الموارد البشرية';
                title = isEn ? 'Human Resources Department - Operational Analysis' : 'إدارة الموارد البشرية - التحليل التشغيلي';
                desc = isEn ? 'Monitoring employee relations, recruitment, training hours, succession planning, and saudization.' : 'متابعة شؤون الموظفين، التوظيف، خطط الإحلال والتعاقب الوظيفي، ونسب التوطين بالشركة.';
                backAction = deptBackAction;
                backText = isEn ? 'Back to Departments' : 'العودة للإدارات';
            } else if (viewName === 'dept-it') {
                badge = isEn ? 'Information Technology' : 'تقنية المعلومات';
                title = isEn ? 'IT Department - Operational Analysis' : 'إدارة تقنية المعلومات - التحليل التشغيلي';
                desc = isEn ? 'Monitoring systems uptime, support ticket turnaround, cybersecurity incidents, and digital transformation.' : 'أتمتة العمليات والورش، جاهزية الأنظمة والشبكات، الدعم الفني، وأمن المعلومات.';
                backAction = deptBackAction;
                backText = isEn ? 'Back to Departments' : 'العودة للإدارات';
            } else if (viewName === 'dept-procurement') {
                badge = isEn ? 'Procurement & Support' : 'المشتريات والخدمات المساندة';
                title = isEn ? 'Procurement & Support Services - Operational Analysis' : 'إدارة المشتريات والخدمات المساندة - التحليل التشغيلي';
                desc = isEn ? 'Monitoring procurement cycle time, suppliers evaluation, cost savings, and inventory accuracy.' : 'متابعة دورة الشراء، تقييم الموردين، التوفير المالي، وتوافر قطع الغيار والجرد.';
                backAction = deptBackAction;
                backText = isEn ? 'Back to Departments' : 'العودة للإدارات';
            } else if (viewName === 'dept-strategy') {
                badge = isEn ? 'Strategy & Performance Department' : 'إدارة الاستراتيجية والأداء';
                title = isEn ? 'Strategy & Performance - Operational Analysis' : 'والاستراتيجية والاداء - التحليل التشغيلي';
                desc = isEn ? 'Monitoring strategic goal achievement, PMO initiatives, and corporate governance.' : 'تحقيق الأهداف الاستراتيجية، مبادرات مكتب إدارة المشاريع PMO، ومتابعة نضج الأداء المؤسسي.';
                backAction = deptBackAction;
                backText = isEn ? 'Back to Departments' : 'العودة للإدارات';
            } else if (viewName === 'dept-audit') {
                badge = isEn ? 'Internal Audit Department' : 'إدارة التدقيق الداخلي';
                title = isEn ? 'Internal Audit - Operational Analysis' : 'التدقيق الداخلي - التحليل التشغيلي';
                desc = isEn ? 'Monitoring internal audits, governance maturity, and policy compliance assessments.' : 'أعمال التدقيق الداخلي، مراجعة العمليات والسياسات، وتقييم الحوكمة والامتثال الإداري.';
                backAction = deptBackAction;
                backText = isEn ? 'Back to Departments' : 'العودة للإدارات';
            } else if (viewName === 'dept-hse') {
                badge = isEn ? 'Health, Safety & Environment (HSE)' : 'إدارة الصحة والسلامة والبيئة';
                title = isEn ? 'HSE - Operational Analysis' : 'الصحة والسلامة والبيئة - التحليل التشغيلي';
                desc = isEn ? 'Monitoring traffic and industrial accidents, safety training, and regulation compliance.' : 'معدل الحوادث المرورية والصناعية، الالتزام باللوائح والتعليمات، والسلامة العامة على الطرق.';
                backAction = deptBackAction;
                backText = isEn ? 'Back to Departments' : 'العودة للإدارات';
            } else if (viewName === 'dept-tourism') {
                badge = isEn ? 'Tourism Department' : 'إدارة السياحة';
                title = isEn ? 'Tourism Department - Operational Analysis' : 'إدارة السياحة - التحليل التشغيلي';
                desc = isEn ? 'Monitoring hotel occupancy, cancellation rates, and guest satisfaction ratings.' : 'متابعة نسب إشغال الفنادق ومعدلات الإلغاء وتقييمات رضا النزلاء.';
                backAction = deptBackAction;
                backText = isEn ? 'Back to Departments' : 'العودة للإدارات';
            }
        }
        
        if (badgeEl) badgeEl.innerText = badge;
        if (titleEl) titleEl.innerText = title;
        if (descEl) descEl.innerText = desc;
        if (backBtn) backBtn.setAttribute('onclick', backAction);
        if (backTextEl) backTextEl.innerText = backText;
    }

    document.getElementById('sector-chart-title').innerText = isEn ? 'Comparative Analysis: Actual Performance vs Target' : 'تحليل مقارنة الأداء الفعلي بالمستهدف الأساسي';

    const allowedKpis = sectorMapping[viewName] || [];

    // Render 4 Top Executive KPIs for Sector
    const execData = {
        'contracts': { revenue: '45.0', growth: '+6.5%', achievement: '93%', transactions: '1,240' },
        'hajj': { revenue: '38.5', growth: '+9.2%', achievement: '92%', transactions: '5,000' },
        'leasing': { revenue: '35.0', growth: '+7.1%', achievement: '89%', transactions: '2,680' },
        'dept-finance': { revenue: '142.5', growth: '+8.2%', achievement: '91%', transactions: '12,420' },
        'dept-commercial': { revenue: '45.0', growth: '+6.5%', achievement: '93%', transactions: '1,240' },
        'dept-ops': { revenue: '97.5', growth: '+9.3%', achievement: '92%', transactions: '11,180' },
        'dept-hr': { revenue: '14.5', growth: '+5.2%', achievement: '92%', transactions: '1,240' },
        'dept-it': { revenue: '28.0', growth: '+7.4%', achievement: '90%', transactions: '4,500' },
        'dept-procurement': { revenue: '100.0', growth: '+9.1%', achievement: '93%', transactions: '6,680' },
        'dept-hse': { revenue: '142.5', growth: '+8.2%', achievement: '95%', transactions: '12,420' },
        'dept-strategy': { revenue: '142.5', growth: '+8.2%', achievement: '91%', transactions: '12,420' },
        
        'service-contracts': { revenue: '45.0', growth: '+6.5%', achievement: '93%', transactions: '1,240' },
        'service-hajj-transport': { revenue: '38.5', growth: '+9.2%', achievement: '92%', transactions: '5,000' },
        'service-umrah-transport': { revenue: '24.0', growth: '+14.5%', achievement: '90%', transactions: '3,500' },
        'service-leasing': { revenue: '35.0', growth: '+7.1%', achievement: '89%', transactions: '2,680' },
        
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

    // Show/Hide cards dynamically
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

    setTimeout(() => { buildSectorChart(viewName); }, 80);
}

// Build comparative chart for sector
function buildSectorChart(sectorKey) {
    if (typeof Chart === 'undefined') return;
    const canvas = document.getElementById('sectorChart');
    if (!canvas) return;

    try {
        if (window.sectorChartInstance) window.sectorChartInstance.destroy();
        const ctx = canvas.getContext('2d');
        const isEn = document.documentElement.lang === 'en';
        const fontName = isEn ? 'Outfit' : 'Tajawal';

        const allowedKpis = sectorMapping[sectorKey] || [];
        const chartLabels = [];
        const actualData = [];
        const targetData = [];
        const originalActuals = [];
        const originalTargets = [];

        allowedKpis.forEach(key => {
            const elVal = document.getElementById(`val-${key}`);
            if (elVal) {
                const valText = elVal.innerText;
                const valNum = parseFloat(valText.replace(/[^0-9.]/g, '')) || 0;
                
                let kpiName = key;
                const cardTitle = document.querySelector(`#card-${key} span[data-i18n]`);
                if (cardTitle) kpiName = cardTitle.innerText;

                chartLabels.push(kpiName);
                
                const targetVal = kpiSettings[key] ? kpiSettings[key].target : 0;
                const unit = valText.replace(/[0-9.,\-+]/g, '').trim();

                const isInverse = ['hse-ltifr', 'hse-accidents', 'visa-processing-time', 'hotel-cancel-rate', 'comp-violations-count', 'comp-resolution-time', 'comp-critical-findings', 'visa-data-error-rate', 'visa-complaints-rate', 'hotel-overbooking-incidents', 'meal-waste-percentage', 'hospitality-complaints', 'ops-d-15', 'ops-d-16', 'ops-d-17', 'ops-d-20', 'ops-d-21', 'ops-d-22', 'ops-d-23', 'ops-d-29', 'hse-d-15', 'critical-findings-count', 'hr-turnover', 'it-ticket-time', 'it-incidents', 'proc-cycle'].includes(key);
                let achievement = 100;
                if (isInverse) {
                    if (targetVal === 0) {
                        achievement = valNum === 0 ? 100 : Math.max(0, 100 - valNum * 10);
                    } else {
                        achievement = valNum === 0 ? 120 : (targetVal / valNum) * 100;
                    }
                } else {
                    achievement = targetVal > 0 ? (valNum / targetVal) * 100 : (valNum > 0 ? 120 : 100);
                }
                
                const displayAchievement = Math.min(150, Math.max(0, achievement));
                actualData.push(displayAchievement);
                targetData.push(100);
                
                originalActuals.push(valText);
                originalTargets.push(targetVal.toLocaleString() + (unit ? ' ' + unit : ''));
            }
        });

        const actualGradient = ctx.createLinearGradient(0, 0, 0, 400);
        actualGradient.addColorStop(0, '#b0841a');
        actualGradient.addColorStop(1, '#8c6510');

        const targetGradient = ctx.createLinearGradient(0, 0, 0, 400);
        targetGradient.addColorStop(0, '#cbd5e1');
        targetGradient.addColorStop(1, '#94a3b8');

        window.sectorChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartLabels,
                datasets: [
                    { 
                        label: isEn ? 'Actual Performance (Achievement %)' : 'الأداء الفعلي الحالي (نسبة الإنجاز %)', 
                        data: actualData, 
                        backgroundColor: actualGradient, 
                        borderRadius: 6,
                        barPercentage: 0.8,
                        categoryPercentage: 0.7
                    },
                    { 
                        label: isEn ? 'Target Baseline (100%)' : 'المستهدف الأساسي (100%)', 
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
                    legend: { labels: { color: '#0f172a', font: { family: fontName, size: 11, weight: 'bold' } } },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const index = context.dataIndex;
                                const isActual = context.datasetIndex === 0;
                                const originalVal = isActual ? originalActuals[index] : originalTargets[index];
                                const labelText = isActual ? (isEn ? 'Actual: ' : 'الفعلي: ') : (isEn ? 'Target: ' : 'المستهدف: ');
                                const pctText = isActual ? ` (${context.raw.toFixed(1)}%)` : '';
                                return labelText + originalVal + pctText;
                            }
                        }
                    }
                },
                scales: {
                    y: { 
                        grid: { color: 'rgba(0, 0, 0, 0.06)' }, 
                        ticks: { 
                            color: '#1e293b', 
                            font: { family: fontName, size: 10, weight: 'bold' },
                            callback: function(value) {
                                return value + '%';
                            }
                        } 
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

// Calculate sector average performance
function calculateSectorAvg(sectorKey) {
    const kpis = sectorMapping[sectorKey] || [];
    let sum = 0;
    let count = 0;

    kpis.forEach(key => {
        const el = document.getElementById(`val-${key}`);
        if (el) {
            const text = el.innerText;
            const val = parseFloat(text.replace(/[^0-9.]/g, '')) || 0;
            const config = kpiSettings[key];
            if (config) {
                let ratio = 100;
                if (key === 'hse-ltifr' || key === 'hse-accidents' || key === 'visa-processing-time' || key === 'hotel-cancel-rate' || ['ops-d-15', 'ops-d-16', 'ops-d-17', 'ops-d-20', 'ops-d-21', 'ops-d-22', 'ops-d-23', 'ops-d-29', 'hse-d-15', 'critical-findings-count', 'hr-turnover', 'it-ticket-time', 'it-incidents', 'proc-cycle'].includes(key)) {
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

// Simulate and Bind KPI Values dynamically from window.RAWAHEL_DATA config
window.simulateKpiData = function(initial) {
    const data = window.RAWAHEL_DATA;
    if (!data) return;

    const isEn = document.documentElement.lang === 'en';
    const sarUnit = isEn ? 'M SAR' : 'مليون ر.س';

    // 1. Reading config values
    const revGrowthNum = data.revenueGrowth;
    const ebitda = data.ebitda;
    const cashflow = data.cashFlow;
    const roa = data.roa;
    const custRet = data.custRetention;
    const nps = data.nps;
    const newContracts = data.newContracts;
    const opsPlan = data.opsPlan;
    const fleetReady = data.fleetReady;
    const fleetUtil = data.fleetUtil;
    const hrRet = data.hrRetention;
    const itAutom = data.itAutomation;
    const criticalSuccession = data.criticalSuccession;
    const saudization = data.saudization;
    const ltifr = data.ltifr;
    const accidents = data.accidents;
    const auditComp = data.auditCompliance;
    const stratGoals = data.strategicGoals;
    const stratInit = data.strategicInitiatives;
    const riskHandling = data.riskHandling;
    const govMaturity = data.govMaturity;
    const stratGoalsAchieve = data.stratGoalsAchieve;

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

    // 22 new service KPIs values
    const visaIntegrationUptime = data.visaIntegrationUptime;
    const visaDataErrorRate = data.visaDataErrorRate;
    const visaComplaintsRate = data.visaComplaintsRate;
    const hotelAverageRoomRate = data.hotelAverageRoomRate;
    const hotelOverbookingIncidents = data.hotelOverbookingIncidents;
    const hotelContractCompliance = data.hotelContractCompliance;
    const pilgrimBusMaintenanceAdherence = data.pilgrimBusMaintenanceAdherence;
    const pilgrimTripDuration = data.pilgrimTripDuration;
    const pilgrimSatisfaction = data.pilgrimSatisfaction;
    const mealWastePercentage = data.mealWastePercentage;
    const hospitalityStaffCompliance = data.hospitalityStaffCompliance;
    const hospitalityComplaints = data.hospitalityComplaints;
    
    const contractsRenewalRate = data.contractsRenewalRate;
    const contractsTurnaroundTime = data.contractsTurnaroundTime;
    const contractsLegalDisputes = data.contractsLegalDisputes;
    const hajjDriverAdherence = data.hajjDriverAdherence;
    const hajjFuelEfficiency = data.hajjFuelEfficiency;
    const hajjSafetyTrainingRate = data.hajjSafetyTrainingRate;
    
    const rentalFleetUtilization = data.rentalFleetUtilization;
    const rentalRevenuePerBus = data.rentalRevenuePerBus;
    const rentalContractSatisfaction = data.rentalContractSatisfaction;
    const rentalMaintenanceAdherence = data.rentalMaintenanceAdherence;
    const rentalSafetyCompliance = data.rentalSafetyCompliance;
    const rentalActiveContracts = data.rentalActiveContracts;

    // 20 new KPIs variables reading
    const opsD15 = data.opsD15;
    const opsD16 = data.opsD16;
    const opsD17 = data.opsD17;
    const opsD18 = data.opsD18;
    const opsD19 = data.opsD19;
    const opsD20 = data.opsD20;
    const opsD21 = data.opsD21;
    const opsD22 = data.opsD22;
    const opsD23 = data.opsD23;
    const opsD24 = data.opsD24;
    const opsD25 = data.opsD25;
    const opsD26 = data.opsD26;
    const opsD27 = data.opsD27;
    const opsD28 = data.opsD28;
    const opsD29 = data.opsD29;
    const opsD30 = data.opsD30;
    const opsD31 = data.opsD31;
    const opsD32 = data.opsD32;
    const comD10 = data.comD10;
    const hseD15 = data.hseD15;

    const baseRevenue = 118.75; 
    const currentRevenue = parseFloat((baseRevenue * (1 + revGrowthNum / 100)).toFixed(1));

    // 2. Injecting values inside HTML elements
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
    safeSetText('val-hr-saudization', saudization + '%');
    safeSetText('val-hr-count', '1,420' + (isEn ? ' employees' : ' موظف'));
    safeSetText('val-hr-growth', '8.5%');
    safeSetText('val-hr-absence', '2.8%');
    safeSetText('val-hr-training', '24' + (isEn ? ' hrs' : ' ساعة'));
    safeSetText('val-hr-appraisal', '92%');

    safeSetText('val-it-autom', itAutom + '%');
    safeSetText('val-it-uptime', '99.5%');
    safeSetText('val-it-ticket-time', '1.5' + (isEn ? ' hrs' : ' ساعة'));
    safeSetText('val-it-incidents', '0');
    safeSetText('val-it-satisfaction', '88%');
    safeSetText('val-it-backup', '100%');
    safeSetText('val-it-projects', '90%');

    safeSetText('val-proc-cycle', '6' + (isEn ? ' days' : ' أيام'));
    safeSetText('val-proc-savings', '12%');
    safeSetText('val-proc-supplier', '88%');
    safeSetText('val-proc-budget', '97%');
    safeSetText('val-proc-spare-parts', '96%');
    safeSetText('val-proc-inventory', '98.5%');
    safeSetText('val-proc-contracts', '35' + (isEn ? ' contracts' : ' عقد'));

    safeSetText('val-hse-ltifr', ltifr);
    safeSetText('val-hse-accidents', accidents);
    safeSetText('val-audit-comp', auditComp + '%');
    safeSetText('val-strat-goals', stratGoals + '%');
    safeSetText('val-strat-init', stratInit + '%');
    safeSetText('val-risk-handling', riskHandling + '%');
    safeSetText('val-gov-maturity', govMaturity + '%');
    safeSetText('val-strat-goals-achieve', stratGoalsAchieve + '%');
    safeSetText('val-strat-milestones', '88%');
    safeSetText('val-strat-budget', '96.5%');

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

    // 22 new service KPIs HTML Inject
    safeSetText('val-visa-integration-uptime', visaIntegrationUptime + '%');
    safeSetText('val-visa-data-error-rate', visaDataErrorRate + '%');
    safeSetText('val-visa-complaints-rate', visaComplaintsRate + '%');
    safeSetText('val-hotel-average-room-rate', hotelAverageRoomRate + (isEn ? ' SAR' : ' ر.س'));
    safeSetText('val-hotel-overbooking-incidents', hotelOverbookingIncidents);
    safeSetText('val-hotel-contract-compliance', hotelContractCompliance + '%');
    safeSetText('val-pilgrim-bus-maintenance-adherence', pilgrimBusMaintenanceAdherence + '%');
    safeSetText('val-pilgrim-trip-duration', pilgrimTripDuration + (isEn ? ' hrs' : ' ساعة'));
    safeSetText('val-pilgrim-satisfaction', pilgrimSatisfaction + '%');
    safeSetText('val-meal-waste-percentage', mealWastePercentage + '%');
    safeSetText('val-hospitality-staff-compliance', hospitalityStaffCompliance + '%');
    safeSetText('val-hospitality-complaints', hospitalityComplaints);
    
    safeSetText('val-contracts-renewal-rate', contractsRenewalRate + '%');
    safeSetText('val-contracts-turnaround-time', contractsTurnaroundTime + (isEn ? ' days' : ' أيام'));
    safeSetText('val-contracts-legal-disputes', contractsLegalDisputes);
    safeSetText('val-hajj-driver-adherence', hajjDriverAdherence + '%');
    safeSetText('val-hajj-fuel-efficiency', hajjFuelEfficiency + '%');
    safeSetText('val-hajj-safety-training-rate', hajjSafetyTrainingRate + '%');
    
    safeSetText('val-rental-fleet-utilization', rentalFleetUtilization + '%');
    safeSetText('val-rental-revenue-per-bus', rentalRevenuePerBus + (isEn ? ' SAR' : ' ر.س'));
    safeSetText('val-rental-contract-satisfaction', rentalContractSatisfaction + '%');
    safeSetText('val-rental-maintenance-adherence', rentalMaintenanceAdherence + '%');
    safeSetText('val-rental-safety-compliance', rentalSafetyCompliance + '%');
    safeSetText('val-rental-active-contracts', rentalActiveContracts);

    // 20 new KPIs values inject
    safeSetText('val-ops-d-15', opsD15 + (isEn ? ' mins' : ' دقيقة'));
    safeSetText('val-ops-d-16', opsD16 + (isEn ? ' mins' : ' دقيقة'));
    safeSetText('val-ops-d-17', opsD17 + '%');
    safeSetText('val-ops-d-18', opsD18 + '%');
    safeSetText('val-ops-d-19', opsD19 + '%');
    safeSetText('val-ops-d-20', opsD20 + (isEn ? ' breakdowns' : ' عطل'));
    safeSetText('val-ops-d-21', opsD21 + (isEn ? ' mins' : ' دقيقة'));
    safeSetText('val-ops-d-22', opsD22 + (isEn ? ' mins' : ' دقيقة'));
    safeSetText('val-ops-d-23', opsD23 + (isEn ? ' mins' : ' دقيقة'));
    safeSetText('val-ops-d-24', opsD24 + '%');
    safeSetText('val-ops-d-25', opsD25 + '%');
    safeSetText('val-ops-d-26', opsD26 + '%');
    safeSetText('val-ops-d-27', opsD27 + '%');
    safeSetText('val-ops-d-28', opsD28 + '%');
    safeSetText('val-ops-d-29', opsD29 + (isEn ? ' violations' : ' مخالفة'));
    safeSetText('val-ops-d-30', opsD30 + '%');
    safeSetText('val-ops-d-31', opsD31 + '%');
    safeSetText('val-ops-d-32', opsD32 + '%');
    safeSetText('val-com-d-10', comD10 + '%');
    safeSetText('val-hse-d-15', hseD15 + (isEn ? ' violations' : ' مخالفة'));

    // Overview Home page summary indicators
    safeSetText('val-rev-growth-sum', currentRevenue + ' ' + sarUnit);
    safeSetText('val-ebitda-sum', ebitda + '%');
    safeSetText('val-fleet-ready-sum', fleetReady + '%');
    safeSetText('val-nps-sum', nps);
    safeSetText('val-saudization-sum', saudization + '%');
    safeSetText('val-hse-accidents-sum', accidents);

    // 3. Counting flags for summary pie chart
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
    trackFlag('hr-saudization', saudization);
    trackFlag('hr-count', 1420);
    trackFlag('hr-growth', 8.5);
    trackFlag('hr-absence', 2.8);
    trackFlag('hr-training', 24);
    trackFlag('hr-appraisal', 92);
    trackFlag('it-autom', itAutom);
    trackFlag('hse-ltifr', ltifr);
    trackFlag('hse-accidents', accidents);
    trackFlag('audit-comp', auditComp);
    trackFlag('strat-goals', stratGoals);
    trackFlag('strat-init', stratInit);
    trackFlag('risk-handling', riskHandling);
    trackFlag('gov-maturity', govMaturity);
    trackFlag('strat-goals-achieve', stratGoalsAchieve);
    trackFlag('strat-milestones', 88);
    trackFlag('strat-budget', 96.5);

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

    // 22 new service KPIs flags
    trackFlag('visa-integration-uptime', visaIntegrationUptime);
    trackFlag('visa-data-error-rate', visaDataErrorRate);
    trackFlag('visa-complaints-rate', visaComplaintsRate);
    trackFlag('hotel-average-room-rate', hotelAverageRoomRate);
    trackFlag('hotel-overbooking-incidents', hotelOverbookingIncidents);
    trackFlag('hotel-contract-compliance', hotelContractCompliance);
    trackFlag('pilgrim-bus-maintenance-adherence', pilgrimBusMaintenanceAdherence);
    trackFlag('pilgrim-trip-duration', pilgrimTripDuration);
    trackFlag('pilgrim-satisfaction', pilgrimSatisfaction);
    trackFlag('meal-waste-percentage', mealWastePercentage);
    trackFlag('hospitality-staff-compliance', hospitalityStaffCompliance);
    trackFlag('hospitality-complaints', hospitalityComplaints);
    
    trackFlag('contracts-renewal-rate', contractsRenewalRate);
    trackFlag('contracts-turnaround-time', contractsTurnaroundTime);
    trackFlag('contracts-legal-disputes', contractsLegalDisputes);
    trackFlag('hajj-driver-adherence', hajjDriverAdherence);
    trackFlag('hajj-fuel-efficiency', hajjFuelEfficiency);
    trackFlag('hajj-safety-training-rate', hajjSafetyTrainingRate);
    
    trackFlag('rental-fleet-utilization', rentalFleetUtilization);
    trackFlag('rental-revenue-per-bus', rentalRevenuePerBus);
    trackFlag('rental-contract-satisfaction', rentalContractSatisfaction);
    trackFlag('rental-maintenance-adherence', rentalMaintenanceAdherence);
    trackFlag('rental-safety-compliance', rentalSafetyCompliance);
    trackFlag('rental-active-contracts', rentalActiveContracts);
    trackFlag('comp-ops-rate', 94.5);
    trackFlag('comp-violations-count', 14);
    trackFlag('comp-closure-rate', 92.8);
    trackFlag('comp-resolution-time', 3.2);
    trackFlag('comp-contract-rate', 97.5);
    trackFlag('comp-policies-rate', 95.0);
    trackFlag('comp-audit-results', 91.5);
    trackFlag('comp-critical-findings', 2);
    trackFlag('comp-monthly-rate', 94.0);
    trackFlag('comp-improvement-rate', 88.5);

    // 20 new KPIs track flags
    trackFlag('ops-d-15', opsD15);
    trackFlag('ops-d-16', opsD16);
    trackFlag('ops-d-17', opsD17);
    trackFlag('ops-d-18', opsD18);
    trackFlag('ops-d-19', opsD19);
    trackFlag('ops-d-20', opsD20);
    trackFlag('ops-d-21', opsD21);
    trackFlag('ops-d-22', opsD22);
    trackFlag('ops-d-23', opsD23);
    trackFlag('ops-d-24', opsD24);
    trackFlag('ops-d-25', opsD25);
    trackFlag('ops-d-26', opsD26);
    trackFlag('ops-d-27', opsD27);
    trackFlag('ops-d-28', opsD28);
    trackFlag('ops-d-29', opsD29);
    trackFlag('ops-d-30', opsD30);
    trackFlag('ops-d-31', opsD31);
    trackFlag('ops-d-32', opsD32);
    trackFlag('com-d-10', comD10);
    trackFlag('hse-d-15', hseD15);

    // 4. Styling individual card flags
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
        applyFlagStyle('flag-hr-saudization', 'hr-saudization', saudization);
        applyFlagStyle('flag-hr-count', 'hr-count', 1420);
        applyFlagStyle('flag-hr-growth', 'hr-growth', 8.5);
        applyFlagStyle('flag-hr-absence', 'hr-absence', 2.8);
        applyFlagStyle('flag-hr-training', 'hr-training', 24);
        applyFlagStyle('flag-hr-appraisal', 'hr-appraisal', 92);

        applyFlagStyle('flag-it-autom', 'it-autom', itAutom);
        applyFlagStyle('flag-it-uptime', 'it-uptime', 99.5);
        applyFlagStyle('flag-it-ticket-time', 'it-ticket-time', 1.5);
        applyFlagStyle('flag-it-incidents', 'it-incidents', 0);
        applyFlagStyle('flag-it-satisfaction', 'it-satisfaction', 88);
        applyFlagStyle('flag-it-backup', 'it-backup', 100);
        applyFlagStyle('flag-it-projects', 'it-projects', 90);
        
        applyFlagStyle('flag-proc-cycle', 'proc-cycle', 6);
        applyFlagStyle('flag-proc-savings', 'proc-savings', 12);
        applyFlagStyle('flag-proc-supplier', 'proc-supplier', 88);
        applyFlagStyle('flag-proc-budget', 'proc-budget', 97);
        applyFlagStyle('flag-proc-spare-parts', 'proc-spare-parts', 96);
        applyFlagStyle('flag-proc-inventory', 'proc-inventory', 98.5);
        applyFlagStyle('flag-proc-contracts', 'proc-contracts', 35);

        applyFlagStyle('flag-hse-ltifr', 'hse-ltifr', ltifr);
        applyFlagStyle('flag-hse-accidents', 'hse-accidents', accidents);
        applyFlagStyle('flag-audit-comp', 'audit-comp', auditComp);
        applyFlagStyle('flag-strat-goals', 'strat-goals', stratGoals);
        applyFlagStyle('flag-strat-init', 'strat-init', stratInit);
        applyFlagStyle('flag-risk-handling', 'risk-handling', riskHandling);
        applyFlagStyle('flag-gov-maturity', 'gov-maturity', govMaturity);
        applyFlagStyle('flag-strat-goals-achieve', 'strat-goals-achieve', stratGoalsAchieve);
        applyFlagStyle('flag-strat-milestones', 'strat-milestones', 88);
        applyFlagStyle('flag-strat-budget', 'strat-budget', 96.5);

        // Pilgrim flags
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

        // 22 new service KPIs apply flags
        applyFlagStyle('flag-visa-integration-uptime', 'visa-integration-uptime', visaIntegrationUptime);
        applyFlagStyle('flag-visa-data-error-rate', 'visa-data-error-rate', visaDataErrorRate);
        applyFlagStyle('flag-visa-complaints-rate', 'visa-complaints-rate', visaComplaintsRate);
        applyFlagStyle('flag-hotel-average-room-rate', 'hotel-average-room-rate', hotelAverageRoomRate);
        applyFlagStyle('flag-hotel-overbooking-incidents', 'hotel-overbooking-incidents', hotelOverbookingIncidents);
        applyFlagStyle('flag-hotel-contract-compliance', 'hotel-contract-compliance', hotelContractCompliance);
        applyFlagStyle('flag-pilgrim-bus-maintenance-adherence', 'pilgrim-bus-maintenance-adherence', pilgrimBusMaintenanceAdherence);
        applyFlagStyle('flag-pilgrim-trip-duration', 'pilgrim-trip-duration', pilgrimTripDuration);
        applyFlagStyle('flag-pilgrim-satisfaction', 'pilgrim-satisfaction', pilgrimSatisfaction);
        applyFlagStyle('flag-meal-waste-percentage', 'meal-waste-percentage', mealWastePercentage);
        applyFlagStyle('flag-hospitality-staff-compliance', 'hospitality-staff-compliance', hospitalityStaffCompliance);
        applyFlagStyle('flag-hospitality-complaints', 'hospitality-complaints', hospitalityComplaints);
        
        applyFlagStyle('flag-contracts-renewal-rate', 'contracts-renewal-rate', contractsRenewalRate);
        applyFlagStyle('flag-contracts-turnaround-time', 'contracts-turnaround-time', contractsTurnaroundTime);
        applyFlagStyle('flag-contracts-legal-disputes', 'contracts-legal-disputes', contractsLegalDisputes);
        applyFlagStyle('flag-hajj-driver-adherence', 'hajj-driver-adherence', hajjDriverAdherence);
        applyFlagStyle('flag-hajj-fuel-efficiency', 'hajj-fuel-efficiency', hajjFuelEfficiency);
        applyFlagStyle('flag-hajj-safety-training-rate', 'hajj-safety-training-rate', hajjSafetyTrainingRate);
        
        applyFlagStyle('flag-rental-fleet-utilization', 'rental-fleet-utilization', rentalFleetUtilization);
        applyFlagStyle('flag-rental-revenue-per-bus', 'rental-revenue-per-bus', rentalRevenuePerBus);
        applyFlagStyle('flag-rental-contract-satisfaction', 'rental-contract-satisfaction', rentalContractSatisfaction);
        applyFlagStyle('flag-rental-maintenance-adherence', 'rental-maintenance-adherence', rentalMaintenanceAdherence);
        applyFlagStyle('flag-rental-safety-compliance', 'rental-safety-compliance', rentalSafetyCompliance);
        applyFlagStyle('flag-rental-active-contracts', 'rental-active-contracts', rentalActiveContracts);
        applyFlagStyle('flag-comp-ops-rate', 'comp-ops-rate', 94.5);
        applyFlagStyle('flag-comp-violations-count', 'comp-violations-count', 14);
        applyFlagStyle('flag-comp-closure-rate', 'comp-closure-rate', 92.8);
        applyFlagStyle('flag-comp-resolution-time', 'comp-resolution-time', 3.2);
        applyFlagStyle('flag-comp-contract-rate', 'comp-contract-rate', 97.5);
        applyFlagStyle('flag-comp-policies-rate', 'comp-policies-rate', 95.0);
        applyFlagStyle('flag-comp-audit-results', 'comp-audit-results', 91.5);
        applyFlagStyle('flag-comp-critical-findings', 'comp-critical-findings', 2);
        applyFlagStyle('flag-comp-monthly-rate', 'comp-monthly-rate', 94.0);
        applyFlagStyle('flag-comp-improvement-rate', 'comp-improvement-rate', 88.5);

        // 20 new KPIs flags style apply
        applyFlagStyle('flag-ops-d-15', 'ops-d-15', opsD15);
        applyFlagStyle('flag-ops-d-16', 'ops-d-16', opsD16);
        applyFlagStyle('flag-ops-d-17', 'ops-d-17', opsD17);
        applyFlagStyle('flag-ops-d-18', 'ops-d-18', opsD18);
        applyFlagStyle('flag-ops-d-19', 'ops-d-19', opsD19);
        applyFlagStyle('flag-ops-d-20', 'ops-d-20', opsD20);
        applyFlagStyle('flag-ops-d-21', 'ops-d-21', opsD21);
        applyFlagStyle('flag-ops-d-22', 'ops-d-22', opsD22);
        applyFlagStyle('flag-ops-d-23', 'ops-d-23', opsD23);
        applyFlagStyle('flag-ops-d-24', 'ops-d-24', opsD24);
        applyFlagStyle('flag-ops-d-25', 'ops-d-25', opsD25);
        applyFlagStyle('flag-ops-d-26', 'ops-d-26', opsD26);
        applyFlagStyle('flag-ops-d-27', 'ops-d-27', opsD27);
        applyFlagStyle('flag-ops-d-28', 'ops-d-28', opsD28);
        applyFlagStyle('flag-ops-d-29', 'ops-d-29', opsD29);
        applyFlagStyle('flag-ops-d-30', 'ops-d-30', opsD30);
        applyFlagStyle('flag-ops-d-31', 'ops-d-31', opsD31);
        applyFlagStyle('flag-ops-d-32', 'ops-d-32', opsD32);
        applyFlagStyle('flag-com-d-10', 'com-d-10', comD10);
        applyFlagStyle('flag-hse-d-15', 'hse-d-15', hseD15);

        // Summary flags on overview
        applyFlagStyle('summary-flag-rev-growth', 'rev-growth', currentRevenue);
        applyFlagStyle('summary-flag-ebitda', 'ebitda', ebitda);
        applyFlagStyle('summary-flag-fleet-ready', 'fleet-ready', fleetReady);
        applyFlagStyle('summary-flag-nps', 'nps', nps);
        applyFlagStyle('summary-flag-saudization', 'saudization', saudization);
        applyFlagStyle('summary-flag-hse-accidents', 'hse-accidents', accidents);
    };
    applyFlags();

    // 5. Injecting targets inside elements
    Object.keys(kpiSettings).forEach(key => {
        const targetVal = kpiSettings[key].target;
        let unitStr = '';
        if (['rev-growth', 'cashflow'].includes(key)) {
            unitStr = isEn ? ' M' : ' مليون ر.س';
        } else if (['ops-d-15', 'ops-d-16', 'ops-d-21', 'ops-d-22', 'ops-d-23'].includes(key)) {
            unitStr = isEn ? ' mins' : ' دقيقة';
        } else if (['ops-d-29', 'hse-d-15'].includes(key)) {
            unitStr = isEn ? ' violations' : ' مخالفة';
        } else if (key === 'ops-d-20') {
            unitStr = isEn ? ' breakdowns' : ' عطل';
        } else if (['visa-processing-time', 'pilgrim-trip-duration', 'it-ticket-time', 'hr-training'].includes(key)) {
            unitStr = isEn ? ' hrs' : ' ساعة';
        } else if (key === 'contracts-turnaround-time' || key === 'proc-cycle') {
            unitStr = isEn ? ' days' : ' أيام';
        } else if (['hotel-average-room-rate', 'rental-revenue-per-bus'].includes(key)) {
            unitStr = isEn ? ' SAR' : ' ر.س';
        } else if (['new-contracts', 'hse-accidents', 'nps', 'hse-ltifr', 'visa-count', 'hotel-overbooking-incidents', 'hospitality-complaints', 'contracts-legal-disputes', 'rental-active-contracts', 'it-incidents', 'proc-contracts'].includes(key)) {
            unitStr = '';
        } else {
            unitStr = '%';
        }
        
        safeSetText(`target-val-${key}`, targetVal + unitStr);
    });

    safeSetText('target-val-rev-growth-sum', kpiSettings['rev-growth'].target + (isEn ? ' M' : ' مليون ر.س'));
    safeSetText('target-val-ebitda-sum', kpiSettings['ebitda'].target + '%');
    safeSetText('target-val-fleet-ready-sum', kpiSettings['fleet-ready'].target + '%');
    safeSetText('target-val-nps-sum', kpiSettings['nps'].target);
    safeSetText('target-val-saudization-sum', kpiSettings['saudization'].target + '%');
    safeSetText('target-val-hse-accidents-sum', kpiSettings['hse-accidents'].target);

    // Summing flags on overview panel
    safeSetText('count-excellent', flagCounter.excellent);
    safeSetText('count-good', flagCounter.good);
    safeSetText('count-bad', flagCounter.bad);
    safeSetText('count-total', flagCounter.excellent + flagCounter.good + flagCounter.bad);

    // Sector achievement percentages
    const contractsAvg = calculateSectorAvg('contracts');
    const hajjAvg = calculateSectorAvg('hajj');
    const leasingAvg = calculateSectorAvg('leasing');

    safeSetText('sector-perf-contracts', contractsAvg + '%');
    safeSetText('sector-perf-hajj', hajjAvg + '%');
    safeSetText('sector-perf-leasing', leasingAvg + '%');

    // Overall group performance average
    const overallAvg = Math.round((contractsAvg + hajjAvg + leasingAvg) / 3);
    
    safeSetText('radial-progress-val', overallAvg + '%');
    const radialPath = document.getElementById('radial-progress-path');
    if (radialPath) radialPath.setAttribute('stroke-dasharray', `${overallAvg}, 100`);

    // Ticker feeds values update
    safeSetText('ticker-total-perf', overallAvg + '%');
    safeSetText('ticker-total-perf-dup', overallAvg + '%');
    safeSetText('ticker-rev-growth', currentRevenue + ' ' + sarUnit);
    safeSetText('ticker-rev-growth-dup', currentRevenue + ' ' + sarUnit);
    safeSetText('ticker-ebitda', ebitda + '%');
    safeSetText('ticker-ebitda-dup', ebitda + '%');
    safeSetText('ticker-fleet-ready', fleetReady + '%');
    safeSetText('ticker-fleet-ready-dup', fleetReady + '%');

    if (typeof Chart !== 'undefined' && window.flagsPieChart) {
        try {
            window.flagsPieChart.data.datasets[0].data = [flagCounter.excellent, flagCounter.good, flagCounter.bad];
            window.flagsPieChart.update();
        } catch (e) { console.error(e); }
    }
};

// Bootstrap page events
document.addEventListener("DOMContentLoaded", function() {
    if (typeof AOS !== 'undefined') {
        try {
            AOS.init({ duration: 800, once: true });
        } catch (e) {
            console.warn("AOS animation library could not be loaded:", e);
        }
    }

    if (typeof Chart !== 'undefined') {
        try {
            const ctxPie = document.getElementById('doughnutFlagsChart').getContext('2d');
            window.flagsPieChart = new Chart(ctxPie, {
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

    // Hide unauthorized elements based on RBAC mapping
    const allowedDepts = window.RAWAHEL_DATA.allowedDepts;
    const isTransportationManager = window.RAWAHEL_DATA.isTransportationManager;
    const isPilgrimServicesManager = window.RAWAHEL_DATA.isPilgrimServicesManager;

    document.querySelectorAll("[onclick*='showView']").forEach(el => {
        const match = el.getAttribute('onclick').match(/showView\('([^']+)'\)/);
        if (match) {
            const viewName = match[1];
            if (viewName !== 'overview' && viewName !== 'departments') {
                let isAllowed = true;
                
                if (viewName === 'sectors' || viewName === 'transportation-sector' || viewName === 'transportation-services' || viewName === 'transportation-departments') {
                    const transDepts = ['contracts', 'hajj', 'umrah', 'leasing', 'finance', 'commercial', 'sales', 'operations', 'fleet', 'maintenance', 'storage', 'hr', 'hse', 'audit', 'pmo'];
                    const hasTransAccess = isTransportationManager || transDepts.some(d => allowedDepts.includes(d));
                    if (!hasTransAccess) isAllowed = false;
                }

                if (viewName === 'pilgrim-sector') {
                    const pilgrimDepts = ['tourism', 'visa', 'hotels', 'transport', 'hospitality'];
                    const hasPilgrimAccess = isPilgrimServicesManager || pilgrimDepts.some(d => allowedDepts.includes(d));
                    if (!hasPilgrimAccess) isAllowed = false;
                }

                const uiToDbMapping = {
                    'contracts': 'contracts',
                    'hajj': 'hajj',
                    'leasing': 'leasing',
                    'dept-finance': 'finance',
                    'dept-commercial': 'commercial',
                    'dept-sales': 'sales',
                    'dept-ops': 'operations',
                    'dept-fleet': 'fleet',
                    'dept-hr': 'hr',
                    'dept-it': 'hr',
                    'dept-procurement': 'hr',
                    'dept-hse': 'hse',
                    'dept-audit': 'audit',
                    'dept-strategy': 'pmo',
                    'dept-tourism': 'tourism',
                    'service-contracts': 'contracts',
                    'service-hajj-transport': 'hajj',
                    'service-umrah-transport': 'umrah',
                    'service-leasing': 'leasing',
                    'service-visa': 'visa',
                    'service-hotels': 'hotels',
                    'service-transport': 'transport',
                    'service-hospitality': 'hospitality'
                };

                const dbCode = uiToDbMapping[viewName];
                if (dbCode) {
                    const isPilgrimDept = ['tourism', 'visa', 'hotels', 'transport', 'hospitality'].includes(dbCode);
                    const isTransDept = ['contracts', 'hajj', 'umrah', 'leasing', 'finance', 'commercial', 'sales', 'operations', 'fleet', 'maintenance', 'storage', 'hr', 'hse', 'audit', 'pmo'].includes(dbCode);
                    
                    let hasAccess = false;
                    if (isPilgrimDept && isPilgrimServicesManager) {
                        hasAccess = true;
                    } else if (isTransDept && isTransportationManager) {
                        hasAccess = true;
                    } else if (allowedDepts.includes(dbCode)) {
                        hasAccess = true;
                    }

                    if (!hasAccess) isAllowed = false;
                }
                
                if (!isAllowed) {
                    el.style.display = 'none';
                }
            }
        }
    });

    const savedLang = localStorage.getItem('lang') || 'ar';
    if (window.applyLanguage) window.applyLanguage(savedLang);
    
    // Restore active page view on initial load using URL hash
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
        history.replaceState({ view: initialHash }, "", "#" + initialHash);
        showView(initialHash, true);
    } else {
        history.replaceState({ view: 'overview' }, "", "#overview");
        showView('overview', true);
    }
});

// Popstate listener for browser Back/Forward navigation
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.view) {
        showView(event.state.view, true);
    } else {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            showView(hash, true);
        } else {
            showView('overview', true);
        }
    }
});
