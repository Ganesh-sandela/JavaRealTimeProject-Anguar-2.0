import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../resuable/navbar/navbar';
import { CustomNavigateRoutes } from '../../customnavigateRoutes';
import { Usernavbar } from "../usernavbar/usernavbar";
@Component({
  selector: 'app-user-layoutcompo',
  imports: [RouterOutlet, Navbar, Usernavbar],
  templateUrl: './user-layoutcompo.html',
  styleUrl: './user-layoutcompo.css',
})
export class UserLayoutcompo implements OnInit {

links:any[]=[];
isSidebarOpen:boolean= false;

  ngOnInit(): void {
    let role=sessionStorage.getItem('role')
    if (role==='customer') {
      this.links = CustomNavigateRoutes.customerMenu
    }
  
  }
}
