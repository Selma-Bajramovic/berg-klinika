import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionsListComponent } from './home/admissions/admissions-list/admissions-list.component';
import { DoctorsListComponent } from './features/doctors/doctors-list/doctors-list.component';
import { PatientListComponent } from './features/patients/patients-list/patients-list.component';
import { FindingsListComponent } from './features/findings/findings-list/findings-list.component';
import { AddAdmissionComponent } from './home/admissions/add-admission/add-admission.component';
import { AddDoctorComponent } from './features/doctors/add-doctor/add-doctor.component';
import { AddPatientComponent } from './features/patients/add-patient/add-patient.component';
import { AddFindingComponent } from './features/findings/add-finding/add-finding.component';
import { EditAdmissionComponent } from './home/admissions/edit-admission/edit-admission.component';
import { EditFindingComponent } from './features/findings/edit-finding/edit-finding.component';
import { EditPatientComponent } from './features/patients/edit-patient/edit-patient.component';
import { EditDoctorComponent } from './features/doctors/edit-doctor/edit-doctor.component';

const routes: Routes = [
 {path:'prijemi',component:AdmissionsListComponent},
 {path:'doktori',component:DoctorsListComponent},
 {path:'pacijenti',component:PatientListComponent},
 {path:'nalazi',component:FindingsListComponent},
 {path:'noviprijem',component:AddAdmissionComponent},
 {path:'novidoktor',component:AddDoctorComponent},
 {path:'novipacijent',component:AddPatientComponent},
 {path:'napisinalaz/:id',component:AddFindingComponent},
 {path:'uredinalaz/:id',component:EditFindingComponent},
 {path:'uredipacijenta/:id',component:EditPatientComponent},
 {path:'uredidoktora/:id',component:EditDoctorComponent},
 {path:'**',redirectTo:'/prijemi'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
