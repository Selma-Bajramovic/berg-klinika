import { Component, OnInit } from '@angular/core';
import { FindingsService } from '../services/findings.service';
import { Finding } from '../models/finding.model';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SuccessDialogComponent } from '../../../shared/succes-dialog/succes-dialog.component';

@Component({
  selector: 'app-findings-list',
  standalone: false,
  
  templateUrl: './findings-list.component.html',
  styleUrl: './findings-list.component.css'
})
export class FindingsListComponent implements OnInit {
  findings: Finding[] = [];

  constructor(
    private findingsService: FindingsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadFindings();
  }

  loadFindings() {
    this.findingsService.getFindings().subscribe({
      next: (data) => {
        this.findings = data;
      },
      error: (err) => {
        console.error('Error fetching findings:', err);
      },
    });
  }

  confirmDelete(findingId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Da li ste sigurni da želite obrisati nalaz?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteFinding(findingId);
      }
    });
  }

  deleteFinding(id: string): void {
    this.findingsService.deleteFindingById(id).subscribe({
      next: () => {
        this.openSuccessDialog('Uspješno obrisan nalaz');
        this.loadFindings();
      },
      error: (err) => console.error('Greška prilikom brisanja pacijenta:', err),
    });
  }

  openSuccessDialog(message: string): void {
    this.dialog.open(SuccessDialogComponent, {
      data: { message }
    });
  }

  editFinding(findingId: any): void {
    this.findingsService.getFindingById(findingId.toString()).subscribe({
      next: (finding) => {
        this.router.navigate(['/uredinalaz', findingId], {
          state: { finding: finding },
        });
      },
      error: (err) => {},
    });
  }
}
