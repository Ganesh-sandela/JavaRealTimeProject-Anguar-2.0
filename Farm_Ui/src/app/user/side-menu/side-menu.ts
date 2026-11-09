import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink,RouterModule],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.css',
})
export class SideMenu {
 items = [
  {
    icon: 'fa-solid fa-house',
    title: 'Home',
    route: 'userhome'
  },
  {
    icon: 'fa-solid fa-table-cells-large',
    title: 'Shop by Category',
    route: 'shopByCategory'
  },
  {
    icon: 'fa-solid fa-bag-shopping',
    title: 'My Orders',
    route: 'myorders'
  },
  {
    icon: 'fa-regular fa-heart',
    title: 'Wishlist',
    route: 'whishlist'
  },
  {
    icon: 'fa-regular fa-user',
    title: 'My Profile',
    route: 'myprofile'
  },
  {
    icon: 'fa-solid fa-location-dot',
    title: 'Addresses',
    route: 'addresses'
  },
  {
    icon: 'fa-regular fa-bell',
    title: 'Notifications',
    route: 'notifications'
  },
  {
    icon: 'fa-solid fa-headset',
    title: 'Help & Support',
    route: 'helpsuport'
  },
  {
    icon: 'fa-solid fa-right-from-bracket',
    title: 'Logout',
    route: 'logout'
  }
];

}
