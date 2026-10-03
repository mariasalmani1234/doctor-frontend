import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentManagerComponent } from './treatment-manager.component';

describe('TreatmentManagerComponent', () => {
  let component: TreatmentManagerComponent;
  let fixture: ComponentFixture<TreatmentManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreatmentManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreatmentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
