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
    public class CreateModel : PageModel
    {
        private readonly IUserManagementService _userManagementService;

        public CreateModel(IUserManagementService userManagementService)
        {
            _userManagementService = userManagementService;
        }

        [BindProperty]
        public InputModel Input { get; set; } = new InputModel();

        public IList<Department> AvailableDepartments { get; set; } = new List<Department>();
        
        public IList<string> RolesList { get; } = new List<string> { "SuperAdmin", "Admin", "Manager", "DepartmentUser" };

        public class InputModel
        {
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

            [Required(ErrorMessage = "كلمة المرور مطلوبة.")]
            [StringLength(100, ErrorMessage = "يجب أن تكون {0} بطول {2} على الأقل.", MinimumLength = 6)]
            [DataType(DataType.Password)]
            [Display(Name = "كلمة المرور")]
            public string Password { get; set; } = string.Empty;

            [Display(Name = "الحالة")]
            public bool IsActive { get; set; } = true;

            [Required(ErrorMessage = "الدور مطلوب.")]
            [Display(Name = "الدور الصلاحية")]
            public string SelectedRole { get; set; } = string.Empty;

            [Display(Name = "القطاعات المصرح بها")]
            public List<int> SelectedDepartmentIds { get; set; } = new List<int>();
        }

        public async Task OnGetAsync()
        {
            AvailableDepartments = await _userManagementService.GetAllDepartmentsAsync();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser
                {
                    UserName = Input.Email,
                    Email = Input.Email,
                    FullName = Input.FullName,
                    ArabicDisplayName = Input.ArabicDisplayName,
                    IsActive = Input.IsActive,
                    EmailConfirmed = true
                };

                var result = await _userManagementService.CreateUserAsync(user, Input.Password, Input.SelectedRole, Input.SelectedDepartmentIds);
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
