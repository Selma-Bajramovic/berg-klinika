import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionsListComponent } from './admissions-list.component';

describe('AdmissionsListComponent', () => {
  let component: AdmissionsListComponent;
  let fixture: ComponentFixture<AdmissionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmissionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
