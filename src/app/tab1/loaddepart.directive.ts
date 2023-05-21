import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicChildDepart]'
})
export class DynamicChildDepartLoaderDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
