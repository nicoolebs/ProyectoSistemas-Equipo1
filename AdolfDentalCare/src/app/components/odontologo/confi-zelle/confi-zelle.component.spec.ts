import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiZelleComponent } from './confi-zelle.component';

describe('ConfiZelleComponent', () => {
  let component: ConfiZelleComponent;
  let fixture: ComponentFixture<ConfiZelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiZelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiZelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
