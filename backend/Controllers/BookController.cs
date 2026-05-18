using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using project_redcode.Models;
using project_redcode.Data;

namespace project_redcode.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class BookController : ControllerBase
    {

        [HttpGet]
        public ActionResult<List<Book>> GetAllBooks()
        {
            return Ok(Database.Books);
        }

        [HttpGet("{id}")]
        public ActionResult<Book> GetBookById(int id)
        {
            var book = Database.Books.FirstOrDefault(x => x.Id == id);
            if (book == null)
                return NotFound();
            return Ok(book);
        }

        [HttpPost]
        public ActionResult<Book> AddBook(Book newBook)
        {
            if (newBook == null)
                return BadRequest();

            newBook.Id = Database.Books.Any() ? Database.Books.Max(x => x.Id) + 1 : 1;
            Database.Books.Add(newBook);
            return CreatedAtAction(nameof(GetBookById), new { id = newBook.Id }, newBook);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, Book updatedBook)
        {
            var book = Database.Books.FirstOrDefault(x => x.Id == id);
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
            var book = Database.Books.FirstOrDefault(x => x.Id == id);
            if (book == null)
                return NotFound();
            Database.Books.Remove(book);
            return NoContent();
        }
    }
}