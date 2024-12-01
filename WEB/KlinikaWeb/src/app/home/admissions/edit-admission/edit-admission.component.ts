import { Component, OnInit } from '@angular/core';
import { Admission } from '../models/admission.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AdmissionsService } from '../services/admissions.service';
import { MatDialog } from '@angular/material/dialog';
import { AdmissionModel } from '../models/add-admission-request.model';
import { SuccessDialogComponent } from '../../../shared/succes-dialog/succes-dialog.component';

@Component({
  selector: 'app-edit-admission',
  standalone: false,
  
  templateUrl: './edit-admission.component.html',
  styleUrl: './edit-admission.component.css'
})
export class EditAdmissionComponent implements OnInit {


  admission:Admission={
    id:0,
    admissionDateTime:'',
    patientId:0,
    doctorId:0,
    isEmergency:false,
    patientName:'',
    doctorDetails:''
  };

  constructor(
    private route:ActivatedRoute,
    private admissionService:AdmissionsService,
    private router:Router,
    private dialog:MatDialog
  ){}

  ngOnInit(): void {
    this.loadAdmissions();
  }


  loadAdmissions(){
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.admissionService.getAdmissionById(id).subscribe(
        data=>{
          this.admission=data;
        },
        error=>{}
      );
    }
  }

  onSubmit(){
    if(this.admission.id){
      const admissionModel:AdmissionModel={
        admissionDateTime:this.admission.admissionDateTime,
        patientId:this.admission.patientId,
        doctorId:this.admission.doctorId,
        isEmergency:this.admission.isEmergency
      };

      this.admissionService.updateAdmission(this.admission.id.toString(),this.admission).subscribe(
        ()=>{
          this.openSuccessDialog('Prijem uspješno uređen');       
          this.router.navigateByUrl('/prijemi');
         },
         error=>{});
    }
  }

  openSuccessDialog(message: string): void {
    this.dialog.open(SuccessDialogComponent, {
      data: { message }
    });
  }

  cancel() {
    this.router.navigate(['/prijemi']);
  }

}
