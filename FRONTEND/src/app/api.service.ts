import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  url = "http://localhost:4400/"

  postSignup(data: any) {
    console.log("api call in signup");
    
    return this.http.post(`${this.url}signup`, data)
  }
  postLogin(data: any) {
    return this.http.post(`${this.url}login`, data)
  }
  postCreation(data: any) {
    return this.http.post(`${this.url}creation`, data)
  }
  getHome() {
    return this.http.get(`${this.url}home`)
  }
  getBlogView(id: any) {
    console.log("view works");
    
    return this.http.get(`${this.url}view/${id}`)
  }
  postComment(bid: any, data: any) {
    return this.http.post(`${this.url}comment/${bid}`, data)
  }
  postReplay(cid: any, data: any) {
    return this.http.post(`${this.url}replay/${cid}`, data)
  }
  postLike(data: any) {
    return this.http.post(`${this.url}like/${data}`, "")
  }
  getMyBlog() {
    return this.http.get(`${this.url}myblogs`)
  }
}
