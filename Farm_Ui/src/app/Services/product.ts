import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductRequestDTO } from '../Dto/product-request-dto';
import { AppConstant } from '../appconstant';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Product {

editproduct = new BehaviorSubject<any>(null);

constructor(private http: HttpClient){}

updateProduct(p:ProductRequestDTO){
this.editproduct.next(p)
}

postProducts(formData:any){
  return this.http.post(AppConstant.prodcutsUpload,formData);
}

getProducts(id:any){
  return this.http.get(AppConstant.getproducts+id);
}

updateingProduct(id:number,data:FormData){

 return this.http.put(
   `http://localhost:9090/updateProduct/${id}`,
   data
 );

}

getCtegoriesById(id:number){
  return this.http.get('http://localhost:9090/category/' + id)
}

AddToWishList(uid: number, pid: number) {
  return this.http.post(
    `http://localhost:9090/AddToWishList?userId=${uid}&productId=${pid}`,
    {}
  );
}

RemoveFromWishList(uid: number, pid: number) {
  return this.http.delete(
    `http://localhost:9090/RemoveFromWishList?userId=${uid}&productId=${pid}`
  );
}

GetWishlist(uid: number) {
  return this.http.get<{ data: any[] }>(
    `http://localhost:9090/GetWishlist?id=${uid}`
  );
}
}