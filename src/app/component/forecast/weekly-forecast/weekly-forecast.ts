import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeeklyData } from '../../../model/weather.model';

@Component({
  selector: 'app-weekly-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weekly-forecast.html',
  styleUrl: './weekly-forecast.scss',
})
export class WeeklyForecast {
  @Input() data: WeeklyData[] = [];
}
