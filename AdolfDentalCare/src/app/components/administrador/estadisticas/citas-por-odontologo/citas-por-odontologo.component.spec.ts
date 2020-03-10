import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasPorOdontologoComponent } from './citas-por-odontologo.component';

describe('CitasPorOdontologoComponent', () => {
  let component: CitasPorOdontologoComponent;
  let fixture: ComponentFixture<CitasPorOdontologoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasPorOdontologoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasPorOdontologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
