import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminnotifyComponent } from './adminnotify.component';

describe('AdminnotifyComponent', () => {
  let component: AdminnotifyComponent;
  let fixture: ComponentFixture<AdminnotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminnotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminnotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
