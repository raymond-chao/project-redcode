import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from './api-config';

@Injectable({
  providedIn: 'root'
})
export class Quote {

  private baseUrl = `${API_BASE_URL}/quotes`;

  constructor(private http: HttpClient) {}

  getAllQuotes() {
    return this.http.get(this.baseUrl);
  }

  getQuoteById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addQuote(quote: any) {
    return this.http.post(this.baseUrl, quote);
  }

  updateQuote(id: number, quote: any) {
    return this.http.put(`${this.baseUrl}/${id}`, quote);
  }

  deleteQuote(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}