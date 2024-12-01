import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { Doctor } from '../models/doctor.model';
import { DoctorModel } from '../models/add-doctor-request.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  private doctors:Doctor[]=[];

  constructor(private http: HttpClient) { }
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${environment.apiBaseUrl}/api/Doctors`);
  }

  getDoctorById(id: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${environment.apiBaseUrl}/api/Doctors/${id}`);
  }

  addDoctor(doctor: DoctorModel): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Doctors`, doctor);
  }

  updateDoctor(id: string, doctor: Doctor): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/api/Doctors/${id}`, doctor);
  }
  
  deleteDoctorById(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/Doctors/${id}`);
  }

}
