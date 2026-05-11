using Microsoft.AspNetCore.Mvc;
using project_redcode.Models;

namespace project_redcode.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BookController : Controller
    {
        static private List<Book> books = new List<Book>()
        {
            new Book { Id = 1, Title = "The Great Gatsby", Author = "F. Scott Fitzgerald", YearPublished = 1925 },
            new Book { Id = 2, Title = "Clean Code", Author = "Robert C. Martin", YearPublished = 2008 },
            new Book { Id = 3, Title = "The Pragmatic Programmer", Author = "Andrew Hunt and David Thomas", YearPublished = 1999 },
            new Book { Id = 4, Title = "Head First Java", Author = "Kathy Sierra and Bert Bates", YearPublished = 2003 },
            new Book {Id = 5, Title = "Learning Programming", Author = "Jennifer Niederst Robbins", YearPublished = 2018 }
        };

        [HttpGet("{id}")]
        public ActionResult<Book> GetBookById(int id)
        {
            var book = books.FirstOrDefault(x => x.Id == id);
            if (book == null)
                return NotFound();
            return Ok(book);
        }

        [HttpPost]
        public ActionResult<Book> AddBook(Book newBook)
        {
            if (newBook == null)
                return BadRequest();

            books.Add(newBook);
            return CreatedAtAction(nameof(GetBookById), new { id = newBook.Id }, newBook);

        }

        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, Book updatedBook)
        {
            var book = books.FirstOrDefault(x => x.Id == id);
            if (book == null)
                return NotFound();
            book.Id = updatedBook.Id;
            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.YearPublished = updatedBook.YearPublished;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            var book = books.FirstOrDefault(x => x.Id == id);
            if (book == null)
                return NotFound();
            books.Remove(book);
            return NoContent();
        }
    }
}
