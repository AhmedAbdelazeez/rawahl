(function () {
    'use strict';

    var state = { page: 1, pageSize: 10, fromDate: '', toDate: '' };
    var statusLabels = ['معلق', 'قيد التحليل', 'بانتظار قطع الغيار', 'مكتمل'];

    function fmtDate(iso) {
        if (!iso) return '--';
        try { return new Date(iso).toLocaleDateString('ar-SA'); } catch (e) { return iso; }
    }

    function loadKpis() {
        fetch('/api/dashboard-data/maintenance-kpis')
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (data) {
                if (!data) return;
                document.getElementById('kpi-mttr').textContent = (data.meanTimeToRepairHours ?? 0).toFixed(1);
                document.getElementById('kpi-breakdowns').textContent = data.totalBreakdowns ?? 0;
                document.getElementById('kpi-availability').textContent = (data.fleetAvailabilityRate ?? 0).toFixed(1) + '%';
                document.getElementById('kpi-parts-cost').textContent = (data.totalSparePartsCost ?? 0).toLocaleString('ar-SA') + ' ر.س';
                document.getElementById('kpi-backlog').textContent = (data.maintenanceBacklogRate ?? 0).toFixed(1) + '%';
                document.getElementById('kpi-active-rate').textContent = (data.activeBusesRate ?? 0).toFixed(1) + '%';
                renderTopLocations(data.topBreakdownLocations || []);
            })
            .catch(function (e) { console.error('Failed to load maintenance KPIs', e); });
    }

    function renderTopLocations(locations) {
        var container = document.getElementById('maint-locations-list');
        if (!container) return;
        container.innerHTML = '';

        if (!locations.length) {
            container.innerHTML = '<span class="text-xs text-slate-400 font-bold">لا توجد بيانات مواقع أعطال بعد (متاحة فقط من تقارير الفروع الميدانية).</span>';
            return;
        }

        locations.forEach(function (loc) {
            var row = document.createElement('div');
            row.className = 'flex justify-between items-center bg-slate-50 rounded-lg px-3 py-2';
            row.innerHTML =
                '<span class="text-xs font-bold text-slate-700">' + loc.location + '</span>' +
                '<span class="text-xs font-black text-[#b0841a]">' + loc.breakdownCount + ' عطل (' + loc.sharePercentage.toFixed(1) + '%)</span>';
            container.appendChild(row);
        });
    }

    function loadTable() {
        var url = '/api/dashboard-data/maintenance-workorders?page=' + state.page + '&pageSize=' + state.pageSize;
        if (state.fromDate) url += '&fromDate=' + state.fromDate;
        if (state.toDate) url += '&toDate=' + state.toDate;

        fetch(url)
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (data) {
                var body = document.getElementById('maint-table-body');
                body.innerHTML = '';
                if (!data || !data.items || data.items.length === 0) {
                    body.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-slate-400 font-bold">لا توجد بيانات</td></tr>';
                    document.getElementById('maint-page-info').textContent = '0 من 0';
                    return;
                }
                data.items.forEach(function (o) {
                    var tr = document.createElement('tr');
                    tr.className = 'border-t border-slate-100';
                    tr.innerHTML =
                        '<td class="p-3 font-bold">' + (o.vehiclePlate || '--') + '</td>' +
                        '<td class="p-3">' + fmtDate(o.date) + '</td>' +
                        '<td class="p-3">' + (o.odometer ?? '--') + '</td>' +
                        '<td class="p-3">' + (o.breakdownDescription || '--') + '</td>' +
                        '<td class="p-3">' + (o.technicianName || '--') + '</td>' +
                        '<td class="p-3">' + (statusLabels[o.status] || '--') + '</td>';
                    body.appendChild(tr);
                });
                document.getElementById('maint-page-info').textContent =
                    'صفحة ' + data.page + ' من ' + (data.totalPages || 1) + ' (' + data.totalCount + ' سجل)';
            })
            .catch(function (e) { console.error('Failed to load maintenance work orders', e); });
    }

    document.getElementById('maint-filter-apply').addEventListener('click', function () {
        state.fromDate = document.getElementById('maint-from').value;
        state.toDate = document.getElementById('maint-to').value;
        state.page = 1;
        loadTable();
    });

    document.getElementById('maint-filter-reset').addEventListener('click', function () {
        document.getElementById('maint-from').value = '';
        document.getElementById('maint-to').value = '';
        state.fromDate = '';
        state.toDate = '';
        state.page = 1;
        loadTable();
    });

    document.getElementById('maint-prev').addEventListener('click', function () {
        if (state.page > 1) { state.page--; loadTable(); }
    });

    document.getElementById('maint-next').addEventListener('click', function () {
        state.page++; loadTable();
    });

    loadKpis();
    loadTable();
})();
