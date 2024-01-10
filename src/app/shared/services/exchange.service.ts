import { Injectable } from "@angular/core";
import { API_URL } from "../api-url";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ExchangeService {
  constructor(private http: HttpClient) { }

  getExchange() {
    return this.http.get(`${API_URL}/getExchange`);
  }

  getExchangelist(id) {
    return this.http.get(`${API_URL}/getExchangelist/${id}`);
  }

  getExchangeNotFinish() {
    return this.http.get(`${API_URL}/getExchangeNotFinish`);
  }

  putExchangeStatus(param) {
    return this.http.put(`${API_URL}/putExchangeStatus`, param);
  }

  putExchangelistStatus(param) {
    return this.http.put(`${API_URL}/putExchangelistStatus`, param);
  }

  cancelExchange(param) {
    return this.http.put(`${API_URL}/cancelExchange`, param);
  }

  cancelExchangelist(param) {
    return this.http.put(`${API_URL}/cancelExchangelist`, param);
  }
}
