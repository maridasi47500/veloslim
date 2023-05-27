import { PageNumberService } from './../../../services/PageNumberService';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve<any> {

  constructor(private dataService: PageNumberService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.paramMap.get('id');
    this.dataService.setpagenb(id);
    return this.dataService.getpagenb();
  }
}
