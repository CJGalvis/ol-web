import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/modules/shared/services/global/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriptios: Subscription = new Subscription();
  public jsonConfig: any;
  public checked: boolean = false;
  public formLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private globalService: GlobalService) {}

  ngOnDestroy(): void {
    this.subscriptios.unsubscribe();
  }

  ngOnInit(): void {
    this.getJsonConfig();
  }

  getJsonConfig() {
    this.globalService.loadingBehavior.next(true);
    this.subscriptios.add(
      this.globalService.getConfigurationJson().subscribe((value: any) => {
        this.jsonConfig = value;
        this.globalService.loadingBehavior.next(false);
      })
    );
  }

  submitlogin() {
    console.log(this.formLogin.value);
  }
}
