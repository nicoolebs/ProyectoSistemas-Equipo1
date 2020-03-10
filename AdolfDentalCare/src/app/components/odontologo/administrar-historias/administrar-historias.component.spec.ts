import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarHistoriasComponent } from './administrar-historias.component';

describe('AdministrarHistoriasComponent', () => {
  let component: AdministrarHistoriasComponent;
  let fixture: ComponentFixture<AdministrarHistoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarHistoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarHistoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
