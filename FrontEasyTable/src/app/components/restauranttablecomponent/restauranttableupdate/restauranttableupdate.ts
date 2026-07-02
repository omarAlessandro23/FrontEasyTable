import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RestaurantTable } from '../../../models/Restaurantable';
import { RestaurantTableservice } from '../../../services/tableservices';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-restauranttableupdate',
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
  templateUrl: './restauranttableupdate.html',
  styleUrl: './restauranttableupdate.css',
})
export class Restauranttableupdate implements OnInit {
  form: FormGroup = new FormGroup({});
  rt: RestaurantTable = new RestaurantTable();

  id: number = 0;

  constructor(
    private rtS: RestaurantTableservice,
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
      localidad: ['', [Validators.required, Validators.maxLength(30)]],
    });
  }
  aceptar(): void {

    if (this.form.valid) {
      this.rt.tableId = this.form.value.codigo;
      this.rt.locationZone = this.form.value.localidad;
      console.log(JSON.stringify(this.rt));

      this.rtS.update(this.id,this.rt).subscribe({
        next: () => {
          this.router.navigate(['/tables/list'])
        }
      })
    }
  }

  init() {

    this.rtS.listId(this.id).subscribe((data: RestaurantTable) => {

      this.form.patchValue({
        codigo: data.tableId,
        localidad: data.locationZone
      });

    });
  }

}
