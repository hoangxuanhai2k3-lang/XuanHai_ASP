using CMS.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin,Editor")]
    public class PostCommentController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PostCommentController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var comments = _context.PostComments
                .Include(x => x.Post)
                .OrderByDescending(x => x.CreatedDate)
                .ToList();

            return View(comments);
        }

        public IActionResult Approve(int id)
        {
            var comment = _context.PostComments.Find(id);

            if (comment == null) return NotFound();

            comment.IsApproved = true;
            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        public IActionResult Delete(int id)
        {
            var comment = _context.PostComments.Find(id);

            if (comment != null)
            {
                _context.PostComments.Remove(comment);
                _context.SaveChanges();
            }

            return RedirectToAction("Index");
        }
    }
}