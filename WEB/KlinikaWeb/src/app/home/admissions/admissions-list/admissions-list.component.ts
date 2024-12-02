import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../../../features/doctors/services/doctors.service';
import { AdmissionsService } from '../services/admissions.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { SuccessDialogComponent } from '../../../shared/succes-dialog/succes-dialog.component';

@Component({
  selector: 'app-admissions-list',
  standalone: false,
  templateUrl: './admissions-list.component.html',
  styleUrls: ['./admissions-list.component.css']
})
export class AdmissionsListComponent implements OnInit {

  today: string = "";
  doctors: any[] = [];
  admissions: any[] = [];
  allAdmissions: any[] = [];

  filters = {
    fromDate: '',
    toDate: ''
  };

  filtersValid: boolean = true;

  constructor(
    private doctorsService: DoctorsService,
    private admissionsService: AdmissionsService,
    private router: Router,
    private dialog: MatDialog
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
        this.doctors = data.filter((doctor: any) => doctor.isSpec);
      },
      (error) => {}
    );
  }

  getAdmissions(): void {
    this.admissionsService.getAdmissions().subscribe(
      (data) => {
        this.allAdmissions = data;
        this.admissions = [...data];
      },
      (error) => {}
    );
  }

  validateDateRange(): void {
    if (this.filters.fromDate && this.filters.toDate) {
      this.filtersValid = new Date(this.filters.fromDate) <= new Date(this.filters.toDate);
    } else {
      this.filtersValid = true;
    }
  }

  applyFilters(): void {
    const filteredAdmissions = this.allAdmissions.filter(admission => {
      const admissionDate = new Date(admission.admissionDateTime);
      const isInRange = (!this.filters.fromDate || admissionDate >= new Date(this.filters.fromDate)) &&
                        (!this.filters.toDate || admissionDate <= new Date(this.filters.toDate));
      return isInRange;
    });

    this.admissions = filteredAdmissions;
  }

  toggleEmergencyAdmissions(showOnlyEmergency: boolean): void {
    const filteredAdmissions = this.allAdmissions.filter(admission => {
      const admissionDate = new Date(admission.admissionDateTime);
      const isInRange = (!this.filters.fromDate || admissionDate >= new Date(this.filters.fromDate)) &&
                        (!this.filters.toDate || admissionDate <= new Date(this.filters.toDate));
      return isInRange && (showOnlyEmergency ? admission.isEmergency : true);
    });

    this.admissions = filteredAdmissions;
  }

  writeAdmission(admissionId: number): void {
    this.admissionsService.getAdmissionById(admissionId.toString()).subscribe({
      next: (admission) => {
        this.router.navigate(['/napisinalaz', admissionId], {
          state: { admission: admission },
        });
      },
      error: (err) => {},
    });
  }

  confirmDelete(admissionId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Da li ste sigurni da želite otkazati prijem?' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteAdmission(admissionId);
      }
    });
  }

  deleteAdmission(admissionId: number): void {
    this.admissionsService.deleteAdmissionById(admissionId.toString()).subscribe({
      next: () => {
        this.openSuccessDialog('Uspješno otkazan prijem');
        this.getAdmissions();
      },
      error: (err) => {},
    });
  }

  openSuccessDialog(message: string): void {
    this.dialog.open(SuccessDialogComponent, {
      data: { message },
    });
  }
}
