import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  authBool:boolean=false;

  constructor() { }

  getBoolAuthVal(valor: boolean){
      if(valor){
        this.authBool=true;
      }else{
        this.authBool=false;
      }
  }

  returnVal(){
    return this.authBool
  }


}
