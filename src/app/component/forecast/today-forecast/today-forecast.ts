import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { TodayData } from '../../../model/weather.model';
import { UnitService } from '../../../service/unit-service/unit-service';

@Component({
  selector: 'app-today-forecast',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './today-forecast.html',
  styleUrl: './today-forecast.scss',
})

export class TodayForecast {
  @Input() data!: TodayData;

  constructor(private unitService: UnitService) {}

  get todayDetails() {
    if (!this.data) return [];

    const isMetric = this.unitService.isMetric();
    const unit = isMetric ? 'kmh' : 'mph';
    const wind = isMetric ? (this.data.wind / 3.6).toFixed(1) : this.data.wind.toFixed(1);
    const gust = isMetric ? (this.data.gust / 3.6).toFixed(1) : this.data.gust.toFixed(1);

    return [
      { label: 'Sunrise', value: this.data.sunrise, icon: 'wb_twilight', color: 'color: #F7CD5D'},
      { label: 'Sunset', value: this.data.sunset, icon: 'bedtime', color: 'color: #FAD6A5'},
      { label: 'Wind', value: `${wind} ${unit}`, icon: 'airwave', color: 'color: gray' },
      { label: 'Humidity', value: this.data.humidity + '%', icon: 'water_drop', color: 'color: turquoise' },
      { label: 'Pressure', value: this.data.pressure + ' hPa', icon: 'compare_arrows', color: 'color: orange'},
      { label: 'Gusts', value: `${gust} ${unit}`, icon: 'air', color: 'color: beige'},
    ];

  }

}
