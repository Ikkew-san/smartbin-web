import { Injectable } from "@angular/core";
import { API_URL } from "../api-url";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SmartbinService {
  constructor(private http: HttpClient) { }

  getSmartbin() {
    return this.http.get(`${API_URL}/getSmartbin`);
  }

  setSmartbin(params) {
    return this.http.post(`${API_URL}/setSmartbin`, params);
  }

  findSmartbin(id) {
    return this.http.get(`${API_URL}/findSmartbin/${id}`);
  }

  putSmartbin(params) {
    return this.http.put(`${API_URL}/putSmartbin`, params);
  }

  putSmartbinStatus(params) {
    return this.http.put(`${API_URL}/putSmartbinStatus`, params);
  }

  deleteSmartbin(id) {
    return this.http.delete(`${API_URL}/deleteSmartbin/${id}`);
  }
}
