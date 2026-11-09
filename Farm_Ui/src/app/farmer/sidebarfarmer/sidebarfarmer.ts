import { Component, OnInit } from '@angular/core';
import { CustomNavigateRoutes } from '../../customnavigateRoutes';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebarfarmer',
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './sidebarfarmer.html',
  styleUrl: './sidebarfarmer.css',
})
export class Sidebarfarmer  implements OnInit{

  lists:any[]=[]
  
    ngOnInit(): void {
      let role=sessionStorage.getItem('role')
      if (role==='farmer') {
        this.lists = CustomNavigateRoutes.farmerMenu
        console.log(this.lists,"=============")
        console.log(sessionStorage.getItem('role'))
      }
    
}
}
