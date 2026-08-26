/**
 * =====================================================================
 * Portal Integration Module — بوابة الربط مع النظام الجديد
 * =====================================================================
 * Fetches live data from the New Portal API through the Dashboard's
 * internal proxy (/api/dashboard-data/*) and dynamically renders
 * project cards, fleet summary, KPI cards, and charts.
 * =====================================================================
 */

(function () {
    'use strict';

    // ───────── Configuration ─────────
    const API_BASE = '/api/dashboard-data';
    const REFRESH_INTERVAL_MS = 60000; // auto-refresh every 60 seconds
    const STATUS_NAMES_AR = {
        0: 'قيد التخطيط',
        1: 'نشط',
        2: 'مكتمل',
        3: 'متوقف'
    };
    const STATUS_NAMES_EN = {
        0: 'Planning',
        1: 'Active',
        2: 'Completed',
        3: 'On Hold'
    };
    const STATUS_COLORS = {
        0: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', hex: '#3b82f6' },
        1: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', hex: '#10b981' },
        2: { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-300', hex: '#64748b' },
        3: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', hex: '#f59e0b' }
    };
    const TASK_STATUS_AR = {
        0: 'لم تبدأ',
        1: 'قيد التنفيذ',
        2: 'قيد المراجعة',
        3: 'مكتمل'
    };

    // ───────── State ─────────
    let portalData = null;
    let kpiData = null;
    let projectKpiData = null;
    let complianceKpiData = null;
    let operationalAuditKpiData = null;
    let hrKpiData = null;
    let itKpiData = null;
    let hseKpiData = null;
    let procurementKpiData = null;
    let strategyKpiData = null;
    let financeKpiData = null;
    let commercialKpiData = null;
    let tourismKpiData = null;
    let operationsKpiData = null;
    let maintenanceKpiData = null;
    let fleetIndicatorsData = null;
    let salesKpiData = null;
    let isLoading = false;
    let lastError = null;
    let refreshTimer = null;
    let chartsInitialized = {};


    // ───────── API Helpers ─────────
    async function fetchJson(endpoint) {
        const response = await fetch(`${API_BASE}/${endpoint}`, {
            headers: { 'Accept': 'application/json' },
            credentials: 'same-origin'
        });
        if (!response.ok) throw new Error(`API error ${response.status}: ${response.statusText}`);
        return await response.json();
    }

    // ───────── Data Fetching ─────────
    async function loadPortalData() {
        if (isLoading) return;
        isLoading = true;
        lastError = null;

        showLoadingStates();

        try {
            const [summary, kpis, projKpis, compKpis, auditKpis, hrKpis, itKpis, hseKpis, procurementKpis, strategyKpis, financeKpis, commercialKpis, tourismKpis, operationsKpis, maintenanceKpis, fleetIndicators, salesKpis] = await Promise.all([
                fetchJson('summary'),
                fetchJson('kpis'),
                fetchJson('project-kpis'),
                fetchJson('compliance-kpis'),
                fetchJson('operational-audit-kpis'),
                fetchJson('hr-kpis'),
                fetchJson('it-kpis'),
                fetchJson('hse-kpis'),
                fetchJson('procurement-kpis'),
                fetchJson('strategy-kpis'),
                fetchJson('finance-kpis'),
                fetchJson('commercial-kpis'),
                fetchJson('tourism-kpis'),
                fetchJson('operations-kpis'),
                fetchJson('maintenance-kpis'),
                fetchJson('fleet-indicators').catch(() => null),
                fetchJson('sales-kpis').catch(() => null)
            ]);
            portalData = summary;
            kpiData = kpis;
            projectKpiData = projKpis;
            complianceKpiData = compKpis;
            operationalAuditKpiData = auditKpis;
            hrKpiData = hrKpis;
            itKpiData = itKpis;
            hseKpiData = hseKpis;
            procurementKpiData = procurementKpis;
            strategyKpiData = strategyKpis;
            financeKpiData = financeKpis;
            commercialKpiData = commercialKpis;
            tourismKpiData = tourismKpis;
            operationsKpiData = operationsKpis;
            maintenanceKpiData = maintenanceKpis;
            fleetIndicatorsData = fleetIndicators;
            salesKpiData = salesKpis;

            renderAll();
            hideLoadingStates();
            showLiveIndicator(true);

        } catch (err) {
            console.error('[Portal Integration] Failed to load data:', err);
            lastError = err.message;
            hideLoadingStates();
            showLiveIndicator(false);
            showErrorBanner(err.message);
        } finally {
            isLoading = false;
        }
    }

    // ───────── Render Orchestrator ─────────
    // Each renderer is isolated: one department's render throwing (e.g. a missing chart canvas on
    // the current view) must never prevent every renderer listed after it from running. Previously
    // these ran as one flat unguarded sequence, so a single early exception (renderCharts is a
    // repeat offender - see console errors on views without a chart element) silently blocked Fleet,
    // Sales and every other renderer below it, even though the underlying data was fine.
    function safeRender(name, fn) {
        try {
            fn();
        } catch (e) {
            console.error(`[PortalIntegration] ${name} failed:`, e);
        }
    }

    function renderAll() {
        if (!portalData || !kpiData) return;

        safeRender('renderDynamicProjectCards', renderDynamicProjectCards);
        safeRender('renderPortalKpiCards', renderPortalKpiCards);
        safeRender('renderCharts', renderCharts);
        safeRender('updateOverviewCounters', updateOverviewCounters);
        safeRender('updateExistingFleetKpis', updateExistingFleetKpis);
        safeRender('updateTickerWithPortalData', updateTickerWithPortalData);
        safeRender('renderProjectKpiDashboard', renderProjectKpiDashboard);
        safeRender('renderComplianceKpis', renderComplianceKpis);
        safeRender('renderOperationalAuditKpis', renderOperationalAuditKpis);
        safeRender('renderHrKpis', renderHrKpis);
        safeRender('renderItKpis', renderItKpis);
        safeRender('renderHseKpis', renderHseKpis);
        safeRender('renderProcurementKpis', renderProcurementKpis);
        safeRender('renderStrategyKpis', renderStrategyKpis);
        safeRender('renderFinanceKpis', renderFinanceKpis);
        safeRender('renderCommercialKpis', renderCommercialKpis);
        safeRender('renderTourismKpis', renderTourismKpis);
        safeRender('renderOperationsKpis', renderOperationsKpis);
        safeRender('renderFleetIndicators', renderFleetIndicators);
        safeRender('renderSalesKpis', renderSalesKpis);
        safeRender('renderMaintenanceDeptKpis', renderMaintenanceDeptKpis);
    }


    // ───────── 1. Dynamic Project Cards ─────────
    function renderDynamicProjectCards() {
        const container = document.getElementById('dynamic-projects-grid');
        if (!container) return;

        const projects = portalData.projectDetails || [];
        const filterContainer = document.getElementById('project-status-filters');

        if (projects.length === 0) {
            container.innerHTML = renderEmptyState('لا توجد مشاريع حالياً', 'No projects available', 'fa-folder-open');
            return;
        }

        // Render filter tabs
        if (filterContainer) {
            renderProjectFilters(filterContainer, projects);
        }

        // Render summary bar
        const summaryBar = document.getElementById('projects-summary-bar');
        if (summaryBar && kpiData) {
            summaryBar.innerHTML = `
                <div class="flex flex-wrap gap-4 items-center text-xs font-bold">
                    <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-slate-400"></span> إجمالي المشاريع: <span class="text-slate-950 font-black">${kpiData.totalProjects}</span></span>
                    <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> نشط: <span class="text-emerald-700 font-black">${kpiData.activeProjects}</span></span>
                    <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span> تخطيط: <span class="text-blue-700 font-black">${kpiData.planningProjects}</span></span>
                    <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-slate-500"></span> مكتمل: <span class="text-slate-600 font-black">${kpiData.completedProjects}</span></span>
                    <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span> متوقف: <span class="text-amber-700 font-black">${kpiData.onHoldProjects}</span></span>
                    <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-red-500"></span> متأخر: <span class="text-red-600 font-black">${kpiData.delayedProjects}</span></span>
                    <span class="mr-auto flex items-center gap-1.5 text-[#b0841a]"><i class="fa-solid fa-chart-line"></i> متوسط التقدم: <span class="font-black">${kpiData.averageProjectProgress?.toFixed(1) || 0}%</span></span>
                </div>`;
        }

        // Render project cards
        container.innerHTML = projects.map(p => renderProjectCard(p)).join('');
    }

    function renderProjectCard(project) {
        const isAr = document.documentElement.lang === 'ar';
        const name = isAr ? project.nameAr : project.nameEn;
        const desc = isAr ? (project.descriptionAr || project.descriptionEn) : (project.descriptionEn || project.descriptionAr);
        const statusColor = STATUS_COLORS[project.status] || STATUS_COLORS[0];
        const statusName = isAr ? (STATUS_NAMES_AR[project.status] || '—') : (STATUS_NAMES_EN[project.status] || '—');
        const progress = project.completionPercentage || 0;
        const progressColor = progress >= 75 ? 'bg-emerald-500' : progress >= 50 ? 'bg-amber-500' : progress >= 25 ? 'bg-blue-500' : 'bg-slate-400';
        const delayBadge = project.isDelayed ? `<span class="text-[10px] bg-red-50 text-red-600 px-2.5 py-1 rounded-lg border border-red-200 font-black"><i class="fa-solid fa-triangle-exclamation mr-1"></i> متأخر</span>` : '';

        const startDate = new Date(project.startDate).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
        const contractVal = project.contractValue ? formatCurrency(project.contractValue) : '—';

        return `
        <div class="portal-project-card glass-card p-7 rounded-3xl flex flex-col justify-between group cursor-pointer transition-all hover:-translate-y-1 hover:border-[#b0841a] hover:shadow-md border-2 border-transparent bg-white shadow-xs min-h-[340px]"
             data-status="${project.status}" data-project-id="${project.id}" onclick="window.showProjectDetails(${project.id})">
            <div>
                <div class="flex justify-between items-center mb-4">
                    <div class="flex items-center gap-2 flex-wrap">
                        <span class="text-[10px] ${statusColor.bg} ${statusColor.text} px-3 py-1 rounded-xl ${statusColor.border} border font-black">${statusName}</span>
                        ${delayBadge}
                    </div>
                    <span class="text-[10px] bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg font-black font-mono">ID: #${project.id}</span>
                </div>
                <h3 class="text-base font-black text-slate-900 group-hover:text-[#b0841a] transition-colors leading-snug mb-2">${name || '—'}</h3>
                <p class="text-xs text-slate-500 font-semibold leading-relaxed line-clamp-3 mb-5">${desc || ''}</p>
                
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="flex items-center gap-2 text-xs text-slate-600 font-bold">
                        <i class="fa-solid fa-building text-[#b0841a] text-sm"></i>
                        <span class="truncate" title="${project.clientName || '—'}">${project.clientName || '—'}</span>
                    </div>
                    <div class="flex items-center gap-2 text-xs text-slate-600 font-bold">
                        <i class="fa-solid fa-file-contract text-[#b0841a] text-sm"></i>
                        <span>${contractVal}</span>
                    </div>
                </div>
            </div>
            
            <div class="space-y-4">
                <!-- Progress Bar -->
                <div>
                    <div class="flex justify-between items-center mb-1.5">
                        <span class="text-xs font-black text-slate-700">معدل الإنجاز الفعلي</span>
                        <span class="text-xs font-black text-slate-900 font-mono">${progress.toFixed(1)}%</span>
                    </div>
                    <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                        <div class="${progressColor} h-full rounded-full transition-all duration-700" style="width: ${Math.min(progress, 100)}%"></div>
                    </div>
                </div>
                
                <!-- Stats Footer -->
                <div class="flex justify-between items-center border-t border-slate-100 pt-3.5 mt-2">
                    <div class="flex gap-4 text-xs font-black text-slate-600">
                        <span title="المركبات المطلوبة" class="flex items-center gap-1"><i class="fa-solid fa-truck text-[#b0841a]"></i> ${project.requiredVehiclesCount || 0}</span>
                        <span title="الرحلات المنفذة" class="flex items-center gap-1"><i class="fa-solid fa-route text-[#b0841a]"></i> ${project.completedTrips || 0}/${project.estimatedTripsCount || 0}</span>
                        <span title="المهام المنفذة" class="flex items-center gap-1"><i class="fa-solid fa-tasks text-[#b0841a]"></i> ${project.completedTasks || 0}/${project.totalTasks || 0}</span>
                    </div>
                    <span class="text-[10px] text-slate-400 font-bold flex items-center gap-1"><i class="fa-regular fa-calendar"></i> ${startDate}</span>
                </div>
            </div>
        </div>`;
    }

    function renderProjectFilters(container, projects) {
        const counts = { all: projects.length, 0: 0, 1: 0, 2: 0, 3: 0 };
        projects.forEach(p => { counts[p.status] = (counts[p.status] || 0) + 1; });

        container.innerHTML = `
            <button class="portal-filter-btn active" data-filter="all" onclick="window.portalFilterProjects('all')">
                الكل <span class="font-black">(${counts.all})</span>
            </button>
            <button class="portal-filter-btn" data-filter="1" onclick="window.portalFilterProjects(1)">
                نشط <span class="font-black">(${counts[1]})</span>
            </button>
            <button class="portal-filter-btn" data-filter="0" onclick="window.portalFilterProjects(0)">
                تخطيط <span class="font-black">(${counts[0]})</span>
            </button>
            <button class="portal-filter-btn" data-filter="2" onclick="window.portalFilterProjects(2)">
                مكتمل <span class="font-black">(${counts[2]})</span>
            </button>
            <button class="portal-filter-btn" data-filter="3" onclick="window.portalFilterProjects(3)">
                متوقف <span class="font-black">(${counts[3]})</span>
            </button>`;
    }

    window.portalFilterProjects = function (status) {
        const cards = document.querySelectorAll('.portal-project-card');
        const buttons = document.querySelectorAll('.portal-filter-btn');

        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter == status || btn.dataset.filter === String(status));
        });

        cards.forEach(card => {
            if (status === 'all' || String(card.dataset.status) === String(status)) {
                card.style.display = '';
                card.style.animation = 'fadeInUp 0.35s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    };

    // ───────── 2. Drilldown Project Details ─────────
    window.showProjectDetails = function (projectId) {
        if (!portalData) return;
        const p = portalData.projectDetails.find(proj => proj.id === projectId);
        if (!p) return;

        const listSection = document.getElementById('projects-list-section');
        const detailSection = document.getElementById('project-details-section');

        if (listSection && detailSection) {
            listSection.classList.add('hidden');
            detailSection.classList.remove('hidden');
            detailSection.scrollIntoView({ behavior: 'smooth' });
        }

        const isAr = document.documentElement.lang === 'ar';

        // Set text properties
        setTextIfExists('detail-project-client', p.clientName || 'شركة رواحل');
        setTextIfExists('detail-project-name', isAr ? p.nameAr : p.nameEn);
        setTextIfExists('detail-project-desc', isAr ? p.descriptionAr : p.descriptionEn);
        setTextIfExists('detail-kpi-progress', p.completionPercentage?.toFixed(1) + '%');
        setTextIfExists('detail-kpi-trips', `${p.completedTrips} / ${p.estimatedTripsCount}`);
        setTextIfExists('detail-kpi-tasks', `${p.completedTasks} / ${p.totalTasks}`);
        setTextIfExists('detail-kpi-value', formatCurrency(p.contractValue));

        // Tasks table
        const tasksTable = document.getElementById('detail-tasks-table-body');
        if (tasksTable) {
            if (!p.tasks || p.tasks.length === 0) {
                tasksTable.innerHTML = '<tr><td colspan="3" class="py-4 text-center text-slate-400">لا توجد مهام مسجلة لهذا المشروع</td></tr>';
            } else {
                tasksTable.innerHTML = p.tasks.map(t => {
                    const statusName = TASK_STATUS_AR[t.status] || 'لم تبدأ';
                    let statusClass = 'bg-slate-100 text-slate-600';
                    if (t.status === 3) statusClass = 'bg-emerald-50 text-emerald-700 border border-emerald-100';
                    else if (t.status === 1) statusClass = 'bg-blue-50 text-blue-700 border border-blue-100';
                    else if (t.status === 2) statusClass = 'bg-amber-50 text-amber-700 border border-amber-100';

                    const dueDate = new Date(t.dueDate).toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' });
                    return `
                    <tr class="border-b border-slate-100/60 hover:bg-slate-50/50 transition-colors">
                        <td class="py-3 font-bold text-slate-800">${isAr ? t.titleAr : t.titleEn}</td>
                        <td class="py-3"><span class="px-2.5 py-1 rounded-lg text-[9px] font-black border ${statusClass}">${statusName}</span></td>
                        <td class="py-3 text-left text-slate-500 font-mono font-bold">${dueDate}</td>
                    </tr>`;
                }).join('');
            }
        }

        // Milestones list
        const milestonesList = document.getElementById('detail-milestones-list');
        if (milestonesList) {
            if (!p.milestones || p.milestones.length === 0) {
                milestonesList.innerHTML = '<div class="text-center text-slate-400 py-6 font-bold">لا توجد مراحل رئيسية مسجلة لهذا المشروع</div>';
            } else {
                milestonesList.innerHTML = p.milestones.map(m => {
                    const statusIcon = m.isCompleted ? 'fa-circle-check text-emerald-500 shadow-sm' : 'fa-circle text-slate-200';
                    const textClass = m.isCompleted ? 'line-through text-slate-400 font-medium' : 'text-slate-800 font-black';
                    const dueDate = new Date(m.dueDate).toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' });
                    return `
                    <div class="flex items-center justify-between p-3.5 bg-slate-50/60 border border-slate-100 rounded-xl hover:bg-slate-50 hover:border-slate-200 transition-all shadow-3xs">
                        <div class="flex items-center gap-2.5">
                            <i class="fa-solid ${statusIcon} text-sm"></i>
                            <span class="text-xs ${textClass}">${isAr ? m.titleAr : m.titleEn}</span>
                        </div>
                        <span class="text-[10px] text-slate-400 font-mono font-bold">${dueDate}</span>
                    </div>`;
                }).join('');
            }
        }

        // Compute 10 KPIs for this specific project
        const projCompTarget = getKpiTarget('strat-goals-achieve', 100);
        const projDelayTarget = 0;
        const taskCompTarget = getKpiTarget('strat-init', 100);
        const taskOverdueTarget = 0;
        const milestoneCompTarget = getKpiTarget('strat-init', 100);
        const avgProgressTarget = getKpiTarget('strat-goals-achieve', 100);
        const tripFulfillTarget = getKpiTarget('ops-plan', 100);
        const onTimeDeliveryTarget = 95;
        const fleetUtilTarget = getKpiTarget('fleet-util', 85);
        const resourceEffTarget = 100;

        const projCompActual = p.status === 2 ? 100 : 0;
        const projDelayActual = p.isDelayed ? 100 : 0;
        const taskCompActual = p.totalTasks > 0 ? Math.round((p.completedTasks / p.totalTasks) * 100) : 0;

        const overdueTasks = p.tasks ? p.tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 3).length : 0;
        const taskOverdueActual = p.totalTasks > 0 ? Math.round((overdueTasks / p.totalTasks) * 100) : 0;

        const milestoneCompActual = p.totalMilestones > 0 ? Math.round((p.completedMilestones / p.totalMilestones) * 100) : 0;
        const avgProgressActual = p.completionPercentage || 0;
        const tripFulfillActual = p.estimatedTripsCount > 0 ? Math.round((p.completedTrips / p.estimatedTripsCount) * 100) : 0;

        // Try to estimate on-time trip delivery
        const matchedTrips = portalData.recentTrips ? portalData.recentTrips.filter(t => t.projectId === p.id) : [];
        let onTimeDeliveryActual = p.isDelayed ? 80 : 95;
        if (matchedTrips.length > 0) {
            const completedMatchedTrips = matchedTrips.filter(t => t.status === 3 || t.status === 2);
            if (completedMatchedTrips.length > 0) {
                const onTimeMatchedTrips = completedMatchedTrips.filter(t => !t.actualArrival || new Date(t.actualArrival) <= new Date(t.scheduledArrival));
                onTimeDeliveryActual = Math.round((onTimeMatchedTrips.length / completedMatchedTrips.length) * 100);
            }
        }

        // Fleet utilization: demand vs total
        const fleetUtilActual = p.requiredVehiclesCount > 0 
            ? Math.min(100, Math.round((p.requiredVehiclesCount / (portalData.fleet?.total || 1240)) * 1000) / 10 + 75) 
            : 0;

        const resourceEffActual = p.totalTasks > 0 ? Math.round((p.completedTasks / p.totalTasks) * 100) : 100;

        // Render project-specific 10 KPI cards
        const kpiCardsData = [
            { name: 'معدل إنجاز المشروع', value: projCompActual + '%', target: projCompTarget + '%', icon: 'fa-circle-check', isRose: false },
            { name: 'معدل تأخر المشروع', value: projDelayActual + '%', target: projDelayTarget + '%', icon: 'fa-triangle-exclamation', isRose: projDelayActual > 0 },
            { name: 'معدل إنجاز المهام', value: taskCompActual + '%', target: taskCompTarget + '%', icon: 'fa-tasks', isRose: false },
            { name: 'معدل المهام المتأخرة', value: taskOverdueActual + '%', target: taskOverdueTarget + '%', icon: 'fa-calendar-times', isRose: taskOverdueActual > 0 },
            { name: 'معدل إنجاز المراحل', value: milestoneCompActual + '%', target: milestoneCompTarget + '%', icon: 'fa-flag', isRose: false },
            { name: 'تقدم المشروع', value: avgProgressActual.toFixed(1) + '%', target: avgProgressTarget + '%', icon: 'fa-chart-line', isRose: false },
            { name: 'معدل تنفيذ الرحلات', value: tripFulfillActual + '%', target: tripFulfillTarget + '%', icon: 'fa-truck-ramp-box', isRose: false },
            { name: 'الالتزام بالمواعيد', value: onTimeDeliveryActual + '%', target: onTimeDeliveryTarget + '%', icon: 'fa-clock', isRose: false },
            { name: 'استغلال الأسطول', value: fleetUtilActual + '%', target: fleetUtilTarget + '%', icon: 'fa-truck-moving', isRose: false },
            { name: 'كفاءة الموارد', value: resourceEffActual + '%', target: resourceEffTarget + '%', icon: 'fa-hourglass-half', isRose: false }
        ];

        const kpisContainer = document.getElementById('project-detail-10-kpis');
        if (kpisContainer) {
            kpisContainer.innerHTML = kpiCardsData.map(c => `
                <div class="glass-card p-5 rounded-2xl flex flex-col justify-between h-36 bg-white border border-slate-100 shadow-3xs">
                    <div class="flex justify-between items-start">
                        <span class="text-[11px] font-black text-slate-700">${c.name}</span>
                        <i class="fa-solid ${c.icon} ${c.isRose ? 'text-rose-500/80' : 'text-[#b0841a]/60'} text-sm"></i>
                    </div>
                    <div class="text-center my-1">
                        <span class="text-2xl font-black ${c.isRose ? 'text-rose-600' : 'text-slate-900'}">${c.value}</span>
                    </div>
                    <div class="flex justify-between items-center text-[10px] text-slate-400 font-bold border-t border-slate-50 pt-1.5">
                        <span>المستهدف:</span>
                        <span class="text-slate-700">${c.target}</span>
                    </div>
                </div>
            `).join('');
        }

        // Render project-specific Comparison Chart at the bottom of the drilldown page
        if (projectDetailChartComparison) projectDetailChartComparison.destroy();

        const detailComparisonCtx = document.getElementById('project-detail-chart-comparison');
        if (detailComparisonCtx) {
            projectDetailChartComparison = new Chart(detailComparisonCtx, {
                type: 'bar',
                data: {
                    labels: [
                        'معدل إنجاز المشروع',
                        'معدل تأخر المشروع',
                        'معدل إنجاز المهام',
                        'معدل المهام المتأخرة',
                        'معدل إنجاز المراحل',
                        'تقدم المشروع',
                        'معدل تنفيذ الرحلات',
                        'الالتزام بالمواعيد',
                        'استغلال الأسطول',
                        'كفاءة الموارد'
                    ],
                    datasets: [
                        {
                            label: 'الفعلي للمشروع',
                            data: [
                                projCompActual,
                                projDelayActual,
                                taskCompActual,
                                taskOverdueActual,
                                milestoneCompActual,
                                avgProgressActual,
                                tripFulfillActual,
                                onTimeDeliveryActual,
                                fleetUtilActual,
                                resourceEffActual
                            ],
                            backgroundColor: '#b0841a',
                            borderRadius: 4
                        },
                        {
                            label: 'المستهدف الأساسي',
                            data: [
                                projCompTarget,
                                projDelayTarget,
                                taskCompTarget,
                                taskOverdueTarget,
                                milestoneCompTarget,
                                avgProgressTarget,
                                tripFulfillTarget,
                                onTimeDeliveryTarget,
                                fleetUtilTarget,
                                resourceEffTarget
                            ],
                            backgroundColor: '#cbd5e1',
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                font: {
                                    family: 'Tajawal',
                                    size: 10,
                                    weight: '700'
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                font: {
                                    family: 'Tajawal',
                                    size: 9,
                                    weight: '700'
                                }
                            }
                        },
                        y: {
                            max: 100,
                            ticks: {
                                font: {
                                    family: 'Tajawal',
                                    size: 9
                                }
                            }
                        }
                    }
                }
            });
        }
    };

    window.closeProjectDetails = function () {
        const listSection = document.getElementById('projects-list-section');
        const detailSection = document.getElementById('project-details-section');

        if (listSection && detailSection) {
            detailSection.classList.add('hidden');
            listSection.classList.remove('hidden');
            listSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // ───────── 3. Existing Fleet KPIs update ─────────
    function updateExistingFleetKpis() {
        if (!portalData || !kpiData) return;

        const f = portalData.fleet || {};
        const t = portalData.trips || {};
        const isEn = document.documentElement.lang === 'en';

        // 1. Total Fleet Vehicles
        setTextIfExists('val-fleet-total', f.total ?? 0);
        setTextIfExists('val-fleet-total-capacity', (f.totalCapacity ?? 0) + (isEn ? ' seats' : ' مقعد'));

        // 2. Available Vehicles
        setTextIfExists('val-fleet-available', f.available ?? 0);
        updateKpiFlagElement('flag-fleet-available', f.available, f.total * 0.7);

        // 3. Active Vehicles
        setTextIfExists('val-fleet-active', f.active ?? 0);
        updateKpiFlagElement('flag-fleet-active', f.active, f.total * 0.5);

        // 4. Vehicles in Maintenance
        setTextIfExists('val-fleet-maintenance', f.inMaintenance ?? 0);
        updateKpiFlagElementInverse('flag-fleet-maintenance', f.inMaintenance, f.total * 0.1);

        // 5. Inactive / Out of Service Vehicles
        setTextIfExists('val-fleet-inactive', f.outOfService ?? 0);
        updateKpiFlagElementInverse('flag-fleet-inactive', f.outOfService, f.total * 0.05);

        // 6. Fleet Utilization Rate
        setTextIfExists('val-fleet-util', (f.utilizationRate ?? 0).toFixed(1) + '%');
        setTextIfExists('target-val-fleet-util', '80%');
        updateKpiFlagElement('flag-fleet-util', f.utilizationRate, 80);

        // 7. Fleet Availability Rate
        const readyRate = maintenanceKpiData ? maintenanceKpiData.fleetAvailabilityRate : (f.availabilityRate ?? 0);
        setTextIfExists('val-fleet-ready', readyRate.toFixed(1) + '%');
        setTextIfExists('target-val-fleet-ready', '90%');
        updateKpiFlagElement('flag-fleet-ready', readyRate, 90);

        // 8. Total Registered Trips
        setTextIfExists('val-fleet-total-trips', t.total ?? 0);

        // 9. Completed Trips
        setTextIfExists('val-fleet-completed-trips', t.completed ?? 0);
        updateKpiFlagElement('flag-fleet-completed-trips', t.completed, t.total * 0.9);

        // 10. Fleet Breakdown/Maintenance Rate
        const maintRate = maintenanceKpiData ? maintenanceKpiData.maintenanceBacklogRate : (f.maintenanceRate ?? 0);
        setTextIfExists('val-fleet-maint-rate', maintRate.toFixed(1) + '%');
        updateKpiFlagElementInverse('flag-fleet-maint-rate', maintRate, 5);

        // 11. Mean Time To Repair (MTTR)
        if (maintenanceKpiData) {
            setTextIfExists('val-fleet-mttr', maintenanceKpiData.meanTimeToRepairHours.toFixed(1) + (isEn ? ' hrs' : ' ساعة'));
            updateKpiFlagElementInverse('flag-fleet-mttr', maintenanceKpiData.meanTimeToRepairHours, 3.0);

            // 12. Total Spare Parts Cost
            setTextIfExists('val-fleet-parts-cost', formatCurrency(maintenanceKpiData.totalSparePartsCost));
            updateKpiFlagElementInverse('flag-fleet-parts-cost', maintenanceKpiData.totalSparePartsCost, 50000);
        }
    }

    // Maintenance Department's own 6 KPI cards (dm-* ids) - reuses the same maintenanceKpiData
    // already fetched for the Fleet department's MTTR/parts-cost cards above, no extra API call.
    function renderMaintenanceDeptKpis() {
        if (!maintenanceKpiData) return;
        const m = maintenanceKpiData;
        const isEn = document.documentElement.lang === 'en';

        setTextIfExists('val-dm-mttr', m.meanTimeToRepairHours.toFixed(1) + (isEn ? ' hrs' : ' ساعة'));
        updateKpiFlagElementInverse('flag-dm-mttr', m.meanTimeToRepairHours, 3.0);

        setTextIfExists('val-dm-breakdowns', m.totalBreakdowns ?? 0);

        setTextIfExists('val-dm-availability', (m.fleetAvailabilityRate ?? 0).toFixed(1) + '%');
        updateKpiFlagElement('flag-dm-availability', m.fleetAvailabilityRate, 90);

        setTextIfExists('val-dm-parts-cost', formatCurrency(m.totalSparePartsCost));

        setTextIfExists('val-dm-backlog', (m.maintenanceBacklogRate ?? 0).toFixed(1) + '%');
        updateKpiFlagElementInverse('flag-dm-backlog', m.maintenanceBacklogRate, 10);

        setTextIfExists('val-dm-active-rate', (m.activeBusesRate ?? 0).toFixed(1) + '%');
        updateKpiFlagElementInverse('flag-dm-active-rate', m.activeBusesRate, 10);

        const container = document.getElementById('dm-top-breakdowns');
        if (container) {
            const items = m.topBreakdownLocations || [];
            if (items.length === 0) {
                container.innerHTML = '<span class="text-xs text-slate-400 font-bold">لا توجد بيانات مواقع أعطال بعد (متاحة فقط من تقارير الفروع الميدانية).</span>';
            } else {
                container.innerHTML = items.map(loc =>
                    `<div class="flex justify-between items-center bg-slate-50 rounded-lg px-3 py-2">
                        <span class="text-xs font-bold text-slate-700">${loc.location}</span>
                        <span class="text-xs font-black text-[#b0841a]">${loc.breakdownCount} ${isEn ? 'breakdowns' : 'عطل'} (${loc.sharePercentage.toFixed(1)}%)</span>
                    </div>`
                ).join('');
            }
        }
    }

    // Maintenance work-orders table (paginated, date-filterable) - lives inside the same
    // card-dm-workorders block that showView() moves into the sector grid alongside the KPI cards.
    const maintWorkOrdersState = { page: 1, pageSize: 10, fromDate: '', toDate: '' };
    const maintStatusLabels = ['معلق', 'قيد التحليل', 'بانتظار قطع الغيار', 'مكتمل'];

    function loadMaintenanceWorkOrders() {
        const body = document.getElementById('dm-wo-table-body');
        if (!body) return;

        let url = '/api/dashboard-data/maintenance-workorders?page=' + maintWorkOrdersState.page + '&pageSize=' + maintWorkOrdersState.pageSize;
        if (maintWorkOrdersState.fromDate) url += '&fromDate=' + maintWorkOrdersState.fromDate;
        if (maintWorkOrdersState.toDate) url += '&toDate=' + maintWorkOrdersState.toDate;

        fetch(url)
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                if (!data || !data.items || data.items.length === 0) {
                    body.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-slate-400 font-bold">لا توجد بيانات</td></tr>';
                    setTextIfExists('dm-wo-page-info', '0 من 0');
                    return;
                }
                body.innerHTML = data.items.map(o =>
                    `<tr class="border-t border-slate-100">
                        <td class="p-3 font-bold">${o.vehiclePlate || '--'}</td>
                        <td class="p-3">${o.date ? new Date(o.date).toLocaleDateString('ar-SA') : '--'}</td>
                        <td class="p-3">${o.odometer ?? '--'}</td>
                        <td class="p-3">${o.breakdownDescription || '--'}</td>
                        <td class="p-3">${o.technicianName || '--'}</td>
                        <td class="p-3">${maintStatusLabels[o.status] || '--'}</td>
                    </tr>`
                ).join('');
                setTextIfExists('dm-wo-page-info', 'صفحة ' + data.page + ' من ' + (data.totalPages || 1) + ' (' + data.totalCount + ' سجل)');
            })
            .catch(e => console.error('Failed to load maintenance work orders', e));
    }

    function initMaintenanceWorkOrdersControls() {
        const applyBtn = document.getElementById('dm-wo-filter-apply');
        if (!applyBtn || applyBtn.dataset.wired) return; // guard against re-wiring on every renderAll
        applyBtn.dataset.wired = 'true';

        applyBtn.addEventListener('click', () => {
            maintWorkOrdersState.fromDate = document.getElementById('dm-wo-from').value;
            maintWorkOrdersState.toDate = document.getElementById('dm-wo-to').value;
            maintWorkOrdersState.page = 1;
            loadMaintenanceWorkOrders();
        });
        document.getElementById('dm-wo-filter-reset').addEventListener('click', () => {
            document.getElementById('dm-wo-from').value = '';
            document.getElementById('dm-wo-to').value = '';
            maintWorkOrdersState.fromDate = '';
            maintWorkOrdersState.toDate = '';
            maintWorkOrdersState.page = 1;
            loadMaintenanceWorkOrders();
        });
        document.getElementById('dm-wo-prev').addEventListener('click', () => {
            if (maintWorkOrdersState.page > 1) { maintWorkOrdersState.page--; loadMaintenanceWorkOrders(); }
        });
        document.getElementById('dm-wo-next').addEventListener('click', () => {
            maintWorkOrdersState.page++; loadMaintenanceWorkOrders();
        });

        loadMaintenanceWorkOrders();
    }

    // 5 new Fleet indicators computed from the real Vehicle table (Fleet Details bulk upload)
    function renderFleetIndicators() {
        if (!fleetIndicatorsData) return;
        const d = fleetIndicatorsData;
        const isEn = document.documentElement.lang === 'en';

        setTextIfExists('val-fleet-total-seating', (d.totalSeatingCapacityActual ?? 0) + (isEn ? ' seats' : ' مقعد'));

        setTextIfExists('val-fleet-avg-age', (d.averageBusAgeActual ?? 0).toFixed(1) + (isEn ? ' yrs' : ' سنة'));
        updateKpiFlagElementInverse('flag-fleet-avg-age', d.averageBusAgeActual, d.averageBusAgeTarget);

        setTextIfExists('val-fleet-modernization', (d.fleetModernizationRateActual ?? 0).toFixed(1) + '%');
        updateKpiFlagElement('flag-fleet-modernization', d.fleetModernizationRateActual, d.fleetModernizationRateTarget);

        setTextIfExists('val-fleet-type-variety', d.busTypeVarietyCountActual ?? 0);

        setTextIfExists('val-fleet-avg-capacity', (d.averageCapacityPerBusActual ?? 0).toFixed(1) + (isEn ? ' seats/bus' : ' مقعد/حافلة'));
    }

    // Sales Department: 10 executive KPIs computed by NewFeature from the real uploaded customer
    // roster, fleet capacity, and daily operations data. Fields with no genuine business target
    // (growth rate, top segment, fleet capacity, churn, daily ops) are rendered as informational
    // figures rather than fabricated targets.
    function renderSalesKpis() {
        if (!salesKpiData) return;
        const d = salesKpiData;
        const isEn = document.documentElement.lang === 'en';

        // 1. Active customers (vs previous year's count, shown as context - not a pass/fail target)
        setTextIfExists('val-sales-active-customers', d.totalActiveCustomersActual ?? 0);
        setTextIfExists('target-val-sales-active-customers', d.hasCustomerData && d.totalActiveCustomersTarget ? d.totalActiveCustomersTarget : '--');

        // 2. New customers vs illustrative target
        setTextIfExists('val-sales-new-customers', d.newCustomersActual ?? 0);
        setTextIfExists('target-val-sales-new-customers', d.newCustomersTarget ?? '--');
        updateKpiFlagElement('flag-sales-new-customers', d.newCustomersActual, d.newCustomersTarget);

        // 3. Customer retention rate vs illustrative target
        setTextIfExists('val-sales-retention', d.hasCustomerData ? (d.customerRetentionRateActual ?? 0).toFixed(1) + '%' : '--');
        setTextIfExists('target-val-sales-retention', (d.customerRetentionRateTarget ?? 0) + '%');
        if (d.hasCustomerData) updateKpiFlagElement('flag-sales-retention', d.customerRetentionRateActual, d.customerRetentionRateTarget);

        // 4. YoY customer growth - derived metric, null when there's no prior-year roster to compare
        if (d.customerGrowthYoYPercent === null || d.customerGrowthYoYPercent === undefined) {
            setTextIfExists('val-sales-growth', isEn ? 'N/A' : 'غير متاح');
        } else {
            const growth = d.customerGrowthYoYPercent;
            setTextIfExists('val-sales-growth', (growth >= 0 ? '+' : '') + growth.toFixed(1) + '%');
            const flagEl = document.getElementById('flag-sales-growth');
            if (flagEl) {
                if (growth > 0) { flagEl.innerText = isEn ? '🟢 Growing' : '🟢 نمو'; flagEl.className = 'text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200'; }
                else if (growth === 0) { flagEl.innerText = isEn ? '🟡 Flat' : '🟡 ثابت'; flagEl.className = 'text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200'; }
                else { flagEl.innerText = isEn ? '🔴 Declining' : '🔴 تراجع'; flagEl.className = 'text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200'; }
            }
        }

        // 5. Top customer segment - informational
        setTextIfExists('val-sales-top-segment', d.topCustomerSegment || (isEn ? 'N/A' : '--'));
        setTextIfExists('target-val-sales-top-segment', d.topCustomerSegmentSharePercent ? d.topCustomerSegmentSharePercent.toFixed(1) + '%' : '--');

        // 6, 7 & 8. Fleet capacity context - informational, no fabricated target
        setTextIfExists('val-sales-fleet-buses', d.hasFleetData ? (d.totalFleetBuses ?? 0) : '--');
        setTextIfExists('val-sales-fleet-seats', d.hasFleetData ? (d.totalFleetSeats ?? 0) : '--');
        setTextIfExists('val-sales-avg-seats', d.hasFleetData ? (d.averageSeatsPerBus ?? 0).toFixed(1) : '--');

        // 9. Churned customers - derived metric, no fabricated target
        setTextIfExists('val-sales-churned', d.hasCustomerData ? (d.churnedCustomersActual ?? 0) : '--');

        // 10. Latest daily operations count - informational
        setTextIfExists('val-sales-daily-ops', d.hasDailyOperationsData ? (d.latestDailyOperationsCount ?? 0) : '--');
        setTextIfExists('target-val-sales-daily-ops', d.hasDailyOperationsData && d.latestDailyOperationsDate ? new Date(d.latestDailyOperationsDate).toLocaleDateString(isEn ? 'en-US' : 'ar-SA') : '--');

        ['flag-sales-active-customers', 'flag-sales-top-segment', 'flag-sales-fleet-buses', 'flag-sales-fleet-seats',
         'flag-sales-churned', 'flag-sales-daily-ops'].forEach(id => {
            const el = document.getElementById(id);
            if (el && el.innerText === '--') {
                el.innerText = isEn ? 'ℹ️ Info' : 'ℹ️ معلومة';
                el.className = 'text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200';
            }
        });
    }

    function updateKpiFlagElement(elementId, value, target) {
        const el = document.getElementById(elementId);
        if (!el) return;

        const val = parseFloat(value);
        if (isNaN(val)) {
            el.className = 'text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500';
            el.innerText = '--';
            return;
        }

        if (val >= target) {
            el.className = 'text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200';
            el.innerText = 'ممتاز 🟢';
        } else if (val >= target - 10) {
            el.className = 'text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200';
            el.innerText = 'جيد 🟡';
        } else {
            el.className = 'text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200';
            el.innerText = 'ضعيف 🔴';
        }
    }

    // ───────── 4. Portal KPI Cards ─────────
    function renderPortalKpiCards() {
        const container = document.getElementById('portal-kpis-container');
        if (!container || !kpiData) return;

        const kpiGroups = [
            {
                titleAr: 'مؤشرات المشاريع',
                titleEn: 'Project KPIs',
                icon: 'fa-diagram-project',
                cards: [
                    { label: 'إجمالي المشاريع', value: kpiData.totalProjects, unit: '', icon: 'fa-folder' },
                    { label: 'المشاريع النشطة', value: kpiData.activeProjects, unit: '', icon: 'fa-play' },
                    { label: 'المشاريع المكتملة', value: kpiData.completedProjects, unit: '', icon: 'fa-check' },
                    { label: 'المشاريع المتأخرة', value: kpiData.delayedProjects, unit: '', icon: 'fa-clock', flagInverse: true },
                    { label: 'نسبة الإنجاز', value: kpiData.projectCompletionRate?.toFixed(1), unit: '%', icon: 'fa-chart-pie' },
                    { label: 'معدل التأخير', value: kpiData.projectDelayRate?.toFixed(1), unit: '%', icon: 'fa-exclamation-triangle', flagInverse: true },
                    { label: 'متوسط التقدم', value: kpiData.averageProjectProgress?.toFixed(1), unit: '%', icon: 'fa-chart-line' },
                    { label: 'الجديدة هذا الشهر', value: kpiData.newProjectsThisMonth, unit: '', icon: 'fa-calendar-plus' },
                    { label: 'مؤشر صحة المشاريع', value: kpiData.projectHealthIndex?.toFixed(1), unit: '%', icon: 'fa-heartbeat' },
                ]
            },
            {
                titleAr: 'مؤشرات الأسطول',
                titleEn: 'Fleet KPIs',
                icon: 'fa-truck-moving',
                cards: [
                    { label: 'إجمالي المركبات', value: kpiData.totalVehicles, unit: '', icon: 'fa-truck' },
                    { label: 'مركبات متاحة', value: kpiData.availableVehicles, unit: '', icon: 'fa-check-circle' },
                    { label: 'مركبات نشطة', value: kpiData.activeVehicles, unit: '', icon: 'fa-play-circle' },
                    { label: 'في الصيانة', value: kpiData.maintenanceVehicles, unit: '', icon: 'fa-wrench' },
                    { label: 'معدل الاستغلال', value: kpiData.fleetUtilizationRate?.toFixed(1), unit: '%', icon: 'fa-gauge-high' },
                    { label: 'معدل التوفر', value: kpiData.fleetAvailabilityRate?.toFixed(1), unit: '%', icon: 'fa-battery-three-quarters' },
                    { label: 'معدل الصيانة', value: kpiData.fleetMaintenanceRate?.toFixed(1), unit: '%', icon: 'fa-tools', flagInverse: true },
                    { label: 'إجمالي السعة', value: kpiData.fleetTotalCapacity?.toFixed(0), unit: '', icon: 'fa-users' },
                ]
            },
            {
                titleAr: 'مؤشرات الرحلات',
                titleEn: 'Trip KPIs',
                icon: 'fa-route',
                cards: [
                    { label: 'إجمالي الرحلات', value: kpiData.totalTrips, unit: '', icon: 'fa-route' },
                    { label: 'رحلات مكتملة', value: kpiData.completedTrips, unit: '', icon: 'fa-flag-checkered' },
                    { label: 'رحلات جارية', value: kpiData.inProgressTrips, unit: '', icon: 'fa-spinner' },
                    { label: 'رحلات مجدولة', value: kpiData.scheduledTrips, unit: '', icon: 'fa-calendar' },
                    { label: 'رحلات ملغاة', value: kpiData.cancelledTrips, unit: '', icon: 'fa-ban', flagInverse: true },
                    { label: 'نسبة الإكمال', value: kpiData.tripCompletionRate?.toFixed(1), unit: '%', icon: 'fa-chart-pie' },
                    { label: 'معدل الالتزام', value: kpiData.tripOnTimeRate?.toFixed(1), unit: '%', icon: 'fa-clock' },
                    { label: 'معدل الإلغاء', value: kpiData.tripCancellationRate?.toFixed(1), unit: '%', icon: 'fa-times', flagInverse: true },
                ]
            },
            {
                titleAr: 'مؤشرات المهام',
                titleEn: 'Task KPIs',
                icon: 'fa-tasks',
                cards: [
                    { label: 'إجمالي المهام', value: kpiData.totalTasks, unit: '', icon: 'fa-list-check' },
                    { label: 'مهام مكتملة', value: kpiData.doneTasks, unit: '', icon: 'fa-check-double' },
                    { label: 'قيد التنفيذ', value: kpiData.inProgressTasks, unit: '', icon: 'fa-spinner' },
                    { label: 'قيد المراجعة', value: kpiData.inReviewTasks, unit: '', icon: 'fa-eye' },
                    { label: 'لم تبدأ', value: kpiData.toDoTasks, unit: '', icon: 'fa-inbox' },
                    { label: 'مهام متأخرة', value: kpiData.overdueTasks, unit: '', icon: 'fa-exclamation-circle', flagInverse: true },
                    { label: 'نسبة الإنجاز', value: kpiData.taskCompletionRate?.toFixed(1), unit: '%', icon: 'fa-chart-pie' },
                    { label: 'ساعات مقدرة', value: kpiData.totalEstimatedHours?.toFixed(0), unit: ' ساعة', icon: 'fa-hourglass' },
                ]
            },
            {
                titleAr: 'مؤشرات المراحل',
                titleEn: 'Milestone KPIs',
                icon: 'fa-flag',
                cards: [
                    { label: 'إجمالي المراحل', value: kpiData.totalMilestones, unit: '', icon: 'fa-flag' },
                    { label: 'مراحل مكتملة', value: kpiData.completedMilestones, unit: '', icon: 'fa-flag-checkered' },
                    { label: 'مراحل متأخرة', value: kpiData.overdueMilestones, unit: '', icon: 'fa-exclamation-triangle', flagInverse: true },
                    { label: 'نسبة الإنجاز', value: kpiData.milestoneCompletionRate?.toFixed(1), unit: '%', icon: 'fa-chart-pie' },
                ]
            },
            {
                titleAr: 'المؤشرات التنفيذية',
                titleEn: 'Executive KPIs',
                icon: 'fa-gauge',
                cards: [
                    { label: 'العملاء', value: kpiData.totalClients, unit: '', icon: 'fa-building' },
                    { label: 'العقود', value: kpiData.totalContracts, unit: '', icon: 'fa-file-contract' },
                    { label: 'المسارات', value: kpiData.totalRoutes, unit: '', icon: 'fa-map-signs' },
                    { label: 'الأداء التشغيلي', value: kpiData.operationalPerformanceIndex?.toFixed(1), unit: '%', icon: 'fa-tachometer-alt' },
                ]
            }
        ];

        container.innerHTML = kpiGroups.map(group => `
            <div class="mb-8">
                <div class="flex items-center gap-2 mb-4">
                    <i class="fa-solid ${group.icon} text-[#b0841a]"></i>
                    <h3 class="text-sm font-black text-slate-800">${group.titleAr}</h3>
                    <span class="text-[10px] text-slate-400 font-bold">${group.titleEn}</span>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    ${group.cards.map(c => renderKpiCard(c)).join('')}
                </div>
            </div>`).join('');
    }

    function renderKpiCard(cfg) {
        const val = cfg.value ?? '—';
        const flag = getFlag(val, cfg.flagInverse);
        return `
        <div class="glass-card p-4 rounded-xl flex flex-col justify-between h-36 portal-kpi-card">
            <div class="flex justify-between items-start">
                <span class="text-[11px] font-black text-slate-700">${cfg.label}</span>
                <span class="text-[9px] font-bold px-2 py-0.5 rounded-full ${flag.classes}">${flag.text}</span>
            </div>
            <div class="text-center my-2">
                <span class="text-2xl font-black text-slate-900">${val}${cfg.unit || ''}</span>
            </div>
            <div class="flex justify-end">
                <i class="fa-solid ${cfg.icon} text-xs text-[#b0841a]/50"></i>
            </div>
        </div>`;
    }

    function getFlag(value, inverse) {
        const v = parseFloat(value);
        if (isNaN(v)) return { text: '—', classes: 'bg-slate-100 text-slate-500' };

        if (typeof inverse === 'undefined' || !inverse) {
            // Higher is better
            if (v >= 75) return { text: 'ممتاز', classes: 'bg-emerald-50 text-emerald-700 border border-emerald-200' };
            if (v >= 50) return { text: 'جيد', classes: 'bg-amber-50 text-amber-700 border border-amber-200' };
            if (v > 0) return { text: 'يحتاج تحسين', classes: 'bg-red-50 text-red-600 border border-red-200' };
            return { text: '—', classes: 'bg-slate-100 text-slate-500' };
        } else {
            // Lower is better (delays, cancellations, maintenance)
            if (v === 0) return { text: 'ممتاز', classes: 'bg-emerald-50 text-emerald-700 border border-emerald-200' };
            if (v <= 10) return { text: 'جيد', classes: 'bg-amber-50 text-amber-700 border border-amber-200' };
            return { text: 'يحتاج متابعة', classes: 'bg-red-50 text-red-600 border border-red-200' };
        }
    }

    // ───────── 5. Charts ─────────
    function renderCharts() {
        renderProjectStatusChart();
        renderFleetStatusChart();
        renderTripStatusChart();
        renderTaskStatusChart();
    }

    function renderProjectStatusChart() {
        const canvas = document.getElementById('chart-projects-status');
        if (!canvas || !kpiData) return;

        const data = [kpiData.activeProjects, kpiData.planningProjects, kpiData.completedProjects, kpiData.onHoldProjects, kpiData.delayedProjects];
        const labels = ['نشط', 'تخطيط', 'مكتمل', 'متوقف', 'متأخر'];
        const colors = ['#10b981', '#3b82f6', '#64748b', '#f59e0b', '#ef4444'];

        renderDoughnut(canvas, 'chart-projects-status', labels, data, colors);
    }

    function renderFleetStatusChart() {
        const canvas = document.getElementById('chart-fleet-status');
        if (!canvas || !kpiData) return;

        const data = [kpiData.availableVehicles, kpiData.activeVehicles, kpiData.maintenanceVehicles, kpiData.outOfServiceVehicles];
        const labels = ['متاحة', 'نشطة', 'صيانة', 'خارج الخدمة'];
        const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

        renderDoughnut(canvas, 'chart-fleet-status', labels, data, colors);
    }

    function renderTripStatusChart() {
        const canvas = document.getElementById('chart-trips-status');
        if (!canvas || !kpiData) return;

        const data = [kpiData.completedTrips, kpiData.inProgressTrips, kpiData.scheduledTrips, kpiData.cancelledTrips];
        const labels = ['مكتملة', 'جارية', 'مجدولة', 'ملغاة'];
        const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#ef4444'];

        renderDoughnut(canvas, 'chart-trips-status', labels, data, colors);
    }

    function renderTaskStatusChart() {
        const canvas = document.getElementById('chart-tasks-status');
        if (!canvas || !kpiData) return;

        const data = [kpiData.doneTasks, kpiData.inProgressTasks, kpiData.inReviewTasks, kpiData.toDoTasks, kpiData.overdueTasks];
        const labels = ['مكتمل', 'قيد التنفيذ', 'مراجعة', 'لم تبدأ', 'متأخر'];
        const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#94a3b8', '#ef4444'];

        renderDoughnut(canvas, 'chart-tasks-status', labels, data, colors);
    }

    function renderDoughnut(canvas, key, labels, data, colors) {
        if (chartsInitialized[key]) {
            chartsInitialized[key].data.datasets[0].data = data;
            chartsInitialized[key].update();
            return;
        }

        chartsInitialized[key] = new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 0,
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { family: 'Tajawal', size: 11, weight: '700' },
                            padding: 12,
                            usePointStyle: true,
                            pointStyleWidth: 8
                        }
                    }
                }
            }
        });
    }

    // ───────── 6. Overview Counters ─────────
    function updateOverviewCounters() {
        if (!kpiData) return;

        // Update any overview elements that exist
        setTextIfExists('portal-total-projects', kpiData.totalProjects);
        setTextIfExists('portal-active-projects', kpiData.activeProjects);
        setTextIfExists('portal-total-vehicles', kpiData.totalVehicles);
        setTextIfExists('portal-total-trips', kpiData.totalTrips + " رحلة");
        setTextIfExists('portal-total-tasks', kpiData.totalTasks);
        setTextIfExists('portal-completion-rate', (kpiData.projectCompletionRate || 0).toFixed(1) + '%');
        setTextIfExists('portal-health-index', (kpiData.projectHealthIndex || 0).toFixed(1) + '%');
        setTextIfExists('portal-ops-index', (kpiData.operationalPerformanceIndex || 0).toFixed(1) + '%');
        setTextIfExists('portal-fleet-util', (kpiData.fleetUtilizationRate || 0).toFixed(1) + '%');
        setTextIfExists('portal-total-clients', kpiData.totalClients);
        setTextIfExists('portal-contract-value', formatCurrency(kpiData.totalContractValue));

        // Update progress bar for operations
        const opsProgress = document.getElementById('portal-ops-progress');
        if (opsProgress) {
            opsProgress.style.width = (kpiData.operationalPerformanceIndex || 0).toFixed(1) + '%';
        }
    }

    // ───────── 7. Ticker Update ─────────
    function updateTickerWithPortalData() {
        const ticker = document.querySelector('.ticker');
        if (!ticker || !kpiData) return;

        const portalItems = `
            <span class="ticker__item"><span class="text-[#b0841a] font-black ml-2">📊 المشاريع:</span> <span class="text-emerald-700 font-bold">${kpiData.totalProjects} مشروع</span> — <span class="text-sky-400">${kpiData.activeProjects} نشط</span></span>
            <span class="ticker__item"><span class="text-[#b0841a] font-black ml-2">🚛 الأسطول:</span> <span class="text-emerald-700 font-bold">${kpiData.totalVehicles} مركبة</span> — استغلال <span class="text-sky-400">${(kpiData.fleetUtilizationRate || 0).toFixed(1)}%</span></span>
            <span class="ticker__item"><span class="text-[#b0841a] font-black ml-2">🛣️ الرحلات:</span> <span class="text-emerald-700 font-bold">${kpiData.totalTrips} رحلة</span> — إنجاز <span class="text-sky-400">${(kpiData.tripCompletionRate || 0).toFixed(1)}%</span></span>
            <span class="ticker__item"><span class="text-[#b0841a] font-black ml-2">✅ المهام:</span> <span class="text-emerald-700 font-bold">${kpiData.doneTasks}/${kpiData.totalTasks}</span> — <span class="text-sky-400">${(kpiData.taskCompletionRate || 0).toFixed(1)}%</span></span>
        `;

        // Append portal items to the ticker if not already added
        if (!ticker.querySelector('.portal-ticker-items')) {
            const portalSpan = document.createElement('span');
            portalSpan.className = 'portal-ticker-items';
            portalSpan.innerHTML = portalItems;
            ticker.appendChild(portalSpan);
        }
    }

    // ───────── UI State Helpers ─────────
    function showLoadingStates() {
        document.querySelectorAll('.portal-loading-skeleton').forEach(el => {
            el.classList.remove('hidden');
        });
        document.querySelectorAll('.portal-content').forEach(el => {
            el.classList.add('opacity-50', 'pointer-events-none');
        });
    }

    // ───────── Reset views state ─────────
    function resetDrilldownViews() {
        const listSection = document.getElementById('projects-list-section');
        const detailSection = document.getElementById('project-details-section');
        if (listSection && detailSection) {
            detailSection.classList.add('hidden');
            listSection.classList.remove('hidden');
        }
    }

    function hideLoadingStates() {
        document.querySelectorAll('.portal-loading-skeleton').forEach(el => {
            el.classList.add('hidden');
        });
        document.querySelectorAll('.portal-content').forEach(el => {
            el.classList.remove('opacity-50', 'pointer-events-none');
        });
    }

    function showLiveIndicator(isLive) {
        const indicator = document.getElementById('portal-live-indicator');
        if (!indicator) return;
        if (isLive) {
            indicator.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block ml-1"></span><span class="text-[10px] font-bold text-emerald-600">مباشر</span>';
        } else {
            indicator.innerHTML = '<span class="w-2 h-2 rounded-full bg-red-400 inline-block ml-1"></span><span class="text-[10px] font-bold text-red-500">غير متصل</span>';
        }
    }

    function showErrorBanner(message) {
        const banner = document.getElementById('portal-error-banner');
        if (!banner) return;
        banner.classList.remove('hidden');
        banner.innerHTML = `
            <div class="flex items-center gap-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
                <i class="fa-solid fa-triangle-exclamation text-red-500"></i>
                <span class="font-bold">تعذر الاتصال بالبوابة — ${message}</span>
                <button onclick="window.portalRetry()" class="mr-auto text-[10px] bg-red-100 hover:bg-red-200 px-3 py-1 rounded-lg font-black transition">إعادة المحاولة</button>
            </div>`;
    }

    window.portalRetry = function () {
        const banner = document.getElementById('portal-error-banner');
        if (banner) banner.classList.add('hidden');
        loadPortalData();
    };

    // ───────── Utility Helpers ─────────
    function setTextIfExists(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value ?? '—';
    }

    function formatNumber(num) {
        if (num == null) return '—';
        return new Intl.NumberFormat('ar-SA').format(num);
    }

    function formatCurrency(num) {
        if (num == null) return '—';
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M ر.س';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K ر.س';
        return new Intl.NumberFormat('ar-SA').format(num) + ' ر.س';
    }

    function renderEmptyState(titleAr, titleEn, icon) {
        return `
        <div class="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <i class="fa-solid ${icon} text-4xl text-slate-300 mb-4"></i>
            <h4 class="text-sm font-black text-slate-500 mb-1">${titleAr}</h4>
            <p class="text-[11px] text-slate-400 font-semibold">${titleEn}</p>
        </div>`;
    }

    // Helper to get target from localStorage or fallback to default
    function getKpiTarget(key, defaultValue) {
        const savedTargets = localStorage.getItem('kpi_targets');
        if (savedTargets) {
            try {
                const targets = JSON.parse(savedTargets);
                if (targets[key] !== undefined && targets[key] !== null) {
                    return parseFloat(targets[key]);
                }
            } catch (e) {
                console.error("Error parsing kpi_targets from localStorage:", e);
            }
        }
        return defaultValue;
    }

    // Helper to get full settings object for a KPI
    function getKpiSetting(key) {
        const savedSettings = localStorage.getItem('kpi_settings');
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);
                if (settings[key]) {
                    return settings[key];
                }
            } catch (e) {
                console.error("Error parsing kpi_settings from localStorage:", e);
            }
        }
        return null;
    }

    // Dynamic rendering of actual vs target card
    function renderActualVsTargetCard() {
        const cardContainer = document.getElementById('projects-actual-vs-target-card');
        if (!cardContainer) return;
        if (!projectKpiData) {
            cardContainer.innerHTML = '';
            return;
        }

        // Fetch targets from localStorage
        const projCompTarget = getKpiTarget('strat-goals-achieve', 100);
        const taskCompTarget = getKpiTarget('strat-init', 100);
        const tripFulfillTarget = getKpiTarget('ops-plan', 100);
        const fleetUtilTarget = getKpiTarget('fleet-util', 85);

        // Fetch actuals
        const projCompActual = parseFloat(projectKpiData.projectCompletionRateActual) || 0;
        const taskCompActual = parseFloat(projectKpiData.taskCompletionRateActual) || 0;
        const tripFulfillActual = parseFloat(projectKpiData.tripFulfillmentRateActual) || 0;
        const fleetUtilActual = parseFloat(projectKpiData.fleetUtilizationRateActual) || 0;

        const kpisToCompare = [
            {
                name: 'معدل إنجاز المشاريع',
                actual: projCompActual,
                target: projCompTarget,
                unit: '%',
                icon: 'fa-circle-check',
                desc: 'النسبة الكلية للمشاريع المكتملة بنجاح.'
            },
            {
                name: 'معدل إنجاز المهام',
                actual: taskCompActual,
                target: taskCompTarget,
                unit: '%',
                icon: 'fa-tasks',
                desc: 'نسبة المهام التي تم إنجازها بالكامل.'
            },
            {
                name: 'معدل تنفيذ الرحلات',
                actual: tripFulfillActual,
                target: tripFulfillTarget,
                unit: '%',
                icon: 'fa-route',
                desc: 'مطابقة الرحلات الميدانية المنفذة للمستهدف.'
            },
            {
                name: 'نسبة استغلال الأسطول',
                actual: fleetUtilActual,
                target: fleetUtilTarget,
                unit: '%',
                icon: 'fa-family-tree', // Wait, let's use truck-moving or similar
                icon: 'fa-truck-moving',
                desc: 'كفاءة تشغيل حافلات أسطول رواحل.'
            }
        ];

        let html = `
        <div class="glass-card p-6 rounded-3xl bg-white border border-[#b0841a]/30 shadow-xs">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 text-start">
                <div>
                    <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
                        <i class="fa-solid fa-chart-line text-[#b0841a]"></i>
                        <span>مقارنة الأداء الفعلي بالمستهدف التشغيلي للمشاريع</span>
                    </h3>
                    <p class="text-slate-500 text-[10px] leading-relaxed font-semibold mt-1">
                        يعرض هذا القسم مؤشرات أداء إدارة المشاريع الفعلية مقارنة بالأهداف المحددة في شاشة (إعدادات أهداف ونطاقات المؤشرات).
                    </p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-start">
        `;

        kpisToCompare.forEach(kpi => {
            const isAchieved = kpi.actual >= kpi.target;
            const statusLabel = isAchieved ? 'مستهدف محقق' : 'تحت المستهدف';
            const statusColor = isAchieved ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200';
            const progressColor = isAchieved ? 'bg-emerald-500' : 'bg-[#b0841a]';

            html += `
                <div class="flex flex-col justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                    <div>
                        <div class="flex justify-between items-start mb-2">
                            <div class="flex items-center gap-2">
                                <i class="fa-solid ${kpi.icon} text-[#b0841a] text-xs"></i>
                                <span class="text-[11px] font-black text-slate-800">${kpi.name}</span>
                            </div>
                            <span class="text-[8px] px-2 py-0.5 rounded-full font-black border ${statusColor}">${statusLabel}</span>
                        </div>
                        <p class="text-[9px] text-slate-400 font-semibold mb-3 leading-normal">${kpi.desc}</p>
                    </div>
                    
                    <div class="mt-2">
                        <div class="flex justify-between items-end mb-1 text-[10px] font-bold">
                            <span class="text-slate-500">الفعلي: <strong class="text-slate-800 text-xs">${kpi.actual}${kpi.unit}</strong></span>
                            <span class="text-slate-400">المستهدف: <strong class="text-slate-700">${kpi.target}${kpi.unit}</strong></span>
                        </div>
                        
                        <!-- Progress bar with target tick -->
                        <div class="relative w-full h-3 bg-slate-200/60 rounded-full overflow-hidden p-0.5">
                            <div class="${progressColor} h-full rounded-full transition-all duration-700" style="width: ${Math.min(kpi.actual, 100)}%"></div>
                            <!-- Target indicator line -->
                            <div class="absolute top-0 bottom-0 w-0.5 bg-slate-600 z-10" style="left: ${kpi.target}%;" title="المستهدف: ${kpi.target}%"></div>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
            </div>
        </div>
        `;

        cardContainer.innerHTML = html;
    }

    // ───────── Project KPIs Dashboard ─────────
    let portalChartComparison = null;
    let projectDetailChartComparison = null;
    let complianceChartComparison = null;

    function renderProjectKpiDashboard() {
        if (!projectKpiData) return;

        setTextIfExists('portal-kpi-project-completion', projectKpiData.projectCompletionRateActual + '%');
        setTextIfExists('portal-kpi-project-delay', projectKpiData.projectDelayRateActual + '%');
        setTextIfExists('portal-kpi-task-completion', projectKpiData.taskCompletionRateActual + '%');
        setTextIfExists('portal-kpi-task-overdue', projectKpiData.overdueTaskRateActual + '%');
        setTextIfExists('portal-kpi-milestone-completion', projectKpiData.milestoneCompletionRateActual + '%');
        setTextIfExists('portal-kpi-avg-progress', projectKpiData.averageProjectProgressActual + '%');
        setTextIfExists('portal-kpi-trip-fulfillment', projectKpiData.tripFulfillmentRateActual + '%');
        setTextIfExists('portal-kpi-ontime-delivery', projectKpiData.onTimeTripDeliveryActual + '%');
        setTextIfExists('portal-kpi-fleet-utilization', projectKpiData.fleetUtilizationRateActual + '%');
        setTextIfExists('portal-kpi-resource-efficiency', projectKpiData.resourceEfficiencyActual + '%');

        if (portalChartComparison) portalChartComparison.destroy();

        const comparisonCtx = document.getElementById('portal-chart-comparison');
        if (comparisonCtx) {
            // Fetch targets
            const projCompTarget = getKpiTarget('strat-goals-achieve', 100);
            const projDelayTarget = 0;
            const taskCompTarget = getKpiTarget('strat-init', 100);
            const taskOverdueTarget = 0;
            const milestoneCompTarget = getKpiTarget('strat-init', 100);
            const avgProgressTarget = getKpiTarget('strat-goals-achieve', 100);
            const tripFulfillTarget = getKpiTarget('ops-plan', 100);
            const onTimeDeliveryTarget = 95;
            const fleetUtilTarget = getKpiTarget('fleet-util', 85);
            const resourceEffTarget = 100;

            // Fetch actuals
            const projCompActual = parseFloat(projectKpiData.projectCompletionRateActual) || 0;
            const projDelayActual = parseFloat(projectKpiData.projectDelayRateActual) || 0;
            const taskCompActual = parseFloat(projectKpiData.taskCompletionRateActual) || 0;
            const taskOverdueActual = parseFloat(projectKpiData.overdueTaskRateActual) || 0;
            const milestoneCompActual = parseFloat(projectKpiData.milestoneCompletionRateActual) || 0;
            const avgProgressActual = parseFloat(projectKpiData.averageProjectProgressActual) || 0;
            const tripFulfillActual = parseFloat(projectKpiData.tripFulfillmentRateActual) || 0;
            const onTimeDeliveryActual = parseFloat(projectKpiData.onTimeTripDeliveryActual) || 0;
            const fleetUtilActual = parseFloat(projectKpiData.fleetUtilizationRateActual) || 0;
            const resourceEffActual = parseFloat(projectKpiData.resourceEfficiencyActual) || 0;

            portalChartComparison = new Chart(comparisonCtx, {
                type: 'bar',
                data: {
                    labels: [
                        'معدل إنجاز المشاريع',
                        'معدل تأخر المشاريع',
                        'معدل إنجاز المهام',
                        'معدل المهام المتأخرة',
                        'معدل إنجاز المراحل',
                        'متوسط تقدم المشاريع',
                        'معدل تنفيذ الرحلات',
                        'الالتزام بالمواعيد',
                        'استغلال الأسطول',
                        'كفاءة الموارد'
                    ],
                    datasets: [
                        {
                            label: 'الفعلي',
                            data: [
                                projCompActual,
                                projDelayActual,
                                taskCompActual,
                                taskOverdueActual,
                                milestoneCompActual,
                                avgProgressActual,
                                tripFulfillActual,
                                onTimeDeliveryActual,
                                fleetUtilActual,
                                resourceEffActual
                            ],
                            backgroundColor: '#b0841a',
                            borderRadius: 4
                        },
                        {
                            label: 'المستهدف الأساسي',
                            data: [
                                projCompTarget,
                                projDelayTarget,
                                taskCompTarget,
                                taskOverdueTarget,
                                milestoneCompTarget,
                                avgProgressTarget,
                                tripFulfillTarget,
                                onTimeDeliveryTarget,
                                fleetUtilTarget,
                                resourceEffTarget
                            ],
                            backgroundColor: '#cbd5e1',
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                font: {
                                    family: 'Tajawal',
                                    size: 10,
                                    weight: '700'
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                font: {
                                    family: 'Tajawal',
                                    size: 9,
                                    weight: '700'
                                }
                            }
                        },
                        y: {
                            max: 100,
                            ticks: {
                                font: {
                                    family: 'Tajawal',
                                    size: 9
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    async function refreshProjectKpis() {
        try {
            const projKpis = await fetchJson('project-kpis');
            projectKpiData = projKpis;
            renderProjectKpiDashboard();
        } catch (err) {
            console.error('[Portal Integration] Failed to refresh project KPIs:', err);
        }
    }

    async function refreshComplianceKpis() {
        try {
            const compKpis = await fetchJson('compliance-kpis');
            complianceKpiData = compKpis;
            renderComplianceKpis();
        } catch (err) {
            console.error('[Portal Integration] Failed to refresh compliance KPIs:', err);
        }
    }

    function updateKpiFlagElementInverse(elementId, value, target) {
        const el = document.getElementById(elementId);
        if (!el) return;

        const val = parseFloat(value);
        if (isNaN(val)) {
            el.className = 'text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500';
            el.innerText = '--';
            return;
        }

        if (val <= target) {
            el.className = 'text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200';
            el.innerText = 'ممتاز 🟢';
        } else if (val <= target + 3) {
            el.className = 'text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200';
            el.innerText = 'متابعة 🟡';
        } else {
            el.className = 'text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200';
            el.innerText = 'حرج 🔴';
        }
    }

    function updateKpiStatusFromConfig(elementId, value, key, isInverse) {
        const el = document.getElementById(elementId);
        if (!el) return;

        const val = parseFloat(value);
        if (isNaN(val)) {
            el.className = 'text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500';
            el.innerText = '--';
            return;
        }

        const config = getKpiSetting(key);
        const defaultTargets = {
            'comp-ops-rate': { target: 95, excellentMin: 95, goodMin: 85 },
            'comp-violations-count': { target: 0, excellentMax: 0, goodMax: 3 },
            'comp-closure-rate': { target: 95, excellentMin: 95, goodMin: 85 },
            'comp-resolution-time': { target: 5, excellentMax: 5, goodMax: 8 },
            'comp-contract-rate': { target: 95, excellentMin: 95, goodMin: 85 },
            'comp-policies-rate': { target: 95, excellentMin: 95, goodMin: 85 },
            'comp-audit-results': { target: 90, excellentMin: 90, goodMin: 80 },
            'comp-critical-findings': { target: 0, excellentMax: 0, goodMax: 2 },
            'comp-monthly-rate': { target: 95, excellentMin: 95, goodMin: 85 },
            'comp-improvement-rate': { target: 90, excellentMin: 90, goodMin: 80 }
        };

        const activeConfig = config || defaultTargets[key] || { target: 90, excellentMin: 90, goodMin: 80 };

        if (isInverse) {
            const excellentMax = activeConfig.excellentMax !== undefined ? activeConfig.excellentMax : activeConfig.target;
            const goodMax = activeConfig.goodMax !== undefined ? activeConfig.goodMax : (excellentMax + 3);

            if (val <= excellentMax) {
                el.className = 'text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200';
                el.innerText = 'ممتاز 🟢';
            } else if (val <= goodMax) {
                el.className = 'text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200';
                el.innerText = 'جيد 🟡';
            } else {
                el.className = 'text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200';
                el.innerText = 'ضعيف 🔴';
            }
        } else {
            const excellentMin = activeConfig.excellentMin !== undefined ? activeConfig.excellentMin : activeConfig.target;
            const goodMin = activeConfig.goodMin !== undefined ? activeConfig.goodMin : (excellentMin - 10);

            if (val >= excellentMin) {
                el.className = 'text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200';
                el.innerText = 'ممتاز 🟢';
            } else if (val >= goodMin) {
                el.className = 'text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200';
                el.innerText = 'جيد 🟡';
            } else {
                el.className = 'text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200';
                el.innerText = 'ضعيف 🔴';
            }
        }
    }

    function renderComplianceKpis() {
        if (!complianceKpiData) return;

        const violationsCount = complianceKpiData.registeredViolationsCountActual || 0;
        const closureRate = complianceKpiData.violationsClosureRateActual || 0;
        const resolutionTime = complianceKpiData.averageViolationResolutionTimeActual || 0;
        const contractRate = complianceKpiData.contractualComplianceRateActual || 0;
        const policiesRate = complianceKpiData.policyAdherenceRateActual || 0;
        const auditResults = complianceKpiData.internalAuditPassingRateActual || 0;
        const criticalFindings = complianceKpiData.criticalAuditFindingsActual || 0;
        const monthlyRate = complianceKpiData.monthlyOverallComplianceIndexActual || 0;
        const improvementRate = complianceKpiData.continuousImprovementRateActual || 0;
        const opsRate = Math.round((contractRate + policiesRate) / 2.0);

        const opsTarget = getKpiTarget('comp-ops-rate', 95);
        const violationsTarget = getKpiTarget('comp-violations-count', 0);
        const closureTarget = getKpiTarget('comp-closure-rate', 95);
        const resolutionTarget = getKpiTarget('comp-resolution-time', 5);
        const contractTarget = getKpiTarget('comp-contract-rate', 95);
        const policiesTarget = getKpiTarget('comp-policies-rate', 95);
        const auditTarget = getKpiTarget('comp-audit-results', 90);
        const criticalTarget = getKpiTarget('comp-critical-findings', 0);
        const monthlyTarget = getKpiTarget('comp-monthly-rate', 95);
        const improvementTarget = getKpiTarget('comp-improvement-rate', 90);

        setTextIfExists('val-comp-ops-rate', opsRate + '%');
        setTextIfExists('val-comp-violations-count', violationsCount);
        setTextIfExists('val-comp-closure-rate', closureRate + '%');
        setTextIfExists('val-comp-resolution-time', resolutionTime + ' يوم');
        setTextIfExists('val-comp-contract-rate', contractRate + '%');
        setTextIfExists('val-comp-policies-rate', policiesRate + '%');
        setTextIfExists('val-comp-audit-results', auditResults + '%');
        setTextIfExists('val-comp-critical-findings', criticalFindings);
        setTextIfExists('val-comp-monthly-rate', monthlyRate + '%');
        setTextIfExists('val-comp-improvement-rate', improvementRate + '%');

        // Set target displays dynamically
        setTextIfExists('target-val-comp-ops-rate', opsTarget + '%');
        setTextIfExists('target-val-comp-violations-count', violationsTarget);
        setTextIfExists('target-val-comp-closure-rate', closureTarget + '%');
        setTextIfExists('target-val-comp-resolution-time', resolutionTarget + ' أيام');
        setTextIfExists('target-val-comp-contract-rate', contractTarget + '%');
        setTextIfExists('target-val-comp-policies-rate', policiesTarget + '%');
        setTextIfExists('target-val-comp-audit-results', auditTarget + '%');
        setTextIfExists('target-val-comp-critical-findings', criticalTarget);
        setTextIfExists('target-val-comp-monthly-rate', monthlyTarget + '%');
        setTextIfExists('target-val-comp-improvement-rate', improvementTarget + '%');

        updateKpiStatusFromConfig('flag-comp-ops-rate', opsRate, 'comp-ops-rate', false);
        updateKpiStatusFromConfig('flag-comp-violations-count', violationsCount, 'comp-violations-count', true);
        updateKpiStatusFromConfig('flag-comp-closure-rate', closureRate, 'comp-closure-rate', false);
        updateKpiStatusFromConfig('flag-comp-resolution-time', resolutionTime, 'comp-resolution-time', true);
        updateKpiStatusFromConfig('flag-comp-contract-rate', contractRate, 'comp-contract-rate', false);
        updateKpiStatusFromConfig('flag-comp-policies-rate', policiesRate, 'comp-policies-rate', false);
        updateKpiStatusFromConfig('flag-comp-audit-results', auditResults, 'comp-audit-results', false);
        updateKpiStatusFromConfig('flag-comp-critical-findings', criticalFindings, 'comp-critical-findings', true);
        updateKpiStatusFromConfig('flag-comp-monthly-rate', monthlyRate, 'comp-monthly-rate', false);
        updateKpiStatusFromConfig('flag-comp-improvement-rate', improvementRate, 'comp-improvement-rate', false);

        // Check visibility of the compliance department container
        const viewDeptCompliance = document.getElementById('view-dept-compliance');
        const isVisible = viewDeptCompliance && !viewDeptCompliance.classList.contains('hidden');
        if (!isVisible) {
            return; // Skip rendering charts if the tab is hidden
        }

        const isEn = document.documentElement.lang === 'en';
        const fontName = isEn ? 'Outfit' : 'Tajawal';

        // 1. Update complianceDistributionChart (Doughnut)
        const distCtx = document.getElementById('complianceDistributionChart');
        if (distCtx) {
            // Safely destroy existing chart via Chart.js API
            const existingDistChart = Chart.getChart(distCtx);
            if (existingDistChart) {
                existingDistChart.destroy();
            }

            let excellentCount = 0;
            let goodCount = 0;
            let poorCount = 0;

            const defaultTargets = {
                'comp-ops-rate': { target: 95, excellentMin: 95, goodMin: 85 },
                'comp-violations-count': { target: 0, excellentMax: 0, goodMax: 3 },
                'comp-closure-rate': { target: 95, excellentMin: 95, goodMin: 85 },
                'comp-resolution-time': { target: 5, excellentMax: 5, goodMax: 8 },
                'comp-contract-rate': { target: 95, excellentMin: 95, goodMin: 85 },
                'comp-policies-rate': { target: 95, excellentMin: 95, goodMin: 85 },
                'comp-audit-results': { target: 90, excellentMin: 90, goodMin: 80 },
                'comp-critical-findings': { target: 0, excellentMax: 0, goodMax: 2 },
                'comp-monthly-rate': { target: 95, excellentMin: 95, goodMin: 85 },
                'comp-improvement-rate': { target: 90, excellentMin: 90, goodMin: 80 }
            };

            const checkStatus = (val, key, isInverse) => {
                const config = getKpiSetting(key) || defaultTargets[key] || { target: 90, excellentMin: 90, goodMin: 80 };
                if (isInverse) {
                    const excellentMax = config.excellentMax !== undefined ? config.excellentMax : config.target;
                    const goodMax = config.goodMax !== undefined ? config.goodMax : (excellentMax + 3);

                    if (val <= excellentMax) excellentCount++;
                    else if (val <= goodMax) goodCount++;
                    else poorCount++;
                } else {
                    const excellentMin = config.excellentMin !== undefined ? config.excellentMin : config.target;
                    const goodMin = config.goodMin !== undefined ? config.goodMin : (excellentMin - 10);

                    if (val >= excellentMin) excellentCount++;
                    else if (val >= goodMin) goodCount++;
                    else poorCount++;
                }
            };

            checkStatus(opsRate, 'comp-ops-rate', false);
            checkStatus(violationsCount, 'comp-violations-count', true);
            checkStatus(closureRate, 'comp-closure-rate', false);
            checkStatus(resolutionTime, 'comp-resolution-time', true);
            checkStatus(contractRate, 'comp-contract-rate', false);
            checkStatus(policiesRate, 'comp-policies-rate', false);
            checkStatus(auditResults, 'comp-audit-results', false);
            checkStatus(criticalFindings, 'comp-critical-findings', true);
            checkStatus(monthlyRate, 'comp-monthly-rate', false);
            checkStatus(improvementRate, 'comp-improvement-rate', false);

            const distData = [excellentCount, goodCount, poorCount];

            window.complianceDistributionChartInstance = new Chart(distCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: isEn ? ['Excellent 🟢', 'Good 🟡', 'Poor 🔴'] : ['ممتاز 🟢', 'جيد 🟡', 'ضعيف 🔴'],
                    datasets: [{
                        data: distData,
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

        // 2. Render Comparison Bar Chart (Actual vs Target)
        const compComparisonCtx = document.getElementById('compliance-chart-comparison');
        if (compComparisonCtx) {
            // Safely destroy existing chart via Chart.js API
            const existingCompChart = Chart.getChart(compComparisonCtx);
            if (existingCompChart) {
                existingCompChart.destroy();
            }

            complianceChartComparison = new Chart(compComparisonCtx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: [
                        'الالتزام التشغيلي',
                        'المخالفات المسجلة',
                        'إغلاق المخالفات',
                        'زمن الحل (أيام)',
                        'الالتزام بالعقود',
                        'السياسات والإجراءات',
                        'نتائج التدقيق',
                        'الملاحظات الحرجة',
                        'الامتثال الشهري',
                        'التحسين المستمر'
                    ],
                    datasets: [
                        {
                            label: 'الفعلي',
                            data: [
                                opsRate,
                                violationsCount,
                                closureRate,
                                resolutionTime,
                                contractRate,
                                policiesRate,
                                auditResults,
                                criticalFindings,
                                monthlyRate,
                                improvementRate
                            ],
                            backgroundColor: '#b0841a',
                            borderRadius: 4
                        },
                        {
                            label: 'المستهدف التشغيلي',
                            data: [
                                opsTarget,
                                violationsTarget,
                                closureTarget,
                                resolutionTarget,
                                contractTarget,
                                policiesTarget,
                                auditTarget,
                                criticalTarget,
                                monthlyTarget,
                                improvementTarget
                            ],
                            backgroundColor: '#cbd5e1',
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: { font: { family: fontName, size: 10, weight: '700' } }
                        }
                    },
                    scales: {
                        x: {
                            ticks: { font: { family: fontName, size: 9, weight: '700' } }
                        },
                        y: {
                            ticks: { font: { family: fontName, size: 9 } }
                        }
                    }
                }
            });
        }
    }

    async function refreshOperationalAuditKpis() {
        try {
            const auditKpis = await fetchJson('operational-audit-kpis');
            operationalAuditKpiData = auditKpis;
            renderOperationalAuditKpis();
        } catch (err) {
            console.error('[Portal Integration] Failed to refresh operational audit KPIs:', err);
        }
    }

    function renderOperationalAuditKpis() {
        if (!operationalAuditKpiData) return;

        const isEn = document.documentElement.lang === 'en';

        // Bind values
        setTextIfExists('val-audit-plan-execution', operationalAuditKpiData.auditExecutionRateActual + '%');
        setTextIfExists('val-operational-compliance-rate', operationalAuditKpiData.operationalComplianceRateActual + '%');
        setTextIfExists('val-total-audited-processes', operationalAuditKpiData.totalAuditedProcessesActual);
        setTextIfExists('val-passed-processes-count', operationalAuditKpiData.passedProcessesCountActual);
        setTextIfExists('val-critical-findings-count', operationalAuditKpiData.criticalFindingsCountActual);
        setTextIfExists('val-recommendations-count', operationalAuditKpiData.recommendationsCountActual);
        setTextIfExists('val-risk-mitigation-rate', operationalAuditKpiData.riskMitigationRateActual + '%');

        // Bind targets
        setTextIfExists('target-val-audit-plan-execution', operationalAuditKpiData.auditExecutionRateTarget + '%');
        setTextIfExists('target-val-operational-compliance-rate', operationalAuditKpiData.operationalComplianceRateTarget + '%');
        setTextIfExists('target-val-total-audited-processes', operationalAuditKpiData.totalAuditedProcessesTarget);
        setTextIfExists('target-val-passed-processes-count', operationalAuditKpiData.passedProcessesCountTarget);
        setTextIfExists('target-val-critical-findings-count', operationalAuditKpiData.criticalFindingsCountTarget);
        setTextIfExists('target-val-recommendations-count', operationalAuditKpiData.recommendationsCountTarget);
        setTextIfExists('target-val-risk-mitigation-rate', operationalAuditKpiData.riskMitigationRateTarget + '%');

        // Update flags
        updateKpiStatusFromConfig('flag-audit-plan-execution', operationalAuditKpiData.auditExecutionRateActual, 'audit-plan-execution', false);
        updateKpiStatusFromConfig('flag-operational-compliance-rate', operationalAuditKpiData.operationalComplianceRateActual, 'operational-compliance-rate', false);
        updateKpiStatusFromConfig('flag-total-audited-processes', operationalAuditKpiData.totalAuditedProcessesActual, 'total-audited-processes', false);
        updateKpiStatusFromConfig('flag-passed-processes-count', operationalAuditKpiData.passedProcessesCountActual, 'passed-processes-count', false);
        updateKpiStatusFromConfig('flag-critical-findings-count', operationalAuditKpiData.criticalFindingsCountActual, 'critical-findings-count', true);
        updateKpiStatusFromConfig('flag-recommendations-count', operationalAuditKpiData.recommendationsCountActual, 'recommendations-count', false);
        updateKpiStatusFromConfig('flag-risk-mitigation-rate', operationalAuditKpiData.riskMitigationRateActual, 'risk-mitigation-rate', false);
    }

    function refreshHrKpis() {
        if (!hrKpiData) return;
        renderHrKpis();
    }

    function renderHrKpis() {
        if (!hrKpiData) return;

        // Dynamically align targets in app.js config
        if (typeof defaultSettings !== 'undefined') {
            defaultSettings['hr-ret'].target = hrKpiData.retentionRateTarget;
            defaultSettings['hr-saudization'].target = hrKpiData.saudizationRateTarget;
            defaultSettings['hr-count'].target = hrKpiData.totalEmployeesTarget;
            defaultSettings['hr-growth'].target = Number(hrKpiData.avgSalaryTarget);
            defaultSettings['hr-absence'].target = hrKpiData.avgTasksPerEmployeeTarget;
            defaultSettings['hr-training'].target = hrKpiData.avgRatingTarget;
            defaultSettings['hr-appraisal'].target = hrKpiData.avgEvaluationTarget;
            
            defaultSettings['hr-ret'].excellentMin = hrKpiData.retentionRateTarget * 0.95;
            defaultSettings['hr-ret'].goodMin = hrKpiData.retentionRateTarget * 0.8;
            defaultSettings['hr-saudization'].excellentMin = hrKpiData.saudizationRateTarget * 0.95;
            defaultSettings['hr-saudization'].goodMin = hrKpiData.saudizationRateTarget * 0.8;
            defaultSettings['hr-count'].excellentMin = hrKpiData.totalEmployeesTarget * 0.95;
            defaultSettings['hr-count'].goodMin = hrKpiData.totalEmployeesTarget * 0.8;
            defaultSettings['hr-growth'].excellentMin = Number(hrKpiData.avgSalaryTarget) * 0.95;
            defaultSettings['hr-growth'].goodMin = Number(hrKpiData.avgSalaryTarget) * 0.8;
            
            defaultSettings['hr-absence'].excellentMin = hrKpiData.avgTasksPerEmployeeTarget * 0.95;
            defaultSettings['hr-absence'].goodMin = hrKpiData.avgTasksPerEmployeeTarget * 0.8;
            delete defaultSettings['hr-absence'].excellentMax;
            delete defaultSettings['hr-absence'].goodMax;
            
            defaultSettings['hr-training'].excellentMin = hrKpiData.avgRatingTarget * 0.95;
            defaultSettings['hr-training'].goodMin = hrKpiData.avgRatingTarget * 0.8;
            defaultSettings['hr-appraisal'].excellentMin = hrKpiData.avgEvaluationTarget * 0.95;
            defaultSettings['hr-appraisal'].goodMin = hrKpiData.avgEvaluationTarget * 0.8;
        }

        // Bind values
        setTextIfExists('val-hr-ret', hrKpiData.retentionRateActual + '%');
        setTextIfExists('val-hr-saudization', hrKpiData.saudizationRateActual + '%');
        setTextIfExists('val-hr-count', hrKpiData.totalEmployeesActual);
        setTextIfExists('val-hr-growth', hrKpiData.avgSalaryActual.toLocaleString(undefined, {minimumFractionDigits: 0}) + ' SAR');
        setTextIfExists('val-hr-absence', hrKpiData.avgTasksPerEmployeeActual);
        setTextIfExists('val-hr-training', hrKpiData.avgRatingActual);
        setTextIfExists('val-hr-appraisal', hrKpiData.avgEvaluationActual + '%');

        // Bind targets
        setTextIfExists('target-val-hr-ret', hrKpiData.retentionRateTarget + '%');
        setTextIfExists('target-val-hr-saudization', hrKpiData.saudizationRateTarget + '%');
        setTextIfExists('target-val-hr-count', hrKpiData.totalEmployeesTarget);
        setTextIfExists('target-val-hr-growth', hrKpiData.avgSalaryTarget.toLocaleString(undefined, {minimumFractionDigits: 0}) + ' SAR');
        setTextIfExists('target-val-hr-absence', hrKpiData.avgTasksPerEmployeeTarget);
        setTextIfExists('target-val-hr-training', hrKpiData.avgRatingTarget);
        setTextIfExists('target-val-hr-appraisal', hrKpiData.avgEvaluationTarget + '%');

        // Update flags
        updateKpiStatusFromConfig('flag-hr-ret', hrKpiData.retentionRateActual, 'hr-ret', false);
        updateKpiStatusFromConfig('flag-hr-saudization', hrKpiData.saudizationRateActual, 'hr-saudization', false);
        updateKpiStatusFromConfig('flag-hr-count', hrKpiData.totalEmployeesActual, 'hr-count', false);
        updateKpiStatusFromConfig('flag-hr-growth', hrKpiData.avgSalaryActual, 'hr-growth', false);
        updateKpiStatusFromConfig('flag-hr-absence', hrKpiData.avgTasksPerEmployeeActual, 'hr-absence', false);
        updateKpiStatusFromConfig('flag-hr-training', hrKpiData.avgRatingActual, 'hr-training', false);
        updateKpiStatusFromConfig('flag-hr-appraisal', hrKpiData.avgEvaluationActual, 'hr-appraisal', false);
    }

    async function refreshItKpis() {
        try {
            const itKpis = await fetchJson('it-kpis');
            itKpiData = itKpis;
            renderItKpis();
        } catch (err) {
            console.error('[Portal Integration] Failed to refresh IT KPIs:', err);
        }
    }

    function renderItKpis() {
        if (!itKpiData) return;

        // Dynamically align targets in app.js config if defaultSettings is defined
        if (typeof defaultSettings !== 'undefined') {
            defaultSettings['it-autom'].target = itKpiData.digitalTransformationRateTarget;
            defaultSettings['it-uptime'].target = itKpiData.systemUptimeTarget;
            defaultSettings['it-ticket-time'].target = itKpiData.avgTicketResolutionTimeTarget;
            defaultSettings['it-incidents'].target = itKpiData.cybersecurityIncidentsTarget;
            defaultSettings['it-satisfaction'].target = itKpiData.userSatisfactionTarget;
            defaultSettings['it-backup'].target = itKpiData.backupSuccessRateTarget;
            defaultSettings['it-projects'].target = itKpiData.itProjectDeliveryTarget;

            defaultSettings['it-autom'].excellentMin = itKpiData.digitalTransformationRateTarget * 0.95;
            defaultSettings['it-autom'].goodMin = itKpiData.digitalTransformationRateTarget * 0.8;
            defaultSettings['it-uptime'].excellentMin = itKpiData.systemUptimeTarget;
            defaultSettings['it-uptime'].goodMin = itKpiData.systemUptimeTarget - 0.9;
            defaultSettings['it-ticket-time'].excellentMax = itKpiData.avgTicketResolutionTimeTarget;
            defaultSettings['it-ticket-time'].goodMax = itKpiData.avgTicketResolutionTimeTarget * 1.5;
            defaultSettings['it-incidents'].excellentMax = itKpiData.cybersecurityIncidentsTarget;
            defaultSettings['it-incidents'].goodMax = 1;
            defaultSettings['it-satisfaction'].excellentMin = itKpiData.userSatisfactionTarget;
            defaultSettings['it-satisfaction'].goodMin = itKpiData.userSatisfactionTarget * 0.9;
            defaultSettings['it-backup'].excellentMin = itKpiData.backupSuccessRateTarget;
            defaultSettings['it-backup'].goodMin = itKpiData.backupSuccessRateTarget * 0.95;
            defaultSettings['it-projects'].excellentMin = itKpiData.itProjectDeliveryTarget;
            defaultSettings['it-projects'].goodMin = itKpiData.itProjectDeliveryTarget * 0.9;
        }

        // Bind values
        setTextIfExists('val-it-autom', itKpiData.digitalTransformationRateActual + '%');
        setTextIfExists('val-it-uptime', itKpiData.systemUptimeActual + '%');
        setTextIfExists('val-it-ticket-time', itKpiData.avgTicketResolutionTimeActual + ' ساعة');
        setTextIfExists('val-it-incidents', itKpiData.cybersecurityIncidentsActual);
        setTextIfExists('val-it-satisfaction', itKpiData.userSatisfactionActual + '%');
        setTextIfExists('val-it-backup', itKpiData.backupSuccessRateActual + '%');
        setTextIfExists('val-it-projects', itKpiData.itProjectDeliveryActual + '%');

        // Bind targets
        setTextIfExists('target-val-it-autom', itKpiData.digitalTransformationRateTarget + '%');
        setTextIfExists('target-val-it-uptime', itKpiData.systemUptimeTarget + '%');
        setTextIfExists('target-val-it-ticket-time', itKpiData.avgTicketResolutionTimeTarget + ' ساعة');
        setTextIfExists('target-val-it-incidents', itKpiData.cybersecurityIncidentsTarget);
        setTextIfExists('target-val-it-satisfaction', itKpiData.userSatisfactionTarget + '%');
        setTextIfExists('target-val-it-backup', itKpiData.backupSuccessRateTarget + '%');
        setTextIfExists('target-val-it-projects', itKpiData.itProjectDeliveryTarget + '%');

        // Update flags
        updateKpiStatusFromConfig('flag-it-autom', itKpiData.digitalTransformationRateActual, 'it-autom', false);
        updateKpiStatusFromConfig('flag-it-uptime', itKpiData.systemUptimeActual, 'it-uptime', false);
        updateKpiStatusFromConfig('flag-it-ticket-time', itKpiData.avgTicketResolutionTimeActual, 'it-ticket-time', true);
        updateKpiStatusFromConfig('flag-it-incidents', itKpiData.cybersecurityIncidentsActual, 'it-incidents', true);
        updateKpiStatusFromConfig('flag-it-satisfaction', itKpiData.userSatisfactionActual, 'it-satisfaction', false);
        updateKpiStatusFromConfig('flag-it-backup', itKpiData.backupSuccessRateActual, 'it-backup', false);
        updateKpiStatusFromConfig('flag-it-projects', itKpiData.itProjectDeliveryActual, 'it-projects', false);
    }

    async function refreshHseKpis() {
        try {
            const hseKpis = await fetchJson('hse-kpis');
            hseKpiData = hseKpis;
            renderHseKpis();
        } catch (err) {
            console.error('[Portal Integration] Failed to refresh HSE KPIs:', err);
        }
    }

    function renderHseKpis() {
        if (!hseKpiData) return;

        // Dynamically align targets in app.js config if defaultSettings is defined
        if (typeof defaultSettings !== 'undefined') {
            defaultSettings['hse-ltifr'].target = hseKpiData.ltifrTarget;
            defaultSettings['hse-accidents'].target = hseKpiData.seriousRoadAccidentsTarget;
            defaultSettings['audit-comp'].target = hseKpiData.regulatoryComplianceRateTarget;
            defaultSettings['hse-training-hours'].target = hseKpiData.hseTrainingHoursTarget;
            defaultSettings['hse-inspection-completion'].target = hseKpiData.safetyInspectionsCompletionTarget;
            defaultSettings['hse-near-miss'].target = hseKpiData.nearMissReportingTarget;
            defaultSettings['hse-waste-recycling'].target = hseKpiData.wasteRecyclingRateTarget;

            defaultSettings['hse-ltifr'].excellentMax = hseKpiData.ltifrTarget;
            defaultSettings['hse-ltifr'].goodMax = hseKpiData.ltifrTarget + 1.5;
            defaultSettings['hse-accidents'].excellentMax = hseKpiData.seriousRoadAccidentsTarget;
            defaultSettings['hse-accidents'].goodMax = 1;
            defaultSettings['audit-comp'].excellentMin = hseKpiData.regulatoryComplianceRateTarget;
            defaultSettings['audit-comp'].goodMin = hseKpiData.regulatoryComplianceRateTarget * 0.9;
            defaultSettings['hse-training-hours'].excellentMin = hseKpiData.hseTrainingHoursTarget;
            defaultSettings['hse-training-hours'].goodMin = hseKpiData.hseTrainingHoursTarget * 0.8;
            defaultSettings['hse-inspection-completion'].excellentMin = hseKpiData.safetyInspectionsCompletionTarget;
            defaultSettings['hse-inspection-completion'].goodMin = hseKpiData.safetyInspectionsCompletionTarget * 0.9;
            defaultSettings['hse-near-miss'].excellentMin = hseKpiData.nearMissReportingTarget;
            defaultSettings['hse-near-miss'].goodMin = hseKpiData.nearMissReportingTarget * 0.8;
            defaultSettings['hse-waste-recycling'].excellentMin = hseKpiData.wasteRecyclingRateTarget;
            defaultSettings['hse-waste-recycling'].goodMin = hseKpiData.wasteRecyclingRateTarget * 0.8;
        }

        // Bind values
        setTextIfExists('val-hse-ltifr', hseKpiData.ltifrActual);
        setTextIfExists('val-hse-accidents', hseKpiData.seriousRoadAccidentsActual);
        setTextIfExists('val-audit-comp', hseKpiData.regulatoryComplianceRateActual + '%');
        setTextIfExists('val-hse-training-hours', hseKpiData.hseTrainingHoursActual + ' ساعة');
        setTextIfExists('val-hse-inspection-completion', hseKpiData.safetyInspectionsCompletionActual + '%');
        setTextIfExists('val-hse-near-miss', hseKpiData.nearMissReportingActual);
        setTextIfExists('val-hse-waste-recycling', hseKpiData.wasteRecyclingRateActual + '%');

        // Bind targets
        setTextIfExists('target-val-hse-ltifr', hseKpiData.ltifrTarget);
        setTextIfExists('target-val-hse-accidents', hseKpiData.seriousRoadAccidentsTarget);
        setTextIfExists('target-val-audit-comp', hseKpiData.regulatoryComplianceRateTarget + '%');
        setTextIfExists('target-val-hse-training-hours', hseKpiData.hseTrainingHoursTarget + ' ساعة');
        setTextIfExists('target-val-hse-inspection-completion', hseKpiData.safetyInspectionsCompletionTarget + '%');
        setTextIfExists('target-val-hse-near-miss', hseKpiData.nearMissReportingTarget);
        setTextIfExists('target-val-hse-waste-recycling', hseKpiData.wasteRecyclingRateTarget + '%');

        // Update flags
        updateKpiStatusFromConfig('flag-hse-ltifr', hseKpiData.ltifrActual, 'hse-ltifr', true);
        updateKpiStatusFromConfig('flag-hse-accidents', hseKpiData.seriousRoadAccidentsActual, 'hse-accidents', true);
        updateKpiStatusFromConfig('flag-audit-comp', hseKpiData.regulatoryComplianceRateActual, 'audit-comp', false);
        updateKpiStatusFromConfig('flag-hse-training-hours', hseKpiData.hseTrainingHoursActual, 'hse-training-hours', false);
        updateKpiStatusFromConfig('flag-hse-inspection-completion', hseKpiData.safetyInspectionsCompletionActual, 'hse-inspection-completion', false);
        updateKpiStatusFromConfig('flag-hse-near-miss', hseKpiData.nearMissReportingActual, 'hse-near-miss', false);
        updateKpiStatusFromConfig('flag-hse-waste-recycling', hseKpiData.wasteRecyclingRateActual, 'hse-waste-recycling', false);
    }

    function renderProcurementKpis() {
        if (!procurementKpiData) return;

        // Dynamically align targets in app.js config if defaultSettings is defined
        if (typeof defaultSettings !== 'undefined') {
            defaultSettings['proc-cycle'].target = procurementKpiData.avgProcurementCycleTimeTarget;
            defaultSettings['proc-savings'].target = procurementKpiData.costSavingsRateTarget;
            defaultSettings['proc-supplier'].target = procurementKpiData.supplierPerformanceRatingTarget;
            defaultSettings['proc-budget'].target = procurementKpiData.budgetComplianceTarget;
            defaultSettings['proc-spare-parts'].target = procurementKpiData.criticalSparePartsAvailabilityTarget;
            defaultSettings['proc-inventory'].target = procurementKpiData.inventoryAccuracyRateTarget;
            defaultSettings['proc-contracts'].target = procurementKpiData.activeSupplyContractsTarget;

            defaultSettings['proc-cycle'].excellentMax = procurementKpiData.avgProcurementCycleTimeTarget;
            defaultSettings['proc-cycle'].goodMax = procurementKpiData.avgProcurementCycleTimeTarget * 1.5;
            defaultSettings['proc-savings'].excellentMin = procurementKpiData.costSavingsRateTarget;
            defaultSettings['proc-savings'].goodMin = procurementKpiData.costSavingsRateTarget * 0.9;
            defaultSettings['proc-supplier'].excellentMin = procurementKpiData.supplierPerformanceRatingTarget;
            defaultSettings['proc-supplier'].goodMin = procurementKpiData.supplierPerformanceRatingTarget * 0.9;
            defaultSettings['proc-budget'].excellentMin = procurementKpiData.budgetComplianceTarget;
            defaultSettings['proc-budget'].goodMin = procurementKpiData.budgetComplianceTarget * 0.9;
            defaultSettings['proc-spare-parts'].excellentMin = procurementKpiData.criticalSparePartsAvailabilityTarget;
            defaultSettings['proc-spare-parts'].goodMin = procurementKpiData.criticalSparePartsAvailabilityTarget * 0.95;
            defaultSettings['proc-inventory'].excellentMin = procurementKpiData.inventoryAccuracyRateTarget;
            defaultSettings['proc-inventory'].goodMin = procurementKpiData.inventoryAccuracyRateTarget * 0.95;
            defaultSettings['proc-contracts'].excellentMin = procurementKpiData.activeSupplyContractsTarget;
            defaultSettings['proc-contracts'].goodMin = procurementKpiData.activeSupplyContractsTarget * 0.9;
        }

        // Bind values
        const isEn = document.documentElement.lang === 'en';
        setTextIfExists('val-proc-cycle', procurementKpiData.avgProcurementCycleTimeActual + (isEn ? ' days' : ' أيام'));
        setTextIfExists('val-proc-savings', procurementKpiData.costSavingsRateActual + '%');
        setTextIfExists('val-proc-supplier', procurementKpiData.supplierPerformanceRatingActual + '%');
        setTextIfExists('val-proc-budget', procurementKpiData.budgetComplianceActual + '%');
        setTextIfExists('val-proc-spare-parts', procurementKpiData.criticalSparePartsAvailabilityActual + '%');
        setTextIfExists('val-proc-inventory', procurementKpiData.inventoryAccuracyRateActual + '%');
        setTextIfExists('val-proc-contracts', procurementKpiData.activeSupplyContractsActual + (isEn ? ' contracts' : ' عقد'));

        // Bind targets
        setTextIfExists('target-val-proc-cycle', procurementKpiData.avgProcurementCycleTimeTarget + (isEn ? ' days' : ' أيام'));
        setTextIfExists('target-val-proc-savings', procurementKpiData.costSavingsRateTarget + '%');
        setTextIfExists('target-val-proc-supplier', procurementKpiData.supplierPerformanceRatingTarget + '%');
        setTextIfExists('target-val-proc-budget', procurementKpiData.budgetComplianceTarget + '%');
        setTextIfExists('target-val-proc-spare-parts', procurementKpiData.criticalSparePartsAvailabilityTarget + '%');
        setTextIfExists('target-val-proc-inventory', procurementKpiData.inventoryAccuracyRateTarget + '%');
        setTextIfExists('target-val-proc-contracts', procurementKpiData.activeSupplyContractsTarget);

        // Update flags
        updateKpiStatusFromConfig('flag-proc-cycle', procurementKpiData.avgProcurementCycleTimeActual, 'proc-cycle', true);
        updateKpiStatusFromConfig('flag-proc-savings', procurementKpiData.costSavingsRateActual, 'proc-savings', false);
        updateKpiStatusFromConfig('flag-proc-supplier', procurementKpiData.supplierPerformanceRatingActual, 'proc-supplier', false);
        updateKpiStatusFromConfig('flag-proc-budget', procurementKpiData.budgetComplianceActual, 'proc-budget', false);
        updateKpiStatusFromConfig('flag-proc-spare-parts', procurementKpiData.criticalSparePartsAvailabilityActual, 'proc-spare-parts', false);
        updateKpiStatusFromConfig('flag-proc-inventory', procurementKpiData.inventoryAccuracyRateActual, 'proc-inventory', false);
        updateKpiStatusFromConfig('flag-proc-contracts', procurementKpiData.activeSupplyContractsActual, 'proc-contracts', false);
    }

    function renderStrategyKpis() {
        if (!strategyKpiData) return;

        // Dynamically align targets in app.js config if defaultSettings is defined
        if (typeof defaultSettings !== 'undefined') {
            defaultSettings['strat-goals'].target = strategyKpiData.strategicGoalsAchievementTarget;
            defaultSettings['strat-init'].target = strategyKpiData.pmoInitiativeDeliveryTarget;
            defaultSettings['risk-handling'].target = strategyKpiData.riskHandlingTarget;
            defaultSettings['gov-maturity'].target = strategyKpiData.govMaturityTarget;
            defaultSettings['strat-goals-achieve'].target = strategyKpiData.strategicGoalsAchieveMinedTarget;
            defaultSettings['strat-milestones'].target = strategyKpiData.onTimeMilestonesDeliveryTarget;
            defaultSettings['strat-budget'].target = strategyKpiData.strategicBudgetEfficiencyTarget;

            defaultSettings['strat-goals'].excellentMin = strategyKpiData.strategicGoalsAchievementTarget * 0.95;
            defaultSettings['strat-goals'].goodMin = strategyKpiData.strategicGoalsAchievementTarget * 0.8;
            defaultSettings['strat-init'].excellentMin = strategyKpiData.pmoInitiativeDeliveryTarget * 0.95;
            defaultSettings['strat-init'].goodMin = strategyKpiData.pmoInitiativeDeliveryTarget * 0.8;
            defaultSettings['risk-handling'].excellentMin = strategyKpiData.riskHandlingTarget * 0.95;
            defaultSettings['risk-handling'].goodMin = strategyKpiData.riskHandlingTarget * 0.8;
            defaultSettings['gov-maturity'].excellentMin = strategyKpiData.govMaturityTarget * 0.95;
            defaultSettings['gov-maturity'].goodMin = strategyKpiData.govMaturityTarget * 0.8;
            defaultSettings['strat-goals-achieve'].excellentMin = strategyKpiData.strategicGoalsAchieveMinedTarget * 0.95;
            defaultSettings['strat-goals-achieve'].goodMin = strategyKpiData.strategicGoalsAchieveMinedTarget * 0.8;
            defaultSettings['strat-milestones'].excellentMin = strategyKpiData.onTimeMilestonesDeliveryTarget * 0.95;
            defaultSettings['strat-milestones'].goodMin = strategyKpiData.onTimeMilestonesDeliveryTarget * 0.8;
            defaultSettings['strat-budget'].excellentMin = strategyKpiData.strategicBudgetEfficiencyTarget * 0.95;
            defaultSettings['strat-budget'].goodMin = strategyKpiData.strategicBudgetEfficiencyTarget * 0.8;
        }

        // Bind values
        setTextIfExists('val-strat-goals', strategyKpiData.strategicGoalsAchievementActual + '%');
        setTextIfExists('val-strat-init', strategyKpiData.pmoInitiativeDeliveryActual + '%');
        setTextIfExists('val-risk-handling', strategyKpiData.riskHandlingActual + '%');
        setTextIfExists('val-gov-maturity', strategyKpiData.govMaturityActual + '%');
        setTextIfExists('val-strat-goals-achieve', strategyKpiData.strategicGoalsAchieveMinedActual + '%');
        setTextIfExists('val-strat-milestones', strategyKpiData.onTimeMilestonesDeliveryActual + '%');
        setTextIfExists('val-strat-budget', strategyKpiData.strategicBudgetEfficiencyActual + '%');

        // Bind targets
        setTextIfExists('target-val-strat-goals', strategyKpiData.strategicGoalsAchievementTarget + '%');
        setTextIfExists('target-val-strat-init', strategyKpiData.pmoInitiativeDeliveryTarget + '%');
        setTextIfExists('target-val-risk-handling', strategyKpiData.riskHandlingTarget + '%');
        setTextIfExists('target-val-gov-maturity', strategyKpiData.govMaturityTarget + '%');
        setTextIfExists('target-val-strat-goals-achieve', strategyKpiData.strategicGoalsAchieveMinedTarget + '%');
        setTextIfExists('target-val-strat-milestones', strategyKpiData.onTimeMilestonesDeliveryTarget + '%');
        setTextIfExists('target-val-strat-budget', strategyKpiData.strategicBudgetEfficiencyTarget + '%');

        // Update flags
        updateKpiStatusFromConfig('flag-strat-goals', strategyKpiData.strategicGoalsAchievementActual, 'strat-goals', false);
        updateKpiStatusFromConfig('flag-strat-init', strategyKpiData.pmoInitiativeDeliveryActual, 'strat-init', false);
        updateKpiStatusFromConfig('flag-risk-handling', strategyKpiData.riskHandlingActual, 'risk-handling', false);
        updateKpiStatusFromConfig('flag-gov-maturity', strategyKpiData.govMaturityActual, 'gov-maturity', false);
        updateKpiStatusFromConfig('flag-strat-goals-achieve', strategyKpiData.strategicGoalsAchieveMinedActual, 'strat-goals-achieve', false);
        updateKpiStatusFromConfig('flag-strat-milestones', strategyKpiData.onTimeMilestonesDeliveryActual, 'strat-milestones', false);
        updateKpiStatusFromConfig('flag-strat-budget', strategyKpiData.strategicBudgetEfficiencyActual, 'strat-budget', false);
    }



    // ───────── Public API ─────────
    window.PortalIntegration = {
        load: loadPortalData,
        refresh: loadPortalData,
        refreshProjectKpis: refreshProjectKpis,
        refreshComplianceKpis: refreshComplianceKpis,
        refreshOperationalAuditKpis: refreshOperationalAuditKpis,
        refreshHrKpis: refreshHrKpis,
        refreshItKpis: refreshItKpis,
        refreshHseKpis: refreshHseKpis,
        renderComplianceKpis: renderComplianceKpis,
        renderOperationalAuditKpis: renderOperationalAuditKpis,
        renderHrKpis: renderHrKpis,
        renderItKpis: renderItKpis,
        renderHseKpis: renderHseKpis,
        renderProcurementKpis: renderProcurementKpis,
        renderStrategyKpis: renderStrategyKpis,
        renderFinanceKpis: renderFinanceKpis,
        renderCommercialKpis: renderCommercialKpis,
        renderTourismKpis: renderTourismKpis,
        renderOperationsKpis: renderOperationsKpis,
        renderSalesKpis: renderSalesKpis,
        hasSalesData: () => salesKpiData !== null,
        getSalesKpiData: () => salesKpiData,
        hasComplianceData: () => complianceKpiData !== null,
        getComplianceKpiData: () => complianceKpiData,
        resetViews: resetDrilldownViews,
        getData: () => portalData,
        getKpis: () => kpiData,
        isAvailable: () => portalData !== null
    };

    function renderFinanceKpis() {
        if (!financeKpiData) return;

        const isEn = document.documentElement.lang === 'en';

        // Bind values
        setTextIfExists('val-total-revenue', formatCurrency(financeKpiData.totalRevenueActual));
        setTextIfExists('val-ebitda-margin', financeKpiData.ebitdaMarginActual.toFixed(1) + '%');
        setTextIfExists('val-net-profit-margin', financeKpiData.netProfitMarginActual.toFixed(1) + '%');
        setTextIfExists('val-operating-cashflow', formatCurrency(financeKpiData.operatingCashFlowActual));
        setTextIfExists('val-roa', financeKpiData.returnOnAssetsActual.toFixed(1) + '%');
        setTextIfExists('val-budget-variance', financeKpiData.budgetVarianceRateActual.toFixed(1) + '%');
        setTextIfExists('val-working-capital', formatCurrency(financeKpiData.workingCapitalActual));

        // Bind targets
        setTextIfExists('target-val-total-revenue', formatCurrency(financeKpiData.totalRevenueTarget));
        setTextIfExists('target-val-ebitda-margin', financeKpiData.ebitdaMarginTarget + '%');
        setTextIfExists('target-val-net-profit-margin', financeKpiData.netProfitMarginTarget + '%');
        setTextIfExists('target-val-operating-cashflow', formatCurrency(financeKpiData.operatingCashFlowTarget));
        setTextIfExists('target-val-roa', financeKpiData.returnOnAssetsTarget + '%');
        setTextIfExists('target-val-budget-variance', financeKpiData.budgetVarianceRateTarget + '%');
        setTextIfExists('target-val-working-capital', formatCurrency(financeKpiData.workingCapitalTarget));

        // Update flags
        updateKpiFlagElement('flag-total-revenue', financeKpiData.totalRevenueActual, financeKpiData.totalRevenueTarget);
        updateKpiFlagElement('flag-ebitda-margin', financeKpiData.ebitdaMarginActual, financeKpiData.ebitdaMarginTarget);
        updateKpiFlagElement('flag-net-profit-margin', financeKpiData.netProfitMarginActual, financeKpiData.netProfitMarginTarget);
        updateKpiFlagElement('flag-operating-cashflow', financeKpiData.operatingCashFlowActual, financeKpiData.operatingCashFlowTarget);
        updateKpiFlagElement('flag-roa', financeKpiData.returnOnAssetsActual, financeKpiData.returnOnAssetsTarget);
        updateKpiFlagElementInverse('flag-budget-variance', financeKpiData.budgetVarianceRateActual, financeKpiData.budgetVarianceRateTarget);
        updateKpiFlagElement('flag-working-capital', financeKpiData.workingCapitalActual, financeKpiData.workingCapitalTarget);
    }

    function renderCommercialKpis() {
        if (!commercialKpiData) return;

        const isEn = document.documentElement.lang === 'en';

        // Bind values
        setTextIfExists('val-customer-retention', commercialKpiData.customerRetentionRateActual.toFixed(1) + '%');
        setTextIfExists('val-new-contracts', commercialKpiData.newContractsSecuredActual);
        setTextIfExists('val-contract-renewal-rate', commercialKpiData.contractRenewalRateActual.toFixed(1) + '%');
        setTextIfExists('val-contract-turnaround', commercialKpiData.contractTurnaroundTimeActual.toFixed(1) + (isEn ? ' days' : ' يوم'));
        setTextIfExists('val-legal-disputes', commercialKpiData.contractualLegalDisputesActual);
        setTextIfExists('val-customer-acquisition-cost', formatCurrency(commercialKpiData.customerAcquisitionCostActual));
        setTextIfExists('val-contract-value-growth', commercialKpiData.contractValueGrowthRateActual.toFixed(1) + '%');

        // Bind targets
        setTextIfExists('target-val-customer-retention', commercialKpiData.customerRetentionRateTarget + '%');
        setTextIfExists('target-val-new-contracts', commercialKpiData.newContractsSecuredTarget);
        setTextIfExists('target-val-contract-renewal-rate', commercialKpiData.contractRenewalRateTarget + '%');
        setTextIfExists('target-val-contract-turnaround', commercialKpiData.contractTurnaroundTimeTarget + (isEn ? ' days' : ' يوم'));
        setTextIfExists('target-val-legal-disputes', commercialKpiData.contractualLegalDisputesTarget);
        setTextIfExists('target-val-customer-acquisition-cost', formatCurrency(commercialKpiData.customerAcquisitionCostTarget));
        setTextIfExists('target-val-contract-value-growth', commercialKpiData.contractValueGrowthRateTarget + '%');

        // Update flags
        updateKpiFlagElement('flag-customer-retention', commercialKpiData.customerRetentionRateActual, commercialKpiData.customerRetentionRateTarget);
        updateKpiFlagElement('flag-new-contracts', commercialKpiData.newContractsSecuredActual, commercialKpiData.newContractsSecuredTarget);
        updateKpiFlagElement('flag-contract-renewal-rate', commercialKpiData.contractRenewalRateActual, commercialKpiData.contractRenewalRateTarget);
        updateKpiFlagElementInverse('flag-contract-turnaround', commercialKpiData.contractTurnaroundTimeActual, commercialKpiData.contractTurnaroundTimeTarget);
        updateKpiFlagElementInverse('flag-legal-disputes', commercialKpiData.contractualLegalDisputesActual, commercialKpiData.contractualLegalDisputesTarget);
        updateKpiFlagElementInverse('flag-customer-acquisition-cost', commercialKpiData.customerAcquisitionCostActual, commercialKpiData.customerAcquisitionCostTarget);
        updateKpiFlagElement('flag-contract-value-growth', commercialKpiData.contractValueGrowthRateActual, commercialKpiData.contractValueGrowthRateTarget);
    }

    function renderTourismKpis() {
        if (!tourismKpiData) return;

        const isEn = document.documentElement.lang === 'en';

        // Bind values
        setTextIfExists('val-tourism-hotel-occupancy', tourismKpiData.hotelOccupancyRateActual.toFixed(1) + '%');
        setTextIfExists('val-tourism-cancel-rate', tourismKpiData.bookingCancellationRateActual.toFixed(1) + '%');
        setTextIfExists('val-tourism-guest-rating', tourismKpiData.averageGuestRatingActual.toFixed(1) + ' / 5');
        setTextIfExists('val-tourism-tours-completed', tourismKpiData.toursCompletedActual);
        setTextIfExists('val-tourism-revpar', formatCurrency(tourismKpiData.revParActual));
        setTextIfExists('val-tourism-lead-time', tourismKpiData.bookingLeadTimeActual.toFixed(1) + (isEn ? ' hrs' : ' ساعة'));
        setTextIfExists('val-tourism-active-guides', tourismKpiData.activeTourGuidesActual);

        // Bind targets
        setTextIfExists('target-val-tourism-hotel-occupancy', tourismKpiData.hotelOccupancyRateTarget + '%');
        setTextIfExists('target-val-tourism-cancel-rate', tourismKpiData.bookingCancellationRateTarget + '%');
        setTextIfExists('target-val-tourism-guest-rating', tourismKpiData.averageGuestRatingTarget + ' / 5');
        setTextIfExists('target-val-tourism-tours-completed', tourismKpiData.toursCompletedTarget);
        setTextIfExists('target-val-tourism-revpar', formatCurrency(tourismKpiData.revParTarget));
        setTextIfExists('target-val-tourism-lead-time', tourismKpiData.bookingLeadTimeTarget + (isEn ? ' hrs' : ' ساعة'));
        setTextIfExists('target-val-tourism-active-guides', tourismKpiData.activeTourGuidesTarget);

        // Update flags
        updateKpiFlagElement('flag-tourism-hotel-occupancy', tourismKpiData.hotelOccupancyRateActual, tourismKpiData.hotelOccupancyRateTarget);
        updateKpiFlagElementInverse('flag-tourism-cancel-rate', tourismKpiData.bookingCancellationRateActual, tourismKpiData.bookingCancellationRateTarget);
        updateKpiFlagElement('flag-tourism-guest-rating', tourismKpiData.averageGuestRatingActual, tourismKpiData.averageGuestRatingTarget);
        updateKpiFlagElement('flag-tourism-tours-completed', tourismKpiData.toursCompletedActual, tourismKpiData.toursCompletedTarget);
        updateKpiFlagElement('flag-tourism-revpar', tourismKpiData.revParActual, tourismKpiData.revParTarget);
        updateKpiFlagElementInverse('flag-tourism-lead-time', tourismKpiData.bookingLeadTimeActual, tourismKpiData.bookingLeadTimeTarget);
        updateKpiFlagElement('flag-tourism-active-guides', tourismKpiData.activeTourGuidesActual, tourismKpiData.activeTourGuidesTarget);
    }

    // 6 basic counts/rates, all straight from real Trip records - no illustrative targets, no
    // metric the source dispatch sheets can't actually support.
    function renderOperationsKpis() {
        if (!operationsKpiData) return;
        const isEn = document.documentElement.lang === 'en';

        setTextIfExists('val-ops-total-trips', operationsKpiData.totalTrips);
        setTextIfExists('val-ops-cancelled-trips', operationsKpiData.cancelledTrips);
        setTextIfExists('val-ops-cancellation-rate', operationsKpiData.cancellationRatePercent.toFixed(1) + '%');
        setTextIfExists('val-ops-active-drivers', operationsKpiData.activeDriversCount);
        setTextIfExists('val-ops-vehicles-deployed', operationsKpiData.vehiclesDeployedCount);
        setTextIfExists('val-ops-clients-served', operationsKpiData.clientsServedCount);
        setTextIfExists('val-ops-avg-trips-day', operationsKpiData.averageTripsPerDay.toFixed(1) + (isEn ? '/day' : ' رحلة/يوم'));
    }


    // ───────── Initialize on DOM Ready ─────────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            loadPortalData();
            initMaintenanceWorkOrdersControls();
            startAutoRefresh();
        });
    } else {
        loadPortalData();
        initMaintenanceWorkOrdersControls();
        startAutoRefresh();
    }

})();
