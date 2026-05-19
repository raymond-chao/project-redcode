import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from './api-config';

@Injectable({
  providedIn: 'root'
})
export class Book {

  baseUrl = `${API_BASE_URL}/book`;

  constructor(private http: HttpClient) {}

  getAllBooks() {
    return this.http.get(this.baseUrl);
  }

  getBookById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addBook(book: any) {
    return this.http.post(this.baseUrl, book);
  }

  updateBook(id: number, book: any) {
    return this.http.put(`${this.baseUrl}/${id}`, book);
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}