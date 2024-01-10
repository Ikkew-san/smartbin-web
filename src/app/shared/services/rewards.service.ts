import { Injectable } from "@angular/core";
import { API_URL } from "../api-url";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class RewardsService {
  constructor(private http: HttpClient) { }

  getRewards() {
    return this.http.get(`${API_URL}/getRewards`);
  }

  findRewards(id) {
    return this.http.get(`${API_URL}/findRewards/${id}`);
  }

  setRewards(params) {
    return this.http.post(`${API_URL}/setRewards`, params);
  }

  putRewards(id, params) {
    return this.http.post(`${API_URL}/putRewards/${id}`, params);
  }

  putRewardsStatus(param) {
    return this.http.put(`${API_URL}/putRewardsStatus`, param);
  }

  deleteRewards(id) {
    return this.http.delete(`${API_URL}/deleteRewards/${id}`);
  }

  getBuying() {
    return this.http.get(`${API_URL}/getBuying`);
  }

  getBuylist(id: number) {
    return this.http.get(`${API_URL}/getBuylist/${id}`);
  }

  getRewardsName() {
    return this.http.get(`${API_URL}/getRewardsName`);
  }

  setBuying(id, params) {
    return this.http.post(`${API_URL}/setBuying/${id}`, params);
  }
}
