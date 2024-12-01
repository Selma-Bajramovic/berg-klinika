import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import { FindingsListComponent } from './features/findings/findings-list/findings-list.component';
import { AdmissionsListComponent } from './home/admissions/admissions-list/admissions-list.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DoctorsListComponent } from './features/doctors/doctors-list/doctors-list.component';
import { PatientListComponent } from './features/patients/patients-list/patients-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddAdmissionComponent } from './home/admissions/add-admission/add-admission.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { AddDoctorComponent } from './features/doctors/add-doctor/add-doctor.component';
import { AddPatientComponent } from './features/patients/add-patient/add-patient.component';
import { AddFindingComponent } from './features/findings/add-finding/add-finding.component';
import { EditAdmissionComponent } from './home/admissions/edit-admission/edit-admission.component';
import { EditFindingComponent } from './features/findings/edit-finding/edit-finding.component';
import { SuccessDialogComponent } from './shared/succes-dialog/succes-dialog.component';
import { EditPatientComponent } from './features/patients/edit-patient/edit-patient.component';
import { EditDoctorComponent } from './features/doctors/edit-doctor/edit-doctor.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FindingsListComponent,
    AdmissionsListComponent,
    DoctorsListComponent,
    PatientListComponent,
    AddAdmissionComponent,
    ConfirmationDialogComponent,
    AddDoctorComponent,
    AddPatientComponent,
    AddFindingComponent,
    EditAdmissionComponent,
    EditFindingComponent,
    SuccessDialogComponent,
    EditPatientComponent,
    EditDoctorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    MatSidenavModule, 
    MatButtonModule,
    MatIconModule, 
    MatSlideToggleModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    FormsModule,
    RouterModule.forRoot([]),
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
