import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsService} from './services/products/products.service'


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    ProductsService // Se puede ejecutar desde el app-module 
  ]
})
export class CoreModule { }
