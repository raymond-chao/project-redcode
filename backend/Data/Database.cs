using project_redcode.Models;

namespace project_redcode.Data
{
    public class Database
    {
        public static List<Book> Books = new List<Book> ()
                    {
            new Book { Id = 1, Title = "The Great Gatsby", Author = "F. Scott Fitzgerald", YearPublished = 1925 },
            new Book { Id = 2, Title = "Clean Code", Author = "Robert C. Martin", YearPublished = 2008 },
            new Book { Id = 3, Title = "The Pragmatic Programmer", Author = "Andrew Hunt and David Thomas", YearPublished = 1999 },
            new Book { Id = 4, Title = "Head First Java", Author = "Kathy Sierra and Bert Bates", YearPublished = 2003 },
            new Book { Id = 5, Title = "Learning Programming", Author = "Jennifer Niederst Robbins", YearPublished = 2018 }
        };

        public static List<User> Users = new();
        public static List<Quote> Quotes = new()
        {
            new Quote { Id = 1, Text = "Stay hungry stay foolish" },
            new Quote { Id = 2, Text = "Code is like humor" },
            new Quote { Id = 3, Text = "First solve the problem" },
            new Quote { Id = 4, Text = "Make it work make it right"},
            new Quote { Id = 5, Text = "Simplicity is key"}
        };
    }
}
