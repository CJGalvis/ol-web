import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/modules/shared/services/global/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(private router: Router, private globalService: GlobalService) {}

  logout() {
    this.globalService.clear('auth');
    this.router.navigate(['/auth']);
  }
}
