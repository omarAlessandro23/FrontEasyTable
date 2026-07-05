import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Restaurantservice } from '../../services/restaurantservice';

@Component({
  selector: 'app-reporte03',
  standalone: true,
  imports: [BaseChartDirective, FormsModule],
  templateUrl: './reporte03.html',
  styleUrl: './reporte03.css',
})
export class Reporte03 {
  lat: number = -12.10; // Ejemplo de latitud inicial
  lng: number = -77.03; // Ejemplo de longitud inicial
  dist: number = 5.0;   // Distancia por defecto

  hasData = false;

  // Configuración del gráfico
  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  constructor(private rS: Restaurantservice) { }

  cargarReporte() {
    this.rS.getNearbyRestaurants(this.lat, this.lng, this.dist).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.hasData = true;
          this.barChartLabels = data.map((r) => r.name);
          this.barChartData = [
            {
              data: data.map((r) => r.ratingAvg),
              label: 'Calificación',
              backgroundColor: '#d72b04',
            },
          ];
        } else {
          this.hasData = false;
        }
      },
      error: (err) => {
        console.error('Error al cargar cercanos:', err);
        this.hasData = false;
      },
    });
  }
}
