import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/Usuario';
import { Usuarioservice } from '../../../services/usuarioservice';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-usuario-list',
  imports: [MatTableModule,MatIconModule,MatButtonModule],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.css',
})
export class UsuarioList implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10','c11'];

  constructor(
    private uS: Usuarioservice,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.cargarUsuarios();
      }
    });
  }
  cargarUsuarios() {
    this.uS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }
  eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}
