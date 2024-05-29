using Microsoft.EntityFrameworkCore;
using NewsSender.Data;

namespace WebUser.common.extentions
{
    public static class ServiceExtentions
    {
        public static void ConfigureCORS(this IServiceCollection services) =>
            services.AddCors(opt => opt.AddPolicy("CorsPolicy", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

        public static void ConfigureIISIntegration(this IServiceCollection services) => services.Configure<IISOptions>(_ => { });

        public static void ConfigureSqlConnection(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<AppDBContext>(options => options.UseSqlServer(connectionString));
        }
    }
}
