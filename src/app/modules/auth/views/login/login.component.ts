import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/modules/shared/services/global/global.service';
import { AuthService } from '../../services/auth/auth.service';
import { LoginResponse } from '../../models/LoginResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public jsonConfig: any;
  public checked: boolean = false;
  public formLogin = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private globalService: GlobalService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.getJsonConfig();
  }

  /**
   * Método para consumir el archivo json con los textos de la experiencia
   */
  getJsonConfig() {
    this.globalService.loadingBehavior.next(true);
    this.globalService.clear('auth');
    this.subscriptions.add(
      this.globalService.getConfigurationJson().subscribe((value: any) => {
        this.jsonConfig = value;
        this.globalService.loadingBehavior.next(false);
      })
    );
  }

  /**
   * Método que permite consumir el servicio de Login
   */
  async submitlogin() {
    try {
      this.globalService.loadingBehavior.next(true);
      const { user, password } = this.formLogin.value;
      this.subscriptions.add(
        this.authService.login(user!, password!).subscribe((value: any) => {
          const data = value as Array<LoginResponse>;
          if (data.length > 0) {
            this.globalService.setDataStorage('auth', data[0]);
            this.router.navigate(['/home']);
          } else {
            this.showMessage(this.jsonConfig.msgLoginFailed);
          }
          this.globalService.loadingBehavior.next(false);
        })
      );
    } catch (error) {
      this.showMessage(this.jsonConfig.msgServiceFailed);
      this.globalService.loadingBehavior.next(false);
    }
  }

  /**
   * Método para centralizar la visualización del snackbar
   * @param message Mensaje a mostrar en el snackbar
   */
  showMessage(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }
}
