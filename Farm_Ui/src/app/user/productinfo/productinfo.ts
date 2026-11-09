
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerService } from '../../Services/customerservice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productinfo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productinfo.html',
  styleUrl: './productinfo.css',
})
export class Productinfo implements OnInit, OnDestroy {
  private customerservice = inject(CustomerService);
  private router = inject(Router);

  product: any = null;
  private productSubscription?: Subscription;

  ngOnInit(): void {
    this.productSubscription =
      this.customerservice.productInfo.subscribe((data: any) => {
        this.product = data;
      });
  }

  goToOrders(): void {
    this.router.navigateByUrl('/user/myorders');
  }

  get productName(): string {
    return this.product?.name
      || this.product?.productName
      || this.product?.product?.name
      || 'Farm Fresh Product';
  }

  get productImage(): string {
    return this.product?.image
      || this.product?.imageUrl
      || this.product?.productImage
      || this.product?.product?.image
      || 'assets/images/product-placeholder.png';
  }

  get productPrice(): number {
    return Number(
      this.product?.price
      ?? this.product?.unitPrice
      ?? this.product?.product?.price
      ?? 0
    );
  }

  get quantity(): number {
    return Number(this.product?.quantity ?? 1);
  }

  get orderStatus(): string {
    return this.product?.orderstatus
      || this.product?.orderStatus
      || this.product?.status
      || 'Processing';
  }

  get statusClass(): string {
    const status = this.orderStatus.toLowerCase();

    if (status.includes('deliver')) return 'delivered';
    if (status.includes('cancel')) return 'cancelled';
    if (status.includes('ship')) return 'shipped';
    if (status.includes('process')) return 'processing';

    return 'processing';
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }
}
