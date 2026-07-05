import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Favorite } from '../../../models/Favorite';
import { Usuario } from '../../../models/Usuario';
import { Restaurant } from '../../../models/Restaurant';
import { Favoriteservice } from '../../../services/favoriteservice';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Restaurantservice } from '../../../services/restaurantservice';
import { Router, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-insertar',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './favorite-insertar.html',
  styleUrl: './favorite-insertar.css',
})
export class FavoriteInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  favorite: Favorite = new Favorite();
  listaUsuarios: Usuario[] = [];
  listaRestaurantes: Restaurant[] = [];

  constructor(
    private uS: Usuarioservice,
    private rS: Restaurantservice,
    private fS: Favoriteservice,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Cargar usuarios
    this.uS.list().subscribe({
      next: (data: Usuario[]) => {
        this.listaUsuarios = data;
      },
      error: (err) => console.error('Error al cargar usuarios', err),
    });

    // Cargar restaurantes
    this.rS.list().subscribe({
      next: (data: Restaurant[]) => {
        this.listaRestaurantes = data;
      },
      error: (err) => console.error('Error al cargar restaurantes', err),
    });

    // Crear formulario
    this.form = this.formBuilder.group({
      usuario: ['', Validators.required],
      restaurante: ['', Validators.required],
      comentario: ['', Validators.maxLength(500)],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.favorite.usuarioid = this.form.value.usuario;
      this.favorite.restaurantid = this.form.value.restaurante;
      this.favorite.comentario = this.form.value.comentario ?? '';

      this.fS.insert(this.favorite).subscribe({
        next: () => {
          this.router.navigate(['/favoritos/list']);
        },
        error: (err) => console.error('Error al registrar favorito', err),
      });
    }
  }
}
