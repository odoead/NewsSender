namespace NewsSender.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsSender.Data;
using NewsSender.Domain.entities;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : Controller
{
    private readonly AppDBContext context;

    public CategoryController(AppDBContext context)
    {
        this.context = context;
    }

    [HttpGet]
    public async Task<IEnumerable<Category>> GetCategory()
    {
        return await context.Categories.ToListAsync();
    }
}
