import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router:Router, private autenc: AutenticacionService ){}

  canActivate(): boolean {
    if(this.autenc.returnVal()){
      return true;
    }else{
      this.router.navigate(['/login'])
      return false;
    }
  }

  
  
}
