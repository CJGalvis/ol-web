import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';

import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProjectsComponent } from './views/projects/projects.component';
import { UsersComponent } from './views/users/users.component';
import { RolesComponent } from './views/roles/roles.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderDashComponent } from './views/dashboard/components/header-dash/header-dash.component';
import { WeatherMapComponent } from './views/dashboard/components/weather-map/weather-map.component';
import { CardsInfoComponent } from './views/dashboard/components/cards-info/cards-info.component';
import { ServerDetailsComponent } from './views/dashboard/components/server-details/server-details.component';
import { ReportCommitsComponent } from './views/dashboard/components/report-commits/report-commits.component';
import { TimePipe } from 'src/app/core/pipes/time.pipe';

@NgModule({
  declarations: [
    NavigationComponent,
    DashboardComponent,
    ProjectsComponent,
    UsersComponent,
    RolesComponent,
    HeaderDashComponent,
    WeatherMapComponent,
    CardsInfoComponent,
    ServerDetailsComponent,
    ReportCommitsComponent,
    TimePipe,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
