import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReviewReportService } from '../../services/review-report-service';
import { ReviewQuery1DTO } from '../../models/ReviewQuery1DTO';

@Component({
  selector: 'app-reviewreport',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Necesarios para *ngFor y peticiones HTTP
  templateUrl: './reviewreport.html',
  styleUrl: './reviewreport.css',
})
export class Reviewreport implements OnInit {
  reports: ReviewQuery1DTO[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private reportService: ReviewReportService) {}

  ngOnInit(): void {
    this.loadReportData();
  }

  loadReportData(): void {
    this.reportService.getRestaurantAverages().subscribe({
      next: (data) => {
        this.reports = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching report:', error);
        this.errorMessage = 'No se pudo cargar el reporte de restaurantes.';
        this.isLoading = false;
      }
    });
  }
}