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
    }
}
