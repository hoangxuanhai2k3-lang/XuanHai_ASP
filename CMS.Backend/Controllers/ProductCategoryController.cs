using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CMS.Data;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class ProductCategoryController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProductCategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var categories = _context.CategoriesProducts.ToList();
            return View(categories);
        }
    }
}