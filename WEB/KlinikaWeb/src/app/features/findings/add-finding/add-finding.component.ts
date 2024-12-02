import { Component, OnInit } from '@angular/core';
import { FindingModel } from '../models/add-finding-request-model';
import { ActivatedRoute, Router } from '@angular/router';
import { FindingsService } from '../services/findings.service';
import { AdmissionsService } from '../../../home/admissions/services/admissions.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../../shared/succes-dialog/succes-dialog.component';

@Component({
  selector: 'app-add-finding',
  standalone: false,
  templateUrl: './add-finding.component.html',
  styleUrl: './add-finding.component.css'
})
export class AddFindingComponent implements OnInit {
  admissionId!: number;
  finding: FindingModel = {
    admissionId: 0,
    description: '',
  };
  patientName: string = '';
  doctorName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private findingsService: FindingsService,
    private admissionsService: AdmissionsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.admissionId = Number(this.route.snapshot.paramMap.get('id'));
    this.finding.admissionId = this.admissionId;

    this.admissionsService.getAdmissionById(this.admissionId.toString()).subscribe({
      next: (admission) => {
        this.patientName = admission.patientName;
        this.doctorName = admission.doctorDetails;
      },
      error: (err) => {},
    });
  }

  addFinding(): void {
    this.findingsService.addFinding(this.finding).subscribe({
      next: () => {
        this.openSuccessDialog('Uspješno dodan nalaz');
        this.router.navigate(['/nalazi']);
      },
      error: (err) => {},
    });
  }

  openSuccessDialog(message: string): void {
    this.dialog.open(SuccessDialogComponent, {
        data: { message },
    });
  }

  cancel(): void {
    this.router.navigate(['/prijemi']);
  }
}
