import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { NavComponent } from './components/nav/nav.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

const routes: Routes = [

  {
    path:'',
    component:NavComponent,
    children:[
      {
        path: 'create',
        component:ProductFormComponent,
      },
      {
        path: 'inventario',
        component:InventarioComponent,
      },
      {
        path: 'dashboard',
        component:DashboardComponent,
      },
      {
        path: 'products',
        component:ProductsListComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
