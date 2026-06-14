using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using project.Models;
using project.Services;

namespace project.Pages.Users
{
    [Authorize(Policy = "CanManageUsers")]
    public class IndexModel : PageModel
    {
        private readonly IUserManagementService _userManagementService;

        public IndexModel(IUserManagementService userManagementService)
        {
            _userManagementService = userManagementService;
        }

        public IList<UserViewModel> UsersList { get; set; } = new List<UserViewModel>();

        [BindProperty(SupportsGet = true)]
        public string? SearchTerm { get; set; }

        public class UserViewModel
        {
            public string Id { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string FullName { get; set; } = string.Empty;
            public string ArabicDisplayName { get; set; } = string.Empty;
            public bool IsActive { get; set; }
            public string Role { get; set; } = string.Empty;
            public IList<string> Departments { get; set; } = new List<string>();
            public DateTime? LastLoginAt { get; set; }
        }

        public async Task OnGetAsync()
        {
            var dbUsers = await _userManagementService.GetAllUsersAsync();
            var departments = await _userManagementService.GetAllDepartmentsAsync();

            var list = new List<UserViewModel>();

            foreach (var user in dbUsers)
            {
                var roles = await _userManagementService.GetUserRolesAsync(user);
                var deptIds = await _userManagementService.GetUserDepartmentIdsAsync(user.Id);

                var userDepts = departments
                    .Where(d => deptIds.Contains(d.Id))
                    .Select(d => d.NameAr)
                    .ToList();

                list.Add(new UserViewModel
                {
                    Id = user.Id,
                    Email = user.Email ?? string.Empty,
                    FullName = user.FullName,
                    ArabicDisplayName = user.ArabicDisplayName,
                    IsActive = user.IsActive,
                    Role = roles.FirstOrDefault() ?? "بدون دور",
                    Departments = userDepts,
                    LastLoginAt = user.LastLoginAt
                });
            }

            if (!string.IsNullOrWhiteSpace(SearchTerm))
            {
                var term = SearchTerm.ToLower();
                list = list.Where(u => 
                    u.Email.ToLower().Contains(term) || 
                    u.FullName.ToLower().Contains(term) || 
                    u.ArabicDisplayName.Contains(term) ||
                    u.Role.Contains(term)
                ).ToList();
            }

            UsersList = list;
        }

        public async Task<IActionResult> OnPostDeleteAsync(string id)
        {
            var result = await _userManagementService.DeleteUserAsync(id);
            if (result.Succeeded)
            {
                return RedirectToPage();
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            // Reload data
            await OnGetAsync();
            return Page();
        }
    }
}
