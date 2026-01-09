// app.ts
import { ChangeDetectorRef, Component, computed } from '@angular/core';
import { NavbarComponent } from "./component/navbar/navbar";
import { SearchComponent } from './component/search/search';
import { ToggleComponent } from './component/toggle/toggle';
import { WeatherService } from './service/weather-service/weather.service';
import { CommonModule } from '@angular/common';
import { TodayForecast } from './component/forecast/today-forecast/today-forecast';
import { HourlyForecast } from "./component/forecast/hourly-forecast/hourly-forecast";
import { WeeklyForecast } from './component/forecast/weekly-forecast/weekly-forecast';
import { HourlyData, WeeklyData } from "./model/weather.model";
import { UnitService } from './service/unit-service/unit-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchComponent, ToggleComponent, CommonModule, TodayForecast, HourlyForecast, WeeklyForecast],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {

  weatherData: any;
  todayData: any;
  hourlyData: HourlyData[] = [];
  weeklyData: WeeklyData[] = [];

  constructor(private weatherService : WeatherService, private cdr: ChangeDetectorRef, private unitService: UnitService) {}
  
  ngOnInit() {
    if (!navigator.geolocation){ 
      this.onCitySelected('Halifax') 
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      let lon = pos.coords.longitude;
      let lat = pos.coords.latitude;
      this.getCityFromCoords(lon, lat);
    },
  () => {
    this.onCitySelected('Halifax');
  }) 
  }

  onCitySelected(city: string) {
    const units = this.unitService.isMetric() ? 'metric' : 'imperial';

    if (!city) return;    
    this.weatherService.getForecastWithCity(city, units).subscribe({
      next: data => {
        this.weatherData = data;
        this.buildToday(data);
        this.buildHourly(data);
        this.buildWeekly(data);  

        this.cdr.markForCheck();
        console.log('[App] weatherData set:', this.weatherData);
      },
      error: err => console.error(err)
    });

  }

  getCityFromCoords (lon: number, lat: number) {
    const units = this.unitService.isMetric() ? 'metric' : 'imperial';

    this.weatherService.getForecastWithCoords(lon, lat, units).subscribe({
      next: data => {
        this.onCitySelected(data.city.name);
      }, 
      error: () => {}
      }
    )
  }

  onUnitToggle() {
    this.unitService.toggle();
    if (this.weatherData?.city?.name) {
      this.onCitySelected(this.weatherData.city.name);
    }
  }

  buildToday(data: any) {
    const todayInfo = data.list[0];

    this.todayData = {
      city: data.city.name,
      country: data.city.country,
      temp: todayInfo.main.temp,
      desc: todayInfo.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${todayInfo.weather[0].icon}@2x.png`,
      gust: todayInfo.wind.gust,
      feels: todayInfo.main.feels_like,
      min: todayInfo.main.temp_min,
      max: todayInfo.main.temp_max,
      wind: todayInfo.wind.speed,
      humidity: todayInfo.main.humidity,
      pressure: todayInfo.main.pressure,
      sunrise: this.formatHour(data.city.sunrise, data.city.timezone),
      sunset: this.formatHour(data.city.sunset, data.city.timezone),
    }
  }

  buildHourly(data: any) {
    const timezone = data.city.timezone;
    this.hourlyData = data.list.slice(0, 10).map((item: any) => ({
      hour: this.formatHour(item.dt, timezone),
      icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      temp: item.main.temp
    }));
  }

  buildWeekly(data: any) {
    const uniqueDay = new Map<string, any>();

    for (const item of data.list) {
      const date = item.dt_txt.split(' ')[0];

      if (!uniqueDay.has(date)) {
        uniqueDay.set(date, item);
      }
    }

    this.weeklyData = Array.from(uniqueDay.values()).map((item: any) => {
      const dateObj = new Date(item.dt_txt)
      return {
        day: dateObj.toLocaleDateString('en-US', {weekday: 'short'}),
        date: dateObj.toLocaleDateString('en-US', {
          day: "2-digit",
          month: "short"
        }),
        min: item.main.temp_min,
        max: item.main.temp_max,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
      }
      
    });
  }

  formatHour(unix: number, offset: number) :string {
    const local_date = new Date((unix + offset)* 1000);
    return local_date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    });
  }
}
