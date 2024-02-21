import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/modules/home/services/dashboard/dashboard.service';

@Component({
  selector: 'app-server-details',
  templateUrl: './server-details.component.html',
  styleUrls: ['./server-details.component.css'],
})
export class ServerDetailsComponent implements OnInit {
  public chart: any;
  private subscriptions: Subscription = new Subscription();
  private labelsData: Array<string> = [];
  private valuesData: Array<string> = [];
  private timeData: Array<string> = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getDataServer();
  }

  /**
   * Método para consultar el servicio de datos de servidor
   */
  getDataServer() {
    this.subscriptions.add(
      this.dashboardService.getServerDetails().subscribe((value: any) => {
        this.valuesData = value.time.map((item: any) => item.value);
        this.timeData = value.time.map((item: any) => item.time);
        this.createChart();
      })
    );
  }

  /**
   * Método para crear los gráficos con la data consultada
   */
  createChart() {
    this.chart = new Chart('MyChartServer', {
      type: 'line', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.timeData,
        datasets: [
          {
            label: 'Tiempo en Uso',
            data: this.valuesData,
            backgroundColor: 'blue',
          },
          {
            label: 'Proyectos desplegados',
            data: this.timeData,
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
