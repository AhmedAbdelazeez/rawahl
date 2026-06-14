namespace project.Models
{
    public class ApplicationUserDepartment
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public virtual ApplicationUser User { get; set; } = null!;
        public int DepartmentId { get; set; }
        public virtual Department Department { get; set; } = null!;
    }
}
