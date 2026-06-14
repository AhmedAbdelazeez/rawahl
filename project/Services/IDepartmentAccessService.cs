using System.Collections.Generic;
using System.Threading.Tasks;

namespace project.Services
{
    public interface IDepartmentAccessService
    {
        Task<bool> CanAccessDepartmentAsync(string departmentCode);
        Task<IList<string>> GetAllowedDepartmentsAsync();
        Task<bool> IsSuperAdminOrAdminAsync();
    }
}
