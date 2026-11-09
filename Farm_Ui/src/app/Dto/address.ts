export class AddressDto {
    city:string='';
    district:string='';
    state:string='';
    zipcode:string='';

    constructor(){
        this.city='';
        this.district='';
        this.state='';
        this.zipcode='';
    }

}

export interface AddressDto {
    name:string;
    phno:string;
  houseno: string;
  village: string;
  city: string;
  district: string;
  state: string;
  zipcode: string;
}

export interface Settingupdate{
    id:number
    name:string;
    phno:string;
    email:string;
//   houseno: string;
  village: string;
  city: string;
  district: string;
  state: string;
  zipcode: string;
}

export interface AddToCart{
    userId:number;
    productId:number;
    quantity:number

}

export interface CartItem {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  unit: string;
  selected: boolean;
}


export class Paymentcallback {
    constructor(
        private razorPayOrderId:string,
        private razorPayPaymentId:string,
        private razorpaySignature:string
    ){}
}