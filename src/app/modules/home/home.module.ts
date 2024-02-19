import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';

import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProjectsComponent } from './views/projects/projects.component';
import { UsersComponent } from './views/users/users.component';
import { RolesComponent } from './views/roles/roles.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NavigationComponent,
    DashboardComponent,
    ProjectsComponent,
    UsersComponent,
    RolesComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
