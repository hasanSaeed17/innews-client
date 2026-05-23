import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JournalsService {
  
  private BASE_URL = 'http://localhost:3500';

  constructor(private http: HttpClient) {}

  uploadJournal(
    title: string,
    description: string,
    file: File
  ): Observable<HttpEvent<any>> {

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('pdf', file, file.name);

    const req = new HttpRequest(
      'POST',
      `${this.BASE_URL}/admin/upload`,
      formData,
      {
        reportProgress: true,
        responseType: 'json'
      }
    );


    return this.http.request(req);
  }

  getUserJournals() {
    return this.http.get<any[]>('http://localhost:3500/journals/user');
  }

  getAdminJournals() {
    return this.http.get<any[]>('http://localhost:3500/journals/admin');
  }

  deleteJournal(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/admin/${id}`);
  }

  setHide(id: string, hide: boolean): Observable<any> {
    return this.http.patch(`${this.BASE_URL}/admin/hide/${id}`, { hide });
  }


}
