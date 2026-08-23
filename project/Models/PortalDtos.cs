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

        // Operational Sub-metrics
        public double BusReplacementTime { get; set; } // ops-d-15
        public double StationEvacuationTime { get; set; } // ops-d-16
        public double DriverAbsenceRate { get; set; } // ops-d-17
        public double OperatorComplianceRate { get; set; } // ops-d-18
        public double UniformComplianceRate { get; set; } // ops-d-19
        public int BreakdownsCount { get; set; } // ops-d-20
        public double StationBreakdownResponseTime { get; set; } // ops-d-21
        public double InnerRouteBreakdownResponseTime { get; set; } // ops-d-22
        public double OuterRouteBreakdownResponseTime { get; set; } // ops-d-23
        public double ContractStandardComplianceRate { get; set; } // ops-d-24
        public double CapacityComplianceRate { get; set; } // ops-d-25
        public double BusCountComplianceRate { get; set; } // ops-d-26
        public double GuideBoardsComplianceRate { get; set; } // ops-d-27
        public double OperationalBoardsComplianceRate { get; set; } // ops-d-28
        public int UnauthorizedBusEntryViolations { get; set; } // ops-d-29
        public double SecurityGuardAvailabilityRate { get; set; } // ops-d-30
        public double SafetyQualifiedBusesRate { get; set; } // ops-d-31
        public double BusTrackingComplianceRate { get; set; } // ops-d-32
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
    public class PortalOperationalAuditDto
    {
        public int Id { get; set; }
        public string TitleEn { get; set; } = string.Empty;
        public string TitleAr { get; set; } = string.Empty;
        public DateTime AuditDate { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; } = string.Empty;
        public int AuditedProcessCount { get; set; }
        public int PassedProcessCount { get; set; }
        public int CriticalFindingsCount { get; set; }
        public int RecommendationsCount { get; set; }
        public double RiskMitigationRate { get; set; }
        public int Status { get; set; }
        public string Title { get; set; } = string.Empty;
    }

    public class PortalOperationalAuditKpisDto
    {
        public double AuditExecutionRateActual { get; set; }
        public double AuditExecutionRateTarget { get; set; }
        public double OperationalComplianceRateActual { get; set; }
        public double OperationalComplianceRateTarget { get; set; }
        public int TotalAuditedProcessesActual { get; set; }
        public int TotalAuditedProcessesTarget { get; set; }
        public int PassedProcessesCountActual { get; set; }
        public int PassedProcessesCountTarget { get; set; }
        public int CriticalFindingsCountActual { get; set; }
        public int CriticalFindingsCountTarget { get; set; }
        public int RecommendationsCountActual { get; set; }
        public int RecommendationsCountTarget { get; set; }
        public double RiskMitigationRateActual { get; set; }
        public double RiskMitigationRateTarget { get; set; }
        public List<PortalChartDataPoint> AuditsByStatus { get; set; } = new();
        public List<PortalChartDataPoint> ComplianceByDepartment { get; set; } = new();
    }

    public class PortalChartDataPoint
    {
        public string Label { get; set; } = string.Empty;
        public decimal Value { get; set; }
        public string Color { get; set; } = string.Empty;
    }

    public class PortalHrKpisDto
    {
        public double SaudizationRateActual { get; set; }
        public double SaudizationRateTarget { get; set; }

        public double RetentionRateActual { get; set; }
        public double RetentionRateTarget { get; set; }

        public double AvgRatingActual { get; set; }
        public double AvgRatingTarget { get; set; }

        public double AvgEvaluationActual { get; set; }
        public double AvgEvaluationTarget { get; set; }

        public int TotalEmployeesActual { get; set; }
        public int TotalEmployeesTarget { get; set; }

        public decimal AvgSalaryActual { get; set; }
        public decimal AvgSalaryTarget { get; set; }

        public double AvgTasksPerEmployeeActual { get; set; }
        public double AvgTasksPerEmployeeTarget { get; set; }
    }

    public class PortalItKpisDto
    {
        public double DigitalTransformationRateActual { get; set; }
        public double DigitalTransformationRateTarget { get; set; }

        public double SystemUptimeActual { get; set; }
        public double SystemUptimeTarget { get; set; }

        public double AvgTicketResolutionTimeActual { get; set; }
        public double AvgTicketResolutionTimeTarget { get; set; }

        public int CybersecurityIncidentsActual { get; set; }
        public int CybersecurityIncidentsTarget { get; set; }

        public double UserSatisfactionActual { get; set; }
        public double UserSatisfactionTarget { get; set; }

        public double BackupSuccessRateActual { get; set; }
        public double BackupSuccessRateTarget { get; set; }

        public double ItProjectDeliveryActual { get; set; }
        public double ItProjectDeliveryTarget { get; set; }
    }

    public class PortalHseKpisDto
    {
        public double LtifrActual { get; set; }
        public double LtifrTarget { get; set; }

        public int SeriousRoadAccidentsActual { get; set; }
        public int SeriousRoadAccidentsTarget { get; set; }

        public double RegulatoryComplianceRateActual { get; set; }
        public double RegulatoryComplianceRateTarget { get; set; }

        public double HseTrainingHoursActual { get; set; }
        public double HseTrainingHoursTarget { get; set; }

        public double SafetyInspectionsCompletionActual { get; set; }
        public double SafetyInspectionsCompletionTarget { get; set; }

        public int NearMissReportingActual { get; set; }
        public int NearMissReportingTarget { get; set; }

        public double WasteRecyclingRateActual { get; set; }
        public double WasteRecyclingRateTarget { get; set; }
    }

    public class PortalProcurementKpisDto
    {
        public double AvgProcurementCycleTimeActual { get; set; }
        public double AvgProcurementCycleTimeTarget { get; set; }

        public double CostSavingsRateActual { get; set; }
        public double CostSavingsRateTarget { get; set; }

        public double SupplierPerformanceRatingActual { get; set; }
        public double SupplierPerformanceRatingTarget { get; set; }

        public double BudgetComplianceActual { get; set; }
        public double BudgetComplianceTarget { get; set; }

        public double CriticalSparePartsAvailabilityActual { get; set; }
        public double CriticalSparePartsAvailabilityTarget { get; set; }

        public double InventoryAccuracyRateActual { get; set; }
        public double InventoryAccuracyRateTarget { get; set; }

        public int ActiveSupplyContractsActual { get; set; }
        public int ActiveSupplyContractsTarget { get; set; }
    }

    public class PortalStrategyKpisDto
    {
        public double StrategicGoalsAchievementActual { get; set; }
        public double StrategicGoalsAchievementTarget { get; set; }

        public double PmoInitiativeDeliveryActual { get; set; }
        public double PmoInitiativeDeliveryTarget { get; set; }

        public double RiskHandlingActual { get; set; }
        public double RiskHandlingTarget { get; set; }

        public double GovMaturityActual { get; set; }
        public double GovMaturityTarget { get; set; }

        public double StrategicGoalsAchieveMinedActual { get; set; }
        public double StrategicGoalsAchieveMinedTarget { get; set; }

        public double OnTimeMilestonesDeliveryActual { get; set; }
        public double OnTimeMilestonesDeliveryTarget { get; set; }

        public double StrategicBudgetEfficiencyActual { get; set; }
        public double StrategicBudgetEfficiencyTarget { get; set; }
    }

    public class PortalFinanceKpisDto
    {
        public decimal TotalRevenueActual { get; set; }
        public decimal TotalRevenueTarget { get; set; }

        public double EbitdaMarginActual { get; set; }
        public double EbitdaMarginTarget { get; set; }

        public double NetProfitMarginActual { get; set; }
        public double NetProfitMarginTarget { get; set; }

        public decimal OperatingCashFlowActual { get; set; }
        public decimal OperatingCashFlowTarget { get; set; }

        public double ReturnOnAssetsActual { get; set; }
        public double ReturnOnAssetsTarget { get; set; }

        public double BudgetVarianceRateActual { get; set; }
        public double BudgetVarianceRateTarget { get; set; }

        public decimal WorkingCapitalActual { get; set; }
        public decimal WorkingCapitalTarget { get; set; }
    }

    public class PortalCommercialKpisDto
    {
        public double CustomerRetentionRateActual { get; set; }
        public double CustomerRetentionRateTarget { get; set; }

        public int NewContractsSecuredActual { get; set; }
        public int NewContractsSecuredTarget { get; set; }

        public double ContractRenewalRateActual { get; set; }
        public double ContractRenewalRateTarget { get; set; }

        public double ContractTurnaroundTimeActual { get; set; }
        public double ContractTurnaroundTimeTarget { get; set; }

        public int ContractualLegalDisputesActual { get; set; }
        public int ContractualLegalDisputesTarget { get; set; }

        public decimal CustomerAcquisitionCostActual { get; set; }
        public decimal CustomerAcquisitionCostTarget { get; set; }

        public double ContractValueGrowthRateActual { get; set; }
        public double ContractValueGrowthRateTarget { get; set; }
    }

    public class PortalTourismKpisDto
    {
        public double HotelOccupancyRateActual { get; set; }
        public double HotelOccupancyRateTarget { get; set; }

        public double BookingCancellationRateActual { get; set; }
        public double BookingCancellationRateTarget { get; set; }

        public double AverageGuestRatingActual { get; set; }
        public double AverageGuestRatingTarget { get; set; }

        public int ToursCompletedActual { get; set; }
        public int ToursCompletedTarget { get; set; }

        public decimal RevParActual { get; set; }
        public decimal RevParTarget { get; set; }

        public double BookingLeadTimeActual { get; set; }
        public double BookingLeadTimeTarget { get; set; }

        public int ActiveTourGuidesActual { get; set; }
        public int ActiveTourGuidesTarget { get; set; }
    }

    public class PortalOperationsKpisDto
    {
        public double PlanAdherenceActual { get; set; }
        public double PlanAdherenceTarget { get; set; }

        public double FleetUtilizationActual { get; set; }
        public double FleetUtilizationTarget { get; set; }

        public double AvgBreakdownResponseActual { get; set; }
        public double AvgBreakdownResponseTarget { get; set; }

        public int ViolationsCountActual { get; set; }
        public int ViolationsCountTarget { get; set; }

        public double PassengerSatisfactionActual { get; set; }
        public double PassengerSatisfactionTarget { get; set; }

        public int ScheduledTripsActual { get; set; }
        public int ScheduledTripsTarget { get; set; }

        public double FuelEfficiencyActual { get; set; }
        public double FuelEfficiencyTarget { get; set; }

        // On-Time Performance (OTP) Rate (%) - computed from real Trip records
        public double OnTimePerformanceActual { get; set; }
        public double OnTimePerformanceTarget { get; set; }

        // Total Trips Executed - from real Trip records
        public int TotalTripsExecutedActual { get; set; }
        public int TotalTripsExecutedTarget { get; set; }

        // Active Drivers Count - distinct drivers with at least one trip
        public int ActiveDriversCountActual { get; set; }
        public int ActiveDriversCountTarget { get; set; }

        // Fuel/Odometer Efficiency (Km per Liter)
        public double FuelOdometerEfficiencyActual { get; set; }
        public double FuelOdometerEfficiencyTarget { get; set; }
    }

    public class PortalMaintenanceKpisDto
    {
        public double MeanTimeToRepairHours { get; set; }
        public int TotalBreakdowns { get; set; }
        public double FleetAvailabilityRate { get; set; }
        public decimal TotalSparePartsCost { get; set; }
        public double ActiveBusesRate { get; set; }
        public double MaintenanceBacklogRate { get; set; }
        public List<PortalBusBreakdownFrequencyDto> TopFrequentBreakdowns { get; set; } = new();
    }

    public class PortalBusBreakdownFrequencyDto
    {
        public string VehiclePlate { get; set; } = string.Empty;
        public int BreakdownCount { get; set; }
    }
}
