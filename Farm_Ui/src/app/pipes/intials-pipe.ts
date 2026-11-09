import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intials',
  standalone:true
})
export class IntialsPipe implements PipeTransform {
  transform(name: string, ...args: unknown[]): unknown {
 
    if (!name) {
      return ''
    }
      var words = name.trim().split(' ');
      if (words.length===1) {

        return words[0][0].toUpperCase();
      } else {
        return words[0][0] + words[words.length-1][0].toUpperCase();
      }
    return null;
  }
}
