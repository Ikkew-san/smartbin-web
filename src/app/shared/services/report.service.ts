import { Injectable } from "@angular/core";
import { API_URL } from "../api-url";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ReportService {
  constructor(private http: HttpClient) { }

  reportExchange(params) {
    return this.http.post(`${API_URL}/reportExchange`, params)
  }

  reportPay(params) {
    return this.http.post(`${API_URL}/reportPay`, params)
  }

  getUsernameInReportPay(params) {
    return this.http.post(`${API_URL}/getUsernameInReportPay`, params)
  }

  reportCumulative(params) {
    return this.http.post(`${API_URL}/reportCumulative`, params)
  }

  reportAlertSmartbin(params) {
    return this.http.post(`${API_URL}/reportAlertSmartbin`, params)
  }

  reportSellGarbage(params) {
    return this.http.post(`${API_URL}/reportSellGarbage`, params)
  }

  reportBuy(params) {
    return this.http.post(`${API_URL}/reportBuy`, params)
  }

  PDFreportExchange(params) {
    return this.http.post(`${API_URL}/PDFreportExchange`, params)
  }

  PDFreportPay(params) {
    return this.http.post(`${API_URL}/PDFreportPay`, params)
  }

  PDFreportCumulative(params) {
    return this.http.post(`${API_URL}/PDFreportCumulative`, params)
  }

  PDFreportAlertSmartbin(params) {
    return this.http.post(`${API_URL}/PDFreportAlertSmartbin`, params)
  }

  PDFreportSellGarbage(params) {
    return this.http.post(`${API_URL}/PDFreportSellGarbage`, params)
  }

  PDFreportBuying(params) {
    return this.http.post(`${API_URL}/PDFreportBuying`, params)
  }
}
