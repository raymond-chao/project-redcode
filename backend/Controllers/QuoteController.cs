using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using project_redcode.Data;
using project_redcode.Models;

namespace project_redcode.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class QuoteController : Controller
    {
        [HttpGet]
        public ActionResult<List<Quote>> GetAllQuotes()
        {
            return Ok(Database.Quotes);
        }

        [HttpGet("{id}")]
        public ActionResult<Quote> GetQuoteById(int id)
        {
            var quote = Database.Quotes.FirstOrDefault(q => q.Id == id);
            if (quote == null)
                return NotFound();
            return Ok(quote);
        }

        [HttpPost]
        public ActionResult<Quote> AddQuote(Quote newQuote)
        {
            if (newQuote == null)
                return BadRequest();

            newQuote.Id = Database.Quotes.Any() ? Database.Quotes.Max(q => q.Id) + 1 : 1;
            Database.Quotes.Add(newQuote);
            return CreatedAtAction(nameof(GetQuoteById), new { id = newQuote.Id }, newQuote);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateQuote(int id, Quote updatedQuote)
        {
            var quote = Database.Quotes.FirstOrDefault(q => q.Id == id);
            if (quote == null)
                return NotFound();

            quote.Text = updatedQuote.Text;
            quote.Author = updatedQuote.Author;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteQuote(int id)
        {
            var quote = Database.Quotes.FirstOrDefault(q => q.Id == id);
            if (quote == null)
                return NotFound();
            Database.Quotes.Remove(quote);
            return NoContent();
        }
    }
}
