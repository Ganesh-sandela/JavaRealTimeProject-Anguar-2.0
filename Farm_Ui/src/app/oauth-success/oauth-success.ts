import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-oauth-success',
  imports: [],
  templateUrl: './oauth-success.html',
  styleUrl: './oauth-success.css',
})
export class OauthSuccess implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {

    debugger;
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const role = params['role'].toLowerCase();
      const email = params['email'];
      const name = params['name']

      sessionStorage.setItem('name', name);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('role', role.toLowerCase());
      //  if (role=='admin') {
      //   this.router.navigate(['/admin'])
      //  } else  if(role=='customer') {
      //    this.router.navigate(['/customer'])
      //  }
      //  else{
      //   this.router.navigate(['/farmer'])
      //  }


      console.log("Role:", role);

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
          this.router.navigate(['/customer']);
          break;
        default:  this.router.navigate(['/login'])
      }
    })
  }
}
