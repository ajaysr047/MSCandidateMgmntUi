import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthguardService } from '../services/authGuard/authguard.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuard implements CanActivate {
  constructor(
    private _authGuardService: AuthguardService,
    private _router: Router
  ) {}

  canActivate(): boolean {
    if (!this._authGuardService.isLoggedIn()) {
      this._router.navigate(['login']);
    }
    return this._authGuardService.isLoggedIn();
  }
}
