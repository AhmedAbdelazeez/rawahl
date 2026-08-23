using System.Collections.Generic;
using System.Threading.Tasks;
using project.Models;

namespace project.Services
{
    public interface IPortalIntegrationService
    {
        Task<PortalDashboardSummary?> GetDashboardSummaryAsync();
        Task<DashboardKpiSet> GetComputedKpisAsync();
        Task<List<PortalProjectDetail>> GetProjectsAsync();
        Task<PortalFleetSummary?> GetFleetSummaryAsync();
        Task<bool> IsPortalAvailableAsync();
        Task<System.Text.Json.JsonElement?> GetProjectKpisAsync();
        Task<System.Text.Json.JsonElement?> GetComplianceKpisAsync();
        Task<PortalOperationalAuditKpisDto?> GetOperationalAuditKpisAsync();
        Task<PortalHrKpisDto?> GetHrKpisAsync();
        Task<PortalItKpisDto?> GetItKpisAsync();
        Task<PortalHseKpisDto?> GetHseKpisAsync();
        Task<PortalProcurementKpisDto?> GetProcurementKpisAsync();
        Task<PortalStrategyKpisDto?> GetStrategyKpisAsync();
        Task<PortalFinanceKpisDto?> GetFinanceKpisAsync();
        Task<PortalCommercialKpisDto?> GetCommercialKpisAsync();
        Task<PortalTourismKpisDto?> GetTourismKpisAsync();
        Task<PortalOperationsKpisDto?> GetOperationsKpisAsync();
        Task<PortalMaintenanceKpisDto?> GetMaintenanceKpisAsync();

        // Sales Department: executive KPIs computed from the real uploaded customer roster and fleet capacity data.
        Task<System.Text.Json.JsonElement?> GetSalesKpisAsync();

        Task<System.Text.Json.JsonElement?> GetMohuGroupsAsync();
        Task<System.Text.Json.JsonElement?> GetMohuFeedbacksAsync();
        Task<System.Text.Json.JsonElement?> GetMohuViolationsAsync();
        Task<System.Text.Json.JsonElement?> GetMohuPermitsAsync();

        // Fleet Department: 5 new indicators (Total Capacity, Avg Age, Modernization Rate, Bus Type Variety, Avg Capacity/Bus)
        Task<System.Text.Json.JsonElement?> GetFleetIndicatorsAsync();

        // Maintenance Department: paginated + date-filtered work order list, and Excel bulk-upload
        Task<System.Text.Json.JsonElement?> GetMaintenanceWorkOrdersPagedAsync(int page, int pageSize, System.DateTime? fromDate, System.DateTime? toDate);
        Task<System.Text.Json.JsonElement?> UploadMaintenanceExcelAsync(Microsoft.AspNetCore.Http.IFormFile file, string branchName);

        // Storage / Warehouse Department: paginated + date-filtered inventory list, KPIs, and Excel bulk-upload
        Task<System.Text.Json.JsonElement?> GetWarehouseItemsAsync(int page, int pageSize, System.DateTime? fromDate, System.DateTime? toDate);
        Task<System.Text.Json.JsonElement?> GetWarehouseKpisAsync();
        Task<System.Text.Json.JsonElement?> UploadWarehouseExcelAsync(Microsoft.AspNetCore.Http.IFormFile file);
    }
}
