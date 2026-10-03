import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctotSidebarComponent } from './doctor-sidebar.component';

describe('DoctotSidebarComponent', () => {
  let component: DoctotSidebarComponent;
  let fixture: ComponentFixture<DoctotSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctotSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctotSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
