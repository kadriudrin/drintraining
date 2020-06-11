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

  loading: boolean = false;
  success: boolean = false;

  errorMsg: string;

  failed: boolean = false;

  successUrl: string = 'home';

  constructor(private fb: FormBuilder, private auth: AuthenticationService, private router: Router) {
    if (auth.currentUserValue) {
      router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.myForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      }
    );
  }

<<<<<<< HEAD
  successful(data: any) {
    this.loading = false;
    this.success = true;
    this.router.navigate(['/']);
  }

  failure(error: any) {
    this.errorMsg = error.error.message;
    this.loading = false;
    this.success = false;
    this.failed = true;
  }

  async loginHandle() {
    this.loading = true;
    // todo: We will work on this later on as it needs to be a promise service call funcition..
    this.auth.login(this.email, this.password).pipe(first()).subscribe(data => {
      this.successful(data);
    }, error => {
      this.failure(error);
    });
  }
=======
    check_success(data : any){
        this.loading = false;
        this.success = true;
        this.router.navigate(['/']);
    }

    failure(error : any){
        if (error == null){
            return;
        }
        this.errorMsg = error;
        console.log("Failure by: ", this.errorMsg);
        this.loading = false;
        this.success = false;
        this.failed = true;
    }
>>>>>>> 866c104ab2a4298aa00ed3a5969ee1880ac312c0

  get email() {
    return this.myForm.get('email').value;
  }

<<<<<<< HEAD
  get password() {
    return this.myForm.get('password').value;
  }
=======
        this.auth.login(this.email, this.password).pipe(first()).subscribe(data => { this.check_success(data); });            	
	}
    
	get email(){
		return this.myForm.get('email').value;
	}
	get password(){
		return this.myForm.get('password').value;
	}
>>>>>>> 866c104ab2a4298aa00ed3a5969ee1880ac312c0
}
