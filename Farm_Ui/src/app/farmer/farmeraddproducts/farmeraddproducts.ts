import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductRequestDTO } from '../../Dto/product-request-dto';
import { Product } from '../../Services/product';
import { finalize } from 'rxjs';
import { CustomerService } from '../../Services/customerservice';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-farmeraddproducts',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './farmeraddproducts.html',
  styleUrl: './farmeraddproducts.css',
})
export class Farmeraddproducts implements OnInit {

  items!: FormGroup;
  selectdfiles: File[] = [];
  previewfiles: string[] = [];
  isSubmitting: boolean = false
  userId: number = 0;
  isEditMode: boolean = false
  productId: number = 0
  constructor(private fb: FormBuilder,
    private productService: Product,
    private customerserice: CustomerService,
    private http: HttpClient
  ) { }

  selectedfile(event: any) {
    let files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      this.selectdfiles.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.previewfiles.push(reader.result as string);
      }
      reader.readAsDataURL(file);
      event.target.value = ''

    }
  }

  ngOnInit(): void {
    this.items = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      unit: ['', Validators.required],
      stock: ['', Validators.required],
      description: [''],
      harvestDate: [''],
      organic: [''],
      status: ['Available'],
      location: ['']
    });

    // let userId=sessionStorage.getItem('id');
    //  console.log(userId)
   this.customerserice.userId.subscribe((res) => {
  this.userId = res ? res : Number(sessionStorage.getItem('id'));
});


    this.productService.editproduct.subscribe((res: any) => {

      if (!res) return;

      this.isEditMode = true;
      this.productId = res.id;

      this.items.patchValue({
        name: res.name,
        category: res.categoryId.toString(),
        price: res.unitPrice,
        unit: res.unit,
        stock: res.unitsInStock,
        description: res.description,
        harvestDate: res.harvestDate
          ? new Date(res.harvestDate).toISOString().split('T')[0] : '',
        organic: res.organic,
        status: res.active ? 'Available' : 'Unavailable',
        location: res.location
      });

      // Show existing image preview
      if (res.image) {
        this.previewfiles = ['data:image/jpeg;base64,' + res.image];
      }

    });

  }

  removeImage(i: any) {
    this.previewfiles.splice(i, 1);
    this.selectdfiles.splice(i, 1);
  }


  onSubmit() {

    let name = this.items.get('name')?.value;
    let description = this.items.get('description')?.value;
    let categoryId = Number(this.items.get('category')?.value);
    let Price = Number(this.items.get('price')?.value);
    let unit = this.items.get('unit')?.value;
    let stock = Number(this.items.get('stock')?.value);
    let harvestDate = this.items.get('harvestDate')?.value ? new Date(this.items.get('harvestDate')?.value) : null;
    let organic = this.items.get('organic')?.value === 'true';
    let status = this.items.get('status')?.value === 'Available';
    let location = this.items.get('location')?.value;
    let images = this.selectdfiles.length > 0 ? this.selectdfiles[0] : null;

    //  let userId=sessionStorage.getItem('id');

    this.isSubmitting = true;
    let product: any = new ProductRequestDTO(
      name,
      description,
      categoryId,
      Price,
      unit,
      stock,
      harvestDate,
      organic,
      status,
      location,
      images, this.userId);

    const formData = new FormData();

    formData.append('name', product.name);
    formData.append('description', product.description ?? '');
    formData.append('categoryId', product.categoryId.toString());
    formData.append('unitPrice', product.unitPrice.toString());
    formData.append('unit', product.unit);
    formData.append('unitsInStock', product.unitsInStock.toString());
    formData.append('harvestDate', product.harvestDate ? product.harvestDate.toISOString().split('T')[0] : '');
    formData.append('organic', product.organic.toString());
    formData.append('active', product.active.toString());
    formData.append('location', product.location ?? '');
    formData.append('userId', product.userId.toString());

    if (product.image) {
      formData.append('image', product.image);
    }
    let apiCall;
    if (this.isEditMode) {
      apiCall = this.productService.updateingProduct(
        this.productId,
        formData
      );
    }
    else {
      apiCall = this.productService.postProducts(
        formData
      );
    }
    apiCall
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.selectdfiles = [];
          this.previewfiles = [];

          this.items.reset({
            name: '',
            category: '',
            price: '',
            unit: '',
            stock: '',
            description: '',
            harvestDate: '',
            organic: '',
            status: 'Available',
            location: ''
          });
          alert(
            this.isEditMode ?
              "Product Updated Successfully" :
              "Product Added Successfully"
          );
          this.isEditMode = false;
          this.productId = 0;
        },
        error: (err) => {
          console.log(err);
        }
      });


    //   console.log(this.items.value);
    //   this.productService.postProducts(this.formData).pipe(
    //     finalize(() => {
    //       this.isSubmitting = false
    //     }))
    //     .subscribe({
    //       next: (res) => {
    //         console.log(res,'+++++++++++++++++++++++');
    //         alert('submitted succesfully....')
    //         this.isSubmitting = false



    //         this.selectdfiles=[];
    //         this.previewfiles=[];

    //         this.items.reset({
    //           name: '',
    //           category: '',
    //           price: '',
    //           unit: '',
    //           stock: '',
    //           description: '',
    //           harvestDate: '',
    //           organic: '',
    //           status: 'Available',
    //           location: ''
    //         });

    //       },
    //       error: (err: any) => {
    //         if(err.status==200){
    //            alert('failed to save products...');
    //         }
    //         else if(err.status==500){
    //           alert('internal server error..');
    //         }
    //         console.log(err);

    //       }
    //     })
    // }

    // updatingProduct(){

    //  this.productService.updateingProduct(
    //       this.productId,
    //       this.formData
    //  )
    //  .subscribe({
    //    next:(res)=>{
    //      console.log(res);
    //      alert("Updated Successfully");
    //    },
    //    error:(err)=>{
    //      console.log(err);
    //    }

    //  });

  }

}
