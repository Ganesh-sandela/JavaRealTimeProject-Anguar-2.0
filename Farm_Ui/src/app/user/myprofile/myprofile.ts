import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Settingupdate } from '../../Dto/address';
import { CustomerService } from '../../Services/customerservice';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-myprofile',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './myprofile.html',
  styleUrl: './myprofile.css',
})
export class Myprofile {

fileName = '';

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (file) {
    this.fileName = file.name;
  }
}


  profileInfo!: FormGroup;
  address: any = {};
  user: any = {};
  userid: any;

  addrid: any;
  createdDate:any;
  constructor(private fb: FormBuilder, private cserv: CustomerService) { }


  ngOnInit(): void {

    this.userid = sessionStorage.getItem("id");
    this.profileInfo = this.fb.group({
      name: ['', Validators.required],
      phno: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      altph: ['', Validators.required],
      village: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.maxLength(6)]],
    })

    //   this.address=JSON.parse(sessionStorage.getItem('address') || '{}');
    //   this.user=JSON.parse(sessionStorage.getItem('user') || '{}');

    // console.log(this.address)

    // console.log(this.user)

    this.cserv.getAddrUsr(this.userid).subscribe({
     next: (res: any) => {
  console.log('Full response:', res);

  const user = res.data.userDTO;
  this.createdDate=res.data.userDTO.createdDate;
  const addresses = res.data.addrDTO;

  if (!user) {
    console.error('User details not found');
    return;
  }

  if (!addresses || addresses.length === 0) {
    console.error('No addresses found');
    return;
  }

  this.addrid = addresses[0].id;

  this.profileInfo.patchValue({
    name: user.name,
    email: user.email,
    phno: user.phno,
    village: addresses[0].village,
    city: addresses[0].city,
    district: addresses[0].district,
    state: addresses[0].state,
    pincode: addresses[0].zipcode
  });

  console.log('Address ID:', this.addrid);
},
      error: (err: Error) => {
        console.log(err);
      }
    })



  }

  onSubmit() {
    const payload: Settingupdate = {
      id: this.addrid,
      name: this.profileInfo.get('name')?.value,
      city: this.profileInfo.get('city')?.value,
      district: this.profileInfo.get('district')?.value,
      email: this.profileInfo.get('email')?.value,
      // houseno:this.profileInfo.get('houseno')?.value,
      phno: this.profileInfo.get('phone')?.value,
      state: this.profileInfo.get('state')?.value,
      village: this.profileInfo.get('village')?.value,
      zipcode: this.profileInfo.get('pincode')?.value,
    }

    console.log(payload);

    this.cserv.updateSetting(this.userid,payload).subscribe({
next:(res:any)=>{
  console.log("update succesfully",res);
}
,error:(err:Error)=>{
  console.log("update failed",err);
}
    })
   
  }

}
