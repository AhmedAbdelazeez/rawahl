const API_BASE_URL = '/api/dashboard-data';
let charts = {};

// Override showView to trigger data fetching when MOHU views are opened
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.showView === 'function') {
        const originalShowView = window.showView;
        window.showView = function(viewName, isPopState) {
            originalShowView(viewName, isPopState);
            if (viewName === 'service-mohu-diversity') fetchMohuDiversity();
            else if (viewName === 'service-mohu-experience') fetchMohuExperience();
            else if (viewName === 'service-mohu-compliance') fetchMohuCompliance();
            else if (viewName === 'service-mohu-data') fetchMohuData();
        };
    }
});

// Helper to destroy old charts
function destroyChart(id) {
    if (charts[id]) {
        charts[id].destroy();
    }
}

// 1. Diversity (Groups)
async function fetchMohuDiversity() {
    try {
        const res = await fetch(`${API_BASE_URL}/mohu-groups`);
        if (!res.ok) throw new Error('API not reachable');
        const data = await res.json();

        const totalGroups = data.length;
        const totalPilgrims = data.reduce((sum, d) => sum + d.pilgrimCount, 0);
        const avgPrice = totalGroups > 0 ? data.reduce((sum, d) => sum + d.packagePrice, 0) / totalGroups : 0;
        
        const vipCount = data.filter(d => d.packageCategory === 'VIP').length;
        const ecoCount = data.filter(d => d.packageCategory === 'Economy').length;
        const vipPercent = totalGroups > 0 ? Math.round((vipCount / totalGroups) * 100) : 0;
        const ecoPercent = totalGroups > 0 ? Math.round((ecoCount / totalGroups) * 100) : 0;
        
        const newCount = data.filter(d => d.isNewPilgrim).length;
        const newPercent = totalGroups > 0 ? Math.round((newCount / totalGroups) * 100) : 0;

        // Find top nationality
        const natCounts = {};
        data.forEach(d => { natCounts[d.nationality] = (natCounts[d.nationality] || 0) + d.pilgrimCount; });
        const topNationality = Object.keys(natCounts).sort((a,b) => natCounts[b] - natCounts[a])[0] || 'غير محدد';

        document.getElementById('val-mohu-div-1').innerText = totalGroups.toLocaleString();
        document.getElementById('val-mohu-div-2').innerText = totalPilgrims.toLocaleString();
        document.getElementById('val-mohu-div-3').innerText = avgPrice.toLocaleString(undefined, {maximumFractionDigits: 2});
        document.getElementById('val-mohu-div-4').innerText = vipPercent + '%';
        document.getElementById('val-mohu-div-5').innerText = ecoPercent + '%';
        document.getElementById('val-mohu-div-6').innerText = topNationality;
        document.getElementById('val-mohu-div-7').innerText = newPercent + '%';

        if (typeof buildSectorChart === 'function') buildSectorChart('service-mohu-diversity');
    } catch(err) {
        console.error('Mohu API Error:', err);
    }
}

// 2. Experience (Feedbacks)
async function fetchMohuExperience() {
    try {
        const res = await fetch(`${API_BASE_URL}/mohu-feedbacks`);
        if (!res.ok) throw new Error('API not reachable');
        const data = await res.json();

        const totalFeedbacks = data.length;
        const avgRating = totalFeedbacks > 0 ? data.reduce((sum, d) => sum + d.rating, 0) / totalFeedbacks : 0;
        const complaintsCount = data.filter(d => d.hasComplaint).length;
        const complaintPercent = totalFeedbacks > 0 ? Math.round((complaintsCount / totalFeedbacks) * 100) : 0;
        const avgWait = totalFeedbacks > 0 ? data.reduce((sum, d) => sum + d.waitingTimeMinutes, 0) / totalFeedbacks : 0;
        
        const housingCount = data.filter(d => d.serviceType === 'Housing' || d.serviceType === 'سكن').length;
        const transportCount = data.filter(d => d.serviceType === 'Transport' || d.serviceType === 'نقل').length;
        const fiveStarCount = data.filter(d => d.rating === 5).length;
        const fiveStarPercent = totalFeedbacks > 0 ? Math.round((fiveStarCount / totalFeedbacks) * 100) : 0;

        document.getElementById('val-mohu-exp-1').innerText = totalFeedbacks.toLocaleString();
        document.getElementById('val-mohu-exp-2').innerText = avgRating.toFixed(1);
        document.getElementById('val-mohu-exp-3').innerText = complaintPercent + '%';
        document.getElementById('val-mohu-exp-4').innerText = avgWait.toFixed(1);
        document.getElementById('val-mohu-exp-5').innerText = housingCount.toLocaleString();
        document.getElementById('val-mohu-exp-6').innerText = transportCount.toLocaleString();
        document.getElementById('val-mohu-exp-7').innerText = fiveStarPercent + '%';

        if (typeof buildSectorChart === 'function') buildSectorChart('service-mohu-experience');
    } catch(err) {
        console.error('Mohu API Error:', err);
    }
}

// 3. Compliance (Violations)
async function fetchMohuCompliance() {
    try {
        const res = await fetch(`${API_BASE_URL}/mohu-violations`);
        if (!res.ok) throw new Error('API not reachable');
        const data = await res.json();

        const totalViolations = data.length;
        const totalPenalty = data.reduce((sum, d) => sum + d.penaltyAmount, 0);
        const avgPenalty = totalViolations > 0 ? totalPenalty / totalViolations : 0;
        
        const closedCount = data.filter(d => d.isClosed).length;
        const openCount = totalViolations - closedCount;
        const avgScore = totalViolations > 0 ? data.reduce((sum, d) => sum + d.committeeEvaluationScore, 0) / totalViolations : 0;
        const totalAffected = data.reduce((sum, d) => sum + d.affectedPilgrimsCount, 0);

        document.getElementById('val-mohu-comp-1').innerText = totalViolations.toLocaleString();
        document.getElementById('val-mohu-comp-2').innerText = totalPenalty.toLocaleString();
        document.getElementById('val-mohu-comp-3').innerText = avgPenalty.toLocaleString(undefined, {maximumFractionDigits: 0});
        document.getElementById('val-mohu-comp-4').innerText = closedCount.toLocaleString();
        document.getElementById('val-mohu-comp-5').innerText = openCount.toLocaleString();
        document.getElementById('val-mohu-comp-6').innerText = avgScore.toFixed(1) + '%';
        document.getElementById('val-mohu-comp-7').innerText = totalAffected.toLocaleString();

        if (typeof buildSectorChart === 'function') buildSectorChart('service-mohu-compliance');
    } catch(err) {
        console.error('Mohu API Error:', err);
    }
}

// 4. Data Quality (Permits)
async function fetchMohuData() {
    try {
        const res = await fetch(`${API_BASE_URL}/mohu-permits`);
        if (!res.ok) throw new Error('API not reachable');
        const data = await res.json();

        const totalPermits = data.length;
        const portMatchedCount = data.filter(d => d.isEntryPortMatched).length;
        const dateMatchedCount = data.filter(d => d.isEntryDateMatched).length;
        const housingMatchedCount = data.filter(d => d.isHousingMatched).length;
        
        const fullyCompliant = data.filter(d => d.isEntryPortMatched && d.isEntryDateMatched && d.isHousingMatched).length;
        const nonCompliant = totalPermits - fullyCompliant;
        
        let lastUpdate = '--';
        if(totalPermits > 0) {
            const latest = new Date(Math.max(...data.map(d => new Date(d.verificationDate))));
            lastUpdate = latest.toLocaleDateString();
        }

        document.getElementById('val-mohu-data-1').innerText = totalPermits.toLocaleString();
        document.getElementById('val-mohu-data-2').innerText = totalPermits > 0 ? Math.round((portMatchedCount/totalPermits)*100) + '%' : '0%';
        document.getElementById('val-mohu-data-3').innerText = totalPermits > 0 ? Math.round((dateMatchedCount/totalPermits)*100) + '%' : '0%';
        document.getElementById('val-mohu-data-4').innerText = totalPermits > 0 ? Math.round((housingMatchedCount/totalPermits)*100) + '%' : '0%';
        document.getElementById('val-mohu-data-5').innerText = fullyCompliant.toLocaleString();
        document.getElementById('val-mohu-data-6').innerText = nonCompliant.toLocaleString();
        document.getElementById('val-mohu-data-7').innerText = lastUpdate;

        if (typeof buildSectorChart === 'function') buildSectorChart('service-mohu-data');
    } catch(err) {
        console.error('Mohu API Error:', err);
    }
}
