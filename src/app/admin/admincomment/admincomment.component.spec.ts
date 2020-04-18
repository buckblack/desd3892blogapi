import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincommentComponent } from './admincomment.component';

describe('AdmincommentComponent', () => {
  let component: AdmincommentComponent;
  let fixture: ComponentFixture<AdmincommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
