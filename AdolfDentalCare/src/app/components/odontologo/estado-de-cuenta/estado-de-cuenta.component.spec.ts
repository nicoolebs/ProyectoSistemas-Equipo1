import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoDeCuentaComponent } from './estado-de-cuenta.component';

describe('EstadoDeCuentaComponent', () => {
  let component: EstadoDeCuentaComponent;
  let fixture: ComponentFixture<EstadoDeCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoDeCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoDeCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
