import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'; // <-- Importación correcta
import { MatIconModule } from '@angular/material/icon';
import { CategoryService } from '../../services/category-service';

@Component({
  selector: 'app-reporte01',
  standalone: true,
  imports: [BaseChartDirective, MatIconModule], 
  templateUrl: './reporte01.html',
  styleUrl: './reporte01.css',
})
export class Reporte01 implements OnInit {
  hasData = false;
  
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  
  barChartLegend = true;
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [];
  barChartType: ChartType = 'bar';

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategoryQuery().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.hasData = true;
          
          this.barChartLabels = data.map((x) => x.nombre);
          
          this.barChartData = [
            {
              data: data.map(() => 1),
              label: 'Categorías sin restaurantes',
              backgroundColor: [
                '#42A5F5', '#66BB6A', '#FFA726', '#AB47BC',
                '#EC407A', '#26C6DA', '#FF7043', '#8D6E63'
              ],
            },
          ];
        } else {
          this.hasData = false;
        }
      },
      error: () => {
        this.hasData = false;
      }
    });
  }
}