import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isNgTemplate } from '@angular/compiler';
import { email, validate } from '@angular/forms/signals';
import { combineLatest, startWith } from 'rxjs';
import { RegisterDTO } from '../Dto/register-dto';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../Services/customerservice';
import { Router, RouterLink } from '@angular/router';
import { AddressDto } from '../Dto/address';
@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {

  register!: FormGroup;
 
  mismatchespwd: boolean = false

  loading=false

  constructor(private http: HttpClient, private customerservice: CustomerService,
    private route:Router
  ) { }

  ngOnInit(): void {

  

    this.register = new FormGroup({

      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),

      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),

      phno: new FormControl('', [
        Validators.required,
        Validators.pattern('^[6-9][0-9]{9}$')
      ]),

      role: new FormControl('', [
        Validators.required
      ]),
       city : new FormControl('',[Validators.required]),
       village : new FormControl('',[Validators.required]),
      district : new FormControl('',[Validators.required]),
      state : new FormControl('',[Validators.required]),
      zipcode : new FormControl('',[Validators.required]),

      // pwd: new FormControl('', [
      //   Validators.required,
      //   Validators.minLength(8)
      // ]),

      // cpwd: new FormControl('', [
      //   Validators.required
      // ])

    });

  }

OnSubmit() {

  if (this.register.invalid) {
    this.register.markAllAsTouched();
    return;
  }

  this.loading=true
  const { name, email, phno, role } = this.register.value;

  const regist = new RegisterDTO(name!, email!, phno!, role!);

  const addr= new AddressDto()
  addr.city=this.register.value.city;
  addr.district=this.register.value.district;
  addr.state=this.register.value.state;
  addr.zipcode=this.register.value.zipcode;
  this.customerservice.register(regist,addr).subscribe({

    next: (res) => {
      console.log(res);
       this.loading = false;
      alert("Registration Successful");
      this.customerservice.emailstore=email
      this.route.navigateByUrl('/reset');
    },

    error: (err) => {
       this.loading = false;
      console.log(err);

      if (err.status === 400) {
        this.register.get('email')?.setErrors({
          EmailNotUnique: true
        });
      }

    }

  });

}
}

