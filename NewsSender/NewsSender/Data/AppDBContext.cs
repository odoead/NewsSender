using Microsoft.EntityFrameworkCore;
using NewsSender.Domain.entities;

namespace NewsSender.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options)
            : base(options) { }

        public DbSet<News> News { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}
