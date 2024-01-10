import { Injectable } from "@angular/core";
import { API_URL } from "../api-url";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUser(param) {
    return this.http.post(`${API_URL}/getUser`, param);
  }

  findUser(id) {
    return this.http.get(`${API_URL}/findUser/${id}`);
  }

  setUser(params) {
    return this.http.post(`${API_URL}/setUser`, params);
  }

  putUser(params) {
    return this.http.post(`${API_URL}/putUser`, params);
  }

  putStatus(id, param) {
    return this.http.put(`${API_URL}/putUserstatus/${id}`, param);
  }

  deleteUser(id) {
    return this.http.delete(`${API_URL}/deleteUser/${id}`);
  }

  validateUsername(username) {
    return this.http.get(`${API_URL}/validateUsername/${username}`);
  }

  validateEmail(email) {
    return this.http.get(`${API_URL}/validateEmail/${email}`);
  }
}
