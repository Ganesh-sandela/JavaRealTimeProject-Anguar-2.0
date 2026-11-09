import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-helpsupport',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './helpsupport.html',
  styleUrl: './helpsupport.css',
})
export class Helpsupport {

  
faqs = [
  {
    question: 'How can I track my order?',
    answer: 'Go to My Orders and select your order to view its current status and available tracking information.'
  },
  {
    question: 'What are the delivery charges?',
    answer: 'Any applicable delivery charges will be displayed at checkout before you confirm your order.'
  },
  {
    question: 'Can I cancel my order?',
    answer: 'Go to My Orders, select your order, and check whether cancellation is available for its current status.'
  },
  {
    question: 'How do I return a product?',
    answer: 'Open your order details to check the return options and eligibility for that product.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'The available payment methods will be displayed on the checkout page.'
  },
  {
    question: 'How can I change my delivery address?',
    answer: 'Visit Addresses to manage your saved addresses. For existing orders, check whether address changes are still allowed.'
  }
];

openFaqIndex: number = -1;

toggleFaq(index: number): void {
  this.openFaqIndex =
    this.openFaqIndex === index ? -1 : index;
}


}
