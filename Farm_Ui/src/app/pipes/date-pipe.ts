import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  transform(value:any) : string {

     if (!value) {
      return '';
    }

    const {year, month, date} = value;

   let monthName = '';
    switch(month){
      case 1 :
       monthName= 'Jan'
       break;
      case 2:
        monthName= 'Feb'
        break;
      case 3:
        monthName= 'Mar'
        break;
      case 4:
        monthName= 'Apr'
        break;
      case 5:
        monthName= 'May'
        break;
      case 6:
        monthName= 'June'
        break;
      case 7:
        monthName= 'July'
        break;
      case 8:
        monthName= 'Aug'
        break;
      case 9:
        monthName= 'Sep'
        break;
      case 10:
        monthName= 'Oct'
        break;
      case 11:
        monthName= 'Nov'
        break;
      case 12:
        monthName= 'Dec'
        break;
      default:
        monthName= '';
    }

  

    return `${monthName} ${date}, ${year}`;;

  }
}
