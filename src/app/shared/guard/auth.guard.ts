import { Injectable } from "@angular/core";
import { Router, CanActivate} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem("isLoggedin")) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
