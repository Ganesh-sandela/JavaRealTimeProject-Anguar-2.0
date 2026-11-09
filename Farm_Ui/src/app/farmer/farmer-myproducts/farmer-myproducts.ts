import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { Product } from '../../Services/product';
import { CustomerService } from '../../Services/customerservice';
import { BehaviorSubject } from 'rxjs';
import { ProductRequestDTO } from '../../Dto/product-request-dto';
import { CategoryPipe } from '../../pipes/category-pipe';

@Component({
  selector: 'app-farmer-myproducts',
  imports: [RouterLink, RouterLinkActive,CategoryPipe],
  templateUrl: './farmer-myproducts.html',
  styleUrl: './farmer-myproducts.css',
})
export class FarmerMyproducts implements OnInit{

items: ProductRequestDTO[] = [];

  constructor(private productservice:Product,
    private customerservice:CustomerService,
    private cd:ChangeDetectorRef,
    private producservice:Product,
    private route:Router
  ){}

  ngOnInit(): void {
  
// this.cd.detectChanges();
//    this.customerservice.userId.subscribe(id=>{
//     console.log("userId",id);
//      const userId = id > 0 ? id : Number(sessionStorage.getItem('id'));
//     this.productservice.getProducts(userId).subscribe({
//       next:(res:any)=>{
//         console.log(res)
//         this.items=res.data;
//       },
//       error:(err)=>{
//         console.log(err);
//       }
//     })
//    })


  console.log("FarmerMyproducts ngOnInit");

  const userId = Number(sessionStorage.getItem('id'));
  console.log("User ID:", userId);

  if (userId) {
    this.productservice.getProducts(userId).subscribe({
      next: (res: any) => {
        this.items = res.data;
      }
    });
  }

  }
  edit(p:ProductRequestDTO){
    console.log(p)
  this.producservice.updateProduct(p);
  this.route.navigateByUrl('/farmer/farmeraddproducts')
  }

  addProducts(){
    this.route.navigateByUrl('/farmer/farmeraddproducts');
  }
}
