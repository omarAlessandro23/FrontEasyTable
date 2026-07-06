import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // 👈 Importamos Router

@Component({
  selector: 'app-homecomponent',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './homecomponent.html',
  styleUrl: './homecomponent.css',
})
export class Homecomponent {
  // Inyectamos el Router de Angular
  private router = inject(Router);

  buscarRestaurante(termino: string) {
    // Si el usuario no escribió nada, no hace nada o lo mandas a la lista completa
    if (!termino.trim()) {
      this.router.navigate(['/restaurant']); // 👈 Ajusta si tu ruta es '/restaurantcomponent'
      return;
    }

    // Redirigimos a la pestaña de restaurantes pasando el término como parámetro query
    this.router.navigate(['/restaurant'], {
      queryParams: { buscar: termino.trim() }
    });
  }
}