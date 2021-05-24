# PlatziStore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.12.

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

```
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

```
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

```
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

```
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

```
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
 
``` 
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

```
import { Component, Input ,Output, EventEmitter} from '@angular/core'; 

...

    @Output() productClicked: EventEmitter<any> = new EventEmitter();

    addCart(){
        console.log('añadir al carrito');
        this.productClicked.emit(this.product.id)
    }

```

Y en el elemento padre en app.component.html lo rescatamos con (): 

```
<div *ngFor="let product of products">
  <app-product (productClicked)="clickProduct($event)" [product]="product"></app-product>
</div>
```

Creamos el metodo que lo lee en el componente padre app.component.ts que se llamará clickProduct(id:number) 

Angular nos da el método $event que arroja el resultado que viene del emiter desde product.component.ts 

```

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

``` 
constructor() { } 
ngOnChanges(){} // import OnChanges y sobre la class implements OnChnages{}

```

# Estilos CSS en Componentes de Angular 

Dentro de product.components.ts le indicamos el ARRAY de styleUrls para este componente 

```
@Component({
    selector:'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
}) 
```

Los estilos se aplican únicamente a lo que viva dentro de este HTML del componente. 

Los estilos globales se encuentran en styles.scss

# ng generate y ng lint 

## ng g

Nos permite ahorrar tiempo para generar los archivos de angular ts, css, html etc. 

`ng g c cart`

Nos genera scss,html, spec.ts y el ts. Además nos agrega a app.module.ts el componente. 

## ng lint 

Nos permite detectar errores y mejores prácticas en el proyecto, muy similar a lo que nos regresa un editor de código moderno, pero desde consola. 

`ng lint`










