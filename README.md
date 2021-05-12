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

