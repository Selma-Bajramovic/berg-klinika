import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admission } from '../models/admission.model';
import { AdmissionModel } from '../models/add-admission-request.model';


@Injectable({
  providedIn: 'root'
})
export class AdmissionsService {

  private admissions: Admission[] = [];

  constructor(private http: HttpClient) {}


  getAdmissions(): Observable<Admission[]> {
    return this.http.get<Admission[]>(`${environment.apiBaseUrl}/api/Admission`);
  }

  getAdmissionById(id: string): Observable<Admission> {
    return this.http.get<Admission>(`${environment.apiBaseUrl}/api/Admission/${id}`);
  }

  addAdmission(admission: AdmissionModel): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Admission`, admission);
  }

  updateAdmission(id: string, admission: Admission): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/api/Admission/${id}`, admission);
  }
  
  deleteAdmissionById(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/Admission/${id}`);
  }

  getFilteredAdmissions(params: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/Admission`, { params });
  }
  

}

