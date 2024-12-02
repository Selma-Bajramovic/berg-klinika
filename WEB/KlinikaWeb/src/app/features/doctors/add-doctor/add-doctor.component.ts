import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorsService } from '../../../features/doctors/services/doctors.service';
import { DoctorModel } from '../models/add-doctor-request.model';
import { SuccessDialogComponent } from '../../../shared/succes-dialog/succes-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-doctor',
  standalone: false, 
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css'],
})
export class AddDoctorComponent {
  model: DoctorModel = {
    name: '',
    surname: '',
    jmbg: '',
    dateOfBirth: new Date(),
    gender: '',
    address: '',
    phoneNumber: '',
    title: '',
    isSpec: false,
  };

  constructor(
    private router: Router, 
    private doctorsService: DoctorsService,
    private dialog: MatDialog) {}

  onSubmit(): void {
    if (this.isFormValid()) {
      this.doctorsService.addDoctor(this.model).subscribe({
        next: () => {
          this.openSuccessDialog('Uspješno dodan doktor');
          this.router.navigate(['/doktori']);
        },
        error: (err) => {
          alert('Došlo je do greške prilikom dodavanja doktora. Pokušajte ponovo.');
        },
      });
    } else {
      alert('Molimo popunite sva obavezna polja.');
    }
  }

  private isFormValid(): boolean {
    return !!this.model.name && !!this.model.surname && !!this.model.jmbg && !!this.model.gender && !!this.model.address 
      && !!this.model.phoneNumber && !!this.model.title && !!this.model.dateOfBirth && this.model.isSpec !== null && this.model.isSpec !== undefined;
  }
  
  openSuccessDialog(message: string): void {
    this.dialog.open(SuccessDialogComponent, {
      data: { message },
    });
  }
  
  navigateToHome(): void {
    this.router.navigate(['/doktori']);
  }
}
