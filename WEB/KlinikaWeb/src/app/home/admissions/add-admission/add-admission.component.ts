import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdmissionModel } from '../models/add-admission-request.model';
import { AdmissionsService } from '../services/admissions.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Patient } from '../../../features/patients/models/patient.model';
import { Doctor } from '../../../features/doctors/models/doctor.model';
import { DoctorsService } from '../../../features/doctors/services/doctors.service';
import { PatientsService } from '../../../features/patients/services/patients.service';
import { SuccessDialogComponent } from '../../../shared/succes-dialog/succes-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-admission',
  standalone: false,
  templateUrl: './add-admission.component.html',
  styleUrl: './add-admission.component.css',
})
export class AddAdmissionComponent implements OnInit, OnDestroy {
  model: AdmissionModel = {
    admissionDateTime: new Date().toISOString(),
    patientId: 0,
    doctorId: 0,
    isEmergency: false,
  };

  patients: Patient[] = [];
  doctors: Doctor[] = [];
  private subscription: Subscription = new Subscription();

  minDateTime: string = new Date().toISOString().slice(0, 16);

  constructor(
    private router: Router,
    private admissionService: AdmissionsService,
    private patientsService: PatientsService,
    private doctorsService: DoctorsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPatients();
    this.getDoctors();
  }

  isPastDate(dateTime: string): boolean {
    const inputDate = new Date(dateTime);
    const currentDate = new Date();
    return inputDate < currentDate;
  }

  getPatients(): void {
    this.subscription.add(
      this.patientsService.getPatients().subscribe({
        next: (data: Patient[]) => {
          this.patients = data;
        },
        error: (err) => {},
      })
    );
  }

  getDoctors(): void {
    this.subscription.add(
      this.doctorsService.getDoctors().subscribe({
        next: (data: Doctor[]) => {
          this.doctors = data.filter((doctor) => doctor.isSpec);
        },
        error: (err) => {},
      })
    );
  }

  onSubmit(): void {
    if (this.model.admissionDateTime) {
      this.model.admissionDateTime = new Date(
        this.model.admissionDateTime
      ).toISOString();
    }

    if (typeof this.model.isEmergency !== 'boolean') {
      this.model.isEmergency = Boolean(this.model.isEmergency);
    }

    if (!this.model.admissionDateTime || this.model.patientId <= 0 || this.model.doctorId <= 0) {
      return;
    }

    if (!this.patients.length || !this.doctors.length) {
      return;
    }

    this.subscription.add(
      this.admissionService.addAdmission(this.model).subscribe({
        next: () => {
          this.openSuccessDialog('Uspješno dodan prijem');
          this.router.navigate(['/']);
        },
        error: (err) => {},
      })
    );
  }

  openSuccessDialog(message: string): void {
    this.dialog.open(SuccessDialogComponent, {
      data: { message },
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
