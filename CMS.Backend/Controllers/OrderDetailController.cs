using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class OrderDetailController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderDetailController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var details = _context.OrderDetails
                .Include(od => od.Order)
                .Include(od => od.Product)
                .OrderByDescending(od => od.Id)
                .ToList();

            return View(details);
        }

        public IActionResult Details(int id)
        {
            var detail = _context.OrderDetails
                .Include(od => od.Order)
                .Include(od => od.Product)
                .FirstOrDefault(od => od.Id == id);

            if (detail == null)
            {
                return NotFound();
            }

            return View(detail);
        }
    }
}