import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Review } from '../../../models/Review';
import { Usuario } from '../../../models/Usuario';
import { Restaurant } from '../../../models/Restaurant';
import { Reviewservice } from '../../../services/reviewservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Restaurantservice } from '../../../services/restaurantservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-update',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './review-update.html',
  styleUrl: './review-update.css',
})
export class ReviewUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  review: Review = new Review();
  listaUsuarios: Usuario[] = [];
  listaRestaurantes: Restaurant[] = [];
  id: number = 0;

  constructor(
    private uS: Usuarioservice,
    private rS: Restaurantservice,
    private revS: Reviewservice,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Capturar ID
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.cargarDatos();
    });

    // Cargar listas
    this.uS.list().subscribe({
      next: (data: Usuario[]) => (this.listaUsuarios = data),
      error: (err) => console.error(err)
    });

    this.rS.list().subscribe({
      next: (data: Restaurant[]) => (this.listaRestaurantes = data),
      error: (err) => console.error(err)
    });

    // Inicializar form
    this.form = this.formBuilder.group({
      reviewId: [''],
      usuario: ['', Validators.required],
      restaurante: ['', Validators.required],
      calificacion: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      comentario: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  cargarDatos() {
    this.revS.listId(this.id).subscribe({
      next: (data: Review) => {
        this.review = data;
        this.form.patchValue({
          reviewId: data.reviewId,
          usuario: data.userId,
          restaurante: data.restaurantId,
          calificacion: data.rating,
          comentario: data.comment
        });
      },
      error: (err) => console.error('Error al cargar reseña', err)
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.review.reviewId = this.id;
      this.review.userId = this.form.value.usuario;
      this.review.restaurantId = this.form.value.restaurante;
      this.review.rating = this.form.value.calificacion;
      this.review.comment = this.form.value.comentario;

      this.revS.update(this.id, this.review).subscribe({
        next: () => {
          this.router.navigate(['/reviews/list']);
        },
        error: (err) => console.error('Error al actualizar reseña', err)
      });
    }
  }
}
