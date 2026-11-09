import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../Dto/address';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../Services/customerservice';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart  implements OnInit{

  userId:any;


  constructor(private router: Router,
    private cserv:CustomerService,
    private fb:FormBuilder
  ) {}

  // cartItems: CartItem[]; = [
  //   {
  //     id: 1,
  //     name: 'Fresh Tomatoes',
  //     description: 'Farm Fresh | 1 kg',
  //     image: 'assets/images/tomatoes.jpg',
  //     price: 40,
  //     quantity: 2,
  //     unit: 'per kg',
  //     selected: true
  //   },
  //   {
  //     id: 2,
  //     name: 'Carrot',
  //     description: 'Farm Fresh | 1 kg',
  //     image: 'assets/images/carrot.jpg',
  //     price: 30,
  //     quantity: 1,
  //     unit: 'per kg',
  //     selected: true
  //   },
  //   {
  //     id: 3,
  //     name: 'Spinach',
  //     description: 'Farm Fresh | 500 g',
  //     image: 'assets/images/spinach.jpg',
  //     price: 20,
  //     quantity: 1,
  //     unit: 'per pack',
  //     selected: true
  //   }
  // ];

cartItems: any[] = [];
selectitems!:FormGroup;
ngOnInit(): void {
  this.userId = Number(sessionStorage.getItem('id'));
this.GetCartData();

this.selectitems=this.fb.group({
  Itemsel:[null]
})

}

GetCartData(){
  
  this.cserv.GetCartData(this.userId).subscribe({
    next: (res: any) => {
      console.log(res);

      const products = res.data.prdDto;
      const cartData = res.data.cartRes;

      this.cartItems = cartData.map((item: any) => {
        const product = products.find(
          (p: any) => p.id === item.productId
        );

        return {
          cartid:product.cartid,
          id: item.productId,
          name: item.productName,
          description: product?.description ?? '',
          image: product?.image
            ? 'data:image/jpeg;base64,' + product.image
            : 'assets/images/no-image.png',
          price: Number(item.productPrice),
          quantity: item.quantity,
          unit: product?.unit ?? '',
          selected: true,
          organic: product?.organic ?? false
        };
      });
    },
    error: (err) => {
      console.log('Error occurred', err);
    }
  });
}

get allSelected(): boolean {
  return this.cartItems.length > 0 &&
    this.cartItems.every(item => item.selected);
}

get selectedCount(): number {
  return this.cartItems.filter(item => item.selected).length;
}

get subtotal(): number {
  return this.cartItems
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
}

get deliveryCharges(): number {
  if (this.selectedCount === 0 || this.subtotal >= 500) {
    return 0;
  }
  return 40;
}

get grandTotal(): number {
  return this.subtotal + this.deliveryCharges;
}

toggleAll(event: Event): void {
  const checked = (event.target as HTMLInputElement).checked;
  this.cartItems.forEach(item => item.selected = checked);
}

changeQuantity(item: any, change: number): void {
  console.log("fghdxxcx",item);
  if (item.quantity + change >= 1) {
      item.quantity += change;

      console.log(item.cartid);
      console.log(this.cartItems)
      
      this.cserv.UpdateQuantity(Number(sessionStorage.getItem("id")),item.id,change).subscribe({
        next:(res)=>{
          console.log(res);
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }
}

removeItem(product:any): void {

  // this.cartItems.splice(index, 1);

  const productid=product.id
  this.cserv.RemoveCartItem(this.userId,productid).subscribe({
    next:(res)=>{
      console.log(res);
      alert("removed item",);
    },
    error:(err)=>{
      console.log(err);
    }
  })
  this.GetCartData();
window.location.reload();
  this.GetCartData();
}

calculateTotal(): void {
  // Totals update automatically through getters.
  const selectId=this.selectitems.value.Itemsel;
  console.log("selecetd od",selectId);

}

proceedToCheckout(): void {

  if (this.selectedCount > 0) {
    this.router.navigate(['user/checkout']);
  }
}



  // get allSelected(): boolean {
  //   return this.cartItems.length > 0 &&
  //     this.cartItems.every(item => item.selected);
  // }

  // get selectedCount(): number {
  //   return this.cartItems.filter(item => item.selected).length;
  // }

  // get subtotal(): number {
  //   return this.cartItems
  //     .filter(item => item.selected)
  //     .reduce((sum, item) => sum + item.price * item.quantity, 0);
  // }

  // get deliveryCharges(): number {
  //   if (this.selectedCount === 0 || this.subtotal >= 500) {
  //     return 0;
  //   }

  //   return 40;
  // }

  // get grandTotal(): number {
  //   return this.subtotal + this.deliveryCharges;
  // }


  // toggleAll(event: Event): void {
  //   const checked = (event.target as HTMLInputElement).checked;

  //   this.cartItems.forEach(item => {
  //     item.selected = checked;
  //   });
  // }

  // changeQuantity(item: CartItem, change: number): void {
  //   const newQuantity = item.quantity + change;

  //   if (newQuantity >= 1) {
  //     item.quantity = newQuantity;
  //   }
  // }

  // removeItem(index: number): void {
  //   this.cartItems.splice(index, 1);
  // }

  // calculateTotal(): void {
  //   // Totals update automatically through getters.
  // }

  // proceedToCheckout(): void {
  //   if (this.selectedCount === 0) {
  //     return;
  //   }

  //   // Change this route to your checkout page.
  //   this.router.navigate(['/checkout']);
  // }
}


