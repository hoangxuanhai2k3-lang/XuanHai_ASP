using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin")]
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var orders = _context.Orders
                .Include(o => o.Customer)
                .OrderByDescending(o => o.OrderDate)
                .ToList();

            return View(orders);
        }

        public IActionResult Create()
        {
            ViewBag.CustomerId = new SelectList(_context.Customers, "Id", "FullName");
            return View();
        }

        [HttpPost]
        public IActionResult Create(Order model)
        {
            if (ModelState.IsValid)
            {
                model.OrderDate = DateTime.Now;
                _context.Orders.Add(model);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.CustomerId = new SelectList(_context.Customers, "Id", "FullName", model.CustomerId);
            return View(model);
        }

        public IActionResult Edit(int id)
        {
            var order = _context.Orders.Find(id);
            if (order == null) return NotFound();

            ViewBag.CustomerId = new SelectList(_context.Customers, "Id", "FullName", order.CustomerId);
            return View(order);
        }

        [HttpPost]
        public IActionResult Edit(Order model)
        {
            if (ModelState.IsValid)
            {
                _context.Orders.Update(model);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.CustomerId = new SelectList(_context.Customers, "Id", "FullName", model.CustomerId);
            return View(model);
        }

        public IActionResult Details(int id)
        {
            var order = _context.Orders
                .Include(o => o.Customer)
                .FirstOrDefault(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return View(order);
        }

        public IActionResult Approve(int id)
        {
            var order = _context.Orders.Find(id);

            if (order == null)
            {
                return NotFound();
            }

            order.Status = 1; // Đang giao
            order.Notes = "Đơn hàng đã được duyệt và đang giao";

            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        public IActionResult Complete(int id)
        {
            var order = _context.Orders.Find(id);

            if (order == null)
            {
                return NotFound();
            }

            order.Status = 2; // Hoàn thành
            order.Notes = "Đơn hàng đã hoàn thành";

            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        public IActionResult Delete(int id)
        {
            var order = _context.Orders
                .Include(o => o.Customer)
                .FirstOrDefault(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return View(order);
        }

        [HttpPost, ActionName("Delete")]
        public IActionResult DeleteConfirmed(int id)
        {
            var details = _context.OrderDetails.Where(od => od.OrderId == id).ToList();

            if (details.Any())
            {
                _context.OrderDetails.RemoveRange(details);
            }

            var order = _context.Orders.Find(id);

            if (order != null)
            {
                _context.Orders.Remove(order);
            }

            _context.SaveChanges();

            return RedirectToAction("Index");
        }
    }
}