export class LoginDto {
    constructor(
      
        private email:string,
        private oldPwd:string,
        private role:string
    ){}
}
