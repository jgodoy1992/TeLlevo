import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router, NavigationExtras } from '@angular/router';

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

  loginAnimation:'start' | 'end'='start';
  progVal: number =0;

  constructor( private router: Router) { }

  async login(){
    let navigationExtras: NavigationExtras = {
      state: {username:this.username}
    }
    this.router.navigate(['/home'], navigationExtras)
  }

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
