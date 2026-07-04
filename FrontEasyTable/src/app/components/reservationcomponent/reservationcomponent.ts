import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reservationcomponent',
  imports: [RouterOutlet],
  templateUrl: './reservationcomponent.html',
  styleUrl: './reservationcomponent.css',
})
export class Reservationcomponent {
  constructor(public route: ActivatedRoute) {}
}
