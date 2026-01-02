import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { TodayData } from '../../../model/weather.model';

@Component({
  selector: 'app-today-forecast',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './today-forecast.html',
  styleUrl: './today-forecast.scss',
})

export class TodayForecast {
  @Input() data!: TodayData;

  get todayDetails() {
    if (!this.data) return [];

    return [
      { label: 'Sunrise', value: this.data.sunrise, icon: 'wb_twilight', color: 'color: #F7CD5D'},
      { label: 'Sunset', value: this.data.sunset, icon: 'bedtime', color: 'color: #FAD6A5'},
      { label: 'Wind', value: `${this.data.wind} mph`, icon: 'airwave', color: 'color: gray' },
      { label: 'Humidity', value: this.data.humidity + '%', icon: 'water_drop', color: 'color: turquoise' },
      { label: 'Pressure', value: this.data.pressure + ' hPa', icon: 'compare_arrows', color: 'color: orange'},
      { label: 'Gusts', value: this.data.gust, icon: 'air', color: 'color: beige'},
    ];

  }

}
