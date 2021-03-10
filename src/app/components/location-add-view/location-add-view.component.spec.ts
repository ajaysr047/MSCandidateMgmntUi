import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAddViewComponent } from './location-add-view.component';

describe('LocationAddViewComponent', () => {
  let component: LocationAddViewComponent;
  let fixture: ComponentFixture<LocationAddViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationAddViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationAddViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
