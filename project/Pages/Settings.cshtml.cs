using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Threading.Tasks;
using project.Services;

namespace project.Pages
{
    [Authorize(Policy = "CanManageSettings")]
    public class SettingsModel : PageModel
    {
        private readonly ICurrentUserService _currentUserService;

        public SettingsModel(ICurrentUserService currentUserService)
        {
            _currentUserService = currentUserService;
        }

        public string UserArabicDisplayName { get; set; } = string.Empty;
        public bool IsSuperAdmin { get; set; }

        public async Task OnGetAsync()
        {
            UserArabicDisplayName = await _currentUserService.GetArabicDisplayNameAsync();
            IsSuperAdmin = await _currentUserService.IsSuperAdminAsync();
        }
    }
}
