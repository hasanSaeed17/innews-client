import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(
      `${this.BASE_URL}/auth/login`,
      data
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

  signup(adminEmail: string, userEmail: string, userPassword: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/signup`, {
      adminEmail,
      userEmail,
      userPassword
    });
  }

  recoverySignupDeveloper( userEmail: string, userPassword: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/backup/recovery/recovery-signup-developer`, {
      userEmail,
      userPassword
    });
  }

}
