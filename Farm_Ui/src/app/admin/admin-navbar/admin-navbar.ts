import { Component, OnInit } from '@angular/core';
import { IntialsPipe } from '../../pipes/intials-pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-navbar',
  imports: [IntialsPipe,CommonModule],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css',
})
export class AdminNavbar  implements OnInit{
  name:string=''
  role:string=''

  ngOnInit(): void {
  this.name=localStorage.getItem('name') || '';
  this.role=localStorage.getItem('role') || '';
  }
  
}
