import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { SideMenu } from "../side-menu/side-menu";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usernavbar',
  imports: [RouterLink, RouterLinkActive, SideMenu, CommonModule],
  templateUrl: './usernavbar.html',
  styleUrl: './usernavbar.css',
})
export class Usernavbar {

  
  toggelbar:boolean=false
  openbar(){
   this.toggelbar=!this.toggelbar
  }

}
