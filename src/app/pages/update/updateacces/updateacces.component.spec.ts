import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateaccesComponent } from './updateacces.component';

describe('UpdateaccesComponent', () => {
  let component: UpdateaccesComponent;
  let fixture: ComponentFixture<UpdateaccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateaccesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateaccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
