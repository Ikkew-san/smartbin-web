import { Injectable } from "@angular/core";
import { API_URL } from "../api-url";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SystemService {
  constructor(private http: HttpClient) { }

  getSystem() {
    return this.http.get(`${API_URL}/getSystem`)
  }

  putSystem(params) {
    return this.http.post(`${API_URL}/putSystem`, params)
  }

  getAlertSmartbin() {
    return this.http.get(`${API_URL}/getAlertSmartbin`)
  }
}
