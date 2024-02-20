import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/modules/shared/services/global/global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public userLogin: any;
  public notifications: Array<any> = [];
  public cardsInfo: any;
  private subscriptions: Subscription = new Subscription();
  public jsonConfig: any;

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.getJsonConfig();
  }

  /**
   * Método para consumir el archivo json con los textos de la experiencia
   */
  getJsonConfig() {
    this.globalService.loadingBehavior.next(true);
    this.subscriptions.add(
      this.globalService.getConfigurationJson().subscribe((value: any) => {
        this.jsonConfig = value;
        this.globalService.loadingBehavior.next(false);
      })
    );
  }
}
