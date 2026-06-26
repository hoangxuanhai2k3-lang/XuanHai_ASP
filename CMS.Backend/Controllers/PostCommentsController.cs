using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostCommentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PostCommentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Create(PostComment model)
        {
            model.CreatedDate = DateTime.Now;
            model.IsApproved = false;

            _context.PostComments.Add(model);
            _context.SaveChanges();

            return Ok(new { message = "Bình luận đã được gửi và chờ duyệt" });
        }
        [HttpGet("post/{postId}")]
        public IActionResult GetApprovedByPost(int postId)
        {
            var comments = _context.PostComments
                .Where(x => x.PostId == postId && x.IsApproved)
                .OrderByDescending(x => x.CreatedDate)
                .Select(x => new
                {
                    x.Id,
                    x.FullName,
                    x.Content,
                    x.CreatedDate
                })
                .ToList();

            return Ok(comments);
        }
    }
}