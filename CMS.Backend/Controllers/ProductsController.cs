using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var products = _context.Products
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.ImageUrl,
                    p.StockQuantity,
                    p.CategoryProductId
                })
                .ToList();

            return Ok(products);
        }

        [HttpGet("category/{categoryProductId}")]
        public IActionResult GetByCategory(int categoryProductId)
        {
            var products = _context.Products
                .Where(p => p.CategoryProductId == categoryProductId)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.ImageUrl,
                    p.StockQuantity,
                    p.CategoryProductId
                })
                .ToList();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public IActionResult GetDetail(int id)
        {
            var product = _context.Products
                .Where(p => p.Id == id)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.StockQuantity,
                    p.ImageUrl,
                    p.CategoryProductId
                })
                .FirstOrDefault();

            if (product == null)
            {
                return NotFound(new { message = "Không tìm thấy sản phẩm" });
            }

            return Ok(product);
        }
        [HttpGet("search")]
        public IActionResult Search([FromQuery] string keyword)
        {
            var query = _context.Products
                .Include(p => p.CategoryProduct)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(keyword))
            {
                keyword = keyword.Trim().ToLower();

                query = query.Where(p =>
                    p.Name.ToLower().Contains(keyword) ||
                    (p.Description != null && p.Description.ToLower().Contains(keyword)) ||
                    (p.CategoryProduct != null && p.CategoryProduct.Name.ToLower().Contains(keyword))
                );
            }

            var products = query
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.ImageUrl,
                    p.StockQuantity,
                    p.CategoryProductId,
                    CategoryProductName = p.CategoryProduct != null ? p.CategoryProduct.Name : "Thời trang"
                })
                .ToList();

            return Ok(products);
        }
    }
}