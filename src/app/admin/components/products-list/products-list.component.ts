import { Component, OnInit } from '@angular/core';

import { ProductsService } from './../../../core/service/products/products.service'
import { Product } from './../../../product.model'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products = [];
  displayedColumns: string[] = ['id', 'title', 'price', 'actions'];
  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
  }


  fetchProducts(){
    this.productService.getAllProducts()
    .subscribe(products => {
      this.products = products;
    });
  }
  deleteProduct(id:string){
    this.productService.deleteProduct(id)
    .subscribe(rta => {
      console.log(rta);
      this.fetchProducts();
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
    .subscribe(rta => {
      console.log(rta);
    });
  }
}
