
import { Component, inject, OnInit } from '@angular/core';
import { AppConstant } from '../../appconstant';
import { Paymentcallback } from '../../Dto/address';
import { Router } from '@angular/router';
import { CustomerService } from '../../Services/customerservice';
import { Observable, of, map, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-myorders',
  imports: [CommonModule],
  templateUrl: './myorders.html',
  styleUrl: './myorders.css',
})
export class Myorders implements OnInit {

  order$: Observable<any[]> = of([]);

  customerservice = inject(CustomerService);
  route = inject(Router);
  http = inject(HttpClient);

 ngOnInit(): void {
  const email =
    this.customerservice.emailstore ||
    sessionStorage.getItem('email');

  if (!email) {
    console.error('Customer email not found');
    this.order$ = of([]);
    return;
  }

  this.order$ = this.http
    .post<any>(AppConstant.getallDetails, { email })
    .pipe(
      map((res) => {
        const orders = res?.data?.order;

        if (!orders) {
          return [];
        }

        // Support either a single order or an array of orders
        const orderList = Array.isArray(orders) ? orders : [orders];

        // Map each order's products into individual display items
        return orderList.flatMap((order: any) => {
          const items = Array.isArray(order?.orderItems)
            ? order.orderItems
            : [];

          return items.map((item: any) => ({
            id: order.id,
            itemId: item.id,

            image: item.imageUrl ?? item.image ?? '',
            name: item.name ?? item.productName ?? 'Product',

            price:
              item.unitPrice ??
              item.price ??
              order.totalPrice ??
              0,

            quantity: item.quantity ?? 1,

            lastUpdated: order.lastUpdated,
            dateCreated: order.dateCreated,
            deliverydate: order.deliverydate,

            address: order.address ?? res?.data?.address ?? null,
            customer: order.customer ?? null,

            razorPayOrderId: order.razorPayOrderId ?? '',
            orderstatus: order.orderStatus ?? order.status ?? ''
          }));
        });
      }),
      catchError((error) => {
        console.error('Error fetching orders:', error);
        return of([]);
      })
    );
}

  onClick(): void {
    this.route.navigateByUrl('/user/userhome');
  }

  getStatus(status: string): string {
  switch (status?.toLowerCase()) {
    case 'confirmed':
      return 'confirmed';
    case 'created':
      return 'created';
    case 'cancelled':
      return 'cancelled';
    case 'delivered':
      return 'delivered';
    default:
      return '';
  }
}

  deliveryDate(date: Date | string | null): string | null {
    if (!date) return null;

    const inputDate = new Date(date);

    if (isNaN(inputDate.getTime())) return null;

    const today = new Date();

    if (inputDate.toDateString() === today.toDateString()) {
      return 'Today your order will be delivered';
    }

    if (inputDate.getTime() > today.getTime()) {
      return `Will be delivered on ${inputDate.toLocaleDateString()}`;
    }

    return `Delivered on ${inputDate.toLocaleDateString()}`;
  }

  cancelOrder(id: number): void {
    this.http.delete(
      `${AppConstant.Cancel_EndPointUrl}${id}`
    ).subscribe({
      next: (data: any) => {
        alert('Order cancelled successfully');

        // Refresh the order list after cancellation.
        this.ngOnInit();
      },
      error: (err: any) => {
        console.error('Order cancellation failed:', err);
        alert('Order could not be cancelled.');
      }
    });
  }

  conformOrder(ord: any): void {
    const paymentCallback = new Paymentcallback(
      ord.razorPayOrderId,
      '',
      ''
    );

    this.customerservice.confirmOrder(paymentCallback).subscribe({
      next: () => {
        alert('Order confirmed successfully');
        this.ngOnInit();
      },
      error: (err: any) => {
        console.error('Order confirmation failed:', err);
        alert('Order could not be confirmed.');
      }
    });
  }

  ProductInfo(ord: any): void {
  this.route.navigateByUrl('/user/productInfo');
  this.customerservice.productInfo.next(ord);
  }
}
