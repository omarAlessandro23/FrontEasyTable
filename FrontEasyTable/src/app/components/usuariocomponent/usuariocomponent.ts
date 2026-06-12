import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UsuarioList } from './usuario-list/usuario-list';

@Component({
  selector: 'app-usuariocomponent',
  imports: [RouterOutlet,UsuarioList],
  templateUrl: './usuariocomponent.html',
  styleUrl: './usuariocomponent.css',
})
export class Usuariocomponent {
constructor(public route:ActivatedRoute) {}
}
