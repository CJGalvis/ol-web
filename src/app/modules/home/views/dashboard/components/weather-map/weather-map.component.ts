import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/modules/home/services/dashboard/dashboard.service';

@Component({
  selector: 'app-weather-map',
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.css'],
})
export class WeatherMapComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();
  public temp: number = 0;
  public city: string = '-';
  public main: string = '-';
  public iconWeather: string = '';

  constructor(private dashboard: DashboardService) {}

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather() {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.subscriptions.add(
        this.dashboard
          .getWeatherMap(latitude, longitude)
          .subscribe((data: any) => {
            console.log(data);
            this.temp = data.main.temp;
            this.city = data.name;
            this.main = data.weather[0].main;
            this.iconWeather =
              'http://openweathermap.org/img/w/' +
              data.weather[0].icon +
              '.png';
          })
      );
    });
  }
}
