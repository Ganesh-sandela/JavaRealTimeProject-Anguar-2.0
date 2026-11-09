import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Userserv {
  whitelist=new BehaviorSubject<any[]>([]);
  
}
