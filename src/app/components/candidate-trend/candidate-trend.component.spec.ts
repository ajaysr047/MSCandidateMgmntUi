import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateTrendComponent } from './candidate-trend.component';

describe('CandidateTrendComponent', () => {
  let component: CandidateTrendComponent;
  let fixture: ComponentFixture<CandidateTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateTrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
