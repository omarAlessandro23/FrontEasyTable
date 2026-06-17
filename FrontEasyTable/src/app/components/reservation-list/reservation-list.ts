import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservation } from '../../models/Reservation';
import { Reservationservice } from '../../services/reservationservice';

@Component({
  selector: 'app-reservation-list',
  imports: [CommonModule],
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.css'
})
export class ReservationList implements OnInit {
  reservations: Reservation[] = [];

  constructor(private rS: Reservationservice) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.rS.list().subscribe((data) => {
      this.reservations = data;
    });
  }

  eliminar(id: number): void {
    this.rS.delete(id).subscribe(() => {
      this.listar();
    });
  }
}