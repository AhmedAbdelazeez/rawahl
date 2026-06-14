using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
    public class EditModel : PageModel
    {
        private readonly IUserManagementService _userManagementService;

        public EditModel(IUserManagementService userManagementService)
        {
            _userManagementService = userManagementService;
        }

        [BindProperty]
        public InputModel Input { get; set; } = new InputModel();

        public IList<Department> AvailableDepartments { get; set; } = new List<Department>();
        
        public IList<string> RolesList { get; } = new List<string> { "SuperAdmin", "Admin", "Manager", "DepartmentUser" };

        public class InputModel
        {
            [Required]
            public string Id { get; set; } = string.Empty;

            [Required(ErrorMessage = "البريد الإلكتروني مطلوب.")]
            [EmailAddress(ErrorMessage = "البريد الإلكتروني غير صالح.")]
            [Display(Name = "البريد الإلكتروني")]
            public string Email { get; set; } = string.Empty;

            [Required(ErrorMessage = "الاسم الكامل مطلوب.")]
            [Display(Name = "الاسم الكامل (إنجليزي)")]
            public string FullName { get; set; } = string.Empty;

            [Required(ErrorMessage = "الاسم العربي مطلوب.")]
            [Display(Name = "الاسم المعروض (عربي)")]
            public string ArabicDisplayName { get; set; } = string.Empty;

            [StringLength(100, ErrorMessage = "يجب أن تكون {0} بطول {2} على الأقل.", MinimumLength = 6)]
            [DataType(DataType.Password)]
            [Display(Name = "كلمة المرور الجديدة (اختياري)")]
            public string? Password { get; set; }

            [Display(Name = "الحالة")]
            public bool IsActive { get; set; }

            [Required(ErrorMessage = "الدور مطلوب.")]
            [Display(Name = "الدور الصلاحية")]
            public string SelectedRole { get; set; } = string.Empty;

            [Display(Name = "القطاعات المصرح بها")]
            public List<int> SelectedDepartmentIds { get; set; } = new List<int>();
        }

        public async Task<IActionResult> OnGetAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return RedirectToPage("./Index");
            }

            var user = await _userManagementService.GetUserByIdAsync(id);
            if (user == null)
            {
                return RedirectToPage("./Index");
            }

            var roles = await _userManagementService.GetUserRolesAsync(user);
            var deptIds = await _userManagementService.GetUserDepartmentIdsAsync(user.Id);

            Input = new InputModel
            {
                Id = user.Id,
                Email = user.Email ?? string.Empty,
                FullName = user.FullName,
                ArabicDisplayName = user.ArabicDisplayName,
                IsActive = user.IsActive,
                SelectedRole = roles.FirstOrDefault() ?? string.Empty,
                SelectedDepartmentIds = deptIds.ToList()
            };

            AvailableDepartments = await _userManagementService.GetAllDepartmentsAsync();
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser
                {
                    Id = Input.Id,
                    Email = Input.Email,
                    FullName = Input.FullName,
                    ArabicDisplayName = Input.ArabicDisplayName,
                    IsActive = Input.IsActive
                };

                // Prevent deactivating own user or the core SuperAdmin
                if (Input.Email == "ceo@rawahil.local" && !Input.IsActive)
                {
                    ModelState.AddModelError(string.Empty, "لا يمكن تعطيل حساب المدير العام الرئيسي.");
                    AvailableDepartments = await _userManagementService.GetAllDepartmentsAsync();
                    return Page();
                }

                var result = await _userManagementService.UpdateUserAsync(user, Input.Password, Input.SelectedRole, Input.SelectedDepartmentIds);
                if (result.Succeeded)
                {
                    return RedirectToPage("./Index");
                }

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            // If we got here, something failed
            AvailableDepartments = await _userManagementService.GetAllDepartmentsAsync();
            return Page();
        }
    }
}
