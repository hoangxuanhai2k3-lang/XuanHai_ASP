using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CreateOrder(OrderRequest request)
        {
            if (request.Items == null || request.Items.Count == 0)
            {
                return BadRequest(new { message = "Giỏ hàng trống" });
            }

            var order = new Order
            {
                CustomerId = request.CustomerId,
                OrderDate = DateTime.Now,
                Status = 0,
                Notes = request.Notes
            };

            _context.Orders.Add(order);
            _context.SaveChanges();

            foreach (var item in request.Items)
            {
                var product = _context.Products.FirstOrDefault(p => p.Id == item.ProductId);

                if (product == null)
                {
                    return NotFound(new { message = "Không tìm thấy sản phẩm ID " + item.ProductId });
                }

                if (product.StockQuantity < item.Quantity)
                {
                    return BadRequest(new { message = "Sản phẩm " + product.Name + " không đủ tồn kho" });
                }

                var detail = new OrderDetail
                {
                    OrderId = order.Id,
                    ProductId = product.Id,
                    Quantity = item.Quantity,
                    UnitPrice = product.Price
                };

                _context.OrderDetails.Add(detail);

                product.StockQuantity -= item.Quantity;
            }

            _context.SaveChanges();

            return Ok(new
            {
                message = "Đặt hàng thành công",
                orderId = order.Id,
                status = order.Status
            });
        }

        [HttpGet("customer/{customerId}")]
        public IActionResult GetByCustomer(int customerId)
        {
            var orders = _context.Orders
                .Where(o => o.CustomerId == customerId)
                .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.Product)
                .Select(o => new
                {
                    o.Id,
                    o.OrderDate,
                    o.Status,
                    o.Notes,
                    Items = o.OrderDetails.Select(od => new
                    {
                        od.ProductId,
                        ProductName = od.Product.Name,
                        od.Quantity,
                        od.UnitPrice,
                        Total = od.Quantity * od.UnitPrice
                    })
                })
                .ToList();

            return Ok(orders);
        }
    }

    public class OrderRequest
    {
        public int CustomerId { get; set; }
        public string? Notes { get; set; }
        public List<OrderItemRequest> Items { get; set; }
    }

    public class OrderItemRequest
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}