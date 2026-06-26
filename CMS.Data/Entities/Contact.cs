namespace CMS.Data.Entities
{
    public class Contact
    {
        public int Id { get; set; }
        public string FullName { get; set; } = "";
        public string Email { get; set; } = "";
        public string Message { get; set; } = "";
        public DateTime CreatedDate { get; set; }
        public bool IsRead { get; set; }
    }
}