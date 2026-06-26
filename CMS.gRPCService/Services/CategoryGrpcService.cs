using CMS.Data;
using Grpc.Core;
using Microsoft.EntityFrameworkCore;

namespace CMS.gRPCService.Services
{
    public class CategoryGrpcService : CategoryService.CategoryServiceBase
    {
        private readonly ApplicationDbContext _context;

        public CategoryGrpcService(ApplicationDbContext context)
        {
            _context = context;
        }

        public override async Task<CategoryList> GetCategories(
            Empty request,
            ServerCallContext context)
        {
            var categories = await _context.CategoriesProducts
                .OrderBy(x => x.Id)
                .ToListAsync();

            var result = new CategoryList();

            foreach (var item in categories)
            {
                result.Categories.Add(new CategoryModel
                {
                    Id = item.Id,
                    Name = item.Name ?? ""
                });
            }

            return result;
        }
    }
}