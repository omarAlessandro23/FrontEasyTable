import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/Usuario';
import { Usuarioservice } from '../../../services/usuarioservice';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-usuarioupdate',
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
  templateUrl: './usuarioupdate.html',
  styleUrl: './usuarioupdate.css',
})
export class Usuarioupdate implements OnInit {
  form: FormGroup = new FormGroup({});
  u: Usuario = new Usuario();

  id: number = 0;

  constructor(
    private uS: Usuarioservice,
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
      username: ['', [Validators.required, Validators.maxLength(20)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required],
      horacreacion: ['', Validators.required],
      ncompleto: ['', Validators.required],
      ncelular: ['', Validators.required],
      ciudad: ['', Validators.required],
      longitud: ['', Validators.required],
      latitud: ['', Validators.required]
    });
  }
  aceptar(): void {

    if (this.form.valid) {
      this.u.idUsuario = this.form.value.codigo;
      this.u.username = this.form.value.username;
      this.u.correo = this.form.value.correo;
      this.u.contrasenia = this.form.value.contrasenia;
      this.u.horacreacion = this.form.value.horacreacion;
      this.u.nombrecompleto = this.form.value.ncompleto;
      this.u.numcelular = this.form.value.ncelular;
      this.u.ciudad = this.form.value.ciudad;
      this.u.longitud = this.form.value.longitud;
      this.u.latitud = this.form.value.latitud;
      console.log(JSON.stringify(this.u));

      this.uS.update(this.id, this.u).subscribe({
        next: () => {
          this.router.navigate(['/usuarios/lista'])
        }
      })
    }
  }

  init() {

    this.uS.listId(this.id).subscribe((data) => {

      this.form.patchValue({
        codigo: data.idUsuario,
        username: data.username,
        correo: data.correo,
        contrasenia: data.contrasenia,
        horacreacion: data.horacreacion,
        ncompleto: data.nombrecompleto,
        ncelular: data.numcelular,
        ciudad: data.ciudad,
        longitud: data.longitud,
        latitud: data.latitud,
      });

    });
  }

}
