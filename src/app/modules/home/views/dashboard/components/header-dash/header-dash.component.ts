import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  public todos: Array<any> = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private globalService: GlobalService,
    private dashboardService: DashboardService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.getDataUser();
    this.getNotifications();
    this.getTodos();
  }

  /**
   * Método que nos permite consultar los datos de los usuarios
   */
  getDataUser() {
    this.subscriptions.add(
      this.dashboardService.getUsers().subscribe((data: any) => {
        const user: any = this.globalService.getDataStorage('auth');
        this.user = this.getUserById(user.id, data);
      })
    );
  }

  /**
   * Método que nos permite consultar las notificaciones
   */
  getNotifications() {
    this.subscriptions.add(
      this.dashboardService.getNotifications().subscribe((data: any) => {
        this.notifications = data;
      })
    );
  }

  /**
   * Método que nos permite consultar las tareas pendientes
   */
  getTodos() {
    this.subscriptions.add(
      this.dashboardService.getTodos().subscribe((data: any) => {
        this.todos = data;
      })
    );
  }

  /**
   * Método que nos permite filtrar la información del usuario actual
   */
  getUserById(id: number, values: Array<any>) {
    const index = values.findIndex((data) => data.id == id);
    if (index != -1) {
      return values[index];
    } else {
      return null;
    }
  }
}
