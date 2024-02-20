import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/modules/home/services/dashboard/dashboard.service';
import { GlobalService } from 'src/app/modules/shared/services/global/global.service';

@Component({
  selector: 'app-cards-info',
  templateUrl: './cards-info.component.html',
  styleUrls: ['./cards-info.component.css'],
})
export class CardsInfoComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public cardsInfo: any;
  @Input() jsonConfig: any;

  constructor(
    private globalService: GlobalService,
    private dashboardService: DashboardService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.getDataCards();
  }

  getDataCards() {
    this.subscriptions.add(
      this.dashboardService.getCards().subscribe((data: any) => {
        this.cardsInfo = data;
      })
    );
  }
}
