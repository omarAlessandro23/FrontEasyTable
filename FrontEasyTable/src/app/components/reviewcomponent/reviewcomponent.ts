import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reviewcomponent',
  imports: [RouterOutlet],
  templateUrl: './reviewcomponent.html',
  styleUrl: './reviewcomponent.css',
})
export class Reviewcomponent {
  constructor(public route: ActivatedRoute) {}
}
