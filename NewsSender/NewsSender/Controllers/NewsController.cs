using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using NewsSender.Data;
using NewsSender.Domain.entities;
using NewsSender.SignalHub;

namespace NewsSender.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsController : ControllerBase
    {
        private readonly AppDBContext context;
        private readonly IHubContext<NewsHub> hubContext;

        public NewsController(AppDBContext context, IHubContext<NewsHub> hubContext)
        {
            this.context = context;
            this.hubContext = hubContext;
        }

        [HttpGet]
        public async Task<IEnumerable<News>> GetNews()
        {
            return await context.News.Include(n => n.Categories).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<News>> PostNews(News news)
        {
            context.News.Add(news);
            await context.SaveChangesAsync();
            await hubContext.Clients.All.SendAsync("ReceiveNews", news);
            return CreatedAtAction(nameof(GetNews), new { id = news.Id }, news);
        }
    }
}
