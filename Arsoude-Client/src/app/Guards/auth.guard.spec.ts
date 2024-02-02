import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard; // Declare an instance of AuthGuard

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard.canActivate()); // Call canActivate on authGuard instance

  beforeEach(() => {
    TestBed.configureTestingModule({});
    authGuard = TestBed.inject(AuthGuard); // Inject AuthGuard
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });
});
