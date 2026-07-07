import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { Loginservice } from '../../services/loginservice';
import { JwtRequestDTO } from '../../models/JwtRequestDTO';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-authenticate',
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule,MatIconModule,MatMenuModule, RouterLink],
  templateUrl: './authenticate.html',
  styleUrl: './authenticate.css',
})
export class Authenticate implements OnInit{
  constructor(
    private loginService: Loginservice,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  nombre: string = '';
  contrasenia: string = '';
  mensaje: string = '';
  ngOnInit(): void {}

  login() {
    const request = new JwtRequestDTO();
    request.nombre = this.nombre;
    request.contrasenia = this.contrasenia;

    this.loginService.login(request).subscribe({
      next: (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.router.navigate(['homes']);
      },
      error: (error) => {
        console.log(error);

        if (error.status === 401) {
          this.snackBar.open(
            'Usuario o contraseña incorrectos',
            'Cerrar',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
        } else {
          this.snackBar.open(
            'Ocurrió un error al iniciar sesión',
            'Cerrar',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
        }
      }
    });
  }
}
