import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminstatispostComponent } from './adminstatispost.component';

describe('AdminstatispostComponent', () => {
  let component: AdminstatispostComponent;
  let fixture: ComponentFixture<AdminstatispostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminstatispostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminstatispostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
