using Microsoft.AspNetCore.Mvc;
using CMS.Data;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var categories = _context.CategoriesProducts
                .Select(c => new
                {
                    c.Id,
                    c.Name,
                    c.Description
                })
                .ToList();

            return Ok(categories);
        }
    }
}