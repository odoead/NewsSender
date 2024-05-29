namespace NewsSender.Domain.entities
{
    public class News
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Head { get; set; }
        public ICollection<Category> Categories { get; set; }
    }
}
