import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { AuthUser } from '../models/authuser.model';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    private currentUserSubject : BehaviorSubject<AuthUser>;

    public currentUser : Observable<AuthUser>;

    constructor(private http : HttpClient, private router : Router, private cookies : CookieService) {
        if (this.cookies.check('currentUser')){
            this.currentUserSubject = new BehaviorSubject<AuthUser>(JSON.parse(this.cookies.get('currentUser')));
        }
        else {
            this.currentUserSubject = new BehaviorSubject<AuthUser>(null);
        }

        this.currentUser = this.currentUserSubject.asObservable();
    }
    
    public get currentUserValue(){
        return this.currentUserSubject.getValue();
    }

    login(email : string, password : string){
        return this.http.post<any>("https://salty-crag-12236.herokuapp.com/auth/login/admin", { email, password }).pipe(map(user => { this.cookies.set('currentUser', JSON.stringify(user)); this.currentUserSubject.next(user); return user; }));
    }

    handleError(err : HttpErrorResponse){
        if (err.error instanceof ErrorEvent){
            console.log("Clinet side error: ", err.error.message);
        }
        else {
            console.log("Server side error status: ", err.status, " body was: ", err.error);
        }
        return throwError("Something bad happened, try again later!");
    }

    logout(){
        console.log("logout()");
        this.cookies.delete('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/backoffice']);
    }
}
