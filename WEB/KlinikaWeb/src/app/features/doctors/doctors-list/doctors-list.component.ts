import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorsService } from '../../../features/doctors/services/doctors.service';
import { Doctor } from '../../../features/doctors/models/doctor.model';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../../shared/succes-dialog/succes-dialog.component';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css'],
  standalone: false
})
export class DoctorsListComponent implements OnInit {
  doctors: Doctor[] = [];
  allDoctors: Doctor[] = [];

  constructor(
    private router: Router,
    private doctorsService: DoctorsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctorsService.getDoctors().subscribe({
      next: (data: Doctor[]) => {
        this.allDoctors = data;
        this.doctors = [...data];
      },
      error: (err) => {},
    });
  }

  editDoctor(id: string): void {
    this.doctorsService.getDoctorById(id.toString()).subscribe({
      next: (doctor) => {
        this.router.navigate(['/uredidoktora', id], {
          state: { doctor: doctor },
        });
      },
      error: (err) => {},
    });
  }

  confirmDelete(doctorId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Da li ste sigurni da želite obrisati doktora?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteDoctor(doctorId);
      }
    });
  }

  deleteDoctor(doctorId: string): void {
    this.doctorsService.deleteDoctorById(doctorId).subscribe({
      next: () => {
        this.openSuccessDialog('Uspješno obrisan doktor');
        this.loadDoctors();
      },
      error: (err) => {},
    });
  }

  openSuccessDialog(message: string): void {
    this.dialog.open(SuccessDialogComponent, {
      data: { message },
    });
  }

  toggleSpecialists(showOnlySpecialists: boolean): void {
    if (showOnlySpecialists) {
      this.doctors = this.allDoctors.filter(doctor => doctor.isSpec);
    } else {
      this.doctors = [...this.allDoctors];
    }
  }
}
