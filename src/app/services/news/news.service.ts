import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private localHostApi = 'http://localhost:3500/news';
  private BASE_URL = 'http://localhost:3500/news';

  constructor(private http:HttpClient) { }


  getByCategory(category: string) {
  return this.http.get<any>(`${this.BASE_URL}/${category}`);
}


  getHomeNews(): Observable<any[]> {
    let url = this.localHostApi+'/home';
    return this.http.get<any[]>(url);
  }


  getHome(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/home`);
  }

  getBreaking(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/breaking`);
  }

  getBusiness(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/business`);
  }

  getWorld(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/world`);
  }

  getPolitics(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/politics`);
  }

  getSports(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/sports`);
  }

  getHealth(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/health`);
  }

  getTechnology(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/technology`);
  }


}
