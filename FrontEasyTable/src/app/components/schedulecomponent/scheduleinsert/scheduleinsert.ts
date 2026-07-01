import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Schedule } from '../../../models/Schedule'; // Ajusta la ruta si es necesario
import { Scheduleservice } from '../../../services/scheduleservice'; // Ajusta la ruta si es necesario
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-scheduleinsert',
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './scheduleinsert.html',
  styleUrl: './scheduleinsert.css',
})
export class Scheduleinsert implements OnInit {
  form: FormGroup = new FormGroup({});
  cur: Schedule = new Schedule();

  constructor(
    private sS: Scheduleservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      dayOfWeek: ['', [Validators.required, Validators.min(1), Validators.max(7)]], // Validaciones para días del 1 al 7
      openTime: ['', Validators.required],
      closeTime: ['', Validators.required],
    });
  }

  cancelar() {
    this.router.navigate(['/schedules/lista']); // Ajusta la ruta de retorno según tus rutas de Angular
  }

  aceptar() {
    if (this.form.valid) {
      this.cur.dayOfWeek = this.form.value.dayOfWeek;
      this.cur.openTime = this.form.value.openTime;
      this.cur.closeTime = this.form.value.closeTime;

      this.sS.insert(this.cur).subscribe(() => {
        this.snackBar.open('Horario registrado correctamente', 'Cerrar', {
          duration: 3000,
        });

        this.form.reset();

        this.router.navigate(['/schedules/lista']); // Ajusta el redireccionamiento de éxito si es necesario
      });
    } else {
      this.snackBar.open('Complete todos los campos obligatorios', 'Cerrar', {
        duration: 3000,
      });
    }
  }
}