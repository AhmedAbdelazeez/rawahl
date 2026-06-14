using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace project.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; } = string.Empty;
        public string ArabicDisplayName { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginAt { get; set; }

        public virtual ICollection<ApplicationUserDepartment> UserDepartments { get; set; } = new List<ApplicationUserDepartment>();
    }
}
