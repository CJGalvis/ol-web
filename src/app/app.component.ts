import { Component } from '@angular/core';
import { GlobalService } from './modules/shared/services/global/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ol-web';

  constructor(private globalService: GlobalService) {}
  get loading$() {
    return this.globalService.loadingBehavior;
  }
}
