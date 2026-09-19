import { Component } from '@angular/core';
import { DentalChartComponent } from '../../shared/components/dental-chart/dental-chart.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [DentalChartComponent,CommonModule,FormsModule],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})
export class DoctorDashboardComponent {

}
