import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../../../features/doctors/services/doctors.service';
import { AdmissionsService } from '../services/admissions.service';

@Component({
  selector: 'app-admissions-list',
  standalone: false,
  templateUrl: './admissions-list.component.html',
  styleUrls: ['./admissions-list.component.css'] // Ispravljeno ime
})
export class AdmissionsListComponent implements OnInit {
  today: string = "";
  doctors: any[] = [];
  admissions: any[] = [];

  constructor(
    private doctorsService: DoctorsService,
    private admissionsService: AdmissionsService
  ) {}

  ngOnInit(): void {
    const currentDate = new Date();
    this.today = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}.`;

    this.getDoctors();
    this.getAdmissions();
  }

  getDoctors(): void {
    this.doctorsService.getDoctors().subscribe(
      (data) => {
        this.doctors = data;
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  getAdmissions(): void {
    this.admissionsService.getAdmissions().subscribe(
      (data) => {
        this.admissions = data;
      },
      (error) => {
        console.error('Error fetching admissions:', error);
      }
    );
  }
}