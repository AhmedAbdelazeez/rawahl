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

        public bool IsTransportationManager { get; set; }
        public bool IsPilgrimServicesManager { get; set; }

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
        }
    }
}
