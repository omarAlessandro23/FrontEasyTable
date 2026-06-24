import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category-service';

@Component({
  selector: 'app-categoryinsert',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './categoryinsert.html',
  styleUrls: ['./categoryinsert.css'],
})
export class CategoryInsertComponent {
  newCategory: Category = {
    idCategory: 0,
    nombreCategoria: '',
  };

  message = '';
  isError = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  saveCategory(): void {
    if (!this.newCategory.nombreCategoria.trim()) {
      this.message = 'El nombre de la categoría no puede estar vacío';
      this.isError = true;
      return;
    }

    this.categoryService.insert(this.newCategory).subscribe({
      next: (response: Category) => {
        this.message = 'Categoría registrada correctamente';
        this.isError = false;

        this.newCategory = {
          idCategory: 0,
          nombreCategoria: '',
        };

        setTimeout(() => {
          this.router.navigate(['/categories']);
        }, 1500);
      },
      error: (error: any) => {
        console.error(error);
        this.message = 'Error al registrar la categoría';
        this.isError = true;
      },
    });
  }
}