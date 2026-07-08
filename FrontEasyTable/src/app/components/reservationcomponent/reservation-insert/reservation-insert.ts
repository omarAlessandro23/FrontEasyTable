import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Reservation } from '../../../models/Reservation';
import { Usuario } from '../../../models/Usuario';
import { Restaurant } from '../../../models/Restaurant';
import { Schedule } from '../../../models/Schedule';
import { RestaurantTable } from '../../../models/Restaurantable';
import { Reservationservice } from '../../../services/reservationservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Restaurantservice } from '../../../services/restaurantservice';
import { Scheduleservice } from '../../../services/scheduleservice';
import { RestaurantTableservice } from '../../../services/tableservices';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-insert',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './reservation-insert.html',
  styleUrl: './reservation-insert.css',
})
export class ReservationInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  reservation: Reservation = new Reservation();
  listaUsuarios: Usuario[] = [];
  listaRestaurantes: any[] = [];
  listaHorarios: Schedule[] = [];
  listaMesas: RestaurantTable[] = [];

  constructor(
    private uS: Usuarioservice,
    private rS: Restaurantservice,
    private sS: Scheduleservice,
    private tS: RestaurantTableservice,
    private resS: Reservationservice,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.uS.list().subscribe({ next: (data) => (this.listaUsuarios = data) });
    this.rS.list().subscribe({ next: (data) => (this.listaRestaurantes = data) });
    this.sS.list().subscribe({ next: (data) => (this.listaHorarios = data) });
    this.tS.list().subscribe({ next: (data) => (this.listaMesas = data) });

    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      restaurante: ['', Validators.required],
      horario: ['', Validators.required],
      mesa: ['', Validators.required],
      fecha: ['', Validators.required],
      estado: ['Confirmada', Validators.required],
      personas: [1, [Validators.required, Validators.min(1)]],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.reservation.idUsuario = this.form.value.usuario;
      this.reservation.restaurantid = this.form.value.restaurante;
      this.reservation.scheduleId = this.form.value.horario;
      this.reservation.tableId = this.form.value.mesa;
      this.reservation.reservationDate = this.form.value.fecha;
      this.reservation.status = this.form.value.estado;
      this.reservation.numberPeople = this.form.value.personas;

      this.resS.insert(this.reservation).subscribe({
        next: () => {
          this.router.navigate(['/Reservas/list']);
        },
        error: (err) => console.error('Error al registrar reserva', err)
      });
    }
  }
}
