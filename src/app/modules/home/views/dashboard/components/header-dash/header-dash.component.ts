import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/modules/home/services/dashboard/dashboard.service';
import { GlobalService } from 'src/app/modules/shared/services/global/global.service';

@Component({
  selector: 'app-header-dash',
  templateUrl: './header-dash.component.html',
  styleUrls: ['./header-dash.component.css'],
})
export class HeaderDashComponent implements OnInit, OnDestroy {
  @Input() jsonConfig: any;
  public user: any;
  public notifications: Array<any> = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private globalService: GlobalService,
    private dashboardService: DashboardService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.getDataUser();
    this.getNotifications();
  }

  getDataUser() {
    this.subscriptions.add(
      this.dashboardService.getUsers().subscribe((data: any) => {
        const user: any = this.globalService.getDataStorage('auth');
        this.user = this.getUserById(user.id, data);
      })
    );
  }

  getNotifications() {
    this.subscriptions.add(
      this.dashboardService.getNotifications().subscribe((data: any) => {
        this.notifications = data;
      })
    );
  }

  getUserById(id: number, values: Array<any>) {
    const index = values.findIndex((data) => data.id == id);
    if (index != -1) {
      return values[index];
    } else {
      return null;
    }
  }

  logout() {
    this.globalService.clear('auth');
    this.router.navigate(['/auth']);
  }
}
