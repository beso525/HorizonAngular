import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HourlyData } from '../../../model/weather.model';

@Component({
  selector: 'app-hourly-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hourly-forecast.html',
  styleUrl: './hourly-forecast.scss',
})
export class HourlyForecast {
  @Input() data: HourlyData[] = [];
}
