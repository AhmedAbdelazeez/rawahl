using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using project.Models;

namespace project.Services
{
    public class PortalIntegrationService : IPortalIntegrationService
    {
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _cache;
        private readonly ILogger<PortalIntegrationService> _logger;
        private const string CacheKey = "portal_dashboard_summary";
        private const int CacheDurationSeconds = 30;

        public PortalIntegrationService(
            HttpClient httpClient,
            IMemoryCache cache,
            ILogger<PortalIntegrationService> logger)
        {
            _httpClient = httpClient;
            _cache = cache;
            _logger = logger;
        }

        public async Task<PortalDashboardSummary?> GetDashboardSummaryAsync()
        {
            if (_cache.TryGetValue(CacheKey, out PortalDashboardSummary? cachedSummary))
            {
                _logger.LogInformation("Returning cached portal dashboard summary.");
                return cachedSummary;
            }

            try
            {
                _logger.LogInformation("Fetching fresh dashboard summary from portal API...");
                // Note: The BaseAddress is configured in Program.cs, so we use relative path.
                var summary = await _httpClient.GetFromJsonAsync<PortalDashboardSummary>("api/dashboard/summary");
                
                if (summary != null)
                {
                    var cacheEntryOptions = new MemoryCacheEntryOptions()
                        .SetAbsoluteExpiration(TimeSpan.FromSeconds(CacheDurationSeconds));
                    
                    _cache.Set(CacheKey, summary, cacheEntryOptions);
                    return summary;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching dashboard summary from portal API.");
            }

            // Fallback: If cache has expired but we failed to fetch fresh, we might want to return the last known value
            // (or if we don't have it, return null/default)
            return null;
        }

        public async Task<DashboardKpiSet> GetComputedKpisAsync()
        {
            var summary = await GetDashboardSummaryAsync();
            var kpis = new DashboardKpiSet
            {
                LastUpdated = DateTime.UtcNow,
                IsLive = summary != null
            };

            if (summary == null)
            {
                _logger.LogWarning("No portal summary available. Returning empty/default KPIs.");
                return kpis;
            }

            try
            {
                // Projects KPIs
                kpis.TotalProjects = summary.Projects.Total;
                kpis.ActiveProjects = summary.Projects.Active;
                kpis.CompletedProjects = summary.Projects.Completed;
                kpis.OnHoldProjects = summary.Projects.OnHold;
                kpis.PlanningProjects = summary.Projects.Planning;
                kpis.DelayedProjects = summary.Projects.Delayed;
                kpis.NewProjectsThisMonth = summary.Projects.NewThisMonth;
                kpis.ProjectCompletionRate = summary.Projects.CompletionRate;
                kpis.ProjectDelayRate = summary.Projects.DelayRate;
                kpis.AverageProjectProgress = summary.Projects.AverageCompletion;
                kpis.TotalContractValue = summary.Projects.TotalContractValue;
                kpis.AverageContractValue = summary.Projects.AverageContractValue;

                // Health Index: Weighted composite score 0-100
                // 40% completion rate + 30% delay safety (100 - delay rate) + 30% average progress
                double delaySafety = 100.0 - kpis.ProjectDelayRate;
                kpis.ProjectHealthIndex = (0.4 * kpis.ProjectCompletionRate) + 
                                          (0.3 * Math.Max(0, delaySafety)) + 
                                          (0.3 * kpis.AverageProjectProgress);

                // Fleet KPIs
                kpis.TotalVehicles = summary.Fleet.Total;
                kpis.AvailableVehicles = summary.Fleet.Available;
                kpis.ActiveVehicles = summary.Fleet.Active;
                kpis.MaintenanceVehicles = summary.Fleet.InMaintenance;
                kpis.OutOfServiceVehicles = summary.Fleet.OutOfService;
                kpis.FleetUtilizationRate = summary.Fleet.UtilizationRate;
                kpis.FleetMaintenanceRate = summary.Fleet.MaintenanceRate;
                kpis.FleetAvailabilityRate = summary.Fleet.AvailabilityRate;
                kpis.FleetTotalCapacity = summary.Fleet.TotalCapacity;

                // Trip KPIs
                kpis.TotalTrips = summary.Trips.Total;
                kpis.ScheduledTrips = summary.Trips.Scheduled;
                kpis.InProgressTrips = summary.Trips.InProgress;
                kpis.CompletedTrips = summary.Trips.Completed;
                kpis.CancelledTrips = summary.Trips.Cancelled;
                kpis.TripCompletionRate = summary.Trips.CompletionRate;
                kpis.TripCancellationRate = summary.Trips.CancellationRate;
                kpis.TripOnTimeRate = summary.Trips.OnTimeRate;

                // Task KPIs
                kpis.TotalTasks = summary.Tasks.Total;
                kpis.ToDoTasks = summary.Tasks.ToDo;
                kpis.InProgressTasks = summary.Tasks.InProgress;
                kpis.InReviewTasks = summary.Tasks.InReview;
                kpis.DoneTasks = summary.Tasks.Done;
                kpis.OverdueTasks = summary.Tasks.Overdue;
                kpis.TaskCompletionRate = summary.Tasks.CompletionRate;
                kpis.TotalEstimatedHours = summary.Tasks.TotalEstimatedHours;

                // Milestone KPIs
                kpis.TotalMilestones = summary.Milestones.Total;
                kpis.CompletedMilestones = summary.Milestones.Completed;
                kpis.OverdueMilestones = summary.Milestones.Overdue;
                kpis.MilestoneCompletionRate = summary.Milestones.CompletionRate;

                // Executive KPIs
                kpis.TotalClients = summary.Clients.TotalClients;
                kpis.TotalContracts = summary.Clients.TotalContracts;
                kpis.TotalRoutes = summary.Routes.TotalRoutes;

                // Operational Performance Index: Weighted
                // 40% trip on-time rate + 30% task completion rate + 30% fleet utilization rate
                kpis.OperationalPerformanceIndex = (0.4 * kpis.TripOnTimeRate) + 
                                                   (0.3 * kpis.TaskCompletionRate) + 
                                                   (0.3 * kpis.FleetUtilizationRate);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error computing KPIs from portal summary.");
            }

            return kpis;
        }

        public async Task<List<PortalProjectDetail>> GetProjectsAsync()
        {
            var summary = await GetDashboardSummaryAsync();
            return summary?.ProjectDetails ?? new List<PortalProjectDetail>();
        }

        public async Task<PortalFleetSummary?> GetFleetSummaryAsync()
        {
            var summary = await GetDashboardSummaryAsync();
            return summary?.Fleet;
        }

        public async Task<bool> IsPortalAvailableAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync("api/dashboard/summary");
                return response.IsSuccessStatusCode;
            }
            catch
            {
                return false;
            }
        }

        public async Task<System.Text.Json.JsonElement?> GetProjectKpisAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync("api/dashboard/project-kpis");
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    return System.Text.Json.JsonSerializer.Deserialize<System.Text.Json.JsonElement>(json);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching project KPIs from portal API.");
            }
            return null;
        }

        public async Task<System.Text.Json.JsonElement?> GetComplianceKpisAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync("api/compliance/kpis");
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    return System.Text.Json.JsonSerializer.Deserialize<System.Text.Json.JsonElement>(json);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching compliance KPIs from portal API.");
            }
            return null;
        }

        public async Task<PortalOperationalAuditKpisDto?> GetOperationalAuditKpisAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync("api/operationalaudits/kpis");
                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadFromJsonAsync<PortalOperationalAuditKpisDto>();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching operational audit KPIs from portal API.");
            }
            return null;
        }
    }
}
