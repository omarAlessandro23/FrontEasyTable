import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Agregado ChangeDetectorRef
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
  listaRestaurantes: any[] = [];

  constructor(
    private uS: Usuarioservice,
    private rS: Restaurantservice,
    private fS: Favoriteservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef // 2. Inyectado ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Inicializar formulario primero con valores nulos (ideal para IDs numéricos)
    this.form = this.formBuilder.group({
      usuario: [null, Validators.required],
      restaurantid: [null, Validators.required], // Alineado con el formControlName del HTML
      comentario: ['', Validators.maxLength(500)],
    });

    // Cargar usuarios
    this.uS.list().subscribe({
      next: (data: Usuario[]) => {
        setTimeout(() => {
          this.listaUsuarios = data;
          this.cdr.detectChanges();
        }, 0);
      },
      error: (err) => console.error('Error al cargar usuarios', err),
    });

    // Cargar restaurantes (Uso de any[] evita el error TS2339 del compilador)
    this.rS.list().subscribe({
      next: (data: any[]) => {
        setTimeout(() => {
          this.listaRestaurantes = data;
          this.cdr.detectChanges(); // Fuerza a Angular a pintar el dropdown de manera segura
        }, 0);
      },
      error: (err) => console.error('Error al cargar restaurantes', err),
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.favorite.usuarioid = this.form.value.usuario;
      this.favorite.restaurantid = this.form.value.restaurantid;
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