import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { CustomerService } from '../Services/customerservice';
import { LoginDto } from '../Dto/logindto';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  submited: boolean = false;
  loading = false
  roleIncorrect: boolean = false
  InvalidCredtionals: boolean = false
  dialogMessage = ''
  showDialog: boolean = false
  constructor(private customerservice: CustomerService, private router: Router,
    private cserv:CustomerService
  ) { }

  login = new FormGroup({
    pwd: new FormControl('', [Validators.required, Validators.minLength(1)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    role: new FormControl('', [Validators.required])
  })

  onSubmit() {

    this.submited = false;
    if (this.login.invalid) {
      this.login.markAllAsTouched();
      return;
    }
    setTimeout(() => {
      this.loading = true
    }, 2000)
    if (this.login.valid) {
      const pwd = this.login.get('pwd')?.value!;
      const email = this.login.get('email')?.value!;
      const roled = this.login.get('role')?.value!;

      const payload = new LoginDto(
        this.login.value.email!,
        this.login.value.pwd!,
        this.login.value.role!);

      this.loading = false;
      this.customerservice.login(payload).subscribe({
        next: (res: any) => {

          this.customerservice.addressStore.next(res.data.address);
          console.log(res.data.address, '??????????????????')
          console.log(res)
          alert('succesfully  loged in...')
          this.loading = false;
          console.log(res, '====+++++');
          // console.log(res.data.customerdto.role);
          // console.log(res.data.token);
          // console.log("Entire Response:", res);
          // console.log("Data:", res.data.token);
          // console.log(res.data.coustmerdto.role);
          // sessionStorage.setItem('name', res.data.coustmerdto.name);
          // sessionStorage.setItem('name', res.data.address);
          sessionStorage.setItem('user', JSON.stringify(res.data.coustmerdto));
          sessionStorage.setItem('mobile', res.data.coustmerdto.phno);
          sessionStorage.setItem('name', res.data.coustmerdto.name);
          sessionStorage.setItem('address', JSON.stringify(res.data.address));
          sessionStorage.setItem('token', res.data.token);
          sessionStorage.setItem('role', res.data.coustmerdto.role.toLowerCase());
          sessionStorage.setItem('email', res.data.coustmerdto.email);
          sessionStorage.setItem('id', res.data.coustmerdto.id);

         


          let role = res.data.coustmerdto.role.toLowerCase();

          this.customerservice.setUserId(res.data.coustmerdto.id ?? Number(sessionStorage.getItem('id')));

          switch (role) {
            case 'farmer':
              console.log("Navigating to farmer");
              this.router.navigate(['/farmer']);
              break;

            case 'admin':
              console.log("Navigating to admin");
              this.router.navigate(['/admin']);
              break;

            case 'customer':
              console.log("Navigating to customer");
              this.router.navigate(['/user']);
              break;
            default: this.router.navigate(['/login'])
          }

          // this.route.navigateByUrl('/admin');
        },
        // error: (res) => {
        //   this.loading = false;
        //   console.log(res.value)
        //   alert('No User Account has beeen found..')
        //   this.route.navigateByUrl('/login');

        // }
        // error: (err) => {
        //   this.loading=false
        //   if (err.status==401&&err.error.msg=='Selected role is incorrect') {
        //     this.loading=false
        //     alert('Selected role is incorrect and 401')
        //     this.roleIncorrect=true
        //   }
        //   else{
        //     this.loading=false
        //     this.InvalidCredtionals=true
        //     alert('invalid credtionals')
        //   }


        // }


        error: (err) => {
          this.loading = false;

          if (err.status === 401) {
            this.dialogMessage = "Selected role is incorrect.";
          } else if (err.status === 400) {
            this.dialogMessage = "Invalid email or password.";
          } else {
            this.dialogMessage = "Something went wrong. Please try again.";
          }

          this.showDialog = true;
        }

      })
    }

  }
  closeDialog() {
    this.showDialog = false;
  }

  loginWithGoogle() {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  }

  ngOnInit(): void {


    this.login.get('email')?.disable();
    this.login.get('pwd')?.disable();


    this.login.get('role')?.valueChanges.subscribe((role) => {

      if (role) {
        this.login.get('email')?.enable();
      } else {
        this.login.get('email')?.reset();
        this.login.get('email')?.disable();

        this.login.get('pwd')?.reset();
        this.login.get('pwd')?.disable();
      }

    });


    this.login.get('email')?.valueChanges.subscribe((email) => {

      if (email) {
        this.login.get('pwd')?.enable();
      } else {
        this.login.get('pwd')?.reset();
        this.login.get('pwd')?.disable();
      }

    });

  }
}
