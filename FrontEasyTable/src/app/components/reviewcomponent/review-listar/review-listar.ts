import { Component, OnInit } from '@angular/core';
import { Review } from '../../../models/Review';
import { Reviewservice } from '../../../services/reviewservice';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Event, NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-review-listar',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './review-listar.html',
  styleUrl: './review-listar.css',
})
export class ReviewListar implements OnInit {
  dataSource: MatTableDataSource<Review> = new MatTableDataSource();

  displayedColumns: string[] = [
    'reviewId',
    'userId',
    'restaurantId',
    'rating',
    'comment',
    'createdAt',
    'actions'
  ];

  constructor(private rS: Reviewservice, private router: Router) {}

  ngOnInit(): void {
    this.cargarReviews();

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.cargarReviews();
      }
    });
  }

  cargarReviews() {
    this.rS.list().subscribe({
      next: (data: Review[]) => {
        this.dataSource.data = data;
      },
      error: (err: unknown) => console.error('Error al cargar reviews', err)
    });
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta reseña?')) {
      this.rS.delete(id).subscribe(() => {
        this.cargarReviews();
      });
    }
  }
}
