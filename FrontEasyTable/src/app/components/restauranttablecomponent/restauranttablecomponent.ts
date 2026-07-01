import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RestaurantTablelist } from './restauranttablelist/restauranttablelist';

@Component({
  selector: 'app-restauranttablecomponent',
  imports: [RouterOutlet, RestaurantTablelist],
  templateUrl: './restauranttablecomponent.html',
  styleUrl: './restauranttablecomponent.css',
})
export class Restauranttablecomponent {
constructor(public route:ActivatedRoute) {}

}
