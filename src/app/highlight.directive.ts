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
