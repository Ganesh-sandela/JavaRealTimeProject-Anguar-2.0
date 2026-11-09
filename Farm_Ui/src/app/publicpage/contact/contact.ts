import { Component } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-contact',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  fromdata= new FormGroup({
   name: new FormControl('', [Validators.required, Validators.pattern('.*\\S.*')]),

    email: new FormControl('', [
      Validators.required,
      Validators.email,
       Validators.pattern('.*\\S.*')
    ]),

    ordernum: new FormControl(''),

    help: new FormControl('', [Validators.required,  Validators.pattern('.*\\S.*')])
  });


  onSubmit(){
   if (this.fromdata.valid) {
      alert("Form Submitted Successfully");
    } else {
      alert("Please fill all required fields");
    }
}
}
