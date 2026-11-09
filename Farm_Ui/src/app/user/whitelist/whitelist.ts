import { Component, OnInit } from '@angular/core';
import { Userserv } from '../Userservices/userserv';
import { Product } from '../../Services/product';

@Component({
  selector: 'app-whitelist',
  imports: [],
  templateUrl: './whitelist.html',
  styleUrl: './whitelist.css',
})
export class Whitelist implements OnInit{

  constructor(private userser:Userserv,
    private pserv:Product,
    private userv:Userserv,

  ){}

  whitelist:any[]=[];

removeFromWishlist(item:any){
   const uid = Number(sessionStorage.getItem('id'));
      this.pserv.RemoveFromWishList(uid, item.id).subscribe({
        next: (res: any) => {
              console.log(res,"/????")
          alert('Removed from wishlist');

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
}

  ngOnInit(): void {
   this.userser.whitelist.subscribe((res)=>{
    this.whitelist=res;

   })

  

    

    const uid = Number(sessionStorage.getItem('id'));

    console.log('Loading wishlist for user:', uid);

    if (!uid) {
      alert('User ID not found');
      return;
    }

    this.pserv.GetWishlist(uid).subscribe({

      next: (res: any) => {

        console.log('Wishlist response:', res);

        if (res && res.data) {

          this.userser.whitelist.next(res.data);

          console.log(
            'Wishlist stored:',
            this.userser.whitelist.value
          );

        } else {

          this.userser.whitelist.next([]);

        }

      },

      error: (err: any) => {

        console.log('Get Wishlist Error:', err);

        this.userser.whitelist.next([]);

      }

    });

  }
}
