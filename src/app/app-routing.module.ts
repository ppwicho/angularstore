import { NgModule } from '@angular/core';
import { RouterModule, Routes , PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LayoutComponent } from './layout/layout.component'
import { AdminGuard } from './admin.guard'


const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    children: [
      {
        path: '',
        redirectTo:'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m=>m.HomeModule) // Array Function
        // then resolvemos la promesa
      },
      {
        path:'products',
        //component:ProductsComponent
        loadChildren: () => import('./products/products.module').then(m=>m.ProductsModule)  
      },
      //{
      //  path:'products/:id',
      //  loadChildren: () => import('./products/products.module').then(m=>m.ProductsModule) 
      //},
      {
        path:'contact',
        loadChildren: () => import('./contact/contact.module').then(m=>m.ContactModule)  
      },
      {
        path:'order',
        loadChildren: () => import('./order/order.module').then(m=>m.OrderModule)  
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule)  
      },
    ]
  },
  {
    path:'demo',
    loadChildren: () => import('./demo/demo.module').then(m=>m.DemoModule)
  },
  {
    path:'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules, // Para redes 3G lentas
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
