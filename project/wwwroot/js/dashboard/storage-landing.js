(function () {
    'use strict';

    var state = { page: 1, pageSize: 10, fromDate: '', toDate: '' };

    function fmtDate(iso) {
        if (!iso) return '--';
        try { return new Date(iso).toLocaleDateString('ar-SA'); } catch (e) { return iso; }
    }

    function loadKpis() {
        fetch('/api/dashboard-data/warehouse-kpis')
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (data) {
                if (!data) return;
                document.getElementById('kpi-total-items').textContent = data.totalItemsActual ?? 0;
                document.getElementById('kpi-stock-value').textContent = (data.totalStockValueActual ?? 0).toLocaleString('ar-SA') + ' ر.س';
                document.getElementById('kpi-low-stock').textContent = data.lowStockItemsActual ?? 0;
                document.getElementById('kpi-accuracy').textContent = (data.inventoryAccuracyRateActual ?? 0).toFixed(1) + '%';
                document.getElementById('kpi-avg-price').textContent = (data.averageUnitPriceActual ?? 0).toLocaleString('ar-SA') + ' ر.س';
            })
            .catch(function (e) { console.error('Failed to load warehouse KPIs', e); });
    }

    function loadTable() {
        var url = '/api/dashboard-data/warehouse-items?page=' + state.page + '&pageSize=' + state.pageSize;
        if (state.fromDate) url += '&fromDate=' + state.fromDate;
        if (state.toDate) url += '&toDate=' + state.toDate;

        fetch(url)
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (data) {
                var body = document.getElementById('store-table-body');
                body.innerHTML = '';
                if (!data || !data.items || data.items.length === 0) {
                    body.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-slate-400 font-bold">لا توجد بيانات</td></tr>';
                    document.getElementById('store-page-info').textContent = '0 من 0';
                    return;
                }
                data.items.forEach(function (i) {
                    var lowStock = (i.quantity ?? 0) <= (i.reorderLevel ?? 0);
                    var tr = document.createElement('tr');
                    tr.className = 'border-t border-slate-100' + (lowStock ? ' bg-red-50' : '');
                    tr.innerHTML =
                        '<td class="p-3 font-bold">' + (i.itemNameAr || '--') + '</td>' +
                        '<td class="p-3">' + (i.category || '--') + '</td>' +
                        '<td class="p-3">' + (i.quantity ?? '--') + '</td>' +
                        '<td class="p-3">' + (i.reorderLevel ?? '--') + '</td>' +
                        '<td class="p-3">' + (i.unitPrice ?? 0).toLocaleString('ar-SA') + ' ر.س</td>' +
                        '<td class="p-3">' + fmtDate(i.lastAuditDate) + '</td>';
                    body.appendChild(tr);
                });
                document.getElementById('store-page-info').textContent =
                    'صفحة ' + data.page + ' من ' + (data.totalPages || 1) + ' (' + data.totalCount + ' سجل)';
            })
            .catch(function (e) { console.error('Failed to load warehouse items', e); });
    }

    document.getElementById('store-filter-apply').addEventListener('click', function () {
        state.fromDate = document.getElementById('store-from').value;
        state.toDate = document.getElementById('store-to').value;
        state.page = 1;
        loadTable();
    });

    document.getElementById('store-filter-reset').addEventListener('click', function () {
        document.getElementById('store-from').value = '';
        document.getElementById('store-to').value = '';
        state.fromDate = '';
        state.toDate = '';
        state.page = 1;
        loadTable();
    });

    document.getElementById('store-prev').addEventListener('click', function () {
        if (state.page > 1) { state.page--; loadTable(); }
    });

    document.getElementById('store-next').addEventListener('click', function () {
        state.page++; loadTable();
    });

    loadKpis();
    loadTable();
})();
