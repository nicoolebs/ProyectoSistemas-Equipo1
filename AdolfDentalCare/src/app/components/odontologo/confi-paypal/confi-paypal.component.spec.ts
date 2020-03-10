import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiPaypalComponent } from './confi-paypal.component';

describe('ConfiPaypalComponent', () => {
  let component: ConfiPaypalComponent;
  let fixture: ComponentFixture<ConfiPaypalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiPaypalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiPaypalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
