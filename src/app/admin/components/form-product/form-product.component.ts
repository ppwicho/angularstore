import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { finalize } from 'rxjs/operators'; 

import { ProductsService } from './../../../core/service/products/products.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { MyValidators } from './../../../utils/validators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form : FormGroup; 
  image$: Observable<any>;
  constructor(
    private FormBuilder : FormBuilder,
    private productService: ProductsService,
    private router : Router,
    private storage : AngularFireStorage,
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }

  saveProduct( event : Event ){
    event.preventDefault();
    if (this.form.valid){
      const product = this.form.value;
      this.productService.createProduct(product)
      .subscribe(newProduct => {
        console.log(newProduct);
        this.router.navigate(['./admin/products']);
      });
    }
    
  }
  uploadFile(event){
    const file = event.target.files[0];
    //console.log(file);
    const dir = 'images';
    const fileRef = this.storage.ref(dir);
    const task = this.storage.upload(dir,file);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe(url => {
          console.log(url);
          this.form.get('image').setValue(url);
        });
      })
    )
    .subscribe();

  }

  private buildForm(){
    this.form = this.FormBuilder.group({
      id:['',[Validators.required]],
      title:['',[Validators.required]],
      price:[0,[Validators.required, MyValidators.isPriceValid]],
      image:'',
      description: ['',[Validators.required]],
    });
  }
  // Getter y Setter 
  get priceField(){
    return this.form.get('price');
  }

}
