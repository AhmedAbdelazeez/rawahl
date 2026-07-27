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
            string[] roles = { "SuperAdmin", "Admin", "Manager", "DepartmentUser", "TransportationManager", "PilgrimServicesManager" };
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
                new Department { NameAr = "قطاع الحج", NameEn = "Hajj Transport", Code = "hajj", Icon = "fa-kaaba" },
                new Department { NameAr = "قطاع العمرة", NameEn = "Umrah Transport", Code = "umrah", Icon = "fa-kaaba" },
                new Department { NameAr = "قطاع الإيجار والتشغيل", NameEn = "Rental & Operation", Code = "leasing", Icon = "fa-bus" },
                new Department { NameAr = "مؤشرات الأداء المالي", NameEn = "Financial Performance", Code = "finance", Icon = "fa-chart-line" },
                new Department { NameAr = "مؤشرات الفرع التجاري والعملاء", NameEn = "Commercial & Customers", Code = "commercial", Icon = "fa-users" },
                new Department { NameAr = "إدارة العمليات", NameEn = "Operations Department", Code = "operations", Icon = "fa-tachometer-alt" },
                new Department { NameAr = "إدارة الأسطول", NameEn = "Fleet Department", Code = "fleet", Icon = "fa-bus" },
                new Department { NameAr = "الموارد البشرية والتحول الرقمي", NameEn = "HR & Digital Transformation", Code = "hr", Icon = "fa-laptop-code" },
                new Department { NameAr = "الصحة والسلامة والبيئة HSE", NameEn = "Health, Safety & Environment", Code = "hse", Icon = "fa-shield-virus" },
                new Department { NameAr = "التدقيق الداخلي والرقابة", NameEn = "Internal Audit & Governance", Code = "audit", Icon = "fa-university" },
                new Department { NameAr = "مؤشرات الاستراتيجية والمشاريع PMO والحوكمة", NameEn = "Strategy, PMO & Governance", Code = "pmo", Icon = "fa-chart-pie" },
                new Department { NameAr = "قسم السياحة", NameEn = "Tourism Department", Code = "tourism", Icon = "fa-umbrella-beach" },
                new Department { NameAr = "خدمة إصدار التأشيرات", NameEn = "Visa Issuance Service", Code = "visa", Icon = "fa-passport" },
                new Department { NameAr = "حجز الفنادق والإيواء", NameEn = "Hotel Booking & Accommodation", Code = "hotels", Icon = "fa-hotel" },
                new Department { NameAr = "خدمة نقل المعتمرين", NameEn = "Pilgrim Transport Service", Code = "transport", Icon = "fa-bus-simple" },
                new Department { NameAr = "خدمات الضيافة والإعاشة", NameEn = "Hospitality & Catering Service", Code = "hospitality", Icon = "fa-utensils" }
            };

            foreach (var dept in departments)
            {
                var existing = await context.Departments.FirstOrDefaultAsync(d => d.Code == dept.Code);
                if (existing == null)
                {
                    context.Departments.Add(dept);
                }
                else
                {
                    existing.NameAr = dept.NameAr;
                    existing.NameEn = dept.NameEn;
                    existing.Icon = dept.Icon;
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
                new { Email = "Gassan@Rawahel.com", Password = "r@12345", FullName = "Ghassan", DisplayName = "غسان", Role = "SuperAdmin", DeptCodes = new string[0] },
                new { Email = "ceo@rawahil.local", Password = "Rawahil@12345", FullName = "CEO SuperAdmin", DisplayName = "الرئيس التنفيذي", Role = "SuperAdmin", DeptCodes = new string[0] },
                new { Email = "admin@rawahil.local", Password = "Rawahil@12345", FullName = "Dashboard Admin", DisplayName = "مسؤول النظام", Role = "Admin", DeptCodes = new string[0] },
                
                // Transportation Company General Manager
                new { Email = "transportation.manager@rawahil.local", Password = "Rawahil@12345", FullName = "Transportation General Manager", DisplayName = "مدير عام قطاع النقل", Role = "TransportationManager", DeptCodes = new[] { "contracts", "hajj", "umrah", "leasing", "finance", "commercial", "operations", "fleet", "hr", "hse", "audit", "pmo" } },

                // Transportation Company Department Users
                new { Email = "contracts.manager@rawahil.local", Password = "Rawahil@12345", FullName = "Contracts Manager", DisplayName = "مدير قطاع العقود", Role = "Manager", DeptCodes = new[] { "contracts" } },
                new { Email = "hajj.manager@rawahil.local", Password = "Rawahil@12345", FullName = "Hajj Manager", DisplayName = "مدير قطاع الحج", Role = "Manager", DeptCodes = new[] { "hajj" } },
                new { Email = "rental.manager@rawahil.local", Password = "Rawahil@12345", FullName = "Rental Manager", DisplayName = "مدير قطاع الإيجار", Role = "Manager", DeptCodes = new[] { "leasing" } },
                new { Email = "finance.user@rawahil.local", Password = "Rawahil@12345", FullName = "Finance User", DisplayName = "مستخدم المالية", Role = "DepartmentUser", DeptCodes = new[] { "finance" } },
                new { Email = "operations.user@rawahil.local", Password = "Rawahil@12345", FullName = "Operations User", DisplayName = "مستخدم العمليات والأسطول", Role = "DepartmentUser", DeptCodes = new[] { "operations" } },
                new { Email = "fleet.user@rawahil.local", Password = "Rawahil@12345", FullName = "Fleet User", DisplayName = "مستخدم إدارة الأسطول", Role = "DepartmentUser", DeptCodes = new[] { "fleet" } },
                new { Email = "hse.user@rawahil.local", Password = "Rawahil@12345", FullName = "HSE User", DisplayName = "مستخدم السلامة والامتثال", Role = "DepartmentUser", DeptCodes = new[] { "hse" } },
                new { Email = "commercial.user@rawahil.local", Password = "Rawahil@12345", FullName = "Commercial User", DisplayName = "مستخدم الفرع التجاري", Role = "DepartmentUser", DeptCodes = new[] { "commercial" } },
                new { Email = "hr.user@rawahil.local", Password = "Rawahil@12345", FullName = "HR User", DisplayName = "مستخدم الموارد البشرية", Role = "DepartmentUser", DeptCodes = new[] { "hr" } },
                new { Email = "pmo.user@rawahil.local", Password = "Rawahil@12345", FullName = "PMO User", DisplayName = "مستخدم الاستراتيجية والمشاريع", Role = "DepartmentUser", DeptCodes = new[] { "pmo" } },
                new { Email = "umrah.user@rawahil.local", Password = "Rawahil@12345", FullName = "Umrah User", DisplayName = "مستخدم قطاع العمرة", Role = "DepartmentUser", DeptCodes = new[] { "umrah" } },
                new { Email = "audit.user@rawahil.local", Password = "Rawahil@12345", FullName = "Audit User", DisplayName = "مستخدم التدقيق والرقابة", Role = "DepartmentUser", DeptCodes = new[] { "audit" } },

                // Tourism Company Users
                new { Email = "tourism.admin@rawahil.local", Password = "Rawahil@12345", FullName = "Tourism Admin", DisplayName = "مدير عام السياحة والخدمات", Role = "PilgrimServicesManager", DeptCodes = new[] { "tourism", "visa", "hotels", "transport", "hospitality" } },
                new { Email = "visa.user@rawahil.local", Password = "Rawahil@12345", FullName = "Visa Service User", DisplayName = "مستخدم خدمة التأشيرات", Role = "DepartmentUser", DeptCodes = new[] { "visa" } },
                new { Email = "hotel.user@rawahil.local", Password = "Rawahil@12345", FullName = "Hotel Service User", DisplayName = "مستخدم خدمة الفنادق", Role = "DepartmentUser", DeptCodes = new[] { "hotels" } },
                new { Email = "transport.user@rawahil.local", Password = "Rawahil@12345", FullName = "Transport Service User", DisplayName = "مستخدم خدمات النقل", Role = "DepartmentUser", DeptCodes = new[] { "transport" } },
                new { Email = "hospitality.user@rawahil.local", Password = "Rawahil@12345", FullName = "Hospitality Service User", DisplayName = "مستخدم خدمات الإعاشة", Role = "DepartmentUser", DeptCodes = new[] { "hospitality" } }
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

                    var result = await userManager.CreateAsync(user, u.Password);
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
                else
                {
                    // Ensure existing user has password updated if needed and is active
                    var resetToken = await userManager.GeneratePasswordResetTokenAsync(user);
                    await userManager.ResetPasswordAsync(user, resetToken, u.Password);
                    user.IsActive = true;
                    await userManager.UpdateAsync(user);
                }
            }
            await context.SaveChangesAsync();
        }
    }
}
