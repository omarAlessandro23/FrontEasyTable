import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Asegúrate de importar esto para el @if o usarlo en standalone
import { Restaurantservice } from '../../services/restaurantservice';
import { Restaurant } from '../../models/Restaurant';// Ajusta la ruta de tu modelo si es necesario

@Component({
  selector: 'app-reporte03',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reporte03.html',
  styleUrl: './reporte03.css',
})
export class Reporte03 {
  // Coordenadas iniciales que vimos en tu pantalla
  latInput: number = -12.1;
  lngInput: number = -77.03;
  distInput: number = 500; // El radio de 500 con el que sí funcionó

  // Creamos la lista tipada con tu modelo para guardar lo que viene de la consola
  listaRestaurantes: Restaurant[] = [];
  hasData = false;

  constructor(private rS: Restaurantservice) { }

  cargarReporte() {
    // Llamamos exactamente a tu método del servicio
    this.rS.getNearbyRestaurants(this.latInput, this.lngInput, this.distInput).subscribe({
      next: (data: Restaurant[]) => {
        console.log('Datos recibidos del backend:', data);

        if (data && data.length > 0) {
          this.listaRestaurantes = data; // Guardamos el arreglo (ej: Central Restaurante)
          this.hasData = true;           // Encendemos la vista en el HTML
        } else {
          this.hasData = false;
          this.listaRestaurantes = [];
        }
      },
      error: (err) => {
        console.error('Error al cargar cercanos:', err);
        this.hasData = false;
        this.listaRestaurantes = [];
        alert('No se encontraron restaurantes en ese rango.');
      }
    });
  }
}