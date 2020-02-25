import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiHistoriaComponent } from './mi-historia.component';

describe('MiHistoriaComponent', () => {
  let component: MiHistoriaComponent;
  let fixture: ComponentFixture<MiHistoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiHistoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiHistoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
