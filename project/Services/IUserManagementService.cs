using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using project.Models;

namespace project.Services
{
    public interface IUserManagementService
    {
        Task<IList<ApplicationUser>> GetAllUsersAsync();
        Task<ApplicationUser?> GetUserByIdAsync(string id);
        Task<IdentityResult> CreateUserAsync(ApplicationUser user, string password, string role, IList<int> departmentIds);
        Task<IdentityResult> UpdateUserAsync(ApplicationUser user, string? newPassword, string role, IList<int> departmentIds);
        Task<IdentityResult> DeleteUserAsync(string id);
        Task<IList<Department>> GetAllDepartmentsAsync();
        Task<IList<string>> GetUserRolesAsync(ApplicationUser user);
        Task<IList<int>> GetUserDepartmentIdsAsync(string userId);
    }
}
