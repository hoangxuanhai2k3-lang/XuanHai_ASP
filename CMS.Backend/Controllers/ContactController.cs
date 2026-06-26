using CMS.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin,Editor")]
    public class ContactController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ContactController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /Contact/Index
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var contacts = await _context.Contacts
                .OrderBy(x => x.IsRead)
                .ThenByDescending(x => x.CreatedDate)
                .ToListAsync();

            return View(contacts);
        }

        // POST: /Contact/MarkRead
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> MarkRead(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
            {
                TempData["Error"] = "Không tìm thấy liên hệ cần cập nhật.";
                return RedirectToAction(nameof(Index));
            }

            contact.IsRead = true;
            await _context.SaveChangesAsync();

            TempData["Success"] = "Đã đánh dấu liên hệ là đã đọc.";
            return RedirectToAction(nameof(Index));
        }

        // POST: /Contact/MarkUnread
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> MarkUnread(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
            {
                TempData["Error"] = "Không tìm thấy liên hệ cần cập nhật.";
                return RedirectToAction(nameof(Index));
            }

            contact.IsRead = false;
            await _context.SaveChangesAsync();

            TempData["Success"] = "Đã chuyển liên hệ về trạng thái chưa đọc.";
            return RedirectToAction(nameof(Index));
        }

        // POST: /Contact/Delete
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
            {
                TempData["Error"] = "Không tìm thấy liên hệ cần xóa.";
                return RedirectToAction(nameof(Index));
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            TempData["Success"] = "Xóa liên hệ thành công.";
            return RedirectToAction(nameof(Index));
        }
    }
}