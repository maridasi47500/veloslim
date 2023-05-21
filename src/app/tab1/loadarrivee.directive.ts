import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicChildArrivee]'
})
export class DynamicChildArriveeLoaderDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
