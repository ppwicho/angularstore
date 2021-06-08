import { NgModule } from '@angular/core';
import { RouterModule, Routes , PreloadAllModules } from '@angular/router';
import {ProductsComponent} from './products/products.component'
import {ContactComponent} from './contact/contact.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ProductDetailComponent} from './product-detail/product-detail.component'
import {LayoutComponent} from './layout/layout.component'
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
        component:ProductsComponent
      },
      {
        path:'products/:id',
        component: ProductDetailComponent
      },
      {
        path:'contact',
        canActivate: [AdminGuard],
        component: ContactComponent
      },
    ]
  },

  {
    path:'demo',
    loadChildren: () => import('./demo/demo.module').then(m=>m.DemoModule)
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
