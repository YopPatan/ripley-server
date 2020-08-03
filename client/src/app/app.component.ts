import { Component } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ripley-site';

  constructor(
    public router: Router,
    private fireAuth: AngularFireAuth
  ) { }

  logout(): void {
    this.fireAuth.signOut().then(login => {
      localStorage.clear();
      this.router.navigate(['/login']);
    }).catch(error => {
      console.log('error', error);
    });
  }

  isActive(): boolean {
    return (localStorage.getItem('idToken') != null);
  }
}
