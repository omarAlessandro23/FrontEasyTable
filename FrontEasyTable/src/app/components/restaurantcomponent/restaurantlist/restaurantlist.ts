import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../../models/Restaurant'; // Ajusta la ruta de tu modelo si es necesario
import { Restaurantservice } from '../../../services/restaurantservice'; // Ajusta la ruta de tu servicio
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Event, NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-restaurantlist',
  imports: [
    MatTableModule, 
    CommonModule, 
    MatIconModule,
    RouterModule, 
    MatButtonModule
  ],
  templateUrl: './restaurantlist.html',
  styleUrl: './restaurantlist.css',
})
export class Restaurantlist implements OnInit {
  dataSource: MatTableDataSource<Restaurant> = new MatTableDataSource();

  // Columnas basadas exactamente en los atributos de tu modelo Restaurant + acciones
  displayedColumns: string[] = [
    'restaurantid',
    'name',
    'address',
    'ratingAvg',
    'webUrl',
    'googleMapsUrl',
    'latitude',
    'longitude',
    'nombreCategoria',
    'actions'
  ];

  constructor(private rS: Restaurantservice, private router: Router) { }

  ngOnInit(): void {
    this.cargarRestaurantes();

    // Esto ayuda a que si vuelves a la pantalla, la lista se refresque automáticamente
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.cargarRestaurantes();
      }
    });
  }

  cargarRestaurantes() {
    this.rS.list().subscribe({
      next: (data: Restaurant[]) => {
        this.dataSource.data = data;
      },
      error: (err: unknown) => console.error('Error al cargar restaurantes', err)
    });
  }

  eliminar(id: number) {
    this.rS.delete(id).subscribe(() => {
      this.rS.list().subscribe((data: Restaurant[]) => {
        this.dataSource.data = data;
      });
    });
  }
}