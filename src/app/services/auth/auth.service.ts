import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = 'http://localhost:3500';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(
      `${this.API}/auth/login`,
      data,
      { withCredentials: true }
    );
  }

  logout() {
    return this.http.post(
      `${this.API}/auth/logout`,
      {},
      { withCredentials: true }
    );
  }

  checkAuth() {
    return this.http.get(
      `${this.API}/admin`, //----------------------------------!!
      { withCredentials: true }
    );
  }

  forgotPassword(email: string) {
    return this.http.post(
      `${this.API}/auth/forgot-password`,
      { email: email }
    );
  }

  resetPassword(token: string, password: string) {
    return this.http.post(
      `${this.API}/auth/reset-password/${token}`,
      { password }
    );
  }  


}
