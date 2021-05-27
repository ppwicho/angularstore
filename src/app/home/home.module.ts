import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //Para quitar error de ngFor

import { BannerComponent } from './components/banner/banner.component';
import {HomeComponent} from './components/home/home.component'
import {HomeRoutingModule} from './home-routing.module'

@NgModule({
    declarations:[
        BannerComponent,
        HomeComponent,
    
    ],
    imports:[
        CommonModule, // Los modulos a su vez necesitan saber que importar del core de Angular
        HomeRoutingModule, // Todo modulo como tiene routing debe importar su sistema de routing
    ]
})
export class HomeModule{

}