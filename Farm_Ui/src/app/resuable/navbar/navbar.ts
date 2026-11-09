import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IntialsPipe } from '../../pipes/intials-pipe';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,IntialsPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  name = ''
  role = ''
  content=''
  constructor(private route:Router){}
  search(event:Event){
    let value=event.target as HTMLInputElement;
  this.route.navigate(['/farmer'],{
    queryParams:{search:value}
  })

  }

  ngOnInit(): void {
    this.name = sessionStorage.getItem('name') || '';
   this.role = sessionStorage.getItem('role') || '';

   let role=sessionStorage.getItem('role');
   if (role==='farmer') {
    this.content="Here's whats happening with your farm bussiness today."
   }
   else if(role==='admin'){
    this.content="Here's what's happening across your platform today."
   }
   else{
    this.content="Explore fresh products, track your orders, and enjoy shopping today."
   }
  }
}
