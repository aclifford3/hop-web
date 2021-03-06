import { Component, OnInit } from '@angular/core';
import {LoadingController, Platform} from 'ionic-angular';
import {Router} from '@angular/router';
import {
  AuthenticationService, CognitoCallback, Credentials,
  LoginContext
} from '../core/authentication/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {I18nService} from '../core/i18n.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, CognitoCallback {

  version: string = environment.version;
  error: string;
  resetPasswordForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private platform: Platform,
              private loadingController: LoadingController,
              private i18nService: I18nService,
              private authenticationService: AuthenticationService) {
    this.createForm();
  }

  private createForm() {
    this.resetPasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  get isWeb(): boolean {
    return !this.platform.is('cordova');
  }

  ngOnInit() {
  }

  resetPassword() {
    const loading = this.loadingController.create();
    loading.present();
    this.authenticationService.newPassword(this.resetPasswordForm.value, this);
    loading.dismiss();
    this.resetPasswordForm.markAsPristine();
  }

  cognitoCallback(message: string, result: any, context: LoginContext, credentials: Credentials) {
    if (message != null) { // error
      this.error = message;
      console.log('error: ' + this.error);
      // if (this.error === 'User is not confirmed.') {
      //   console.log("redirecting");
      //   this.router.navigate(['/home/confirmRegistration', this.email]);
      // }
    } else { // success
      this.authenticationService.setCredentials(credentials, true);
      this.router.navigate(['/'], { replaceUrl: true });
    }
  }

}
