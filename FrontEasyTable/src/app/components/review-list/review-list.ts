import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from '../../models/Review';
import { Reviewservice } from '../../services/reviewservice';

@Component({
  selector: 'app-review-list',
  imports: [CommonModule],
  templateUrl: './review-list.html',
  styleUrl: './review-list.css'
})
export class ReviewList implements OnInit {
  reviews: Review[] = [];

  constructor(private rS: Reviewservice) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.rS.list().subscribe((data) => {
      this.reviews = data;
    });
  }

  eliminar(id: number): void {
    this.rS.delete(id).subscribe(() => {
      this.listar();
    });
  }
}