using System.Collections.Generic;
using System.Threading.Tasks;

namespace project.Services
{
    public class DepartmentAccessService : IDepartmentAccessService
    {
        private readonly ICurrentUserService _currentUserService;

        public DepartmentAccessService(ICurrentUserService currentUserService)
        {
            _currentUserService = currentUserService;
        }

        public async Task<bool> CanAccessDepartmentAsync(string departmentCode)
        {
            if (await IsSuperAdminOrAdminAsync())
            {
                return true;
            }

            var allowedDepartments = await _currentUserService.GetAssignedDepartmentCodesAsync();
            return allowedDepartments.Contains(departmentCode);
        }

        public async Task<IList<string>> GetAllowedDepartmentsAsync()
        {
            return await _currentUserService.GetAssignedDepartmentCodesAsync();
        }

        public async Task<bool> IsSuperAdminOrAdminAsync()
        {
            return await _currentUserService.IsAdminAsync();
        }
    }
}
