import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAndEditComponent } from './search-and-edit.component';

describe('SearchAndEditComponent', () => {
  let component: SearchAndEditComponent;
  let fixture: ComponentFixture<SearchAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchAndEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
