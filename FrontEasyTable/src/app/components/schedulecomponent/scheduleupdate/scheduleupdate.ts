import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Schedule } from '../../../models/Schedule';
import { Scheduleservice } from '../../../services/scheduleservice';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-scheduleupdate',
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
  templateUrl: './scheduleupdate.html',
  styleUrl: './scheduleupdate.css',
})
export class Scheduleupdate implements OnInit{
  form: FormGroup = new FormGroup({});
  sc: Schedule = new Schedule();

  id: number = 0;

  constructor(
    private sS: Scheduleservice,
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
  diassemana: ['',[Validators.required,Validators.min(1),Validators.max(7)]],
  horaapertura: ['',[Validators.required,Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]],
  horacierre: ['',[Validators.required,Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]]
    });
  }
  aceptar(): void {

    if (this.form.valid) {
      this.sc.scheduleId = this.form.value.codigo;
      this.sc.dayOfWeek = this.form.value.diassemana;
      this.sc.openTime = this.form.value.horaapertura;
      this.sc.closeTime = this.form.value.horacierre;
      console.log(JSON.stringify(this.sc));

      this.sS.update(this.id,this.sc).subscribe({
        next: () => {
          this.router.navigate(['/schedules/list'])
        }
      })
    }
  }

  init() {

    this.sS.listId(this.id).subscribe((data: Schedule) => {

      this.form.patchValue({
        codigo: data.scheduleId,
        diassemana: data.dayOfWeek,
        horaapertura: data.openTime,
        horacierre: data.closeTime
      });

    });
  }

}
