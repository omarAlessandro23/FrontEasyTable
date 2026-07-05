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
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-update',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './reservation-update.html',
  styleUrl: './reservation-update.css',
})
export class ReservationUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  reservation: Reservation = new Reservation();
  listaUsuarios: Usuario[] = [];
  listaRestaurantes: Restaurant[] = [];
  listaHorarios: Schedule[] = [];
  listaMesas: RestaurantTable[] = [];
  id: number = 0;

  constructor(
    private uS: Usuarioservice,
    private rS: Restaurantservice,
    private sS: Scheduleservice,
    private tS: RestaurantTableservice,
    private resS: Reservationservice,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.cargarDatos();
    });

    this.uS.list().subscribe({ next: (data) => (this.listaUsuarios = data) });
    this.rS.list().subscribe({ next: (data) => (this.listaRestaurantes = data) });
    this.sS.list().subscribe({ next: (data) => (this.listaHorarios = data) });
    this.tS.list().subscribe({ next: (data) => (this.listaMesas = data) });

    this.form = this.formBuilder.group({
      reservationId: [''],
      usuario: ['', Validators.required],
      restaurante: ['', Validators.required],
      horario: ['', Validators.required],
      mesa: ['', Validators.required],
      fecha: ['', Validators.required],
      estado: ['', Validators.required],
      personas: [1, [Validators.required, Validators.min(1)]],
    });
  }

  cargarDatos() {
    this.resS.listId(this.id).subscribe({
      next: (data: Reservation) => {
        this.reservation = data;
        this.form.patchValue({
          reservationId: data.reservationId,
          usuario: data.idUsuario,
          restaurante: data.restaurantid,
          horario: data.scheduleId,
          mesa: data.tableId,
          fecha: data.reservationDate,
          estado: data.status,
          personas: data.numberPeople
        });
      },
      error: (err) => console.error('Error al cargar reserva', err)
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.reservation.reservationId = this.id;
      this.reservation.idUsuario = this.form.value.usuario;
      this.reservation.restaurantid = this.form.value.restaurante;
      this.reservation.scheduleId = this.form.value.horario;
      this.reservation.tableId = this.form.value.mesa;
      this.reservation.reservationDate = this.form.value.fecha;
      this.reservation.status = this.form.value.estado;
      this.reservation.numberPeople = this.form.value.personas;

      this.resS.update(this.id, this.reservation).subscribe({
        next: () => {
          this.router.navigate(['/Reservas/list']);
        },
        error: (err) => console.error('Error al actualizar reserva', err)
      });
    }
  }
}
