using System;
using System.Collections.Generic;

namespace project.Models
{
    /// <summary>
    /// Root DTO returned by the New Portal's /api/dashboard/summary endpoint
    /// </summary>
    public class PortalDashboardSummary
    {
        public PortalProjectsSummary Projects { get; set; } = new();
        public PortalFleetSummary Fleet { get; set; } = new();
        public PortalTripsSummary Trips { get; set; } = new();
        public PortalTasksSummary Tasks { get; set; } = new();
        public PortalMilestonesSummary Milestones { get; set; } = new();
        public PortalClientsSummary Clients { get; set; } = new();
        public PortalRoutesSummary Routes { get; set; } = new();
        public List<PortalProjectDetail> ProjectDetails { get; set; } = new();
        public List<PortalVehicle> AllVehicles { get; set; } = new();
        public List<PortalTrip> RecentTrips { get; set; } = new();
        public List<PortalTask> RecentTasks { get; set; } = new();
        public DateTime GeneratedAt { get; set; }
    }

    public class PortalProjectsSummary
    {
        public int Total { get; set; }
        public int Active { get; set; }
        public int Completed { get; set; }
        public int OnHold { get; set; }
        public int Planning { get; set; }
        public int Delayed { get; set; }
        public int NewThisMonth { get; set; }
        public double AverageCompletion { get; set; }
        public decimal TotalContractValue { get; set; }
        public decimal AverageContractValue { get; set; }
        public double CompletionRate { get; set; }
        public double DelayRate { get; set; }
        public int TotalRequiredVehicles { get; set; }
        public int TotalEstimatedTrips { get; set; }
    }

    public class PortalFleetSummary
    {
        public int Total { get; set; }
        public int Available { get; set; }
        public int Active { get; set; }
        public int InMaintenance { get; set; }
        public int OutOfService { get; set; }
        public double UtilizationRate { get; set; }
        public double MaintenanceRate { get; set; }
        public double AvailabilityRate { get; set; }
        public decimal TotalCapacity { get; set; }
        public decimal AverageCapacity { get; set; }
    }

    public class PortalTripsSummary
    {
        public int Total { get; set; }
        public int Scheduled { get; set; }
        public int InProgress { get; set; }
        public int Completed { get; set; }
        public int Cancelled { get; set; }
        public double CompletionRate { get; set; }
        public double CancellationRate { get; set; }
        public double OnTimeRate { get; set; }
        public decimal TotalDistanceKm { get; set; }
    }

    public class PortalTasksSummary
    {
        public int Total { get; set; }
        public int ToDo { get; set; }
        public int InProgress { get; set; }
        public int InReview { get; set; }
        public int Done { get; set; }
        public int Overdue { get; set; }
        public double CompletionRate { get; set; }
        public decimal TotalEstimatedHours { get; set; }
    }

    public class PortalMilestonesSummary
    {
        public int Total { get; set; }
        public int Completed { get; set; }
        public int Overdue { get; set; }
        public int Upcoming { get; set; }
        public double CompletionRate { get; set; }
    }

    public class PortalClientsSummary
    {
        public int TotalClients { get; set; }
        public int TotalContracts { get; set; }
        public decimal TotalContractValue { get; set; }
    }

    public class PortalRoutesSummary
    {
        public int TotalRoutes { get; set; }
        public decimal TotalDistanceKm { get; set; }
    }

    public class PortalProjectDetail
    {
        public int Id { get; set; }
        public string NameEn { get; set; } = string.Empty;
        public string NameAr { get; set; } = string.Empty;
        public string DescriptionEn { get; set; } = string.Empty;
        public string DescriptionAr { get; set; } = string.Empty;
        public string ClientName { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Status { get; set; }
        public string StatusName { get; set; } = string.Empty;
        public decimal ContractValue { get; set; }
        public int RequiredVehiclesCount { get; set; }
        public int EstimatedTripsCount { get; set; }
        public int TotalTrips { get; set; }
        public int CompletedTrips { get; set; }
        public int ActiveTrips { get; set; }
        public int CancelledTrips { get; set; }
        public double CompletionPercentage { get; set; }
        public int TotalTasks { get; set; }
        public int CompletedTasks { get; set; }
        public int TotalMilestones { get; set; }
        public int CompletedMilestones { get; set; }
        public bool IsDelayed { get; set; }
        public List<PortalTask> Tasks { get; set; } = new();
        public List<PortalMilestoneSummary> Milestones { get; set; } = new();
    }

    public class PortalMilestoneSummary
    {
        public int Id { get; set; }
        public string TitleEn { get; set; } = string.Empty;
        public string TitleAr { get; set; } = string.Empty;
        public DateTime DueDate { get; set; }
        public bool IsCompleted { get; set; }
    }

    public class PortalVehicle
    {
        public int Id { get; set; }
        public string LicensePlate { get; set; } = string.Empty;
        public string Make { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public int Year { get; set; }
        public decimal Capacity { get; set; }
        public int Status { get; set; }
    }

    public class PortalTrip
    {
        public int Id { get; set; }
        public int VehicleId { get; set; }
        public string VehiclePlate { get; set; } = string.Empty;
        public int RouteId { get; set; }
        public string RouteName { get; set; } = string.Empty;
        public string DriverId { get; set; } = string.Empty;
        public string DriverName { get; set; } = string.Empty;
        public DateTime ScheduledDeparture { get; set; }
        public DateTime ScheduledArrival { get; set; }
        public DateTime? ActualDeparture { get; set; }
        public DateTime? ActualArrival { get; set; }
        public int Status { get; set; }
        public int? ProjectId { get; set; }
        public string ProjectName { get; set; } = string.Empty;
    }

    public class PortalTask
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string ProjectName { get; set; } = string.Empty;
        public string TitleEn { get; set; } = string.Empty;
        public string TitleAr { get; set; } = string.Empty;
        public DateTime? StartDate { get; set; }
        public DateTime DueDate { get; set; }
        public decimal EstimatedHours { get; set; }
        public int Status { get; set; }
        public string? AssignedToUserId { get; set; }
        public string AssignedToUserName { get; set; } = string.Empty;
    }

    /// <summary>
    /// Computed KPI values from portal data
    /// </summary>
    public class DashboardKpiSet
    {
        // Project KPIs
        public int TotalProjects { get; set; }
        public int ActiveProjects { get; set; }
        public int CompletedProjects { get; set; }
        public int OnHoldProjects { get; set; }
        public int PlanningProjects { get; set; }
        public int DelayedProjects { get; set; }
        public int NewProjectsThisMonth { get; set; }
        public double ProjectCompletionRate { get; set; }
        public double ProjectDelayRate { get; set; }
        public double AverageProjectProgress { get; set; }
        public decimal TotalContractValue { get; set; }
        public decimal AverageContractValue { get; set; }
        public double ProjectHealthIndex { get; set; } // composite score 0-100

        // Fleet KPIs
        public int TotalVehicles { get; set; }
        public int AvailableVehicles { get; set; }
        public int ActiveVehicles { get; set; }
        public int MaintenanceVehicles { get; set; }
        public int OutOfServiceVehicles { get; set; }
        public double FleetUtilizationRate { get; set; }
        public double FleetMaintenanceRate { get; set; }
        public double FleetAvailabilityRate { get; set; }
        public decimal FleetTotalCapacity { get; set; }

        // Trip KPIs
        public int TotalTrips { get; set; }
        public int ScheduledTrips { get; set; }
        public int InProgressTrips { get; set; }
        public int CompletedTrips { get; set; }
        public int CancelledTrips { get; set; }
        public double TripCompletionRate { get; set; }
        public double TripCancellationRate { get; set; }
        public double TripOnTimeRate { get; set; }

        // Task KPIs
        public int TotalTasks { get; set; }
        public int ToDoTasks { get; set; }
        public int InProgressTasks { get; set; }
        public int InReviewTasks { get; set; }
        public int DoneTasks { get; set; }
        public int OverdueTasks { get; set; }
        public double TaskCompletionRate { get; set; }
        public decimal TotalEstimatedHours { get; set; }

        // Milestone KPIs
        public int TotalMilestones { get; set; }
        public int CompletedMilestones { get; set; }
        public int OverdueMilestones { get; set; }
        public double MilestoneCompletionRate { get; set; }

        // Executive KPIs
        public int TotalClients { get; set; }
        public int TotalContracts { get; set; }
        public int TotalRoutes { get; set; }
        public double OperationalPerformanceIndex { get; set; } // composite

        // Data freshness
        public bool IsLive { get; set; }
        public DateTime? LastUpdated { get; set; }
    }
}
