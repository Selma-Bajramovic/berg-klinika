import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patient.model';
import { PatientsService } from '../services/patients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../../shared/succes-dialog/succes-dialog.component';
import { PatientModel } from '../models/add-patient-request.model';

@Component({
  selector: 'app-edit-patient',
  standalone: false,
  
  templateUrl: './edit-patient.component.html',
  styleUrl: './edit-patient.component.css'
})
export class EditPatientComponent implements OnInit{


  patient:Patient={
    id:'',
    name:'',
    surname:'',
    jmbg:'',
    dateOfBirth:new Date(),
    gender:'',
    address:'',
    phoneNumber:'',
  };

  constructor(
    private route: ActivatedRoute,
      private patientsService: PatientsService,
      private router:Router,
      private dialog: MatDialog
  ){}
  
  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(){
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.patientsService.getPatientById(id).subscribe(
        data=>{
          this.patient=data;
        },
        error=>{}
      );
    }
  }

  onSubmit(){
    if(this.patient.id){
      const patientModel:PatientModel={
        name:this.patient.name,
        surname:this.patient.surname,
        jmbg:this.patient.jmbg,
        dateOfBirth:this.patient.dateOfBirth,
        gender:this.patient.gender,
        address:this.patient.address,
        phoneNumber:this.patient.phoneNumber,
    };

    this.patientsService.updatePatient(this.patient.id,this.patient).subscribe(
      ()=>{
        this.openSuccessDialog('Pacijent uspješno uređen');
        this.router.navigateByUrl('/pacijenti');
      },
      error=>{}
      );
    }
  }

  openSuccessDialog(message: string): void {
    this.dialog.open(SuccessDialogComponent, {
      data: { message }
    });
  }

  cancel() {
    this.router.navigate(['/pacijenti']);
  }


}
