import { Component } from '@angular/core';
import { AuthGuard } from './services/auth-guard.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-final-project';

  loginStatus: boolean=false;

  constructor(private _authGuard: AuthGuard){}

  ngOnInit(): void {
    this.loginStatus=  this._authGuard.isLoggedIn();
  }

  logout(){
    this._authGuard.logout();
    window.location.reload();
  }
}
