using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using project.Data;
using project.Models;

namespace project.Services
{
    public class UserManagementService : IUserManagementService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _dbContext;

        public UserManagementService(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _dbContext = dbContext;
        }

        public async Task<IList<ApplicationUser>> GetAllUsersAsync()
        {
            return await _userManager.Users
                .OrderBy(u => u.Email)
                .ToListAsync();
        }

        public async Task<ApplicationUser?> GetUserByIdAsync(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }

        public async Task<IdentityResult> CreateUserAsync(ApplicationUser user, string password, string role, IList<int> departmentIds)
        {
            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;
            var result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded)
            {
                return result;
            }

            // Assign role
            if (!string.IsNullOrEmpty(role))
            {
                var roleResult = await _userManager.AddToRoleAsync(user, role);
                if (!roleResult.Succeeded)
                {
                    return roleResult;
                }
            }

            // Assign departments
            if (departmentIds != null && departmentIds.Any())
            {
                foreach (var deptId in departmentIds)
                {
                    _dbContext.UserDepartments.Add(new ApplicationUserDepartment
                    {
                        UserId = user.Id,
                        DepartmentId = deptId
                    });
                }
                await _dbContext.SaveChangesAsync();
            }

            return IdentityResult.Success;
        }

        public async Task<IdentityResult> UpdateUserAsync(ApplicationUser user, string? newPassword, string role, IList<int> departmentIds)
        {
            var dbUser = await _userManager.FindByIdAsync(user.Id);
            if (dbUser == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "User not found." });
            }

            dbUser.FullName = user.FullName;
            dbUser.ArabicDisplayName = user.ArabicDisplayName;
            dbUser.Email = user.Email;
            dbUser.UserName = user.Email;
            dbUser.IsActive = user.IsActive;
            dbUser.UpdatedAt = DateTime.UtcNow;

            var result = await _userManager.UpdateAsync(dbUser);
            if (!result.Succeeded)
            {
                return result;
            }

            // Update Password if provided
            if (!string.IsNullOrWhiteSpace(newPassword))
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(dbUser);
                var passResult = await _userManager.ResetPasswordAsync(dbUser, token, newPassword);
                if (!passResult.Succeeded)
                {
                    return passResult;
                }
            }

            // Update Roles
            var currentRoles = await _userManager.GetRolesAsync(dbUser);
            if (!currentRoles.Contains(role))
            {
                await _userManager.RemoveFromRolesAsync(dbUser, currentRoles);
                if (!string.IsNullOrEmpty(role))
                {
                    await _userManager.AddToRoleAsync(dbUser, role);
                }
            }

            // Update Departments
            var currentDepts = await _dbContext.UserDepartments
                .Where(ud => ud.UserId == dbUser.Id)
                .ToListAsync();

            _dbContext.UserDepartments.RemoveRange(currentDepts);

            if (departmentIds != null && departmentIds.Any())
            {
                foreach (var deptId in departmentIds)
                {
                    _dbContext.UserDepartments.Add(new ApplicationUserDepartment
                    {
                        UserId = dbUser.Id,
                        DepartmentId = deptId
                    });
                }
            }

            await _dbContext.SaveChangesAsync();
            return IdentityResult.Success;
        }

        public async Task<IdentityResult> DeleteUserAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "User not found." });
            }

            var result = await _userManager.DeleteAsync(user);
            return result;
        }

        public async Task<IList<Department>> GetAllDepartmentsAsync()
        {
            return await _dbContext.Departments
                .OrderBy(d => d.NameAr)
                .ToListAsync();
        }

        public async Task<IList<string>> GetUserRolesAsync(ApplicationUser user)
        {
            return await _userManager.GetRolesAsync(user);
        }

        public async Task<IList<int>> GetUserDepartmentIdsAsync(string userId)
        {
            return await _dbContext.UserDepartments
                .Where(ud => ud.UserId == userId)
                .Select(ud => ud.DepartmentId)
                .ToListAsync();
        }
    }
}
