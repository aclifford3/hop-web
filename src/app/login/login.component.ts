import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, Platform } from 'ionic-angular';

import { environment } from '../../environments/environment';
import { I18nService } from '../core/i18n.service';
import {
  AuthenticationService, CognitoCallback, Credentials,
  LoginContext
} from '../core/authentication/authentication.service';
import {CognitoUserSession} from 'amazon-cognito-identity-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, CognitoCallback {

  version: string = environment.version;
  error: string;
  loginForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private platform: Platform,
              private loadingController: LoadingController,
              private i18nService: I18nService,
              private authenticationService: AuthenticationService) {
    this.createForm();
  }

  ngOnInit() { }

  login() {
    const loading = this.loadingController.create();
    loading.present();
    this.loginForm.markAsPristine();
    this.authenticationService.login(this.loginForm.value, this);
    loading.dismiss();
      // .pipe(finalize(() => {
      //    this.loginForm.markAsPristine();
      //    loading.dismiss();
      // }));
      // .subscribe(credentials => {
      //   log.debug(`${credentials.username} successfully logged in`);
      //   this.router.navigate(['/'], { replaceUrl: true });
      // }, error => {
      //   log.debug(`Login error: ${error}`);
      //   this.error = error;
      // });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get isWeb(): boolean {
    return !this.platform.is('cordova');
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

  cognitoCallback(message: string, result: CognitoUserSession, context?: LoginContext, credentials?: Credentials) {
    if (message != null) { // error
      this.error = message;
      console.log('error: ' + this.error);
      // if (this.error === 'User is not confirmed.') {
      //   console.log("redirecting");
      //   this.router.navigate(['/home/confirmRegistration', this.email]);
      // }
      if (this.error === 'A new password is required.' || this.error === 'Password reset required for the user') {
        this.authenticationService.setCredentials(credentials, context.remember);
        this.router.navigate(['/reset-password']);
      }
    } else {// success
      console.log('Successfully logged in.');
      this.authenticationService.setCredentials(credentials, context.remember);
      this.router.navigate(['/'], { replaceUrl: true });
    }
  }
}

