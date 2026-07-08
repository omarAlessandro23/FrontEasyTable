import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/Usuario';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Event, NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface UsuarioArray extends Array<Usuario> {}

@Component({
  selector: 'app-usuario-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.css',
})
export class UsuarioList implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11'];

  constructor(
    private uS: Usuarioservice,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.cargarUsuarios();
      }
    });
  }

  cargarUsuarios(): void {
    this.uS.list().subscribe({
      next: (data: UsuarioArray) => {
        this.dataSource.data = data;
      },
    });
  }

  eliminar(id: number): void {
    this.uS.delete(id).subscribe((): void => {
      this.snackBar.open('Se eliminó correctamente', 'Cerrar', {
        duration: 3000,
      });

      this.uS.list().subscribe((data: UsuarioArray) => {
        this.dataSource.data = data;
      });
    });
  }
}
