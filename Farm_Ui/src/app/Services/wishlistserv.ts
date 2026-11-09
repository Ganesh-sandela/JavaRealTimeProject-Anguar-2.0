import { Injectable } from '@angular/core';
import { Userserv } from '../user/Userservices/userserv';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class Wishlistserv {

  constructor(
    private userv: Userserv,
    private pserv: Product
  ) {
    console.log('Wishlist service loaded');
  }


  // =========================================
  // LOAD WISHLIST
  // =========================================
  loadWishlist(): void {

    const uid = Number(sessionStorage.getItem('id'));

    console.log('Loading wishlist for user:', uid);

    if (!uid) {
      console.log('User ID not found');
      return;
    }

    this.pserv.GetWishlist(uid).subscribe({

      next: (res: any) => {

        console.log('Wishlist response:', res);

        if (res && res.data) {

          this.userv.whitelist.next(res.data);

          console.log(
            'Wishlist stored:',
            this.userv.whitelist.value
          );

        } else {

          this.userv.whitelist.next([]);

        }

      },

      error: (err: any) => {

        console.log('Get Wishlist Error:', err);

        this.userv.whitelist.next([]);

      }

    });

  }


  // =========================================
  // ADD / REMOVE WISHLIST
  // =========================================
AddToWishList(item: any): void {

  const uid = Number(sessionStorage.getItem('id'));

  if (!uid) {
    console.log('User ID not found');
    return;
  }

  const wishlist = this.userv.whitelist.value;

  const exists = wishlist.some(
    (res: any) =>
      Number(res.product?.id) === Number(item.id)
  );

  if (exists) {

    // REMOVE
      this.pserv.RemoveFromWishList(uid, item.id).subscribe({
        next: (res: any) => {

          console.log('Removed from wishlist');

          // Remove from BehaviorSubject immediately
          const updatedList = this.userv.whitelist.value.filter(
            (res: any) =>
              Number(res.product?.id) !== Number(item.id)
          );

          this.userv.whitelist.next(updatedList);
        },

        error: (err: any) => {
          console.log('Remove Wishlist Error:', err);
        }
      });

  } else {

    // ADD
    this.pserv.AddToWishList(uid, item.id).subscribe({
      next: (res: any) => {

        console.log('Added to wishlist');

        // Reload wishlist from database
        this.loadWishlist();
      },

      error: (err: any) => {
        console.log('Add Wishlist Error:', err);
      }
    });
  }
}
}