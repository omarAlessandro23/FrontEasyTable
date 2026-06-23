import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/Usuario';
import { Usuarioservice } from '../../../services/usuarioservice'; 
import { NavigationEnd, Router, Event } from '@angular/router';

@Component({
  selector: 'app-usuario-list',
  standalone: true, 
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.css',
})
export class UsuarioList implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  
  // 'c11' representa la columna "Eliminar" que definimos en el HTML
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c11'];

  constructor(
    private uS: Usuarioservice, 
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.cargarUsuarios();
      }
    });
  }

  cargarUsuarios() {
    this.uS.list().subscribe({
      next: (data: Usuario[]) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.uS.deleteUsuario(id).subscribe({
        next: () => {
          // Remueve el usuario directamente de la vista al instante
          this.dataSource.data = this.dataSource.data.filter((u: Usuario) => u.idUsuario !== id);
        },
        error: (err: unknown) => console.error('Error al eliminar usuario', err)
      });
    }
  }
}