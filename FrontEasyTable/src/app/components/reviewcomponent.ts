import { Component } from '@angular/core';
import { ReviewList } from './review-list/review-list';

@Component({
  selector: 'app-reviewcomponent',
  imports: [ReviewList],
  templateUrl: './reviewcomponent.html',
  styleUrl: './reviewcomponent.css'
})
export class Reviewcomponent {

}