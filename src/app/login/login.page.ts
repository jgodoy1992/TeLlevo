import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router, NavigationExtras } from '@angular/router';
import { ApiDbService } from '../services/api-db.service';
import { AutenticacionService } from '../services/autenticacion.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger('progressAnimation', [
      state('start', style({ width: '0%' })),
      state('end', style({ width: '100%' })),
      transition('start => end', animate('1000ms linear')),
    ]),
  ],
})

export class LoginPage {

  username: string = '';
  password: string = '';

  authBool:boolean= false;

  loginAnimation:'start' | 'end'='start';
  progVal: number =0;

  constructor( private router: Router, private apiService:ApiDbService, private autenc:AutenticacionService) { }

  

  async login(){

    this.apiService.login(this.username, this.password).subscribe(
      (res)=>{
        if(res===true){
          console.log(res)
          let navigationExtras: NavigationExtras = {
            state: {username:this.username}
          }
          this.authBool=true;
          this.autenc.getBoolAuthVal(this.authBool);
          this.router.navigate(['/home'], navigationExtras)
          console.log('Inicio de sesion exitoso')
        }else{
          console.log(res)
          this.authBool=false;
          this.autenc.getBoolAuthVal(this.authBool);
          console.error('Inicio de sension fallido')
        }
      },(error)=>{
        this.authBool=false;
        this.autenc.getBoolAuthVal(this.authBool);
        console.error('Error ela iniciar sesion', error)
      }
    )}
    

  startAnimation(){
    this.loginAnimation='end';
    this.progVal=100;
    setTimeout(()=>{
      this.login();
      this.loginAnimation='start';
      this.progVal=0;
    }, 1000);
  }

}
