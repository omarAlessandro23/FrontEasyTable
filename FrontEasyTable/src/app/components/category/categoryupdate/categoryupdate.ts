import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category-service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-categoryupdate',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './categoryupdate.html',
  styleUrl: './categoryupdate.css',
})
export class Categoryupdate implements OnInit {
  form: FormGroup = new FormGroup({});
  cat: Category = new Category();

  id: number = 0;

  constructor(
    private cS: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,


  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {

      this.id = params['id'];

      this.init();


    });


    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }
  aceptar(): void {

    if (this.form.valid) {
      this.cat.idCategory = this.form.value.codigo;
      this.cat.nombreCategoria = this.form.value.nombre;
      console.log(JSON.stringify(this.cat));

      this.cS.update(this.id,this.cat).subscribe({
        next: () => {
          this.router.navigate(['/categorias/lista'])
        }
      })
    }
  }

  init() {

    this.cS.listId(this.id).subscribe((data: Category) => {

      this.form.patchValue({
        codigo: data.idCategory,
        nombre: data.nombreCategoria
      });

    });
  }

}
