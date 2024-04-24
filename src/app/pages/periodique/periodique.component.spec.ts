import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodiqueComponent } from './periodique.component';

describe('PeriodiqueComponent', () => {
  let component: PeriodiqueComponent;
  let fixture: ComponentFixture<PeriodiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodiqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeriodiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
