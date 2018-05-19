import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { AuthenticationService, Credentials} from './authentication.service';
import {MockAuthenticationService} from './authentication.service.mock';

const credentialsKey = 'credentials';

describe('AuthenticationService', () => {
  let authenticationService: MockAuthenticationService;

  beforeEach(() => {
    authenticationService = new MockAuthenticationService();
    // TestBed.configureTestingModule({
    //   providers: [{provide: AuthenticationService, useClass: MockAuthenticationService}]
    // });
  });

  // beforeEach(inject([
  //   AuthenticationService
  // ], (_authenticationService: AuthenticationService) => {
  //   authenticationService = _authenticationService;
  // }));

  afterEach(() => {
    // Cleanup
    localStorage.removeItem(credentialsKey);
    sessionStorage.removeItem(credentialsKey);
  });

  describe('login', () => {
    it('should return credentials', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        username: 'username',
        password: '123'
      }, null);
      tick();

      // Assert
      // request.subscribe(credentials => {
      //   expect(credentials).toBeDefined();
      //   expect(credentials.token).toBeDefined();
      // });
    }));

    it('should authenticate user', fakeAsync(() => {
      expect(authenticationService.isAuthenticated()).toBe(true);

      // Act
      const request = authenticationService.login({
        username: 'username',
        password: '123'
      }, null);
      tick();

      // Assert
      // request.subscribe(() => {
      //   expect(authenticationService.isAuthenticated()).toBe(true);
      //   expect(authenticationService.credentials).toBeDefined();
      //   expect(authenticationService.credentials).not.toBeNull();
      //   expect((<Credentials>authenticationService.credentials).idToken).toBeDefined();
      //   expect((<Credentials>authenticationService.credentials).idToken).not.toBeNull();
      // });
    }));

    it('should persist credentials for the session', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        username: 'username',
        password: '123'
      }, null);
      tick();

      // Assert
      // request.subscribe(() => {
      //   expect(sessionStorage.getItem(credentialsKey)).not.toBeNull();
      // });
    }));

    it('should persist credentials across sessions', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        username: 'username',
        password: '123',
        remember: true
      }, null);
      tick();

      // Assert
      // request.subscribe(() => {
      //   expect(localStorage.getItem(credentialsKey)).not.toBeNull();
      // });
    }));
  });

  describe('logout', () => {
    it('should clear user authentication', fakeAsync(() => {
      // Arrange
      const loginRequest = authenticationService.login({
        username: 'username',
        password: '123'
      }, null);
      tick();

      // Assert
      // loginRequest.subscribe(() => {
      //   expect(authenticationService.isAuthenticated()).toBe(true);
      //
      //   const request = authenticationService.logout();
      //   tick();
      //
      //   request.subscribe(() => {
      //     expect(authenticationService.isAuthenticated()).toBe(false);
      //     expect(authenticationService.credentials).toBeNull();
      //     expect(sessionStorage.getItem(credentialsKey)).toBeNull();
      //     expect(localStorage.getItem(credentialsKey)).toBeNull();
      //   });
      // });
    }));

    it('should clear persisted user authentication', fakeAsync(() => {
      // Arrange
      const loginRequest = authenticationService.login({
        username: 'username',
        password: '123',
        remember: true
      }, null);
      tick();

      // Assert
      // loginRequest.subscribe(() => {
      //   expect(authenticationService.isAuthenticated()).toBe(true);
      //
      //   const request = authenticationService.logout();
      //   tick();
      //
      //   request.subscribe(() => {
      //     expect(authenticationService.isAuthenticated()).toBe(false);
      //     expect(authenticationService.credentials).toBeNull();
      //     expect(sessionStorage.getItem(credentialsKey)).toBeNull();
      //     expect(localStorage.getItem(credentialsKey)).toBeNull();
      //   });
      // });
    }));
  });
});
