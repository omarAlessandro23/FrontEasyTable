import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Review } from '../../../models/Review';
import { Usuario } from '../../../models/Usuario';
import { Restaurant } from '../../../models/Restaurant';
import { Reviewservice } from '../../../services/reviewservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Restaurantservice } from '../../../services/restaurantservice';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-insertar',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './review-insertar.html',
  styleUrl: './review-insertar.css',
})
export class ReviewInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  review: Review = new Review();
  listaUsuarios: Usuario[] = [];
  listaRestaurantes: any[] = [];

  constructor(
    private uS: Usuarioservice,
    private rS: Restaurantservice,
    private revS: Reviewservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Cargar usuarios
    this.uS.list().subscribe({
      next: (data: Usuario[]) => {
        setTimeout(() => {
          this.listaUsuarios = data;
          this.cdr.detectChanges();
        }, 0);
      },
      error: (err) => console.error('Error al cargar usuarios', err)
    });

    // Cargar restaurantes
    this.rS.list().subscribe({
      next: (data: Restaurant[]) => {
        setTimeout(() => {
          this.listaRestaurantes = data;
          this.cdr.detectChanges();
        }, 0);
      },
      error: (err) => console.error('Error al cargar restaurantes', err)
    });

    // Crear formulario
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      restaurante: ['', Validators.required],
      calificacion: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      comentario: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.review.userId = this.form.value.usuario;
      this.review.restaurantId = this.form.value.restaurante;
      this.review.rating = this.form.value.calificacion;
      this.review.comment = this.form.value.comentario;
      this.review.createdAt = new Date().toISOString(); // Asigna fecha actual

      this.revS.insert(this.review).subscribe({
        next: () => {
          this.router.navigate(['/reviews/list']);
        },
        error: (err) => console.error('Error al registrar reseña', err)
      });
    }
  }
}
