using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ContactsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Create([FromBody] ContactRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.FullName) ||
                string.IsNullOrWhiteSpace(request.Email) ||
                string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest(new { message = "Vui lòng nhập đầy đủ thông tin." });
            }

            var contact = new Contact
            {
                FullName = request.FullName,
                Email = request.Email,
                Message = request.Message,
                CreatedDate = DateTime.Now,
                IsRead = false
            };

            _context.Contacts.Add(contact);
            _context.SaveChanges();

            return Ok(new { message = "Gửi liên hệ thành công" });
        }
    }

    public class ContactRequest
    {
        public string FullName { get; set; } = "";
        public string Email { get; set; } = "";
        public string Message { get; set; } = "";
    }
}