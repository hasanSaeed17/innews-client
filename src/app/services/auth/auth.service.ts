import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(
      `${this.BASE_URL}/auth/login`,
      data,
      { withCredentials: true }
    );
  }

  logout() {
    return this.http.post(
      `${this.BASE_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
  }

  checkAuth() {
    return this.http.get(
      `${this.BASE_URL}/admin`,
      { withCredentials: true }
    );
  }

  forgotPassword(email: string) {
    return this.http.post(
      `${this.BASE_URL}/auth/forgot-password`,
      { email: email }
    );
  }

  resetPassword(token: string, password: string) {
    return this.http.post(
      `${this.BASE_URL}/auth/reset-password/${token}`,
      { password }
    );
  }  


}
