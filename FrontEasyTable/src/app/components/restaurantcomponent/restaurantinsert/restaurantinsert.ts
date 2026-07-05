import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Restaurant } from '../../../models/Restaurant'; // Ajusta la ruta de tu modelo
import { Category } from '../../../models/category'; // Ajusta la ruta del modelo de Categoria
import { Restaurantservice } from '../../../services/restaurantservice'; // Ajusta la ruta de tu servicio
import { CategoryService } from '../../../services/category-service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // Requerido para el ciclo *ngFor del mat-select

@Component({
  selector: 'app-restaurantinsert',
  imports: [
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './restaurantinsert.html',
  styleUrl: './restaurantinsert.css',
})
export class Restaurantinsert implements OnInit {
  form: FormGroup = new FormGroup({});
  restaurant: Restaurant = new Restaurant();
  listaCategorias: Category[] = []; // Lista dinámica para las categorías

  constructor(
    private cS: CategoryService,      // Servicio para traer las categorías
    private rS: Restaurantservice,   // Servicio para insertar el restaurante
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // Cargamos la lista de categorías al iniciar el componente
    this.cS.list().subscribe((data: Category[]) => {
      this.listaCategorias = data;
    });

    // Construcción del formulario reactivo según los campos de tu modelo Restaurant
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      direccion: ['', Validators.required],
      calificacion: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      web: [''],
      maps: [''],
      latitud: [0, Validators.required],
      longitud: [0, Validators.required],
      categoria: ['', Validators.required], // Guardará el objeto o identificador de la categoría seleccionada
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      // Mapeo de los valores del formulario al objeto Restaurant
      this.restaurant.name = this.form.value.nombre;
      this.restaurant.address = this.form.value.direccion;
      this.restaurant.ratingAvg = this.form.value.calificacion;
      this.restaurant.webUrl = this.form.value.web;
      this.restaurant.googleMapsUrl = this.form.value.maps;
      this.restaurant.latitude = this.form.value.latitud;
      this.restaurant.longitude = this.form.value.longitud;
      
      // Asignamos el valor de la categoría seleccionada (ej: el nombre o el ID según pida tu backend)
      this.restaurant.idCategory = this.form.value.categoria; 

      // Consumo del servicio para insertar
      this.rS.insert(this.restaurant).subscribe({
        next: () => {
          this.router.navigate(['/restaurants/lista']); // Redirección al listado de restaurantes
        },
        error: (err: unknown) => console.error('Error al registrar el restaurante', err)
      });
    }
  }
}