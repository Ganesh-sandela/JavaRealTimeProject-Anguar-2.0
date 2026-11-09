import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../resuable/navbar/navbar';
import { CustomNavigateRoutes } from '../../customnavigateRoutes';
import { Sidebarfarmer } from '../sidebarfarmer/sidebarfarmer';
@Component({
  selector: 'app-farmer-layoutcompo',
  imports: [RouterOutlet,Navbar,Sidebarfarmer],
  templateUrl: './farmer-layoutcompo.html',
  styleUrl: './farmer-layoutcompo.css',
})
export class FarmerLayoutcompo  implements OnInit{


  links:any[]=[]
  
    ngOnInit(): void {
      let role=sessionStorage.getItem('role')
      if (role==='customer') {
        this.links = CustomNavigateRoutes.customerMenu
      }
    
}
}
