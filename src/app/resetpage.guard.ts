import { Injectable } from '@angular/core';
import {CanActivate, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ServerservService } from './serverserv.service';


@Injectable({
  providedIn: 'root'
})
export class ResetpageGuard implements CanActivate,CanDeactivate<unknown>, CanLoad {
  constructor(private serv:ServerservService,private router:Router,private activatedRoute:ActivatedRoute){}
  canActivate(): boolean {
    let data=this.serv.getResetDataFromLocalStorage();
    console.log("token",data['resetToken'],this.activatedRoute.snapshot.params.token)
    console.log("email",data['resetEmail'],this.activatedRoute.snapshot.params.email)
    if(data['resetToken']==this.activatedRoute.snapshot.params.token && data['resetEmail']==this.activatedRoute.snapshot.params.email){
      return true;
    }
    else{
      this.router.navigate(["/"]);
      alert("Reset link is broke...try reset the password again");
    }
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
