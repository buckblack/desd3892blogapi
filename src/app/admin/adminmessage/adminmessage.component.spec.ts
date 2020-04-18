import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmessageComponent } from './adminmessage.component';

describe('AdminmessageComponent', () => {
  let component: AdminmessageComponent;
  let fixture: ComponentFixture<AdminmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
