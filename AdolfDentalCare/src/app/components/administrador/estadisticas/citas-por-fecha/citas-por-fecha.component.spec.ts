import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasPorFechaComponent } from './citas-por-fecha.component';

describe('CitasPorFechaComponent', () => {
  let component: CitasPorFechaComponent;
  let fixture: ComponentFixture<CitasPorFechaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasPorFechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasPorFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
