using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Threading.Tasks;
using project.Services;

namespace project.Pages
{
    [Authorize]
    public class IndexModel : PageModel
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IDepartmentAccessService _departmentAccessService;

        public IndexModel(ICurrentUserService currentUserService, IDepartmentAccessService departmentAccessService)
        {
            _currentUserService = currentUserService;
            _departmentAccessService = departmentAccessService;
        }

        public string UserArabicDisplayName { get; set; } = string.Empty;
        public bool IsSuperAdmin { get; set; }
        public IList<string> AllowedDepartmentCodes { get; set; } = new List<string>();

        // ================= الإحصائيات المالية الأساسية =================
        [BindProperty]
        public double TotalRevenue { get; set; } = 142.5; // M ر.س
        [BindProperty]
        public double Ebitda { get; set; } = 34.5; // %
        [BindProperty]
        public double CashFlow { get; set; } = 48.0; // M
        [BindProperty]
        public double Roa { get; set; } = 10.5; // %

        // ================= الأداء التجاري والعملاء =================
        [BindProperty]
        public double CustRetention { get; set; } = 88.0; // %
        [BindProperty]
        public double Nps { get; set; } = 55.0; // نقاط
        [BindProperty]
        public double NewContracts { get; set; } = 12.0; // عقود

        // ================= العمليات وأسطول الحافلات =================
        [BindProperty]
        public double OpsPlan { get; set; } = 92.5; // %
        [BindProperty]
        public double FleetReady { get; set; } = 92.0; // %
        [BindProperty]
        public double FleetUtil { get; set; } = 80.0; // %

        // ================= الإدارات المساندة والدعم =================
        [BindProperty]
        public double HrRetention { get; set; } = 89.0; // %
        [BindProperty]
        public double ItAutomation { get; set; } = 78.0; // %
        [BindProperty]
        public double CriticalSuccession { get; set; } = 82.0; // %
        [BindProperty]
        public double Saudization { get; set; } = 38.5; // %
        [BindProperty]
        public double Ltifr { get; set; } = 1.2; 
        [BindProperty]
        public int Accidents { get; set; } = 0;
        [BindProperty]
        public double AuditCompliance { get; set; } = 91.0; // %
        [BindProperty]
        public double StrategicGoals { get; set; } = 82.0; // %
        [BindProperty]
        public double StrategicInitiatives { get; set; } = 85.0; // %
        [BindProperty]
        public double RiskHandling { get; set; } = 88.0; // %
        [BindProperty]
        public double GovMaturity { get; set; } = 90.0; // %
        [BindProperty]
        public double StratGoalsAchieve { get; set; } = 85.0; // %

        // ================= تفاصيل مسارات الإيرادات (Drill-Down) =================
        [BindProperty]
        public double RouteMakkahMadinah { get; set; } = 65.0; // M ر.س
        [BindProperty]
        public double RouteHaramain { get; set; } = 38.0; // M ر.س
        [BindProperty]
        public double RouteJeddahMakkah { get; set; } = 24.5; // M ر.س
        [BindProperty]
        public double RouteTourism { get; set; } = 15.0; // M ر.س

        // ================= تفاصيل رضا العملاء NPS (Drill-Down) =================
        [BindProperty]
        public double NpsCustomerService { get; set; } = 10.0; // % (المستهدف 50%)
        [BindProperty]
        public double NpsFleetDelay { get; set; } = 10.0; // % (المستهدف 5%)
        [BindProperty]
        public double NpsCleanliness { get; set; } = 94.0; // % (المستهدف 95%)
        [BindProperty]
        public double NpsComplaints { get; set; } = 12.0; // % (المستهدف 80%)

        // ================= إدارة الامتثال (Compliance Department) =================
        [BindProperty]
        public double CompOpsRate { get; set; } = 94.5; // نسبة الالتزام التشغيلي %
        [BindProperty]
        public int CompViolationsCount { get; set; } = 14; // عدد المخالفات المسجلة
        [BindProperty]
        public double CompClosureRate { get; set; } = 92.8; // نسبة إغلاق المخالفات %
        [BindProperty]
        public double CompResolutionTime { get; set; } = 3.2; // متوسط زمن معالجة المخالفة (أيام)
        [BindProperty]
        public double CompContractRate { get; set; } = 97.5; // نسبة الالتزام بالعقود %
        [BindProperty]
        public double CompPoliciesRate { get; set; } = 95.0; // نسبة الالتزام بالسياسات والإجراءات %
        [BindProperty]
        public double CompAuditResults { get; set; } = 91.5; // نتائج التدقيق الداخلي %
        [BindProperty]
        public int CompCriticalFindings { get; set; } = 2; // عدد الملاحظات الحرجة
        [BindProperty]
        public double CompMonthlyRate { get; set; } = 94.0; // معدل الامتثال الشهري %
        [BindProperty]
        public double CompImprovementRate { get; set; } = 88.5; // نسبة التحسين المستمر %

        // ================= مشروع نقل المتردد (Shuttle Project) =================
        [BindProperty]
        public int ShuttleBeneficiaries { get; set; } = 250000; // عدد المستفيدين
        [BindProperty]
        public int ShuttleTrips { get; set; } = 8500; // عدد الرحلات
        [BindProperty]
        public double ShuttleScheduleAdherence { get; set; } = 96.5; // نسبة الالتزام بالجدول %
        [BindProperty]
        public double ShuttleSatisfaction { get; set; } = 92.0; // نسبة رضا المستفيدين %
        [BindProperty]
        public double ShuttleTripCost { get; set; } = 45.0; // تكلفة الرحلة (ر.س)
        [BindProperty]
        public double ShuttleOccupancyRate { get; set; } = 84.0; // معدل الإشغال %
        [BindProperty]
        public int ShuttleComplaints { get; set; } = 12; // عدد الشكاوى
        [BindProperty]
        public double ShuttleOpsCompletion { get; set; } = 95.0; // نسبة إنجاز التشغيل %

        // ================= مشروع جولة مكة (Makkah Tour Project) =================
        [BindProperty]
        public int MakkahTourVisitors { get; set; } = 45000; // عدد الزوار
        [BindProperty]
        public int MakkahTourTours { get; set; } = 1200; // عدد الجولات المنفذة
        [BindProperty]
        public double MakkahTourSatisfaction { get; set; } = 94.0; // نسبة رضا العملاء %
        [BindProperty]
        public double MakkahTourRevenue { get; set; } = 3.6; // الإيرادات (مليون ر.س)
        [BindProperty]
        public double MakkahTourBookingRate { get; set; } = 78.0; // معدل الحجوزات %
        [BindProperty]
        public int MakkahTourActiveGuides { get; set; } = 35; // عدد المرشدين النشطين
        [BindProperty]
        public double MakkahTourPlanAdherence { get; set; } = 97.0; // نسبة الالتزام بالخطة التشغيلية %
        [BindProperty]
        public int MakkahTourRemarksComplaints { get; set; } = 8; // عدد الملاحظات والشكاوى

        // ================= New KPI Properties for Services (Tourism & Specialized Transport) =================
        [BindProperty]
        public double VisaIntegrationUptime { get; set; } = 99.8; // %
        [BindProperty]
        public double VisaDataErrorRate { get; set; } = 1.2; // %
        [BindProperty]
        public double VisaComplaintsRate { get; set; } = 2.4; // %

        [BindProperty]
        public double HotelAverageRoomRate { get; set; } = 320.0; // SAR
        [BindProperty]
        public int HotelOverbookingIncidents { get; set; } = 1;
        [BindProperty]
        public double HotelContractCompliance { get; set; } = 97.4; // %

        [BindProperty]
        public double PilgrimBusMaintenanceAdherence { get; set; } = 98.2; // %
        [BindProperty]
        public double PilgrimTripDuration { get; set; } = 4.5; // hours
        [BindProperty]
        public double PilgrimSatisfaction { get; set; } = 92.5; // %

        [BindProperty]
        public double MealWastePercentage { get; set; } = 3.5; // %
        [BindProperty]
        public double HospitalityStaffCompliance { get; set; } = 99.2; // %
        [BindProperty]
        public int HospitalityComplaints { get; set; } = 4;

        [BindProperty]
        public double ContractsRenewalRate { get; set; } = 94.0; // %
        [BindProperty]
        public double ContractsTurnaroundTime { get; set; } = 2.4; // days
        [BindProperty]
        public int ContractsLegalDisputes { get; set; } = 0;

        [BindProperty]
        public double HajjDriverAdherence { get; set; } = 98.5; // %
        [BindProperty]
        public double HajjFuelEfficiency { get; set; } = 91.2; // %
        [BindProperty]
        public double HajjSafetyTrainingRate { get; set; } = 96.0; // %

        [BindProperty]
        public double RentalFleetUtilization { get; set; } = 88.5; // %
        [BindProperty]
        public double RentalRevenuePerBus { get; set; } = 12500; // SAR
        [BindProperty]
        public double RentalContractSatisfaction { get; set; } = 94.2; // %
        [BindProperty]
        public double RentalMaintenanceAdherence { get; set; } = 97.8; // %
        [BindProperty]
        public double RentalSafetyCompliance { get; set; } = 99.5; // %
        [BindProperty]
        public int RentalActiveContracts { get; set; } = 45;

        // ================= مؤشرات أداء إضافية (New KPIs) =================
        [BindProperty]
        public double OpsD15 { get; set; } = 45.0; // time in minutes (Target: <= 60)
        [BindProperty]
        public double OpsD16 { get; set; } = 25.0; // time in minutes (Target: <= 30)
        [BindProperty]
        public double OpsD17 { get; set; } = 2.4; // % absence rate (Target: <= 5%)
        [BindProperty]
        public double OpsD18 { get; set; } = 98.0; // % operators count adherence (Target: 100%)
        [BindProperty]
        public double OpsD19 { get; set; } = 97.5; // % uniform compliance (Target: 100%)
        [BindProperty]
        public int OpsD20 { get; set; } = 0; // incidents (Target: <= 2)
        [BindProperty]
        public double OpsD21 { get; set; } = 35.0; // time in minutes (Target: <= 45)
        [BindProperty]
        public double OpsD22 { get; set; } = 40.0; // time in minutes (Target: <= 50)
        [BindProperty]
        public double OpsD23 { get; set; } = 55.0; // time in minutes (Target: <= 60)
        [BindProperty]
        public double OpsD24 { get; set; } = 99.0; // % contract standard adherence (Target: 100%)
        [BindProperty]
        public double OpsD25 { get; set; } = 98.5; // % capacity limit adherence (Target: 100%)
        [BindProperty]
        public double OpsD26 { get; set; } = 98.0; // % buses count adherence (Target: 100%)
        [BindProperty]
        public double OpsD27 { get; set; } = 99.2; // % directional signs adherence (Target: 100%)
        [BindProperty]
        public double OpsD28 { get; set; } = 97.8; // % operational signs adherence (Target: 100%)
        [BindProperty]
        public int OpsD29 { get; set; } = 0; // violations (Target: 0)
        [BindProperty]
        public double OpsD30 { get; set; } = 99.5; // % security guards availability (Target: 100%)
        [BindProperty]
        public double OpsD31 { get; set; } = 98.5; // % qualified buses (Target: 100%)
        [BindProperty]
        public double OpsD32 { get; set; } = 99.6; // % buses tracking coverage (Target: 100%)
        [BindProperty]
        public double ComD10 { get; set; } = 99.2; // % fleet cleaning compliance (Target: 100%)
        [BindProperty]
        public int HseD15 { get; set; } = 0; // violations (Target: 0)

        public bool IsTransportationManager { get; set; }
        public bool IsPilgrimServicesManager { get; set; }
        public bool ShowTransportationSector { get; set; }
        public bool ShowPilgrimSector { get; set; }

        public async Task OnGetAsync()
        {
            UserArabicDisplayName = await _currentUserService.GetArabicDisplayNameAsync();
            var isSuper = await _currentUserService.IsSuperAdminAsync();
            var isAdmin = await _currentUserService.IsAdminAsync();
            IsSuperAdmin = isSuper || isAdmin;
            
            var username = User.Identity?.Name;
            
            IsTransportationManager = User.IsInRole("TransportationManager") || 
                                      username == "transportation.manager@rawahil.local" || 
                                      username == "hajj.manager@rawahil.local" || 
                                      username == "rental.manager@rawahil.local" || 
                                      username == "contracts.manager@rawahil.local" ||
                                      User.IsInRole("Manager");
                                      
            IsPilgrimServicesManager = User.IsInRole("PilgrimServicesManager") || 
                                       username == "pilgrim.manager@rawahil.local";
            
            if (IsSuperAdmin)
            {
                IsTransportationManager = true;
                IsPilgrimServicesManager = true;
            }

            AllowedDepartmentCodes = await _departmentAccessService.GetAllowedDepartmentsAsync();

            // Enforce sector links in sidebar/overview based on roles or any assigned department in that sector
            ShowTransportationSector = IsTransportationManager || 
                                       System.Linq.Enumerable.Any(AllowedDepartmentCodes, code => new[] { "contracts", "hajj", "umrah", "leasing", "finance", "commercial", "operations", "fleet", "hr", "hse", "audit", "pmo" }.Contains(code));

            ShowPilgrimSector = IsPilgrimServicesManager || 
                                System.Linq.Enumerable.Any(AllowedDepartmentCodes, code => new[] { "tourism", "visa", "hotels", "transport", "hospitality" }.Contains(code));
        }
    }
}
