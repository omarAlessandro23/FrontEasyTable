import { Component } from '@angular/core';
import { Restaurantlist } from './restaurantlist/restaurantlist';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-restaurantcomponent',
  imports: [RouterOutlet, Restaurantlist],
  templateUrl: './restaurantcomponent.html',
  styleUrl: './restaurantcomponent.css',
})
export class Restaurantcomponent  {
   constructor(public route: ActivatedRoute) {}

  }

