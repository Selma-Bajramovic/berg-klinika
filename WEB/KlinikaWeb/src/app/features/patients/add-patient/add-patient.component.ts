import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientsService } from '../../../features/patients/services/patients.service';
import { PatientModel } from '../models/add-patient-request.model';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../../shared/succes-dialog/succes-dialog.component';

@Component({
    selector: 'app-add-patient',
    standalone: false,
    templateUrl: './add-patient.component.html',
    styleUrls: ['./add-patient.component.css'],
})
export class AddPatientComponent {
    model: PatientModel = {
        name: '',
        surname: '',
        jmbg: '',
        dateOfBirth: new Date(),
        gender: '',
        address: '',
        phoneNumber: '',
    };

    constructor(
        private router: Router,
        private patientsService: PatientsService,
        private dialog: MatDialog
    ) {}

    onSubmit(): void {
        if (this.isFormValid()) {
            this.patientsService.addPatient(this.model).subscribe({
                next: () => {
                    this.openSuccessDialog('Uspješno dodan pacijent');
                    this.router.navigate(['/pacijenti']);
                },
                error: (err) => {
                    alert('Došlo je do greške prilikom dodavanja pacijenta. Pokušajte ponovo.');
                },
            });
        } else {
            alert('Molimo popunite sva obavezna polja.');
        }
    }

    private isFormValid(): boolean {
        return (
            !!this.model.name &&
            !!this.model.surname &&
            !!this.model.jmbg &&
            !!this.model.gender &&
            !!this.model.address &&
            !!this.model.phoneNumber &&
            !!this.model.dateOfBirth
        );
    }

    openSuccessDialog(message: string): void {
        this.dialog.open(SuccessDialogComponent, {
            data: { message },
        });
    }

    navigateToHome(): void {
        this.router.navigate(['/pacijenti']);
    }
}
