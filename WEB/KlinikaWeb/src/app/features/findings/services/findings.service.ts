import { Injectable } from '@angular/core';
import { Finding } from '../models/finding.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { FindingModel } from '../models/add-finding-request-model';

@Injectable({
  providedIn: 'root'
})
export class FindingsService {
  private findings: Finding[] = [];

  constructor(private http: HttpClient) {}
  
  getFindings(): Observable<Finding[]> {
    return this.http.get<Finding[]>(`${environment.apiBaseUrl}/api/Finding`);
  }

  getFindingById(id: string): Observable<Finding> {
    return this.http.get<Finding>(`${environment.apiBaseUrl}/api/Finding/${id}`);
  }

  addFinding(finding: FindingModel): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Finding`, finding);
  }

  updateFinding(id: string, finding: Finding): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/api/Finding/${id}`, finding);
  }
  
  deleteFindingById(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/Finding/${id}`);
  }
}
