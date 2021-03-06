import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as AWS from 'aws-sdk/global';
import {
  CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserSession,
  CognitoRefreshToken
} from 'amazon-cognito-identity-js';

export interface Credentials {
  // Customize received credentials here
  username: string;
  idToken?: string;
  refreshToken?: string;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

export interface NewPasswordUser {
  oldPassword: string;
  newPassword: string;
}

export interface CognitoCallback {
  cognitoCallback(message: string, result: any, context: LoginContext, credentials: Credentials): void;
}

const jwtDecode = require('jwt-decode');

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {

  private _credentials: Credentials | null;
  constructor() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
      // If the refresh token is set, refresh user session and tokens
      if (this._credentials.refreshToken) {
        this.refresh();
      }
    }
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(context: LoginContext, callback: CognitoCallback) {
    // Replace by proper authentication call
    this.authenticate(context, callback);
  }

  newPassword(newPasswordUser: NewPasswordUser, callback: CognitoCallback): void {
    // Get these details and call
    // cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
    const authenticationData = {
      Username: this._credentials.username,
      Password: newPasswordUser.oldPassword,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser = this.getCognitoUser(this._credentials.username);
    cognitoUser.authenticateUser(authenticationDetails, {
      newPasswordRequired: function (userAttributes: any, requiredAttributes: any) {
        // User was signed up by an admin and must provide new
        // password and required attributes, if any, to complete
        // authentication.

        // the api doesn't accept this field back
        // delete userAttributes.email_verified;
        cognitoUser.completeNewPasswordChallenge(newPasswordUser.newPassword, requiredAttributes, {
          onSuccess: function (userSession: CognitoUserSession) {
            const credentials = {
              username: authenticationDetails.getUsername(),
              idToken: userSession.getIdToken().getJwtToken(),
              refreshToken: userSession.getRefreshToken().getToken()
            };
            callback.cognitoCallback(null, userAttributes, null, credentials);
          },
          onFailure: function (err) {
            callback.cognitoCallback(err, null, null, null);
          }
        });
      },
      onSuccess: function (result) {
        callback.cognitoCallback(null, result, null, null);
      },
      onFailure: function (err) {
        callback.cognitoCallback(err, null, null, null);
      }
    });
  }

  /**
   * Refresh user session and id token
   */
  refresh() {
    const username = this._credentials.username;
    const refreshToken = this._credentials.refreshToken;
    const cognitoUser = this.getCognitoUser(username);

    cognitoUser.refreshSession(new CognitoRefreshToken({RefreshToken: refreshToken}), (err, session) => {
      if (err) { throw err; }
      const tokens = this.getTokens(session);
      const credentials = {
        username: username,
        idToken: tokens.idToken,
        refreshToken: tokens.refreshToken
      };
      this.setCredentials(credentials);
    });
  }

  getTokens = function(session: any) {
    return {
      accessToken: session.getAccessToken().getJwtToken(),
      idToken: session.getIdToken().getJwtToken(),
      refreshToken: session.getRefreshToken().getToken()
    };
  };

  authenticate(context: LoginContext, callback: CognitoCallback) {
    const authenticationData = {
      Username : context.username,
      Password : context.password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser = this.getCognitoUser(context.username);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result: CognitoUserSession) {

        AWS.config.region = 'us-east-1';

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId : 'us-east-1:e3c9312a-b55e-43fd-8356-9b642e1d66dc', // your identity pool id here
          Logins : {
            'cognito-idp.us-east-1.amazonaws.com/us-east-1_ThFdWlCzs' : result.getIdToken().getJwtToken()
          }
        });

        // //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
        // AWS.config.credentials.refresh((error) => {
        //   if (error) {
        //     console.error(error);
        //   } else {
        //     // Instantiate aws sdk service objects now that the credentials have been updated.
        //     // example: var s3 = new AWS.S3();
        //     console.log('Successfully logged!');
        //   }
        // });
        // Store ID token in credentials
        const credentials = {
          username: context.username,
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken()
        };
        // Callback to login component
        callback.cognitoCallback(null, result, context, credentials);
      },
      newPasswordRequired: function (userAttributes, requiredAttributes) {
        const credentials = {
          username: context.username
        };
        callback.cognitoCallback('A new password is required.', null, context, credentials);
      },
      onFailure: function(err: any) {
        const credentials = {
          username: context.username
        };
        callback.cognitoCallback(err.message, null, context, credentials);
      },
    });
  }

  private getCognitoUser(username: string) {
    const poolData = {
      UserPoolId: 'us-east-1_ThFdWlCzs', // Your user pool id here
      ClientId: '2uoh44mquangcqdgu4qhr10316' // Your client id here
    };

    const userPool = new CognitoUserPool(poolData);

    const userData = {
      Username: username,
      Pool: userPool
    };
    return new CognitoUser(userData);
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }
  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  public setCredentials (credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;
    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  public getUserGroups(): string[] {
    const decodedIdToken = jwtDecode(this.credentials.idToken);
    const groups = decodedIdToken['cognito:groups'];
    return groups;
  }

}
