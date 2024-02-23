import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHikesComponent } from './my-hikes.component';

describe('MyHikesComponent', () => {
  let component: MyHikesComponent;
  let fixture: ComponentFixture<MyHikesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyHikesComponent]
    });
    fixture = TestBed.createComponent(MyHikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
