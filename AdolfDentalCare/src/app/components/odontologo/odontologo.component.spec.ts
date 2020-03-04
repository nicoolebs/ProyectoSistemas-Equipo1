import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdontologoComponent } from './odontologo.component';

describe('OdontologoComponent', () => {
  let component: OdontologoComponent;
  let fixture: ComponentFixture<OdontologoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdontologoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdontologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
