# PlatziStore

Este proyecto es parte de un curso de Angular, utilizo el Readme como mis notas del curso y las comparto publicamente en Github. 


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Angular.json 

Contiene las configuraciones de construcción y configuración. 

Para compilar las dependencias corremos: 

`npm install --save-dev @angular-devkit/build-angular`

## src (Source)

Es donde tenemos la aplicación, los CSS, etc.  Es donde desarrollamos. 

## Comandos de CLI Angular 

https://angular.io/cli/serve 

### ng --version 

Entorno que tenemos actualmente instalado y paquetes en resumen de package.json: 

ng --version 

### ng serve 

Entorno de desarrollo 

--port 4600 

### ng build 

Entorno para subir a desarrollo 

ng build --prod 

El resultado es una carpeta /dist donde tendremos todos los assets productivo. 

## String interpolation 

El archivo app.component.html podemos borrar el contenido

{{'Hola Mundo' }} 
{{ 1 + 2 }}

Este archivo esta vinculado con el archivo TypeScript app.component.ts como el Titulo y Estilos CSS. 

Podemos invocar via los String Interpolation nuestras variables del componente .

{{title}}

Esto se conoce como "Enlace de Datos". 

## app.components.ts 

Nos permite importar modulos de angular a nuestra aplicación 

`import { FormsModule } from '@angular/forms';`

Dentro de Modules: 

`FormsModule`

Dentro de nuestro HTML podemos invocar al modulo 

`<input type="text" [(ngModel)]="title">` 

Ahora tenemos un enlace de datos sobre el template en el variable del componente en un formulario. 

## ngIf Condicionales dentro de los templates 

`<div *ngIf="condition"> Contenido si es true </div>` 

* notar el \* seguida de la condición * 

`<div *ngIf="title === 'ppwicho'"> Este es un div </div>`

## ngFor  of 

Iterar elementos de un array [] en un template 

En nuestro componente TypeScript definimos en nuestra clase AppComponent el array [] 

`items = ['🍎', '🍏', '🍇', '🍌', '🍑']` 

En nuestro HTML iteramos con \*ngFor 

```HTML
<ul>
  <li *ngFor="let name of items">
    {{name}}
  </li>
</ul>
```
Para gregar una acción en nuestro HTML utilizamos () 

Las acciones son diversas y llaman funciones

`(click) = addItem() `

En nuestro TS Components agregamos la función addItem() con `this.items.push` 


Para recorrer objetos con ngFor, notar que para cambiar un atributo del HTML con Angular lo envolvemos con llaves []: 

```HTML
<div *ngFor="let product of products">
  {{product.title}}
  <img [src]="product.image" alt=""> 
</div>

```

## Para "tipear" 

Creamos una libreria con nombre product.models.ts dentro de src/app. 

Para poder utilizar el molde utilizamos la palabra clave "export"

`export interface Product{}`

## ngswitch 

Podemos anidar varios ngIf 

```HTML
<div [ngSwitch]="title">
  <p *ngSwitchDefault> No hay match</p>
  <p *ngSwitchCase="'tray'">este es {{title}}</p>
  <p *ngSwitchCase="'ppwicho'">este es {{title}}</p>
  <p *ngSwitchCase="'gaby'">este es {{title}}</p>
</div>

```

# Componentes y Decoradores 

Los usamos para abstraer la aplicación. 

### Definir componente 

```TypeScript
//Necesitamos los decoradores para darle un contexto para saber que tipo de rol va a cumplir 
// Los decoradores vienen del core de @angular

import { Component } from '@angular/core'; 

// Los decoradores se utilizan antes de la clase con @Component
// Los componentes tienen metadata 

@Component({
    selector:'app-product', 
    templateUrl: './product.component.html' // referencia al HTML
}) 
export class ProductComponent{

}

```

Creamos el archivo HTML 

#### En el MODULO app.module.ts 

Importamos el componente `import {ProductComponent} from './components/product.component';` 

Y necesitamos declararlo dentro de las declarations: 

```TypeScript
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent 
  ],

```

Ahora podemos usar `<app-component></app-component>` como un tag de HTML dentro de app.component.html 

# Input y Outputs

Nos ayudan a abstraer la aplicación y enviar datos desde nuestros componentes hijos hacia nuestros componentes padres. 

## Property binding (enviamos datos) y Event Binding (Recibibos datos)

En nuestro Componente Producto: 

### Input

En app.component.ts  importamos del Angular/core input 

`import { Component, Input} from '@angular/core'; `

Ahora nuestro app.component.html procesa la iteración sobre un componente 
 
``` HTML
<div *ngFor="let product of products">
  <app-product [product]="product"></app-product>
</div> 

``` 

utilizando el @Input de product.componnet.ts 

`@Input() product:Product;`



### Output

Es la manera de comunicar eventos a nuestros componentes, vamos a colar un botón a cada uno de los productos de agregar al carrito. 

El metodo será addCart() en  product.componnet.ts

El product.componnent.html 

` <button (click)="addCart()">Agregar al carrito</button>`.

Si quisieramos saber desde el app.component que le dieron click importamos Output y EventEmitter 

```TypeScript
import { Component, Input ,Output, EventEmitter} from '@angular/core'; 

...

    @Output() productClicked: EventEmitter<any> = new EventEmitter();

    addCart(){
        console.log('añadir al carrito');
        this.productClicked.emit(this.product.id)
    }

```

Y en el elemento padre en app.component.html lo rescatamos con (): 

```HTML
<div *ngFor="let product of products">
  <app-product (productClicked)="clickProduct($event)" [product]="product"></app-product>
</div>
```

Creamos el metodo que lo lee en el componente padre app.component.ts que se llamará clickProduct(id:number) 

Angular nos da el método $event que arroja el resultado que viene del emiter desde product.component.ts 

```TypeScript

    addCart(){
        console.log('añadir al carrito');
        this.productClicked.emit(this.product.id)
    }

```

## Ciclo de vida de los componentes 

El orden de ejecución es: 

- constructor : Crearmos constructor y ponemos en interfaz.
- ngOnChanges : Detecta el cambio cada que tenemos un input, cada que cambiamos la data podemos ver el estado anterior y el estado nuevo. 
- ngOnInit :  Solo se ejecuta una vez cuando esta listo en interfaz gráfica (Buena idea llamar aquí a un API)
- ngDoCheck : Detecta cuando los componentes hijos están listos en interfaz. 
-- ngAfterContentinit
-- ngAfterContentChecked
-- ngAfterViewInit
-- ngAfterViewChecked 
- ngOnDestroy : Cuando quitamos el elemento de interfaz. 

Los constructores están definidos en: 

``` TypeScript
constructor() { } 
ngOnChanges(){} // import OnChanges y sobre la class implements OnChnages{}

```

# Estilos CSS en Componentes de Angular 

Dentro de product.components.ts le indicamos el ARRAY de styleUrls para este componente 

```TypeScript
@Component({
    selector:'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
}) 
```

Los estilos se aplican únicamente a lo que viva dentro de este HTML del componente. 

Los estilos globales se encuentran en styles.scss

Curso de CSS Grid: https://platzi.com/clases/css-grid-layout/

# ng generate y ng lint 

## ng g

Nos permite ahorrar tiempo para generar los archivos de angular ts, css, html etc. 

`ng g c cart`

Nos genera scss,html, spec.ts y el ts. Además nos agrega a app.module.ts el componente. 

## ng lint 

Nos permite detectar errores y mejores prácticas en el proyecto, muy similar a lo que nos regresa un editor de código moderno, pero desde consola. 

`ng lint`


# Pipes y Directivas en Angular 

Los usamos para ingresar datos y mostrarlos en pantalla con cierto formato. Los pipes de angular por defecto los encontramos en su documentación. 

` <h3>{{ product.title | uppercase }}</h3>`

## Creando un pipe propio 

Se puede generar con el comando ng: 

`ng g p exponential`

Dentro de exponential.pipe.ts  veremos que el decorador ahora es @Pipe con nombre exponential. 

El metodo por defecto será transform que recibe un valor de entrada y retorna una salida.  


``` TypeScript

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exponential'
})
export class ExponentialPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

} 

```


Creamos las variables en el TS componente y podemos usar el pipe ahora en el componente HTML. 

## Directivas 

Son un artefacto que nos sirven para modificar el DOM de un componente en especifico. 

`ng g d highlight`

Nos crea directive.specs.ts (pruebas) y directive.ts en el APP.module. 

Ahora en la directiva de highlight podemos modificar el DOM 

```TypeScript
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(
    element:ElementRef // Inyector de dependencias 
  ) {
    element.nativeElement.style.backgroundColor='red';
   }

}
```

En el HTML del producto podemos llamar a esta directiva 

`<h3 appHighlight>{{ product.title | uppercase }}</h3>`


No es buena práctica manipular el DOM para eso tenemos el Data Binding de Angular. No obstante es útil para modificar el DOM dinámicamente en casos como autocompletado o marcar errores. 


# Módulos y Rutas 

Nos permite abstraer la aplicación y no utilizar app.module para todo. 

Los módulos core y share son de Angular, utilizan los principios de abstacción. 

- Core:   Componentes singleton (login etc). 
- Share:  Podemos tener componentes compartidos 

## Módulos


## Rutas 

Nos sirven para mostrar por diferentes URI el contenido. 

El módulo `app.routing.module` contiene las rutas. 

Creamos componentes para las rutas del app: 

```bash
ng g c contact
ng g c product
ng g c home
```

```TypeScript @/app-routing.module.ts
import {HomeComponent} from './home/home.component'
import {ProductsComponent} from './products/products.component'
import {ContactComponent} from './contact/contact.component'
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'products',
    component:ProductsComponent
  },
  {
    path:'contact',
    component: ContactComponent
  },

];
```

Para que se rendericen las rutas: 

En `app.component.html` tenemos que cargar el componente con `<router-outlet/>`

Ahora ya podemos vistar las rutas http://localhost:4200/home


Como ya hemos limpiado app.component.html podemos en lugar de templateUrl usar template y unicamente router-outlet.

```TypeScript 
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
```

# Librerias 

Agregamos a nuestro proyecto el componente banner, utilizaremos swiper como libreria 

` npm install swiper --save `

## Librerias funcional 



## Libreria con estilos 

La librería cuenta con su CSS en  `node-modules/swiper/dist/css/swiper.min.css`  

En angular.json de nuestro poryecto agregamos al array la ruta del css. 

Se deben agregar los componentes y referencias al app.module.ts 
# routerLink y routerLinkActive
## routerLink

En lugar de ocupar `href` en HTML angular nos brinda el comando `routerLink` para no hacer refresh de la página en cada click. 

```HTML
<nav>
    <a routerLink="/products">products</a>
    <a routerLink="/contact">contact</a>
</nav>
```

## routerLinkActive

Nos agrega el estilo indicado cuando la página que hace referencia esta activa. 

```HTML
<nav>
    <a routerLink="/home" routerLinkActive="active">Home</a>
    <a routerLink="/products" routerLinkActive="active">Products</a>
    <a routerLink="/contact" routerLinkActive="active">Contact</a>
</nav> 
```
### 404 Not Found 

```TypeScript 
  {
    path:'**', // ** 
    component:PageNotFoundComponent
  }
```

## Servicios 

Los servicios proveen datos esencialmente. La forma de crear un servicio es en la terminal con los comandos `ng g s products`
.
Por lo general tenemos 2 métodos esenciales en los servicios, uno para obtener todos los objetos guardados en una variable, y otro para obtener 1 objeto especifico.

El decorador de los Servicios es `@Injectable` 


```TypeScript 
export class someService {

  store = [
    {
      id: '1',
      title: 'title',
      price: 10,
    },
    {
      id: '2',
      title: 'title',
      price: 20,
    }
  ];

  constructor() { }

  getAllStored() {
    return this.store;
  }

  getStored(id: string) {
    return this.store.find(item => id === item.id);
  }
}
```

- El método getAllStored() devuelve todos los objetos almacenados en la variable.

- El método getStored() devuelve 1 objeto especifico almacenado en la variable, en este caso se utiliza la variable id para buscar este objeto.

### Componente para objetos

A veces es necesario crear componentes para desplegar la información de un solo objeto que provee un servicio. Para eso creamos un componente en la terminal con el comando `ng g c nombreComponente`

Luego de esto debemos asignarle una ruta en el archivo de routing, pero en esta ocasión tendrá un parámetro dinámico que se enviará.

```TypeScript 
const routes: Routes = [
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'product',
      component: ProductComponent
    }
    {
      path: 'product/:id',
      component: ProductDetailComponent
    }

];
```

En el componente creado debemos realizar 2 importaciones de dependencias, estos son ‘ActivatedRoute’ y ‘Params’ de ‘@angular/router’. Nota: no olvidar que las inyecciones de dependencia deben ingresarse como parámetro en el constructor.

```TypeScript 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {};

}
```
Desde el ngOnInit() es la forma adecuada de recibir el parámetro definido anteriormente en la ruta, y se suscribe a el por si existen cambios, esto para ejecutar los cambios en la pagina por si cambia la ruta. La variable definida en la suscripción es de tipo Params que fue importado anteriormente.

```TypeScript 
ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      console.log(id);
    });
  }
```

En el método anterior capturamos el valor de id en params. Es importante aclarar que params es un json.

Ahora para consultar los objetos de un servicio debemos importar el servicio en sí. Con ello tendremos acceso a sus datos y métodos. Los servicios son inyecciones de dependencia, por lo que hay que ingresarlos en el constructor.

```TypeScript 
import { ProductsService } from './../products.service';
```

```TypeScript 
constructor(
        private route: ActivatedRoute,
        private productsService: ProductsService
) { }
```
El servicio importado en este caso tiene un método que devuelve un objeto especifico en formato json que se busca a través de su id, por ello se solicita una variable de entrada que se utiliza para buscar dicho objeto. En el siguiente caso se guarda el objeto en una variable y se imprime por consola.

```TypeScript 
ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      const product = this.productsService.getProduct(id);
      console.log(product);
    });
  }
```

# Vistas añidadas (Branch 26-vistas-anidadas)

Podemos reutilizar el código con vistas añidadas. En cada componente en su template vemos que todos utilizan header y footer. 

`ng g c layout`

Dentro del layout.component.html cargamos el `<router-outlet></router-outlet>` entre header y footer. 

En el archivo routing se incorpora el componente creado anteriormente en la variable de routes, pero esta vez todos los componentes que se basen en este deberán estar anidadas. Para anidarlos el objeto del componente creado tendrá que tener una nueva característica ‘children’, el cual tendrá los ‘path’ y ‘component’ de las rutas que se basen en la anterior.

```TypeScript 
const routes: Routes = [
    {
      path: '',
      component: LayoutComponent,
      children: [
        {
          path: '',
          redirectTo: '/home',
          pathMatch: 'full',
        },
        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'products',
          component: ProductsComponent
        },
        {
          path: 'products/:id',
          component: ProductDetailComponent
        },
        {
          path: 'contact',
          component: ContactComponent
        },
      ]
    },
    {
      path: 'demo',
      component: DemoComponent
    },
    {
      path: '**',
      component: PageNotFoundComponent
    }
  ];
  ``` 

  ## Lazy Loading 
  ### branch 22-lazy-loading

  Nos ayuda a reducir el peso de las aplicaciones para que carguen más rápido. 

  Los archivos JavaScript pasan por los siguientes pasos en el navegador: 

  - Download 
  - Parse
  - Compile 
  - Execute 

  Para lo que tenemos que darle modularidad a la aplicación. 

  Básicamente un módulo podemos compararlo con un `app-module`  y un `app-routing`

### PreloadStrategy  (Slow 3G Networks)

Cuando queremos que la aplicación pre cargue los componentes no necesarios de la aplicación modular cuando este listo el navegador, podemos usar una estratégia en `app-routing.module.ts`

```TypeScript
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
```

```TypeScript
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules, // Para redes 3G lentas
  })],
  exports: [RouterModule]
})
```

## Shared Module 

Existen elementos compartidos, como el header y footer. 

Para crear un módulo podemos hacerlo con el comando rápido:

`ng g m shared`
