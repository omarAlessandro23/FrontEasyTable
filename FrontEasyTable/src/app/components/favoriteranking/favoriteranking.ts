import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingService } from '../../services/ranking-service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-favoriteranking',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './favoriteranking.html',
  styleUrl: './favoriteranking.css'
})
export class Favoriteranking implements OnInit {
  isLoading = true;
  errorMessage = '';

  // Configuración del Gráfico
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: { min: 0 }
    },
    plugins: {
      legend: { display: true, position: 'top' }
    }
  };

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { 
        data: [], 
        label: 'Total de Favoritos ❤️',
        backgroundColor: '#f56565', // Color rojizo agradable
        borderColor: '#e53e3e',
        borderWidth: 1
      }
    ]
  };

  constructor(private rankingService: RankingService) {}

  ngOnInit(): void {
    this.loadRankingData();
  }

  loadRankingData(): void {
    this.rankingService.getRanking().subscribe({
      next: (data) => {
        // Extraemos los nombres para el eje X y los totales para el eje Y
        const nombres = data.map(item => item.nombre);
        const totales = data.map(item => item.totalFavoritos);

        // Asignamos los datos al gráfico
        this.barChartData.labels = nombres;
        this.barChartData.datasets[0].data = totales;

        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al cargar el ranking de favoritos.';
        this.isLoading = false;
      }
    });
  }
}