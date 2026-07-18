// app.ts
import { ChangeDetectorRef, Component, computed, signal } from '@angular/core';
import { SearchComponent } from './component/search/search';
import { ToggleComponent } from './component/toggle/toggle';
import { WeatherService } from './service/weather-service/weather.service';
import { CommonModule } from '@angular/common';
import { TodayForecast } from './component/forecast/today-forecast/today-forecast';
import { HourlyForecast } from "./component/forecast/hourly-forecast/hourly-forecast";
import { WeeklyForecast } from './component/forecast/weekly-forecast/weekly-forecast';
import { HourlyData, TodayData, WeeklyData } from "./model/weather.model";
import { UnitService } from './service/unit-service/unit-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchComponent, ToggleComponent, CommonModule, TodayForecast, HourlyForecast, WeeklyForecast],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  weatherData = signal<any>(null);

  constructor(
    private weatherService: WeatherService,
    private cdr: ChangeDetectorRef,
    public unitService: UnitService
  ) { }

  ngOnInit() {
    this.onCitySelected('Cairo');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          let lon = pos.coords.longitude;
          let lat = pos.coords.latitude;
          this.getCityFromCoords(lon, lat);
        },
        () => { }
      )
    }
  }

  todayData = computed(() => {
    const data = this.weatherData();
    if (!data) return {};

    const todayInfo = data.list[0];
    const timezone = data.city.timezone;

    return {
      city: data.city.name,
      country: data.city.country,
      desc: todayInfo.weather[0].description,
      temp: todayInfo.main.temp,
      feels: todayInfo.main.feels_like,
      min: todayInfo.main.temp_min,
      max: todayInfo.main.temp_max,
      humidity: todayInfo.main.humidity,
      pressure: todayInfo.main.pressure,
      wind: todayInfo.wind.speed,
      sunrise: this.formatHour(data.city.sunrise, data.city.timezone),
      sunset: this.formatHour(data.city.sunset, data.city.timezone),
      gust: todayInfo.wind.gust,
      icon: `https://openweathermap.org/img/wn/${todayInfo.weather[0].icon}@2x.png`,
    };
  })

  hourlyData = computed<HourlyData[]>(() => {
    const data = this.weatherData();
    const timezone = data?.city.timezone;

    if (!data) return [];
    return data?.list.slice(0, 10).map((item: any) => ({
      hour: this.formatHour(item.dt, timezone),
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      temp: this.convertTemp(item.main.temp)
    }));
  })

  weeklyData = computed<WeeklyData[]>(() => {
    const data = this.weatherData();
    if (!data) return [];
    console.log(data, "weekly");

    const daily = new Map<String, { min: number; max: number; item: any }>();
    for (const item of data.list) {
      const date = item.dt_txt.split(' ')[0];
      const currMin = item.main.temp_min;
      const currMax = item.main.temp_max;

      if (!daily.has(date)) {
        daily.set(date, { min: currMin, max: currMax, item });
      } else {
        const group = daily.get(date)!;
        group.min = Math.min(group.min, currMin);
        group.max = Math.max(group.max, currMax);
      }
    }
    return Array.from(daily.values()).map((group: any) => {
      const dateObj = new Date(group.item.dt_txt);
      return {
        day: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
        date: dateObj.toLocaleDateString('en-US', { day: "2-digit", month: 'short' }),
        min: this.convertTemp(group.min),
        max: this.convertTemp(group.max),
        icon: `https://openweathermap.org/img/wn/${group.item.weather[0].icon}@2x.png`
      }
    })
  })

  getCityFromCoords(lon: number, lat: number) {
    const units = this.unitService.isMetric() ? 'metric' : 'imperial';

    this.weatherService.getForecastWithCoords(lon, lat, units).subscribe({
      next: data => {
        this.onCitySelected(data.city.name);
      },
      error: () => { }
    }
    )
  }

  onUnitToggle() {
    this.unitService.toggle();
  }

  onCitySelected(city: string) {
    if (!city) return;
    this.weatherService.getForecastWithCity(city, 'metric').subscribe({
      next: data => {
        this.weatherData.set(data);
        this.cdr.markForCheck();
        console.log('[App] weatherData set:', this.weatherData);
      },
      error: err => console.error(err)
    });

  }

  private convertTemp(celsius: number): number {
    if (this.unitService.isMetric()) {
      return Math.round(celsius);
    }
    return Math.round((celsius * 9) / 5 + 32);
  }

  formatHour(unix: number, offset: number): string {
    const local_date = new Date((unix + offset) * 1000);
    return local_date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    });
  }
}
