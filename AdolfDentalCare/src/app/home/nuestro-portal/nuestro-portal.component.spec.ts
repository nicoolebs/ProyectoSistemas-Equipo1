import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestroPortalComponent } from './nuestro-portal.component';

describe('NuestroPortalComponent', () => {
  let component: NuestroPortalComponent;
  let fixture: ComponentFixture<NuestroPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuestroPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuestroPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
