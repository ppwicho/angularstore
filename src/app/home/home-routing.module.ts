import { RouterModule, Routes } from '@angular/router';
import {NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    }
];

@NgModule({
    imports:[
        RouterModule.forChild(routes), 

    ],
    exports: [ // Para que otros modulos lo puedan utlizar 
        RouterModule 
    ]
})
export class HomeRoutingModule{  // Importarlo a Home.module

}
