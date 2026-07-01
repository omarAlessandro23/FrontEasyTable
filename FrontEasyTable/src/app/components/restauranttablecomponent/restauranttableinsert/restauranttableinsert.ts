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
import { RestaurantTable } from '../../../models/Restaurantable';
import { RestaurantTableservice } from '../../../services/tableservices';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-restauranttableinsert',
  imports: [CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,],
  templateUrl: './restauranttableinsert.html',
  styleUrl: './restauranttableinsert.css',
})
export class Restauranttableinsert implements OnInit {
  form: FormGroup = new FormGroup({});
  cur: RestaurantTable = new RestaurantTable();

  constructor(
    private rtS: RestaurantTableservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      locationZone: ['', [Validators.required, Validators.maxLength(50)]], // Validación de longitud según Java @Column(length = 50)
    });
  }

  cancelar() {
    this.router.navigate(['/tables/lista']); // Ajusta según tu enrutamiento
  }

  aceptar() {
    if (this.form.valid) {
      this.cur.locationZone = this.form.value.locationZone;

      this.rtS.insert(this.cur).subscribe(() => {
        this.snackBar.open('Mesa registrada correctamente', 'Cerrar', {
          duration: 3000,
        });

        this.form.reset();
        this.router.navigate(['/tables/lista']); // Redirección al éxito
      });
    } else {
      this.snackBar.open('Complete todos los campos obligatorios', 'Cerrar', {
        duration: 3000,
      });
    }
  }
}