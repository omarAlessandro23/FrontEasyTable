import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../../models/Reservation';
import { Reservationservice } from '../../../services/reservationservice';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Event, NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.css',
})
export class ReservationList implements OnInit {
  dataSource: MatTableDataSource<Reservation> = new MatTableDataSource();

  displayedColumns: string[] = [
    'reservationId',
    'idUsuario',
    'restaurantName',
    'tableName',
    'scheduleTime',
    'reservationDate',
    'status',
    'numberPeople',
    'actions'
  ];

  constructor(private rS: Reservationservice, private router: Router) {}

  ngOnInit(): void {
    this.cargarReservas();

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.cargarReservas();
      }
    });
  }

  cargarReservas() {
    this.rS.list().subscribe({
      next: (data: Reservation[]) => {
        this.dataSource.data = data;
      },
      error: (err: unknown) => console.error('Error al cargar reservas', err)
    });
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta reserva?')) {
      this.rS.delete(id).subscribe(() => {
        this.cargarReservas();
      });
    }
  }
}
