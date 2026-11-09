import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Adminsidebar } from "../adminsidebar/adminsidebar";
import { Navbar } from '../../resuable/navbar/navbar';
@Component({
  selector: 'app-admin-layoutcompo',
  imports: [Navbar, RouterOutlet, Adminsidebar],
  templateUrl: './admin-layoutcompo.html',
  styleUrl: './admin-layoutcompo.css',
})
export class AdminLayoutcompo {}
