import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent {
  user = {};
  constructor(public af: AngularFire) {
  this.af.auth.subscribe(user => {
      if (user) {
        // user logged in
        this.user = user;
      } else {
        // user not logged in
        this.user = {};
      }
      console.log(user);
    });
  }
  login() {
    this.af.auth.login();
  }

  logout() {
     this.af.auth.logout();
  }
}
