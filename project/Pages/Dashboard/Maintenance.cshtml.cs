using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Threading.Tasks;
using project.Services;

namespace project.Pages.Dashboard
{
    [Authorize]
    public class MaintenanceModel : PageModel
    {
        private readonly IDepartmentAccessService _departmentAccessService;
        private readonly ICurrentUserService _currentUserService;

        public MaintenanceModel(IDepartmentAccessService departmentAccessService, ICurrentUserService currentUserService)
        {
            _departmentAccessService = departmentAccessService;
            _currentUserService = currentUserService;
        }

        public string UserArabicDisplayName { get; set; } = string.Empty;

        public async Task<IActionResult> OnGetAsync()
        {
            if (!await _departmentAccessService.CanAccessDepartmentAsync("maintenance"))
            {
                return RedirectToPage("/Account/AccessDenied");
            }

            UserArabicDisplayName = await _currentUserService.GetArabicDisplayNameAsync();
            return Page();
        }
    }
}
