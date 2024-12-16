import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

/*  route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    */

  canActivate(
   ): Observable<boolean   
 | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.authService.connectedUser();
    const isAdmin = this.authService.isAdmin();   
 // Utilize the new method

    if (isAuthenticated && isAdmin) {
      return true;
    }
    
    return false;
    
    // Redirect to appropriate page
    //return this.router.parseUrl('/login');
  }
}