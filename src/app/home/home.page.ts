import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AutenticacionService } from '../services/autenticacion.service';
import { AlertController } from '@ionic/angular';

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
  authBool: boolean = false;
  loginAnimation: 'start' | 'end' = 'start';
  progVal: number = 0;

  constructor(private router: Router, private autenc: AutenticacionService, private alertController: AlertController) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.username = state['username'];
    }
  }

  logout() {
    this.autenc.getBoolAuthVal(this.authBool);
    this.router.navigate(['/login']);
  }

  startAnimation() {
    this.loginAnimation = 'end';
    this.progVal = 100;
    setTimeout(() => {
      this.logout();
      this.loginAnimation = 'start';
      this.progVal = 0;
    }, 1000);
  }

  // Función para manejar el clic en "Contáctanos"
  async contactUs() {
    const alert = await this.alertController.create({
      header: 'Contáctanos',
      message: '¡Haz clic en Contáctanos!',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Función para manejar el clic en "Consultas o Dudas"
  async openConsultationBox() {
    const alert = await this.alertController.create({
      header: 'Consultas o Dudas',
      message: '¡Haz clic en Consultas o Dudas!',
      buttons: ['OK']
    });

    await alert.present();
  }
}

