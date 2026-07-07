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
            const [summary, kpis] = await Promise.all([
                fetchJson('summary'),
                fetchJson('kpis')
            ]);
            portalData = summary;
            kpiData = kpis;

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
    function renderAll() {
        if (!portalData || !kpiData) return;

        renderDynamicProjectCards();
        renderPortalKpiCards();
        renderCharts();
        updateOverviewCounters();
        updateExistingFleetKpis();
        updateTickerWithPortalData();
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
        if (!kpiData) return;

        // Populate the actual values from API directly to the existing Fleet Department KPI cards
        setTextIfExists('val-fleet-ready', kpiData.fleetAvailabilityRate?.toFixed(1) + '%');
        setTextIfExists('val-fleet-util', kpiData.fleetUtilizationRate?.toFixed(1) + '%');

        // Update target value indicators
        setTextIfExists('target-val-fleet-ready', '90%');
        setTextIfExists('target-val-fleet-util', '80%');

        // Optional status flag badges calculation (Excel target alignment)
        updateKpiFlagElement('flag-fleet-ready', kpiData.fleetAvailabilityRate, 90);
        updateKpiFlagElement('flag-fleet-util', kpiData.fleetUtilizationRate, 80);
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

    // ───────── Auto-Refresh ─────────
    function startAutoRefresh() {
        if (refreshTimer) clearInterval(refreshTimer);
        refreshTimer = setInterval(loadPortalData, REFRESH_INTERVAL_MS);
    }

    // ───────── Public API ─────────
    window.PortalIntegration = {
        load: loadPortalData,
        refresh: loadPortalData,
        resetViews: resetDrilldownViews,
        getData: () => portalData,
        getKpis: () => kpiData,
        isAvailable: () => portalData !== null
    };

    // ───────── Initialize on DOM Ready ─────────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            loadPortalData();
            startAutoRefresh();
        });
    } else {
        loadPortalData();
        startAutoRefresh();
    }

})();
