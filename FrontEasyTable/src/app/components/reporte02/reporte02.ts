import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Restaurantservice } from '../../services/restaurantservice';

@Component({
  selector: 'app-reporte02',
  standalone: true,
  imports: [BaseChartDirective, FormsModule],
  templateUrl: './reporte02.html',
  styleUrl: './reporte02.css',
})
export class Reporte02 {
  ratingInput: number = 4.0; // Valor inicial
  hasData = false;

  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  constructor(private rS: Restaurantservice) { }

  cargarReporte() {
    this.rS.getTopRated(this.ratingInput).subscribe({
      next: (data) => {
      },
      error: (err) => {
        console.error('Error:', err);
        this.hasData = false;
      }
    });
}
}
