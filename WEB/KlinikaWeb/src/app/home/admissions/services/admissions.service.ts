import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdmissionsService {
  private apiUrl = `${environment.apiBaseUrl}/api/Admission`;

  constructor(private http: HttpClient) {}

  getAdmissions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

