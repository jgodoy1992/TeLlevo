import { Component } from '@angular/core';
import { Router,NavigationExtras, ActivatedRoute } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AutenticacionService } from '../services/autenticacion.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('progressAnimation', [
      state('start', style({ width: '0%' })),
      state('end', style({ width: '100%' })),
      transition('start => end', animate('1000ms linear')),
    ]),
  ],
})
export class HomePage {

  username: string = '';

  authBool:boolean=false;

  loginAnimation:'start' | 'end'='start';
  progVal: number =0;

  constructor(private router:Router, private autenc: AutenticacionService) {
    const state=this.router.getCurrentNavigation()?.extras.state
    if(state){
      this.username=state['username']
    }
  }

  logout(){
    this.autenc.getBoolAuthVal(this.authBool);
   this.router.navigate(['/login']) 
  }

  startAnimation(){
    this.loginAnimation='end';
    this.progVal=100;
    setTimeout(()=>{
      this.logout();
      this.loginAnimation='start';
      this.progVal=0;
    }, 1000);
  }

}
