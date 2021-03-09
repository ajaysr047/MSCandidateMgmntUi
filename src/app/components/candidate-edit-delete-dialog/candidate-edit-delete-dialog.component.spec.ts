import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateEditDeleteDialogComponent } from './candidate-edit-delete-dialog.component';

describe('CandidateEditDeleteDialogComponent', () => {
  let component: CandidateEditDeleteDialogComponent;
  let fixture: ComponentFixture<CandidateEditDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateEditDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateEditDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
