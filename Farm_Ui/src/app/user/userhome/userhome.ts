import { AfterViewChecked, AfterViewInit, Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-userhome',
  imports: [RouterLink],
  templateUrl: './userhome.html',
  styleUrl: './userhome.css',
})
export class Userhome implements AfterViewInit {

  @ViewChild('secscroll') scrollconatiner!:ElementRef;



scrollleft(){

  this.scrollconatiner.nativeElement.scrollBy({
   left:-1220,
   behavior:'smooth'
  })
  console.log('left')
}

scrollright(){

   this.scrollconatiner.nativeElement.scrollBy({
      left: 1220,
      behavior: 'smooth'
    });
  console.log('right')
}

ngAfterViewInit() {
  const container = this.scrollconatiner.nativeElement;

  setInterval(() => {

    if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
      container.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    } else {
      container.scrollBy({
        left: 1220,
        behavior: 'smooth'
      });
    }

  }, 3000);
}}
