using System.Collections.Generic;

namespace project.Models
{
    public class Department
    {
        public int Id { get; set; }
        public string NameAr { get; set; } = string.Empty;
        public string NameEn { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Icon { get; set; }
        public bool IsActive { get; set; } = true;

        public virtual ICollection<ApplicationUserDepartment> UserDepartments { get; set; } = new List<ApplicationUserDepartment>();
    }
}
