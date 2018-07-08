import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import {CognitoCallback, Credentials, LoginContext} from './authentication.service';

export class MockAuthenticationService {

  credentials: Credentials | null = {
    username: 'username',
    idToken: 'idToken',
    refreshToken: 'refreshToken'
  };

  login(context: LoginContext, callback: CognitoCallback): Observable<Credentials> {
    return of({
      username: context.username,
      idToken: '123456',
      refreshToken: 'refreshToken'
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

}
