import { Routes } from '@angular/router';
import { Home } from './page/home/home';
import { MyWeather } from './page/my-weather/my-weather';
import { ExploreWeather } from './page/explore-weather/explore-weather';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'my-weather',
        component: MyWeather
    }, 
    {
        path: 'explore',
        component: ExploreWeather
    }
];
