import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../Services/product';
import { Errorpageload } from "../../resuable/errorpageload/errorpageload";
import { Userserv } from '../Userservices/userserv';
import { Wishlistserv } from '../../Services/wishlistserv';
import { AddToCart } from '../../Dto/address';
import { CustomerService } from '../../Services/customerservice';

@Component({
  selector: 'app-seeds',
  imports: [Errorpageload],
  templateUrl: './seeds.html',
  styleUrl: './seeds.css',
})
export class Seeds implements OnInit {
 vegetables: any[] = [];

  errorPage: boolean = false;

  statusCode: number = 0;

userid:any;
  constructor(
    private route: ActivatedRoute,
    private produtService: Product,
    private userserv: Userserv,
    private uwhitelistserv: Wishlistserv,
    private cserv:CustomerService
  ) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const id = Number(params.get('id'));

      // console.log('Category ID:', id);

      this.produtService.getCtegoriesById(id).subscribe({

        next: (res: any) => {

          // console.log('Vegetables:', res);

          this.vegetables = res.data;

          this.errorPage = false;
        },

        error: (err) => {

          // console.log('Error:', err);

          this.errorPage = true;

          this.statusCode = err.status;
        }

      });

    });

    this.userid=sessionStorage.getItem('id') ??'';
  }

 addToCart(item: any) {
  
  const payload: AddToCart = {
    userId: Number(sessionStorage.getItem('id')),
    productId: item.id,
    quantity: 1
  };

  // console.log(payload);

  this.cserv.AddToCart(payload).subscribe({
    next: (res: any) => {
      // console.log('Product added to cart successfully', res);
      alert("product addede succesfully to cart...")
    },
    error: (err: any) => {
      console.error('Failed to add product to cart', err);
    }
  });
}

  // ADD / REMOVE WISHLIST
  addToWishList(item: any): void {

    // console.log('Wishlist product:', item);

    this.uwhitelistserv.AddToWishList(item);

  }


  // CHECK WHETHER ITEM IS WISHLISTED
  isWishlisted(item: any): boolean {

    return this.userserv.whitelist.value.some(
      (res: any) =>Number( res.product?.id) ===Number( item.id)
    );

  }

}
