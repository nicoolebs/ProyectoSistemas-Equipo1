import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDashComponent } from './nav-dash.component';

describe('NavDashComponent', () => {
  let component: NavDashComponent;
  let fixture: ComponentFixture<NavDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
