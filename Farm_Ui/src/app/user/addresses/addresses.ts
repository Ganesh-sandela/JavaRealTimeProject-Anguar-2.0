import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../Services/customerservice';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../appconstant';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './addresses.html',
  styleUrl: './addresses.css'
})
export class Addresses implements OnInit {

  name: string = '';
  mobile: number | null = null;
  address: any[] = [];
uid:any;
  email: string = '';

  constructor(private cserv: CustomerService ,private  route:Router
    ,private http:HttpClient
  ) {
    this.uid=sessionStorage.getItem('id')??'';
    
  }


  navigate(){
this.route.navigateByUrl('/user/addaddress')
  }
ngOnInit(): void {
  this.email = sessionStorage.getItem('email') || '';

  this.cserv.getAllDetails(this.email).subscribe({
    next: (res: any) => {
      console.log('API Response:', res);

      this.name = res.data.user.name;
      this.mobile = res.data.user.phno;

      // Display all addresses without filtering
      this.address = res?.data?.address ?? [];

//       this.address = (res?.data?.address ?? []).filter(
//   (adr: any, index: number, self: any[]) =>
//     self.findIndex(
//       (a: any) =>
//         String(a.phoneNumber ?? a.user?.phno ?? a.phno ?? '').trim() ===
//         String(adr.phoneNumber ?? adr.user?.phno ?? adr.phno ?? '').trim()
//     ) === index
// );

      console.log('Address:', this.address);
    },
    error: (err) => {
      console.error('Error occurred:', err);
    }
  });
}
  edit(){

  }
Delete(addId: any) {
  this.http.delete(
    `${AppConstant.deleteadr}?userid=${this.uid}&id=${addId}`
  ).subscribe({
    next: (res) => {
      console.log('Address deleted successfully', res);

      this.address = this.address.filter(
        (adr: any) => adr.id !== addId
      );
    },
    error: (err) => {
      console.error('Error deleting address', err);
    }
  });
}

}