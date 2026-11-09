
// import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatStepperModule } from '@angular/material/stepper';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { CustomerService } from '../../Services/customerservice';
// import { AppConstant } from '../../appconstant';
// import { address, Coustomer, Order, OrderItems } from '../../Dto/Customer';
// import { PurchaseRequest } from '../../Dto/PurchaseRequest';
// import { PaymentService } from '../Userservices/payment-service';
// import { Paymentcallback } from '../../Dto/address';

// @Component({
//   selector: 'app-checkout',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatStepperModule,
//     MatButtonModule,
//     MatFormFieldModule,
//     MatInputModule,
//     ReactiveFormsModule,
//     RouterLink
//   ],
//   templateUrl: './checkout.html',
//   styleUrl: './checkout.css'
// })
// export class Checkout implements OnInit {

//   submitted = false;
//   isLinear = signal(true);
//   addressForm!: FormGroup;
//   paymentForm!: FormGroup;
//   name: string = '';
//   mobile: number | null = null;
//   address: any[] = [];
//   uid: any;
//   email: string = '';
//   selectedAddress: any = null
//   userId: any;
//   cartItems: any[] = [];
//   selectitems!: FormGroup;
// username:String=""
// isLoading=true;
// result:any;
// razorpayorderIdValue:any;
// orderTrackingNumberValue:any;
// orderStatusValue:any;
// selecetdAddressId:any;
//   GetCartData() {

//     this.cserv.GetCartData(this.userId).subscribe({
//       next: (res: any) => {
//         console.log(res);

//         const products = res.data.prdDto;
//         const cartData = res.data.cartRes;

//         this.cartItems = cartData.map((item: any) => {
//           const product = products.find(
//             (p: any) => p.id === item.productId
//           );

//           return {
//             cartid: product.cartid,
//             id: item.productId,
//             name: item.productName,
//             description: product?.description ?? '',
//             image: product?.image
//               ? 'data:image/jpeg;base64,' + product.image
//               : 'assets/images/no-image.png',
//             price: Number(item.productPrice),
//             quantity: item.quantity,
//             unit: product?.unit ?? '',
//             selected: true,
//             organic: product?.organic ?? false
//           };
//         });
//       },
//       error: (err) => {
//         console.log('Error occurred', err);
//       }
//     });
//   }






//   radioselect!: FormGroup;
//   constructor(private cserv: CustomerService, private route: Router
//     , private http: HttpClient,
//     private fb: FormBuilder,
//     private cd:ChangeDetectorRef,
//     private paymentservice:PaymentService,
//     private router:Router

//   ) {
//     this.uid = sessionStorage.getItem('id') ?? '';

//   }


//   navigate() {
//     this.route.navigateByUrl('/user/addaddress')
//   }
//   radio() {
//     // this.submitted=true;
//     // debugger;

//     const control = this.radioselect.get('radioadr');
//     const selecetdAddressId = this.radioselect.value.radioadr;
//     if (selecetdAddressId == null) {
//       this.radioselect.get('radioadr')?.markAsTouched();
//       return;
//     }
//     if (control?.invalid) {
//       control.markAsTouched();
//       return;
//     }


//     this.selectedAddress = this.address.find(item => String(item.id) === String(selecetdAddressId));
//     console.log("selecetdaddresid", selecetdAddressId);
//     console.log("adr", this.selectedAddress);

//     this.currentStep++;
//   }
//   ngOnInit(): void {

//     this.userId = Number(sessionStorage.getItem('id'));
//     this.GetCartData();

//     this.radioselect = this.fb.group({
//       radioadr: [null, Validators.required]
//     })


// this.username=sessionStorage.getItem("name")||"";

//     const selectedAddressId = this.radioselect.value.radioadr;

//     console.log('Selected address ID:', selectedAddressId);

//     // Get email from session storage
//     this.email = sessionStorage.getItem('email') || '';

//     console.log('Email:', this.email);


//     this.addressForm = this.fb.group({
//       fullName: ['', Validators.required]
//     });

//     // this.paymentForm = this.fb.group({
//     //   address: ['', Validators.required]
//     // });

//     this.paymentForm = this.fb.group({
//       method: ['COD', Validators.required]
//     });

//     // Call API
//     this.cserv.getAllDetails(this.email).subscribe({

//       next: (res: any) => {

//         console.log('API Response:', res);

//         // Get user details
//         this.name = res.data.user.name;
//         this.mobile = res.data.user.phno;

//         // Get address details
//         // this.address = res.data.address;

//         console.log('Name:', this.name);
//         console.log('Mobile:', this.mobile);
//         console.log('Address:', this.address);
//       },

//       error: (err) => {
//         console.log('Error occurred:', err);
//       }

//     });
//   }
//   edit() {

//   }
//   Delete(addId: any) {
//     console.log(addId, "itemid");
//     this.http.delete(
//       `${AppConstant.deleteadr}?userid=${this.uid}&id=${addId}`
//     ).subscribe({
//       next: (res) => {
//         console.log('Address deleted successfully', res);
//       },
//       error: (err) => {
//         console.error('Error deleting address', err);
//       }
//     });



//   }


// deliveryMethod = 'Standard Delivery';
// deliveryTime = '3 to 5 days';

// // Go back to the address step
// editAddress(): void {
//   this.currentStep = 1;
// }

// // Go to the delivery step if you have one;
// // otherwise return to the payment step.
// editDelivery(): void {
//   this.currentStep = 2;
// }

// // Return to the payment step
// editPayment(): void {
//   this.currentStep = 2;
// }

// getPaymentMethodName(): string {
//   const method = this.paymentForm.get('method')?.value;

//   switch (method) {
//     case 'COD':
//       return 'Cash on Delivery';
//     case 'ONLINE':
//       return 'Online Payment';
//     case 'WALLET':
//       return 'Wallet';
//     default:
//       return 'Not selected';
//   }
// }





//   currentStep = 1;

//   nextStep() {
//     if (this.currentStep < 4) {
//       this.currentStep++;
//       this.updateProgress();
//     }
//   }

//   previousStep() {
//     if (this.currentStep > 1) {
//       this.currentStep--;
//       this.updateProgress();
//     }
//   }


// get subtotal(): number {
//   return this.cartItems
//     .filter(item => item.selected)
//     .reduce((sum, item) => sum + item.price * item.quantity, 0);
// }

// get deliveryCharges(): number {
//   if (this.subtotal >= 500) { //this.selectedCount === 0 || 
//     return 0;
//   }
//   return 40;
// }

// get grandTotal(): number {
//   return this.subtotal + this.deliveryCharges;
// }



//   updateProgress() {
//     const progress = document.querySelector('.progress') as HTMLElement;
//     if (progress) {
//       progress.style.width = `${(this.currentStep - 1) / 3 * 100}%`;
//     }

//     document.querySelectorAll('.adr, .pay, .rev, .con')
//       .forEach((step, index) => {
//         step.classList.toggle('active', index < this.currentStep);
//       });
//   }




//   continueToReview(): void {
//     if (this.paymentForm.invalid) {
//       this.paymentForm.markAllAsTouched();
//       return;
//     }

//     console.log('Selected address:', this.selectedAddress);
//     console.log('Selected payment method:', this.paymentForm.value.method);

//     this.currentStep = 3;
//   }





// placeOrder() {
//     setTimeout(()=>{
//       // this.isLoading = true;
//     },1000)
//     // let order = new Order(this.totalPrice, this.totalQuantity);
//     let order= new Order(this.grandTotal,totalquantity);

// const orderItems: OrderItems[] = this.cartItems
//   .filter(item => item.selected)
//   .map(item =>
//     new OrderItems(
//       item.id,
//       item.name,
//       item.image,
//       item.quantity,
//       item.price
//     )
//   );
//    const customer = new Coustomer(this.name,this.email,this.mobile??null);

// const adr=new address(this.selectedAddress.id,this.selectedAddress.houseno,this.selectedAddress.city,this.selectedAddress.state,this.selectedAddress.zipcode);

// let purchase = new PurchaseRequest();

// purchase.customer = customer;
// purchase.address = adr;
// purchase.order = order;
// purchase.orderItems = orderItems;

//     this.cserv.createOrder(purchase).subscribe((response:any) => {
//       let responseData = response.data;
//       // console.log(responseData);
//       // console.log("Order ID:", responseData.razorpayorderId);
//       this.paymentservice.processPayment(responseData.razorpayorderId,
//         this.grandTotal * 100,
//         this.name,
//         sessionStorage.getItem('email')||"",
//        Number( this.mobile),
//         this.onPaymentSuccess.bind(this));
//           this.isLoading=false;
//     })

//   }
//   onPaymentSuccess(response: any) {
//     console.log(response);
//     alert("payment done...");
//      this.router.navigate(['/products/yourorders']) //!  or esle ['/products/yourorders]

//     let paymentCallback = new Paymentcallback(
//       response.razorpay_order_id,
//       response.razorpay_payment_id,
//       response.razorpay_signature
//     );
//     this.cserv.confirmOrder(paymentCallback).subscribe((data: any) => {
//         this.isLoading = false; 

//       try {
//         this.result = data.data;
//         this.razorpayorderIdValue = this.result.razorpayorderId;
//         this.orderTrackingNumberValue = this.result.orderTrackingNumber;
//         this.orderStatusValue = this.result.orderStatus;



//         this.cd.detectChanges();
//       } catch (error) {
//         console.error(error);
//         this.isLoading = false;
//       }
//     },


//     );

//   }


// }







import {
  ChangeDetectorRef,
  Component,
  OnInit,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CustomerService } from '../../Services/customerservice';
import { AppConstant } from '../../appconstant';

import {
  address,
  Coustomer,
  Order,
  OrderItems
} from '../../Dto/Customer';

import { PurchaseRequest } from '../../Dto/PurchaseRequest';
import { PaymentService } from '../Userservices/payment-service';
import { Paymentcallback } from '../../Dto/address';

@Component({
  selector: 'app-checkout',
  standalone: true,

  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {

  submitted = false;

  isLinear = signal(true);

  addressForm!: FormGroup;
  paymentForm!: FormGroup;
  radioselect!: FormGroup;

  name = '';
  mobile: number | null = null;
  email = '';
  username = '';

  address: any[] = [];
  selectedAddress: any = null;

  uid: string;
  userId = 0;

  cartItems: any[] = [];

  isLoading = false;
  isProcessingOrder = false;

  result: any = null;

  razorpayorderIdValue: any;
  orderTrackingNumberValue: any;
  orderStatusValue: any;
  selecetdAddressId: any;

  currentStep = 1;

  deliveryMethod = 'Standard Delivery';
  deliveryTime = '3 to 5 days';

  orderDate: Date = new Date();

  showProcessingPopup = false;
  processingMessage = 'Processing your order...';

  constructor(
    private cserv: CustomerService,
    private route: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private paymentservice: PaymentService,
    private router: Router
  ) {
    this.uid = sessionStorage.getItem('id') ?? '';
  }

  ngOnInit(): void {

    this.userId = Number(sessionStorage.getItem('id'));

    this.username = sessionStorage.getItem('name') || '';
    this.email = sessionStorage.getItem('email') || '';

    this.radioselect = this.fb.group({
      radioadr: [null, Validators.required]
    });

    this.addressForm = this.fb.group({
      fullName: ['', Validators.required]
    });

    this.paymentForm = this.fb.group({
      method: ['ONLINE', Validators.required]
    });

    if (!this.userId || !this.email) {
      alert('Please log in before checkout.');
      this.router.navigate(['/login']);
      return;
    }

    this.GetCartData();
    this.getCustomerDetails();
  }

  // Load cart products
  GetCartData(): void {

    this.cserv.GetCartData(this.userId).subscribe({

      next: (res: any) => {

        const products = res?.data?.prdDto ?? [];
        const cartData = res?.data?.cartRes ?? [];

        this.cartItems = cartData.map((item: any) => {

          const product = products.find(
            (p: any) => Number(p.id) === Number(item.productId)
          );

          return {
            cartid: item.cartid ?? product?.cartid ?? item.id,
            id: item.productId,
            name: item.productName,
            description: product?.description ?? '',

            image: product?.image
              ? 'data:image/jpeg;base64,' + product.image
              : 'assets/images/no-image.png',

            price: Number(item.productPrice),
            quantity: Number(item.quantity),

            unit: product?.unit ?? '',
            selected: true,
            organic: product?.organic ?? false
          };

        });

        console.log('Cart items:', this.cartItems);
      },

      error: (err: any) => {
        console.error('Failed to load cart:', err);
        alert('Unable to load your cart.');
      }

    });
  }

  // Load customer and saved addresses
  getCustomerDetails(): void {

    this.cserv.getAllDetails(this.email).subscribe({

      next: (res: any) => {

        const user = res?.data?.user;

        if (user) {
          this.name = user.name ?? '';
          this.mobile = user.phno != null
            ? Number(user.phno)
            : null;
        }

        // The backend response in your earlier code contains
        // address information under data.address.
    this.address = (res?.data?.address ?? []).filter(
  (adr: any, index: number, self: any[]) =>
    self.findIndex((a: any) =>
      a.userId === adr.userId &&
      a.name?.trim().toLowerCase() === adr.name?.trim().toLowerCase() &&
      a.houseNo?.trim().toLowerCase() === adr.houseNo?.trim().toLowerCase() &&
      a.city?.trim().toLowerCase() === adr.city?.trim().toLowerCase() &&
      a.pincode === adr.pincode
    ) === index
);

        console.log('Customer:', user);
        console.log('Saved addresses:', this.address);
      },

      error: (err: any) => {
        console.error('Failed to load customer details:', err);
      }

    });
  }

  // Navigate to add address page
  navigate(): void {
    this.route.navigateByUrl('/user/addaddress');
  }

  // Select a delivery address
  radio(): void {

    const control = this.radioselect.get('radioadr');
    const selectedAddressId = this.radioselect.value.radioadr;

    if (control?.invalid || selectedAddressId == null) {
      control?.markAsTouched();
      return;
    }

    this.selectedAddress = this.address.find(
      item => String(item.id) === String(selectedAddressId)
    );

    if (!this.selectedAddress) {
      alert('Please select a valid delivery address.');
      return;
    }

    this.selecetdAddressId = selectedAddressId;

    console.log('Selected address:', this.selectedAddress);

    this.currentStep = 2;
    this.updateProgress();
  }

  // Delete saved addressḥ
  Delete(addId: any): void {

    this.http.delete(
      `${AppConstant.deleteadr}?userid=${this.uid}&id=${addId}`
    ).subscribe({

      next: () => {

        this.address = this.address.filter(
          item => String(item.id) !== String(addId)
        );

        if (
          String(this.selectedAddress?.id) === String(addId)
        ) {
          this.selectedAddress = null;
          this.radioselect.get('radioadr')?.setValue(null);
        }

        console.log('Address deleted successfully.');
      },

      error: (err: any) => {
        console.error('Error deleting address:', err);
        alert('Unable to delete the address.');
      }

    });
  }

  edit(): void {
    // Add address editing logic here if required.
  }

  // Return selected product subtotal
  get subtotal(): number {

    return this.cartItems
      .filter(item => item.selected)
      .reduce(
        (sum, item) =>
          sum + Number(item.price) * Number(item.quantity),
        0
      );
  }

  // Delivery charges
  get deliveryCharges(): number {

    if (this.subtotal === 0 || this.subtotal >= 500) {
      return 0;
    }

    return 40;
  }

  // Final cart amount
  get grandTotal(): number {
    return this.subtotal + this.deliveryCharges;
  }

  // Total selected product quantity
  get totalQuantity(): number {

    return this.cartItems
      .filter(item => item.selected)
      .reduce(
        (total, item) => total + Number(item.quantity),
        0
      );
  }

  // Move to next checkout step
  nextStep(): void {

    if (this.currentStep < 4) {
      this.currentStep++;
      this.updateProgress();
    }
  }

  // Move to previous checkout step
  previousStep(): void {

    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateProgress();
    }
  }

  editAddress(): void {
    this.currentStep = 1;
    this.updateProgress();
  }

  editDelivery(): void {
    this.currentStep = 2;
    this.updateProgress();
  }

  editPayment(): void {
    this.currentStep = 2;
    this.updateProgress();
  }

  // Update checkout progress bar
  updateProgress(): void {

    const progress = document.querySelector(
      '.progress'
    ) as HTMLElement | null;

    if (progress) {
      progress.style.width =
        `${((this.currentStep - 1) / 3) * 100}%`;
    }

    document.querySelectorAll('.adr, .pay, .rev, .con')
      .forEach((step, index) => {
        step.classList.toggle(
          'active',
          index < this.currentStep
        );
      });
  }

  // Payment method display
  getPaymentMethodName(): string {

    const method = this.paymentForm?.get('method')?.value;

    switch (method) {
      case 'COD':
        return 'Cash on Delivery';

      case 'ONLINE':
        return 'Online Payment';

      case 'WALLET':
        return 'Wallet';

      default:
        return 'Not selected';
    }
  }

  // Continue to review
  continueToReview(): void {

    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    if (!this.selectedAddress) {
      alert('Please select a delivery address first.');
      this.currentStep = 1;
      return;
    }

    if (this.cartItems.filter(item => item.selected).length === 0) {
      alert('Your cart is empty. Please select products.');
      return;
    }

    this.currentStep = 3;
    this.updateProgress();
  }

  // Create ONE business order containing all selected cart products
  // and open Razorpay ONE time.
  placeOrder(): void {

    if (this.isProcessingOrder) {
      return;
    }

    if (!this.selectedAddress) {
      alert('Please select a delivery address.');
      this.currentStep = 1;
      return;
    }

    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    const selectedItems = this.cartItems.filter(
      item => item.selected
    );

    if (selectedItems.length === 0) {
      alert('Please select at least one product.');
      return;
    }

    if (
      selectedItems.some(
        item =>
          !Number.isFinite(Number(item.price)) ||
          Number(item.price) < 0 ||
          !Number.isFinite(Number(item.quantity)) ||
          Number(item.quantity) <= 0
      )
    ) {
      alert('One or more cart items have invalid price or quantity.');
      return;
    }

    if (this.grandTotal <= 0) {
      alert('The total order amount must be greater than zero.');
      return;
    }

    // if (!this.name || !this.email || this.mobile == null) {
    //   alert('Customer information is incomplete.');
    //   return;
    // }

    this.isProcessingOrder = true;
    this.isLoading = true;

    const totalAmount = this.grandTotal;
    const totalQuantity = this.totalQuantity;

    const order = new Order(
      totalAmount,
      totalQuantity
    );

    const orderItems: OrderItems[] = selectedItems.map(item =>

      new OrderItems(
        item.id,
        item.name,
        item.image,
        Number(item.quantity),
        Number(item.price)
      )

    );

    const customer = new Coustomer(
      this.name,
      this.email,
      this.mobile
    );

    const selectedAddress = new address(
      this.selectedAddress.id,
      this.selectedAddress.houseno,
      this.selectedAddress.city,
      this.selectedAddress.state,
      this.selectedAddress.zipcode
    );

    const purchase = new PurchaseRequest();

    purchase.customer = customer;
    purchase.address = selectedAddress;
    purchase.order = order;
    purchase.orderItems = orderItems;

    this.cserv.createOrder(purchase).subscribe({

      next: (response: any) => {

        const responseData = response?.data;

        if (!responseData?.razorpayorderId) {

          this.isProcessingOrder = false;
          this.isLoading = false;

          alert('The server did not return a Razorpay order ID.');
          return;
        }

        try {

          this.paymentservice.processPayment(
            responseData.razorpayorderId,
            totalAmount * 100,
            this.name,
            this.email,
            String(this.mobile ?? ''),
            (paymentResponse: any) => {

              this.onPaymentSuccess(paymentResponse);

            }
          );

        } catch (error) {

          console.error('Unable to open Razorpay:', error);

          this.isProcessingOrder = false;
          this.isLoading = false;

          alert('Unable to open the payment window.');
        }

      },

      error: (err: any) => {

        console.error('Order creation failed:', err);

        this.isProcessingOrder = false;
        this.isLoading = false;

        alert('Failed to create the order. Please try again.');
      }

    });
  }

  // Verify payment with the backend before navigating
  onPaymentSuccess(response: any): void {
    const paymentCallback = new Paymentcallback(
      response.razorpay_order_id,
      response.razorpay_payment_id,
      response.razorpay_signature
    );

    this.cserv.confirmOrder(paymentCallback).subscribe({
      next: (data: any) => {
        console.log('Order confirmed:', data);

        this.orderTrackingNumberValue =
          data.data?.orderTrackingNumber ?? '';

        this.orderStatusValue =
          data.data?.orderStatus ?? 'CONFIRMED';

        this.isLoading = false;

        // Display the success confirmation step
        this.currentStep = 4;

        // Update the progress indicator
        this.updateProgress();

        // Refresh the Angular view
        this.cd.detectChanges();

        // Do not navigate to the checkout route again
      },
      error: (error: any) => {
        console.error('Order confirmation failed:', error);
        this.isLoading = false;
      }
    });
  }

  continueShopping(): void {
    this.router.navigate(['/']);
  }

  goToOrders(): void {
    this.router.navigate(['/user/orders']);
  }
}
