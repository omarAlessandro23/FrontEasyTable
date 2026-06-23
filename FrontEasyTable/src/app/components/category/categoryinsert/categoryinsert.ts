import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'; // ➕ Importante para los inputs
import { MatFormFieldModule } from '@angular/material/form-field'; // ➕ Importante para el diseño del formulario
import { MatButtonModule } from '@angular/material/button'; // ➕ Importante para los botones estilizados
import { Category } from '../../../models/category'; 
import { CategoryService } from '../../../services/category-service'; 
import { Router } from '@angular/router'; // ➕ Importante para redirigir tras guardar

@Component({
  selector: 'app-categoryinsert',
  standalone: true,
  // Agregamos los módulos de Angular Material a los imports
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './categoryinsert.html',
  styleUrls: ['./categoryinsert.css']
})
export class CategoryInsertComponent { // 👈 CORREGIDO: "I" Mayúscula para que coincida con tus rutas

  newCategory: Category = {
    idCategory: 0,
    nombreCategoria: ''
  };

  message: string = '';
  isError: boolean = false;

  // Inyectamos el Router en el constructor
  constructor(
    private categoryService: CategoryService,
    private router: Router 
  ) { }

  saveCategory(): void {
    if (!this.newCategory.nombreCategoria.trim()) {
      this.message = 'El nombre de la categoría no puede estar vacío.';
      this.isError = true;
      return;
    }

    this.categoryService.createCategory(this.newCategory).subscribe({
      next: (response) => {
        this.message = `¡Categoría "${response.nombreCategoria}" guardada con éxito!`;
        this.isError = false;
        this.newCategory.nombreCategoria = ''; // Limpiamos el input
        
        // 🚀 Opcional: Redirige automáticamente al listado de categorías después de 1.5 segundos para ver el éxito
        setTimeout(() => {
          this.router.navigate(['/categories']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error al insertar categoría', err);
        this.message = 'Hubo un error al guardar la categoría.';
        this.isError = true;
      }
    });
  }
}