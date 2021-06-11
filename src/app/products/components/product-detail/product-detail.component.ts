import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params} from '@angular/router';

import {ProductsService} from '../../../core/service/products/products.service';

import {Product} from '../../../product.model'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product : Product;

  constructor(
    private route:ActivatedRoute,
    private productService:ProductsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) => {
      
      const id = params.id;
      console.log(id);
      this.fetchProduct(id);
      //this.product=this.productService.getProduct(id);

    });
  }

  fetchProduct(id: string){
    this.productService.getProduct(id)
    .subscribe(product => {
      console.log(product);
      this.product=product;
    });
  }

  createProduct(){
    const newProduct : Product = {
      id:'222',
      title: 'Camiseta 25',
      image: 'assets/images/camiseta.png',
      price: 3000,
      description: 'La mejor camiseta del mundo mundial'
    }
    this.productService.createProduct(newProduct)
    .subscribe(product => {
      console.log(product);
    });
  }
  updateProduct(){
    const newProduct : Partial<Product> = {
      price: 3000,
      description: 'La mejor camiseta del mundo mundial'
    }
    this.productService.updateProduct('2',newProduct)
    .subscribe(product => {
      console.log(product);
    });
  }
  deleteProduct(){
    this.productService.deleteProduct('222')
    .subscribe(rta => {
      console.log(rta);
    });
  }

}
