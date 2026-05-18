import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../shared/services/book';
import { Quote } from '../shared/services/quote';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  
  activeView: 'books' | 'quotes' = 'books';

  // Books
  books: any[] = [];
  newBook = { 
    title: '', 
    author: '', 
    yearPublished: 2026
  };
  editingBookId: number | null = null;
  
  // Quotes
  quotes: any[] = [];
  newQuote = '';
  editingQuoteId: number | null = null;

  constructor(
    private router: Router,
    private bookService: Book,
    private quoteService: Quote,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadBooks();
    this.loadQuotes();
  }

  switchView(view: 'books' | 'quotes') {
    this.activeView = view;
  }

  //Books
  
  loadBooks() {
    this.bookService.getAllBooks().subscribe((res: any) => {
      this.books = res;
      this.cdr.detectChanges();
    });
  }

  addBook() {
    if (!this.newBook.title?.trim() || !this.newBook.author?.trim()) {
      alert('Titel och författare är obligatoriska!');
      return;
    }

    const bookToSend = {
      title: this.newBook.title.trim(),
      author: this.newBook.author.trim(),
      yearPublished: this.newBook.yearPublished
    };

    this.bookService.addBook(bookToSend).subscribe({
      next: () => {
        this.loadBooks();
        this.resetBookForm();
      },
      error: (err: any) => {
        console.error(err);
        alert('Ett fel uppstod vid sparning av bok.');
      }
    });
  }

  editBook(book: any) {
    this.newBook = { ...book };
    this.editingBookId = book.id;
  }

  updateBook() {
    if (this.editingBookId !== null) {
      this.bookService.updateBook(this.editingBookId, this.newBook).subscribe(() => {
        this.loadBooks();
        this.resetBookForm();
      });
    }
  }

  deleteBook(id: number) {
    if (confirm('Är du säker på att du vill ta bort denna bok?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.loadBooks();
      });
    }
  }

  resetBookForm() {
    this.newBook = { 
      title: '', 
      author: '', 
      yearPublished: 2026 
    };
    this.editingBookId = null;
  }

  //Quotes
  
  loadQuotes() {
    console.log('Loading quotes...');
    this.quoteService.getAllQuotes().subscribe({
      next: (res: any) => {
        console.log('Quotes:', res);
        this.quotes = res;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error:', err);
        alert(`Fel vid laddning: ${err.status}`);
      }
    });
  }

  addQuote() {
    if (!this.newQuote.trim()) {
      alert('Citattext är obligatorisk!');
      return;
    }

    const quoteToSend = { text: this.newQuote.trim() };
    console.log('Adding:', quoteToSend);

    this.quoteService.addQuote(quoteToSend).subscribe({
      next: () => {
        this.loadQuotes();
        this.cancelQuoteEdit();
      },
      error: (err: any) => {
        console.error('Error:', err);
        alert(`Fel vid sparning: ${err.status}`);
      }
    });
  }

  editQuote(quote: any) {
    this.newQuote = quote.text;
    this.editingQuoteId = quote.id;
  }

  updateQuote() {
    if (this.editingQuoteId !== null && this.newQuote.trim()) {
      const quoteToSend = { text: this.newQuote.trim() };

      this.quoteService.updateQuote(this.editingQuoteId, quoteToSend).subscribe({
        next: () => {
          this.loadQuotes();
          this.cancelQuoteEdit();
        },
        error: (err: any) => {
          console.error(err);
          alert('Ett fel uppstod vid uppdatering.');
        }
      });
    }
  }

  deleteQuote(id: number) {
    if (confirm('Är du säker?')) {
      this.quoteService.deleteQuote(id).subscribe({
        next: () => {
          this.loadQuotes();
        },
        error: (err: any) => {
          console.error(err);
          alert('Ett fel uppstod vid borttagning.');
        }
      });
    }
  }

  cancelQuoteEdit() {
    this.newQuote = '';
    this.editingQuoteId = null;
  }

  
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/signin');
  }
}