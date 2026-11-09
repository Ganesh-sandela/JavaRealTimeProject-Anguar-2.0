
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AppConstant } from '../../appconstant';
import { AddressDto } from '../../Dto/address';

@Component({
  selector: 'app-add-address',
  imports: [ReactiveFormsModule],
  templateUrl: './add-address.html',
  styleUrl: './add-address.css',
})
export class AddAddress implements OnInit {

  address!: FormGroup;
  userid = sessionStorage.getItem('id') ?? '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.address = this.fb.group({
      name: ['', Validators.required],
      phno: ['', Validators.required],
      hno: ['', Validators.required],
      village: ['', Validators.required],
      city: ['', Validators.required],
      distinct: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.address.invalid) {
      this.address.markAllAsTouched();
      return;
    }

    const payload: AddressDto = {
      name: this.address.value.name,
      phno: this.address.value.phno,
      houseno: this.address.value.hno,
      village: this.address.value.village,
      city: this.address.value.city,
      district: this.address.value.distinct,
      state: this.address.value.state,
      zipcode: this.address.value.pincode
    };

    this.http.post(
      `${AppConstant.addAddresses}?id=${this.userid}`,
      payload
    ).subscribe({
      next: (res) => {
       this.address.reset();
        console.log('Address saved successfully:', res);
      },
      error: (err) => {
        console.error('Error saving address:', err);
      }
    });
  }
}