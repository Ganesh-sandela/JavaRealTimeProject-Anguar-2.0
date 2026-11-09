import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  imports: [CommonModule],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css',
})
export class Feedback  implements OnInit{
  selectedRating:number=0
   selectRating(rating: number): void {
    this.selectedRating = rating;
    console.log(rating)
  }

  ngOnInit(): void {
    console.log("called.........");
  }
  
}
