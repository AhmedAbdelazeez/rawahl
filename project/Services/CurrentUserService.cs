using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using project.Data;
using project.Models;

namespace project.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _dbContext;

        public CurrentUserService(
            IHttpContextAccessor httpContextAccessor,
            UserManager<ApplicationUser> userManager,
            ApplicationDbContext dbContext)
        {
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
            _dbContext = dbContext;
        }

        public string? UserId => _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        public string? UserName => _httpContextAccessor.HttpContext?.User?.Identity?.Name;
        public bool IsAuthenticated => _httpContextAccessor.HttpContext?.User?.Identity?.IsAuthenticated ?? false;

        public async Task<string> GetFullNameAsync()
        {
            var user = await GetCurrentUserAsync();
            return user?.FullName ?? string.Empty;
        }

        public async Task<string> GetArabicDisplayNameAsync()
        {
            var user = await GetCurrentUserAsync();
            return user?.ArabicDisplayName ?? string.Empty;
        }

        public async Task<IList<string>> GetRolesAsync()
        {
            var user = await GetCurrentUserAsync();
            if (user == null) return new List<string>();
            return await _userManager.GetRolesAsync(user);
        }

        public async Task<bool> IsSuperAdminAsync()
        {
            var roles = await GetRolesAsync();
            return roles.Contains("SuperAdmin");
        }

        public async Task<bool> IsAdminAsync()
        {
            var roles = await GetRolesAsync();
            return roles.Contains("SuperAdmin") || roles.Contains("Admin");
        }

        public async Task<IList<string>> GetAssignedDepartmentCodesAsync()
        {
            var userId = UserId;
            if (string.IsNullOrEmpty(userId)) return new List<string>();

            // If the user is SuperAdmin or Admin, they can access all departments
            if (await IsAdminAsync())
            {
                return await _dbContext.Departments
                    .Select(d => d.Code)
                    .ToListAsync();
            }

            return await _dbContext.UserDepartments
                .Where(ud => ud.UserId == userId)
                .Select(ud => ud.Department.Code)
                .ToListAsync();
        }

        private async Task<ApplicationUser?> GetCurrentUserAsync()
        {
            var userId = UserId;
            if (string.IsNullOrEmpty(userId)) return null;
            return await _userManager.FindByIdAsync(userId);
        }
    }
}
