import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AutenticacionService } from '../services/autenticacion.service';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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

  formData = {
    Name: '',
    Email: '',
    tipoAuto: '',
    horarioViaje: ''
  };

  constructor(
    private router: Router,
    private autenc: AutenticacionService,
    private alertController: AlertController,
    private httpClient: HttpClient
  ) {
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

  async contactUs() {
    const alert = await this.alertController.create({
      header: 'Contáctanos',
      message: 'duoctellevo@gmail.com',
      buttons: ['OK']
    });

    await alert.present();
  }

  enviarFormulario() {
    console.log('Función enviarFormulario() llamada');
    console.log('Enviando formulario...', this.formData);

    this.httpClient.post('https://formsubmit.co/6a0082110731def0ee55dd00c3ff63bf', this.formData)
      .subscribe(
        response => {
          console.log('Formulario enviado con éxito:', response);
          this.mostrarAlerta('Éxito', 'Formulario enviado con éxito');
        },
        error => {
          console.error('Error al enviar el formulario:', error);

          if (error instanceof HttpErrorResponse) {
            console.error('Status:', error.status);
            console.error('Mensaje:', error.message);
          }

          this.mostrarAlerta('Error', 'Hubo un error al enviar el formulario');
        }
      );
  }

  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
