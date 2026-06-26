namespace CMS.Data.Entities
{
    public class Post
    {
        public int Id { get; set; }

        // Thêm dấu ? để biến nó thành nullable, hết cảnh báo
        public string? Title { get; set; }
        public string? Content { get; set; }
        public string? ImageUrl { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public int CategoryId { get; set; }

        // Navigation property thường để nullable để tránh lỗi khi entity chưa được load
        public virtual Category? Category { get; set; }
    }
}