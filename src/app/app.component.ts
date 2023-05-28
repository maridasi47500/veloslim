import { Component } from '@angular/core';
declare var ol: any;
import { CacheService } from "ionic-cache";
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storage: Storage,cache: CacheService) {
      
      cache.setDefaultTTL(60 * 60 * 10);
  }
  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }
}
