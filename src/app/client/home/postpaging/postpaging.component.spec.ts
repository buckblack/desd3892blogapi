import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostpagingComponent } from './postpaging.component';

describe('PostpagingComponent', () => {
  let component: PostpagingComponent;
  let fixture: ComponentFixture<PostpagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostpagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostpagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
