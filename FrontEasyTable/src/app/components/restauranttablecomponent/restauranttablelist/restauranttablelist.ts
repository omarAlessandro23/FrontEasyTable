import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RestaurantTable } from '../../../models/Restaurantable';
import { RestaurantTableservice } from '../../../services/tableservices';
import { Event, NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';interface RestaurantTableArray extends Array<RestaurantTable> {}
@Component({
  selector: 'app-restauranttablelist',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './restauranttablelist.html',
  styleUrl: './restauranttablelist.css',
})
export class RestaurantTablelist implements OnInit {
  dataSource: MatTableDataSource<RestaurantTable> = new MatTableDataSource<RestaurantTable>();
  displayedColumns: string[] = ['c1', 'c2', 'c3']; // ID, Zona de Ubicación y Acciones

  constructor(
    private rtS: RestaurantTableservice,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.cargarTablas();
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.cargarTablas();
      }
    });
  }

  cargarTablas(): void {
    this.rtS.list().subscribe({
      next: (data: RestaurantTableArray) => {
        this.dataSource.data = data;
      },
    });
  }

  eliminar(id: number): void {
    this.rtS.delete(id).subscribe((): void => {
      this.snackBar.open('Mesa eliminada correctamente', 'Cerrar', {
        duration: 3000,
      });

      this.rtS.list().subscribe((data: RestaurantTableArray) => {
        this.dataSource.data = data;
      });
    });
  }
}
