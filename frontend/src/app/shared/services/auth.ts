import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(private http: HttpClient) { }

  private baseUrl = 'https://project-redcode-backend-9s9f-production.up.railway.app/api/auth';

    getAll() {
    return this.http.get(this.baseUrl);
  }

  create(book: any) {
    return this.http.post(this.baseUrl, book);
  }

  update(id: number, book: any) {
    return this.http.put(`${this.baseUrl}/${id}`, book);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  createUser(formData:any){
    return this.http.post(
      this.baseUrl + '/register',
      formData
    );
  }

  signin(formData:any){
    return this.http.post(
      this.baseUrl + '/login',
      formData
    );
  }
}