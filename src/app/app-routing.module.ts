import { NgModule } from '@angular/core';
import { RouterModule, Routes , PreloadAllModules } from '@angular/router';
import {ProductsComponent} from './products/products.component'
import {ContactComponent} from './contact/contact.component'
import { DemoComponent } from './demo/components/demo/demo.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ProductDetailComponent} from './product-detail/product-detail.component'
import {LayoutComponent} from './layout/layout.component'


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
        component: ContactComponent
      },
    ]
  },

  {
    path:'demo',
    component: DemoComponent
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
