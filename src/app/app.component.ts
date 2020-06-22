import {Component} from '@angular/core';
import {AuthenticationService} from './api/authentication/authentication.service';
import {LoaderService} from './loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'drintraining';

  constructor(private auth: AuthenticationService, public loader : LoaderService) {
  }

  menu() {
    console.log('Menu');
  }

  logout() {
    this.auth.logout();
  }

  logged() {
    return this.auth.authenticated;
  }

}
