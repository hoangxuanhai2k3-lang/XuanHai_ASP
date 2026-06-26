namespace CMS.Data.Entities
{
    public class PostComment
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public string FullName { get; set; } = "";
        public string Email { get; set; } = "";
        public string Content { get; set; } = "";
        public DateTime CreatedDate { get; set; }
        public bool IsApproved { get; set; }

        public Post? Post { get; set; }
    }
}