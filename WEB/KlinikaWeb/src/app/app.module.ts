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
import { PatientsListComponent } from './features/patients/patients-list/patients-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FindingsListComponent,
    AdmissionsListComponent,
    DoctorsListComponent,
    PatientsListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    MatSidenavModule, 
    MatButtonModule,
    MatIconModule, 
    MatSlideToggleModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
