using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using project.Models;

namespace project.Data
{
    public static class IdentitySeeder
    {
        public static async Task SeedAsync(ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            // Apply migrations automatically (in development)
            if (context.Database.GetPendingMigrations().Any())
            {
                await context.Database.MigrateAsync();
            }

            // 1. Seed Roles
            string[] roles = { "SuperAdmin", "Admin", "Manager", "DepartmentUser" };
            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }

            // 2. Seed Departments
            var departments = new[]
            {
                new Department { NameAr = "قطاع العقود والاتفاقيات", NameEn = "Contracts & Agreements", Code = "contracts", Icon = "fa-file-signature" },
                new Department { NameAr = "قطاع الحج والعمرة", NameEn = "Hajj & Umrah", Code = "hajj", Icon = "fa-kaaba" },
                new Department { NameAr = "قطاع الإيجار والتشغيل", NameEn = "Rental & Operation", Code = "leasing", Icon = "fa-bus" },
                new Department { NameAr = "مؤشرات الأداء المالي", NameEn = "Financial Performance", Code = "finance", Icon = "fa-chart-line" },
                new Department { NameAr = "مؤشرات الفرع التجاري والعملاء", NameEn = "Commercial & Customers", Code = "commercial", Icon = "fa-users" },
                new Department { NameAr = "مؤشرات العمليات وأسطول الحافلات", NameEn = "Operations & Fleet", Code = "operations", Icon = "fa-tachometer-alt" },
                new Department { NameAr = "الموارد البشرية والتحول الرقمي", NameEn = "HR & Digital Transformation", Code = "hr", Icon = "fa-laptop-code" },
                new Department { NameAr = "السلامة HSE والامتثال والتدقيق", NameEn = "HSE & Compliance", Code = "hse", Icon = "fa-shield-virus" },
                new Department { NameAr = "مؤشرات الاستراتيجية والمشاريع PMO والحوكمة", NameEn = "Strategy, PMO & Governance", Code = "pmo", Icon = "fa-university" }
            };

            foreach (var dept in departments)
            {
                var existing = await context.Departments.FirstOrDefaultAsync(d => d.Code == dept.Code);
                if (existing == null)
                {
                    context.Departments.Add(dept);
                }
            }
            await context.SaveChangesAsync();

            // Refresh departments local copy
            var dbDepts = await context.Departments.ToListAsync();

            // Helper to get department id by code
            int GetDeptId(string code) => dbDepts.First(d => d.Code == code).Id;

            // 3. Seed Users
            var usersToSeed = new[]
            {
                new { Email = "ceo@rawahil.local", FullName = "CEO SuperAdmin", DisplayName = "الرئيس التنفيذي", Role = "SuperAdmin", DeptCodes = new string[0] },
                new { Email = "admin@rawahil.local", FullName = "Dashboard Admin", DisplayName = "مسؤول النظام", Role = "Admin", DeptCodes = new string[0] },
                new { Email = "contracts.manager@rawahil.local", FullName = "Contracts Manager", DisplayName = "مدير قطاع العقود", Role = "Manager", DeptCodes = new[] { "contracts" } },
                new { Email = "hajj.manager@rawahil.local", FullName = "Hajj Manager", DisplayName = "مدير قطاع الحج", Role = "Manager", DeptCodes = new[] { "hajj" } },
                new { Email = "rental.manager@rawahil.local", FullName = "Rental Manager", DisplayName = "مدير قطاع الإيجار", Role = "Manager", DeptCodes = new[] { "leasing" } },
                new { Email = "finance.user@rawahil.local", FullName = "Finance User", DisplayName = "مستخدم المالية", Role = "DepartmentUser", DeptCodes = new[] { "finance" } },
                new { Email = "operations.user@rawahil.local", FullName = "Operations User", DisplayName = "مستخدم العمليات والأسطول", Role = "DepartmentUser", DeptCodes = new[] { "operations" } },
                new { Email = "hse.user@rawahil.local", FullName = "HSE User", DisplayName = "مستخدم السلامة والامتثال", Role = "DepartmentUser", DeptCodes = new[] { "hse" } }
            };

            foreach (var u in usersToSeed)
            {
                var user = await userManager.FindByEmailAsync(u.Email);
                if (user == null)
                {
                    user = new ApplicationUser
                    {
                        UserName = u.Email,
                        Email = u.Email,
                        FullName = u.FullName,
                        ArabicDisplayName = u.DisplayName,
                        EmailConfirmed = true,
                        IsActive = true
                    };

                    var result = await userManager.CreateAsync(user, "Rawahil@12345");
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, u.Role);

                        // Assign departments
                        foreach (var code in u.DeptCodes)
                        {
                            context.UserDepartments.Add(new ApplicationUserDepartment
                            {
                                UserId = user.Id,
                                DepartmentId = GetDeptId(code)
                            });
                        }
                    }
                }
            }
            await context.SaveChangesAsync();
        }
    }
}
