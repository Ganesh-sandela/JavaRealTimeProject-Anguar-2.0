export class Coustomer {
    constructor(
        private name:string,
        private email:string,
        private phno:Number| null
    ){}
}


export class Order {
    constructor(
       private totalPrice:number,
        private totalQuantity:number
    ){}
}

export class Address {
    constructor(
        private id:number,
        private houseno:number,
        private city:string,
        private state:string,
        private zipcode:number
    ){}
}

export class OrderItems {
    constructor(
    private id:number,
    private name:string,
    private imageUrl:String,
    private quantity:number,
    private unitPrice:number,

    ){}
}

export class address {
    constructor(
        private id:number,
        private houseno:number,
        private city:string,
        private state:string,
        private zipcode:number
    ){}
}



