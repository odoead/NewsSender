using Microsoft.AspNetCore.SignalR;
using NewsSender.Data;
using NewsSender.Domain.entities;
using NewsSender.SignalHub;

namespace NewsSender
{
    public class NewsSubmitterService : BackgroundService
    {
        private readonly IServiceScopeFactory scopeFactory;
        private readonly IHubContext<NewsHub> hubContext;

        public NewsSubmitterService(IServiceScopeFactory scopeFactory, IHubContext<NewsHub> hubContext)
        {
            this.scopeFactory = scopeFactory;
            this.hubContext = hubContext;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var random = new Random();
            while (!stoppingToken.IsCancellationRequested)
            {
                await Task.Delay(TimeSpan.FromSeconds(50), stoppingToken);
                using (var scope = this.scopeFactory.CreateScope())
                {
                    var context = scope.ServiceProvider.GetRequiredService<AppDBContext>();
                    var news = new News
                    {
                        Head = "Head: " + random.Next(1, 1000),
                        Text = "Text " + random.Next(1, 1000),
                        Categories = new List<Category> { new Category { Name = "Category " + random.Next(1, 10) } }
                    };
                    context.News.Add(news);
                    await context.SaveChangesAsync();
                    Console.WriteLine("Added new news - {0}/{1}", news.Head, news.Text);
                    await hubContext.Clients.All.SendAsync("ReceiveNews", news);
                }
            }
        }
    }
}
