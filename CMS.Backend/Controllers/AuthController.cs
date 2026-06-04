using Microsoft.AspNetCore.Mvc;
using CMS.Data;
using CMS.Data.Entities;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("CustomerRegister")]
        public IActionResult CustomerRegister(Customer model)
        {
            var checkEmail = _context.Customers
                .Any(c => c.Email == model.Email);

            if (checkEmail)
            {
                return BadRequest(new { message = "Email đã tồn tại" });
            }

            _context.Customers.Add(model);
            _context.SaveChanges();

            return Ok(new
            {
                message = "Đăng ký khách hàng thành công",
                customerId = model.Id,
                fullName = model.FullName,
                email = model.Email
            });
        }

        [HttpPost("CustomerLogin")]
        public IActionResult CustomerLogin(CustomerLoginRequest model)
        {
            var customer = _context.Customers
                .FirstOrDefault(c => c.Email == model.Email && c.Password == model.Password);

            if (customer == null)
            {
                return Unauthorized(new { message = "Email hoặc mật khẩu không đúng" });
            }

            return Ok(new
            {
                message = "Đăng nhập thành công",
                customerId = customer.Id,
                fullName = customer.FullName,
                email = customer.Email,
                phone = customer.Phone,
                address = customer.Address
            });
        }
    }

    public class CustomerLoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}