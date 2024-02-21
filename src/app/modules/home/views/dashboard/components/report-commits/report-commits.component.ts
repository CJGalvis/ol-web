import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { MONTH_NAMES } from 'src/app/core/const';
import { DashboardService } from 'src/app/modules/home/services/dashboard/dashboard.service';

@Component({
  selector: 'app-report-commits',
  templateUrl: './report-commits.component.html',
  styleUrls: ['./report-commits.component.css'],
})
export class ReportCommitsComponent implements OnInit {
  public chart: any;
  private subscriptions: Subscription = new Subscription();
  private labelsData: Array<string> = [];
  private featData: Array<string> = [];
  private fixData: Array<string> = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getDataServer();
  }

  /**
   * Método para consultar el servicio de de commits
   */
  getDataServer() {
    this.subscriptions.add(
      this.dashboardService.getReportCommits().subscribe((value: any) => {
        const data = value as Array<any>;
        this.labelsData = data.map((item) => MONTH_NAMES[item.month]);
        this.featData = data.map((item) => item.feat);
        this.fixData = data.map((item) => item.fix);
        this.createChart();
      })
    );
  }

  /**
   * Método para crear los gráficos con la data consultada
   */
  createChart() {
    this.chart = new Chart('MyChartCommits', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.labelsData,
        datasets: [
          {
            label: 'Logros',
            data: this.featData,
            backgroundColor: 'blue',
          },
          {
            label: 'Fixes',
            data: this.fixData,
            backgroundColor: 'limegreen',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
