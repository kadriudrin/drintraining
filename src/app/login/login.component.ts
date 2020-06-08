import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

	myForm : FormGroup;

	loading : boolean = false;
	success : boolean = false;

    errorMsg : string;

    failed : boolean = false;

    successUrl : string = "home";

	constructor(private fb : FormBuilder, private auth : AuthenticationService, private router: Router){
        if(auth.currentUserValue)
            router.navigate(['/']);
	}

    ngOnInit(): void {
		this.myForm = this.fb.group(
			{
				email: ['', [Validators.required, Validators.email]],
				password: ['', [Validators.required]]
			}
		)
	}

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

	async loginHandle(){
		this.loading = true;

        this.auth.login(this.email, this.password).pipe(first()).subscribe(data => { this.check_success(data); });            	
	}
    
	get email(){
		return this.myForm.get('email').value;
	}
	get password(){
		return this.myForm.get('password').value;
	}
}
