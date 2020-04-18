import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminstatiscommentComponent } from './adminstatiscomment.component';

describe('AdminstatiscommentComponent', () => {
  let component: AdminstatiscommentComponent;
  let fixture: ComponentFixture<AdminstatiscommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminstatiscommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminstatiscommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
