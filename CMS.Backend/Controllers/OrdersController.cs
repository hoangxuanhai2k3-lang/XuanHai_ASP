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
                return BadRequest(new { message = "Giỏ hàng trống" });

            // Sử dụng Transaction để đảm bảo tính an toàn dữ liệu
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var order = new Order
                {
                    CustomerId = request.CustomerId,
                    OrderDate = DateTime.Now,
                    Status = 0,
                    Notes = request.Notes
                };

                _context.Orders.Add(order);
                // Lưu để tạo Id cho order
                _context.SaveChanges();

                foreach (var item in request.Items)
                {
                    var product = _context.Products.FirstOrDefault(p => p.Id == item.ProductId);

                    if (product == null)
                        throw new Exception("Không tìm thấy sản phẩm ID " + item.ProductId);

                    if (product.StockQuantity < item.Quantity)
                        throw new Exception("Sản phẩm " + product.Name + " không đủ tồn kho");

                    var detail = new OrderDetail
                    {
                        OrderId = order.Id,
                        ProductId = product.Id,
                        Quantity = item.Quantity,
                        UnitPrice = product.Price
                    };

                    _context.OrderDetails.Add(detail);

                    // Trừ tồn kho
                    product.StockQuantity -= item.Quantity;
                }

                _context.SaveChanges();
                transaction.Commit(); // Hoàn tất giao dịch

                return Ok(new { message = "Đặt hàng thành công", orderId = order.Id });
            }
            catch (Exception ex)
            {
                transaction.Rollback(); // Quay lại trạng thái cũ nếu lỗi
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("customer/{customerId}")]
        public IActionResult GetByCustomer(int customerId)
        {
            // Bước 1: Lấy dữ liệu từ DB ra List trước (thực thi truy vấn tại đây)
            var orders = _context.Orders
                .Where(o => o.CustomerId == customerId)
                .Include("OrderDetails.Product") // Gọi trực tiếp bằng chuỗi tên thuộc tính
                .ToList();

            // Bước 2: Dùng LINQ to Objects (đã là List bình thường nên dùng ?. thoải mái)
            var result = orders.Select(o => new
            {
                o.Id,
                o.OrderDate,
                o.Status,
                o.Notes,
                Items = o.OrderDetails!.Select(od => new // Thêm ! vào sau OrderDetails
                {
                    od.ProductId,
                    ProductName = od.Product!.Name ?? "N/A", // Thêm ! vào sau Product
                    od.Quantity,
                    od.UnitPrice,
                    Total = od.Quantity * od.UnitPrice
                })
            }).ToList();

            return Ok(result);
        }
    }

    public class OrderRequest
    {
        public int CustomerId { get; set; }
        public string? Notes { get; set; }
        // Khởi tạo List để tránh cảnh báo CS8618
        public List<OrderItemRequest> Items { get; set; } = new List<OrderItemRequest>();
    }

    public class OrderItemRequest
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}