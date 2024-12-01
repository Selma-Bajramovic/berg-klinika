import { Component, OnInit } from '@angular/core';
import { Finding } from '../models/finding.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FindingsService } from '../services/findings.service';
import { FindingModel } from '../models/add-finding-request-model';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../../shared/succes-dialog/succes-dialog.component';

@Component({
  selector: 'app-edit-finding',
  standalone: false,
  
  templateUrl: './edit-finding.component.html',
  styleUrl: './edit-finding.component.css'
})
export class EditFindingComponent implements OnInit {

    finding:Finding={
      id:'',
      admissionId:0,
      description:'',
      createdAt:'',
      patientName:'',
      doctorDetails:''
    };

    constructor(
      private route: ActivatedRoute,
      private findingsService: FindingsService,
      private router:Router,
      private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.loadFinding();
  }

  loadFinding() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.findingsService.getFindingById(id).subscribe(
        data => {
          this.finding = data;
        },
        error => {}
      );
    }
  }
  
  onSubmit() {
    if (this.finding.id) {
      const findingModel: FindingModel = {
        admissionId: this.finding.admissionId,
        description: this.finding.description
      };

      this.findingsService.updateFinding(this.finding.id, this.finding).subscribe(
        () => {
          this.openSuccessDialog('Nalaz uspješno uređen');
          this.router.navigateByUrl('/nalazi');
        },
        error => {}
      );
    }
  }

  openSuccessDialog(message: string): void {
    this.dialog.open(SuccessDialogComponent, {
      data: { message }
    });
  }

  cancel() {
    this.router.navigate(['/nalazi']);
  }
}
