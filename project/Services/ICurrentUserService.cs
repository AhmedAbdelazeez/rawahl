using System.Collections.Generic;
using System.Threading.Tasks;

namespace project.Services
{
    public interface ICurrentUserService
    {
        string? UserId { get; }
        string? UserName { get; }
        bool IsAuthenticated { get; }
        Task<string> GetFullNameAsync();
        Task<string> GetArabicDisplayNameAsync();
        Task<IList<string>> GetRolesAsync();
        Task<bool> IsSuperAdminAsync();
        Task<bool> IsAdminAsync();
        Task<IList<string>> GetAssignedDepartmentCodesAsync();
    }
}
