import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category-service';// Ajusta la ruta a tu servicio
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, NavigationEnd, Event } from '@angular/router';


@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './categorylist.html',
  styleUrl: './categorylist.css',
})
export class CategoryListComponent implements OnInit {
  dataSource: MatTableDataSource<Category> = new MatTableDataSource();
  
  // 'c1' para el ID, 'c2' para el nombre y 'c3' para el botón de eliminar
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4']; 

  constructor(
    private cS: CategoryService, 
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.cargarCategorias();
      }
    });
  }

  cargarCategorias() {
    (this.cS as any).getCategories().subscribe({
      next: (data: Category[]) => {
        this.dataSource.data = data;
      },
      error: (err: unknown) => console.error('Error al cargar categorías', err)
    });
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      (this.cS as any).deleteCategory(id).subscribe({
        next: () => {
          // Filtramos el dataSource localmente para remover la categoría borrada al instante
          this.dataSource.data = this.dataSource.data.filter((c: Category) => c.idCategory !== id);
        },
        error: (err: unknown) => console.error('Error al eliminar categoría', err)
      });
    }
  }
}