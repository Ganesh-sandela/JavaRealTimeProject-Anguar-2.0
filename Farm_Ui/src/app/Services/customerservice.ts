import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDTO } from '../Dto/register-dto';
import { LoginDto } from '../Dto/logindto';
import { AppConstant } from '../appconstant';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddressDto, AddToCart, Paymentcallback, Settingupdate } from '../Dto/address';
import { PurchaseRequest } from '../Dto/PurchaseRequest';



@Injectable({
  providedIn: 'root',
})
export class CustomerService {


  private customerDetailsSubject = new BehaviorSubject<any>(null);
  customerDetails$ = this.customerDetailsSubject.asObservable();

  userId = new BehaviorSubject<number>(0);
  emailstore: any;
  addressStore = new BehaviorSubject<any[]>([]);
  productInfo = new BehaviorSubject<any[]>([]);

  
  setUserId(id: number) {
    this.userId.next(id);
  }
  constructor(private http: HttpClient) { }


  register(register: RegisterDTO, addr: AddressDto) {
    const data = {
      user: register,
      address: addr
    }
    return this.http.post(AppConstant.register, data);
  }

  login(login: LoginDto) {
    return this.http.post(AppConstant.login, login);
  }

  getUser(email: any) {
    return this.http.get(AppConstant.getuser, email);
  }

  getAllDetails(email: any) {
    return this.http.post(AppConstant.getallDetails, { email: email });
  }


  setCustomerDetails(data: any) {
    this.customerDetailsSubject.next(data);
  }

  getCustomerDetails() {
    return this.customerDetailsSubject.value;
  }

  getAddrUsr(id: any) {
    return this.http.get<any>(`${AppConstant.getAddrUsr}?userid=${id}`)
  }
  updateSetting(userid: any, payload: Settingupdate) {
    return this.http.patch<any>(
      `${AppConstant.updatesetting}?userid=${userid}`,
      payload
    );
  }


  AddToCart(item: AddToCart) {
    return this.http.post(AppConstant.addToCart, item);
  }

  GetCartData(id: number) {
    return this.http.get<any>(`${AppConstant.GetCartData}?userId=${id}`);
  }

  RemoveCartItem(userId: number, productid: number) {
    return this.http.delete(`${AppConstant.RemoveCartItem}?userId=${userId}&productid=${productid}`)
  }

  UpdateQuantity(userid: number, cartid: number, quantity: number) {
    return this.http.get(`${AppConstant.updatequantity}?userId=${userid}&cartId=${cartid}&quantity=${quantity}`);
  }

   createOrder(request: PurchaseRequest): Observable<any> {
    return this.http.post<any>(AppConstant.CreateOrder, request);
  }

  confirmOrder(Paymentcallback: Paymentcallback): Observable<any> {
    return this.http.put(AppConstant.CreateOrder, Paymentcallback);
  }
}
