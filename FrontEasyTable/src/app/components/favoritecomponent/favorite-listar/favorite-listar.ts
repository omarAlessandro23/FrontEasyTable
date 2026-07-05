import { Component, OnInit } from '@angular/core';
import { Favorite } from '../../../models/Favorite';
import { Favoriteservice } from '../../../services/favoriteservice';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Event, NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Loginservice } from '../../../services/loginservice';

@Component({
  selector: 'app-favorite-listar',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './favorite-listar.html',
  styleUrl: './favorite-listar.css',
})
export class FavoriteListar implements OnInit {
  dataSource: MatTableDataSource<Favorite> = new MatTableDataSource();
  isAdmin: boolean = false;

  displayedColumns: string[] = [
    'favoriteid',
    'usuarioid',
    'restaurantid',
    'comentario',
    'actions',
  ];

  constructor(
    private fS: Favoriteservice,
    private loginService: Loginservice,
    private router: Router
  ) {}

  ngOnInit(): void {
    const role = this.loginService.showRole();
    this.isAdmin = role === 'ADMIN';

    this.cargarFavoritos();

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.cargarFavoritos();
      }
    });
  }

  cargarFavoritos() {
    this.fS.list().subscribe({
      next: (data: Favorite[]) => {
        this.dataSource.data = data;
      },
      error: (err: unknown) => console.error('Error al cargar favoritos', err),
    });
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este favorito?')) {
      this.fS.delete(id).subscribe({
        next: () => this.cargarFavoritos(),
        error: (err) => console.error('Error al eliminar favorito', err),
      });
    }
  }
}
