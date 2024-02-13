import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTrailsComponent } from './all-trails.component';

describe('AllTrailsComponent', () => {
  let component: AllTrailsComponent;
  let fixture: ComponentFixture<AllTrailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllTrailsComponent]
    });
    fixture = TestBed.createComponent(AllTrailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
