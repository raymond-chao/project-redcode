namespace project_redcode.Models
{
    public class Quote
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string UserEmail { get; set; } = string.Empty;
    }
}