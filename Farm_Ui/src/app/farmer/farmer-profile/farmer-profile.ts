import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../Services/customerservice';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../appconstant';

@Component({
  selector: 'app-farmer-profile',
  imports: [],
  templateUrl: './farmer-profile.html',
  styleUrl: './farmer-profile.css',
})
export class FarmerProfile implements OnInit {

  address: any = {};
  user:any={};
  name:any;
  email:any;
  uemail:any;
  mobile:any;
userid:any;
  constructor(private cserv:CustomerService,private http:HttpClient){
    this.email=sessionStorage.getItem('email');
    this.userid=sessionStorage.getItem('id');
  }
 ngOnInit(): void {
 
 this.cserv.getAddrUsr(this.userid).subscribe({
next:(res:any)=>{
 console.log(res.data.addrDTO);
 this.address=res.data.addrDTO;
 this.name=res.data.userDTO.name;
 this.uemail=res.data.userDTO.email;
 this.mobile=res.data.userDTO.phno;

 console.log(this.name);
 console.log(this.uemail);
 console.log(this.mobile);
 console.log(this.address)
},
error:(err:Error)=>{
console.log(err);
}
 })
  }


  
}
