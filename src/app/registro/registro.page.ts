import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ApiDbService } from '../services/api-db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  animations: [
    trigger('progressAnimation', [
      state('start', style({ width: '0%' })),
      state('end', style({ width: '100%' })),
      transition('start => end', animate('1000ms linear')),
    ]),
  ],
})
export class RegistroPage implements OnInit {

  username: string='';
  email: string='';
  password: string='';

  loginAnimation:'start' | 'end'='start';
  progVal: number =0;
  
  constructor(private apiService:ApiDbService, public router:Router) { }

  ngOnInit() {
  }

  registro(){
    const userData = {
      username:this.username,
      email:this.email,
      password:this.password
    }

    this.apiService.registroUsuario(userData).subscribe(
      (response)=>{
        this.router.navigate(['/login'])
        console.log('Registro Exitoso', response)
      },
      (error)=>{
        console.error('Error al registrar usuario', error);
      }
    )
  }

  startAnimation(){
    this.loginAnimation='end';
    this.progVal=100;
    setTimeout(()=>{
      this.registro();
      this.loginAnimation='start';
      this.progVal=0;
    }, 1000);
  }

}
