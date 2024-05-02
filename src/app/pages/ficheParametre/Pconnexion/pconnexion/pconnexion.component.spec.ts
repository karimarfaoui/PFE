import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PconnexionComponent } from './pconnexion.component';

describe('PconnexionComponent', () => {
  let component: PconnexionComponent;
  let fixture: ComponentFixture<PconnexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PconnexionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PconnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
