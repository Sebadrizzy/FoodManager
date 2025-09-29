import { Injectable, inject} from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { FirebaseService } from "../services/firebase";
import { Utils } from "../services/utils";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  firebaseService = inject(FirebaseService);
  utilsSvc = inject(Utils);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let user = localStorage.getItem('user');

    return new Promise((resolve) => {
      this.firebaseService.getAuth().onAuthStateChanged((auth) => {
        if (auth && user) {
          resolve(true);
        } else {
          this.utilsSvc.routerlink('/auth');
          resolve(false);
        }
      });
    });
  }
}

