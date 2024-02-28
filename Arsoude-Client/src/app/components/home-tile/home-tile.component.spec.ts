import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTileComponent } from './home-tile.component';

describe('HomeTileComponent', () => {
  let component: HomeTileComponent;
  let fixture: ComponentFixture<HomeTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTileComponent]
    });
    fixture = TestBed.createComponent(HomeTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
