import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(private http: HttpClient) { }

  baseURL = 'https://localhost:7057/api/auth';

    getAll() {
    return this.http.get(this.baseURL);
  }

  create(book: any) {
    return this.http.post(this.baseURL, book);
  }

  update(id: number, book: any) {
    return this.http.put(`${this.baseURL}/${id}`, book);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  createUser(formData:any){
    return this.http.post(
      this.baseURL + '/register',
      formData
    );
  }

  signin(formData:any){
    return this.http.post(
      this.baseURL + '/login',
      formData
    );
  }
}