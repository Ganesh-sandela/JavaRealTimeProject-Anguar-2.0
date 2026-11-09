import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-farmer-logout',
  imports: [],
  templateUrl: './farmer-logout.html',
  styleUrl: './farmer-logout.css',
})
export class FarmerLogout {


constructor(private route:Router){}

 Logout() {
  Swal.fire({
    title: 'Logout?',
    text: 'Are you sure you want to logout?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Logout',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      sessionStorage.clear();

      Swal.fire({
        title: 'Logged Out!',
        text: 'You have been logged out successfully.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
 sessionStorage.clear();
      this.route.navigateByUrl('/home');
    }
  });
}
  Cancel() {

    this.route.navigateByUrl('/farmer/farmerdashboard')
  }
}
