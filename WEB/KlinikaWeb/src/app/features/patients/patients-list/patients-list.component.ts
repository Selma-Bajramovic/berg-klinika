import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../services/patients.service';
import { Patient } from '../models/patient.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { SuccessDialogComponent } from '../../../shared/succes-dialog/succes-dialog.component';

@Component({
  selector: 'app-patients-list',
  standalone: false,
  templateUrl: './patients-list.component.html',
  styleUrl: './patients-list.component.css',
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];

  constructor(
    private patientsService: PatientsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientsService.getPatients().subscribe({
      next: (data) => (this.patients = data),
      error: (err) => console.error('Greška prilikom učitavanja pacijenata:', err),
    });
  }

  editPatient(id: string): void {
    this.patientsService.getPatientById(id.toString()).subscribe({
      next:(patient)=>{
        this.router.navigate(['/uredipacijenta', id], {
          state: { patient: patient },
        });
      },
      error: (err) => {},
    });
  }
  

  confirmDelete(patientId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Da li ste sigurni da želite obrisati pacijenta?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletePatient(patientId);
      }
    });
  }

  deletePatient(id: string): void {
    this.patientsService.deletePatientById(id).subscribe({
      next: () => {
        this.openSuccessDialog('Uspješno obrisan pacijent');
        this.loadPatients();
      },
      error: (err) => console.error('Greška prilikom brisanja pacijenta:', err),
    });
  }

  openSuccessDialog(message: string): void {
    this.dialog.open(SuccessDialogComponent, {
      data: { message },
    });
  }
}
