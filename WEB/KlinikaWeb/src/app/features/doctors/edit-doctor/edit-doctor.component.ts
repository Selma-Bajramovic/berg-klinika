import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorsService } from '../services/doctors.service';
import { MatDialog } from '@angular/material/dialog';
import { DoctorModel } from '../models/add-doctor-request.model';
import { SuccessDialogComponent } from '../../../shared/succes-dialog/succes-dialog.component';

@Component({
  selector: 'app-edit-doctor',
  standalone: false,
  
  templateUrl: './edit-doctor.component.html',
  styleUrl: './edit-doctor.component.css'
})
export class EditDoctorComponent implements OnInit {

  doctor:Doctor={
    id:'',
    name:'',
    surname:'',
    jmbg:'',
    dateOfBirth:new Date(),
    gender:'',
    address:'',
    phoneNumber:'',
    title:'',
    doctorCode:'',
    isSpec:false
  };

  constructor(
    private route:ActivatedRoute,
    private doctorsService:DoctorsService,
    private router:Router,
    private dialog:MatDialog
  ) {}

  ngOnInit():void{
    this.loadDoctors();
  }

  loadDoctors(){
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.doctorsService.getDoctorById(id).subscribe(
        data=>{
          this.doctor=data;
        },
        error=>{}
      );
    }
  }

  onSubmit(){
    if(this.doctor.id){
      const doctorModel:DoctorModel={
        name:this.doctor.name,
        surname: this.doctor.surname,
        jmbg: this.doctor.jmbg,
        dateOfBirth: this.doctor.dateOfBirth,
        gender: this.doctor.gender,
        address: this.doctor.address,
        phoneNumber: this.doctor.phoneNumber,
        title: this.doctor.title,
        isSpec:this.doctor.isSpec
      };

      this.doctorsService.updateDoctor(this.doctor.id,this.doctor).subscribe(
        ()=>{
          this.openSuccessDialog('Doktor uspješno uređen');
          this.router.navigateByUrl('/doktori')
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
