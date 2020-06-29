import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../api/authentication/authentication.service';
import {catchError, first, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthUser} from '../api/authentication/authuser.model';
import {throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  myForm: FormGroup;

  errorMsg: string = '';

  successUrl: string = 'home';

  constructor(private fb: FormBuilder, private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      }
    );
  }

  successful(data: any) {
    this.router.navigate(['/']);
  }

  failure(error: any) {
    this.errorMsg = error.error.message;
  }

  loginHandle() {
    this.auth.login(this.email, this.password)
      .then((res) => this.successful(res)).catch((rej) => this.failure(rej));
  }

  get email() {
    return this.myForm.get('email').value;
  }

  get password() {
    return this.myForm.get('password').value;
  }
}
