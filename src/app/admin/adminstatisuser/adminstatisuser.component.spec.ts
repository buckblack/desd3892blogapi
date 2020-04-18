import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminstatisuserComponent } from './adminstatisuser.component';

describe('AdminstatisuserComponent', () => {
  let component: AdminstatisuserComponent;
  let fixture: ComponentFixture<AdminstatisuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminstatisuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminstatisuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
