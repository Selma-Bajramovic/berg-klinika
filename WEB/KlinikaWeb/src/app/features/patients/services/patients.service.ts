import { Injectable } from '@angular/core';
import { Patient } from '../models/patient.model';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientModel } from '../models/add-patient-request.model';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private patients: Patient[] = [];

  constructor(private http:HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${environment.apiBaseUrl}/api/Patient`);
  }

  getPatientById(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${environment.apiBaseUrl}/api/Patient/${id}`);
  }

  addPatient(admission: PatientModel): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Patient`, admission);
  }

  updatePatient(id: string, admission: Patient): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/api/Patient/${id}`, admission);
  }
  
  deletePatientById(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/Patient/${id}`);
  }



}
