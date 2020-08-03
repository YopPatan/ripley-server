import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    public router: Router,
    private productService: ProductService,
    private fireAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.productService.getAuth().then(isActive => {
      if (isActive) {
        this.router.navigate(['/']);
      }
    });
  }

  login(): void {
    this.fireAuth.signInWithEmailAndPassword(this.username, this.password).then(login => {
      login.user.getIdToken(false).then(idToken => {
        localStorage.setItem('idToken', idToken);
        this.router.navigate(['/']);
      });
    });
  }

}
