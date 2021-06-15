import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './../../product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);

  cart$ = this.cart.asObservable(); 

  constructor() { }

  addCart(product:Product){
    this.products = [...this.products,product]; // no mutacion
    this.cart.next(this.products); // Notifica a los componentes subscritos inmediatamente 
  }
}
