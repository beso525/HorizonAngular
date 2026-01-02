export interface TodayData {
    city: string;
    country: string;
    desc: string;
    temp: number;
    feels: number;
    min: number;
    max: number;
    humidity: number;
    pressure: number;
    wind: number;
    rain: number;
    sunrise: Date;
    sunset: Date;
    gust: number;
    icon: string;
}

export interface HourlyData {
    hour: string;
    temp: number;
    icon: string;
}

export interface WeeklyData {
    day: string;
    date: string;
    min: number;
    max: number;
    icon: string;
}