import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Schedulelist } from './schedulelist/schedulelist';

@Component({
  selector: 'app-schedulecomponent',
  imports: [RouterModule, Schedulelist],
  templateUrl: './schedulecomponent.html',
  styleUrl: './schedulecomponent.css',
})
export class Schedulecomponent {
constructor(public route:ActivatedRoute) {}

}
