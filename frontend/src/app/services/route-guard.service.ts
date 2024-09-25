import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { jwtDecode } from 'jwt-decode';
import { GlobalConstants } from '../shared/global-constants';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(
    public auth: AuthService,
    public router: Router,
    private snackbarService: SnackbarService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let expectedRoleArray = route.data.expectedRole;

    const token: any = localStorage.getItem('token');
    let tokenPayload: any;

    try {
      tokenPayload = jwtDecode(token);
    } catch (err) {
      localStorage.clear();
      this.router.navigate(['/']);
      return false; // Ensure you return false in case of error
    }

    let checkRole = expectedRoleArray.includes(tokenPayload.role);

    if (this.auth.isAuthenticated() && (tokenPayload.role === 'user' || tokenPayload.role === 'admin') && checkRole) {
      return true;
    }

    this.snackbarService.openSnackBar(GlobalConstants.unauthorized, GlobalConstants.error);
    this.router.navigate(['/cafe/dashboard']);
    return false; // Return false if not authorized
  }
}
