import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionAddViewComponent } from './institution-add-view.component';

describe('InstitutionAddViewComponent', () => {
  let component: InstitutionAddViewComponent;
  let fixture: ComponentFixture<InstitutionAddViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionAddViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionAddViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
