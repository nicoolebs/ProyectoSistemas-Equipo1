import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiBancoComponent } from './confi-banco.component';

describe('ConfiBancoComponent', () => {
  let component: ConfiBancoComponent;
  let fixture: ComponentFixture<ConfiBancoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiBancoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
