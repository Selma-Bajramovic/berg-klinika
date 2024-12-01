import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFindingComponent } from './edit-finding.component';

describe('EditFindingComponent', () => {
  let component: EditFindingComponent;
  let fixture: ComponentFixture<EditFindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFindingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
