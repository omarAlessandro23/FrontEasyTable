import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Usuario } from '../../../models/Usuario';
import { Usuarioservice } from '../../../services/usuarioservice';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-usuario-insert',
  imports: [
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './usuario-insert.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './usuario-insert.css',
})
export class UsuarioInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  cur: Usuario = new Usuario();

  constructor(
    private uS: Usuarioservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      correo: ['', Validators.required],
      contrasenia: ['', Validators.required],
      nombrecompleto: ['', Validators.required],
      numcelular: ['', Validators.required],
      ciudad: ['', Validators.required],
      longitud: ['', Validators.required],
      latitud: ['', Validators.required],
    });
  }
  cancelar() {
    this.router.navigate(['/usuario/lista']);
  }

  aceptar() {
    if (this.form.valid) {
      this.cur.username = this.form.value.username;
      this.cur.correo = this.form.value.correo;
      this.cur.contrasenia = this.form.value.contrasenia;
      this.cur.nombrecompleto = this.form.value.nombrecompleto;
      this.cur.numcelular = this.form.value.numcelular;
      this.cur.ciudad = this.form.value.ciudad;
      this.cur.longitud = this.form.value.longitud;
      this.cur.latitud = this.form.value.latitud;
      this.cur.roles = [
  {
    rol: 'USER'
  }
];
      this.uS.insert(this.cur).subscribe({
        next: () => {
          this.snackBar.open('Usuario registrado correctamente', 'Cerrar', {
            duration: 3000,
          });

          this.form.reset();

          this.router.navigate(['/usuario/news']);
        },
        error: (error) => {
          console.error('Error al registrar usuario:', error);
          this.snackBar.open(
            'Ocurrió un error al registrar el usuario. Intente nuevamente.',
            'Cerrar',
            { duration: 3000 },
          );
        },
      });
    } else {
      this.snackBar.open('Complete todos los campos obligatorios', 'Cerrar', {
        duration: 3000,
      });
    }
  }
}
