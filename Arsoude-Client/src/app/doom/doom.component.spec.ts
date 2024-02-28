import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoomComponent } from './doom.component';

describe('DoomComponent', () => {
  let component: DoomComponent;
  let fixture: ComponentFixture<DoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoomComponent]
    });
    fixture = TestBed.createComponent(DoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
