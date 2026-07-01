import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Schedule } from '../../../models/Schedule'; // Ajusta la ruta según tu estructura
import { Scheduleservice } from '../../../services/scheduleservice'; // Ajusta la ruta según tu estructura
import { Event, NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ScheduleArray extends Array<Schedule> {}

@Component({
  selector: 'app-schedulelist',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './schedulelist.html',
  styleUrl: './schedulelist.css',
})
export class Schedulelist implements OnInit {
  dataSource: MatTableDataSource<Schedule> = new MatTableDataSource<Schedule>();
  
  // 'c1' a 'c5' corresponden a: ID, Día de la semana, Hora apertura, Hora cierre y Acciones (Editar/Eliminar)
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(
    private sS: Scheduleservice,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.cargarSchedules();
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.cargarSchedules();
      }
    });
  }

  cargarSchedules(): void {
    this.sS.list().subscribe({
      next: (data: ScheduleArray) => {
        this.dataSource.data = data;
      },
    });
  }

  eliminar(id: number): void {
    this.sS.delete(id).subscribe((): void => {
      this.snackBar.open('Se eliminó correctamente', 'Cerrar', {
        duration: 3000,
      });

      this.sS.list().subscribe((data: ScheduleArray) => {
        this.dataSource.data = data;
      });
    });
  }
}