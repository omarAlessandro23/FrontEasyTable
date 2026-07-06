import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType, Chart as ChartJS, registerables } from 'chart.js'; // 👈 Importamos ChartJS y registerables
import { BaseChartDirective } from 'ng2-charts';
import { Restaurantservice } from '../../services/restaurantservice';

// 👈 Registramos todos los controladores esenciales (Barras, Líneas, Escalas, etc.)
ChartJS.register(...registerables);

@Component({
  selector: 'app-reporte02',
  standalone: true,
  imports: [BaseChartDirective, FormsModule],
  templateUrl: './reporte02.html',
  styleUrl: './reporte02.css',
})
export class Reporte02 {
  ratingInput: number = 4.0;
  hasData = false;

  barChartOptions: ChartOptions = { 
    responsive: true,
    maintainAspectRatio: false 
  };
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  constructor(private rS: Restaurantservice) { }

  cargarReporte() {
    this.rS.getTopRated(this.ratingInput).subscribe({
      next: (data: any[]) => {
        console.log('Datos recibidos del backend:', data);

        if (data && data.length > 0) {
          this.barChartLabels = [];
          const calificaciones: number[] = [];

          data.forEach(restaurante => {
            // Se extrae la información validando las propiedades en español o inglés
            this.barChartLabels.push(restaurante.nombre || restaurante.name);
            calificaciones.push(restaurante.calificacion || restaurante.rating);
          });

          this.barChartData = [
            { 
              data: calificaciones, 
              label: 'Calificación Promedio',
              backgroundColor: '#FF5A36', // Naranja corporativo EasyTable
              borderColor: '#FF5A36',
              borderWidth: 1
            }
          ];

          this.hasData = true;
        } else {
          this.hasData = false;
          alert('No se encontraron restaurantes con esa calificación o superior.');
        }
      },
      error: (err) => {
        console.error('Error al traer los datos del servicio:', err);
        this.hasData = false;
      }
    });
  }
}