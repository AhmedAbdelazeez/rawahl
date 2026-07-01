// Specialized Transportation Sector Charts and Logic
let complianceTrendChartInstance = null;
let complianceDistributionChartInstance = null;
let shuttlePerformanceChartInstance = null;
let shuttleOccupancyChartInstance = null;
let makkahTourRevenueChartInstance = null;
let makkahTourDemographicsChartInstance = null;

function initComplianceCharts() {
    if (typeof Chart === 'undefined') return;
    const isEn = document.documentElement.lang === 'en';
    const fontName = isEn ? 'Outfit' : 'Tajawal';

    // 1. اتجاه الامتثال الشهري
    const ctx1 = document.getElementById('complianceTrendChart');
    if (ctx1) {
        if (complianceTrendChartInstance) complianceTrendChartInstance.destroy();
        complianceTrendChartInstance = new Chart(ctx1.getContext('2d'), {
            type: 'line',
            data: {
                labels: isEn ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] : ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
                datasets: [{
                    label: isEn ? 'Compliance Rate %' : 'معدل الامتثال %',
                    data: [96.0, 95.5, 94.8, 95.2, 96.5, 94.5],
                    borderColor: '#b0841a',
                    backgroundColor: 'rgba(176, 132, 26, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { font: { family: fontName, weight: 'bold' } } }
                },
                scales: {
                    y: { min: 80, max: 100, ticks: { font: { family: fontName } } },
                    x: { ticks: { font: { family: fontName } } }
                }
            }
        });
    }

    // 2. توزيع الأعلام والتقييمات
    const ctx2 = document.getElementById('complianceDistributionChart');
    if (ctx2) {
        if (complianceDistributionChartInstance) complianceDistributionChartInstance.destroy();
        complianceDistributionChartInstance = new Chart(ctx2.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: isEn ? ['Excellent 🟢', 'Good 🟡', 'Poor 🔴'] : ['ممتاز 🟢', 'جيد 🟡', 'ضعيف 🔴'],
                datasets: [{
                    data: [7, 2, 1],
                    backgroundColor: ['#10b981', '#f59e0b', '#f43f5e'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { font: { family: fontName, weight: 'bold' } }
                    }
                }
            }
        });
    }
}

function initShuttleCharts() {
    if (typeof Chart === 'undefined') return;
    const isEn = document.documentElement.lang === 'en';
    const fontName = isEn ? 'Outfit' : 'Tajawal';

    // 1. أداء الرحلات اليومية
    const ctx1 = document.getElementById('shuttlePerformanceChart');
    if (ctx1) {
        if (shuttlePerformanceChartInstance) shuttlePerformanceChartInstance.destroy();
        shuttlePerformanceChartInstance = new Chart(ctx1.getContext('2d'), {
            type: 'bar',
            data: {
                labels: isEn ? ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'] : ['اليوم 1', 'اليوم 2', 'اليوم 3', 'اليوم 4', 'اليوم 5', 'اليوم 6'],
                datasets: [{
                    label: isEn ? 'Trips Executed' : 'الرحلات المنفذة',
                    data: [1200, 1350, 1500, 1420, 1530, 1500],
                    backgroundColor: '#b0841a',
                }, {
                    label: isEn ? 'Target Trips' : 'الرحلات المستهدفة',
                    data: [1200, 1200, 1400, 1400, 1500, 1500],
                    backgroundColor: '#e2b34a',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { font: { family: fontName, weight: 'bold' } } } },
                scales: {
                    y: { ticks: { font: { family: fontName } } },
                    x: { ticks: { font: { family: fontName } } }
                }
            }
        });
    }

    // 2. معدلات الإشغال
    const ctx2 = document.getElementById('shuttleOccupancyChart');
    if (ctx2) {
        if (shuttleOccupancyChartInstance) shuttleOccupancyChartInstance.destroy();
        shuttleOccupancyChartInstance = new Chart(ctx2.getContext('2d'), {
            type: 'line',
            data: {
                labels: isEn ? ['08:00', '12:00', '16:00', '20:00', '00:00'] : ['08:00', '12:00', '16:00', '20:00', '00:00'],
                datasets: [{
                    label: isEn ? 'Occupancy Rate %' : 'معدل الإشغال %',
                    data: [75, 80, 84, 95, 88],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { font: { family: fontName, weight: 'bold' } } } },
                scales: {
                    y: { min: 50, max: 100, ticks: { font: { family: fontName } } },
                    x: { ticks: { font: { family: fontName } } }
                }
            }
        });
    }
}

function initMakkahTourCharts() {
    if (typeof Chart === 'undefined') return;
    const isEn = document.documentElement.lang === 'en';
    const fontName = isEn ? 'Outfit' : 'Tajawal';

    // 1. الإيرادات الشهرية
    const ctx1 = document.getElementById('makkahTourRevenueChart');
    if (ctx1) {
        if (makkahTourRevenueChartInstance) makkahTourRevenueChartInstance.destroy();
        makkahTourRevenueChartInstance = new Chart(ctx1.getContext('2d'), {
            type: 'line',
            data: {
                labels: isEn ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] : ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
                datasets: [{
                    label: isEn ? 'Revenue (M SAR)' : 'الإيرادات (مليون ر.س)',
                    data: [2.1, 2.5, 2.8, 3.2, 3.5, 3.6],
                    borderColor: '#b0841a',
                    backgroundColor: 'rgba(176, 132, 26, 0.1)',
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { font: { family: fontName, weight: 'bold' } } } },
                scales: {
                    y: { min: 0, ticks: { font: { family: fontName } } },
                    x: { ticks: { font: { family: fontName } } }
                }
            }
        });
    }

    // 2. جنسيات الزوار والمستفيدين
    const ctx2 = document.getElementById('makkahTourDemographicsChart');
    if (ctx2) {
        if (makkahTourDemographicsChartInstance) makkahTourDemographicsChartInstance.destroy();
        makkahTourDemographicsChartInstance = new Chart(ctx2.getContext('2d'), {
            type: 'pie',
            data: {
                labels: isEn ? ['Turkey', 'Pakistan', 'Egypt', 'Indonesia', 'Others'] : ['تركيا', 'باكستان', 'مصر', 'إندونيسيا', 'دول أخرى'],
                datasets: [{
                    data: [25, 30, 15, 20, 10],
                    backgroundColor: ['#1e293b', '#b0841a', '#e2b34a', '#8c6510', '#cbd5e1']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { font: { family: fontName, weight: 'bold' } }
                    }
                }
            }
        });
    }
}
