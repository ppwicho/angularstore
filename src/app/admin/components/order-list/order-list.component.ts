import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../../core/service/products/products.service';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orders = [];
  //displayedColumns: string[] = ['id', 'prouct', 'productid', 'price', 'actions'];
  displayedColumns: string[] = ['id', 'title', 'price', 'actions'];
  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.listOrders();
  }

  listOrders(){
    this.productService.getAllProducts()
    .subscribe(orders => {
      this.orders = orders;
    });
  }

}
