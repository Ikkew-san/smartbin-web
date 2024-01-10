import { Injectable } from "@angular/core";
import { API_URL } from "../api-url";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SellGarbageService {
  constructor(private http: HttpClient) {}

  getSellGarbage(){
    return this.http.get(`${API_URL}/getSellGarbage`)
  }

  setSellGarbage(id, params){
    return this.http.post(`${API_URL}/setSellGarbage/${id}`, params)
  }
}
