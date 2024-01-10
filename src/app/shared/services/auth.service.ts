import { Injectable } from '@angular/core';
import { API_URL } from '../api-url';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  getAuth(params) {
    return this.http.post(`${API_URL}/authAdmin`, params);
  }
}
