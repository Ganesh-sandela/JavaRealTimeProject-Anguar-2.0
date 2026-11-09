import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-errorpageload',
  imports: [],
  templateUrl: './errorpageload.html',
  styleUrl: './errorpageload.css',
})
export class Errorpageload {

 route=inject(Router);
  @Input() code: number = 500;
  
  goHome(){
this.route.navigateByUrl('/user/userhome')
  }

  reloadPage(){
window.location.reload();
  }
}
