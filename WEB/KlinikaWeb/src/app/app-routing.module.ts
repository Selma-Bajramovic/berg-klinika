import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionsListComponent } from './home/admissions/admissions-list/admissions-list.component';
import { DoctorsListComponent } from './features/doctors/doctors-list/doctors-list.component';
import { PatientsListComponent } from './features/patients/patients-list/patients-list.component';
import { FindingsListComponent } from './features/findings/findings-list/findings-list.component';

const routes: Routes = [
 {path:'prijemi',component:AdmissionsListComponent},
 {path:'doktori',component:DoctorsListComponent},
 {path:'pacijenti',component:PatientsListComponent},
 {path:'nalazi',component:FindingsListComponent},
 {path:'**',redirectTo:'/prijemi'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
