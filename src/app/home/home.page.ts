import { Component } from '@angular/core';
import { Router,NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string = '';

  constructor(private router:Router) {
    const state=this.router.getCurrentNavigation()?.extras.state
    if(state){
      this.username=state['username']
    }
  }

}
