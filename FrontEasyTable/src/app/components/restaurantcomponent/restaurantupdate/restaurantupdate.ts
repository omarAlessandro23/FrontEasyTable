import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Restaurant } from '../../../models/Restaurant';
import { Restaurantservice } from '../../../services/restaurantservice';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-restaurantupdate',
  providers: [provideNativeDateAdapter()],
  imports: [MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule],
  templateUrl: './restaurantupdate.html',
  styleUrl: './restaurantupdate.css',
})
export class Restaurantupdate implements OnInit {
  form: FormGroup = new FormGroup({});
  res: Restaurant = new Restaurant();

  id: number = 0;

  constructor(
    private rS: Restaurantservice,
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
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      correo: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      ratingprom: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      url: ['', [Validators.required, Validators.maxLength(255)]],
      googlemapsurl: ['', [Validators.required, Validators.maxLength(500)]],
      latitud: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitud: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
      nombrecategoria: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }
  aceptar(): void {

    if (this.form.valid) {
      this.res.restaurantid = this.form.value.codigo;
      this.res.name = this.form.value.nombre;
      this.res.address = this.form.value.correo;
      this.res.ratingAvg = this.form.value.ratingprom;
      this.res.webUrl = this.form.value.url;
      this.res.googleMapsUrl = this.form.value.googlemapsurl;
      this.res.latitude = this.form.value.latitud;
      this.res.longitude = this.form.value.longitud;
      this.res.nombreCategoria = this.form.value.nombrecategoria;
      console.log(JSON.stringify(this.res));

      this.rS.update(this.id, this.res).subscribe({
        next: () => {
          this.router.navigate(['/restaurant/list'])
        }
      })
    }
  }

  init() {

    this.rS.listId(this.id).subscribe((data: Restaurant) => {

      this.form.patchValue({
        codigo: data.restaurantid,
        nombre: data.name,
        correo: data.address,
        ratingprom: data.ratingAvg,
        url: data.webUrl,
        googlemapsurl: data.googleMapsUrl,
        latitud: data.latitude,
        longitud: data.longitude,
        nombrecategoria: data.nombreCategoria,
      });

    });
  }
}
