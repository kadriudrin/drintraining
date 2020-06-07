import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    private currentUserSubject : BehaviorSubject<User>;

    public currentUser : Observable<User>;

    constructor(private http : HttpClient, private router : Router, private cookies : CookieService) {
        if (this.cookies.check('currentUser')){
            this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.cookies.get('currentUser')));
        }
        else {
            this.currentUserSubject = new BehaviorSubject<User>(null);
        }

        this.currentUser = this.currentUserSubject.asObservable();
    }
    
    public get currentUserValue(){
        return this.currentUserSubject.getValue();
    }

    login(email : string, password : string){
        console.log("login()");
        return this.http.post<any>("https://salty-crag-12236.herokuapp.com/auth/login/admin", { email, password }).pipe(map(user => { this.cookies.set('currentUser', JSON.stringify(user)); this.currentUserSubject.next(user); return user; }));
    }

    logout(){
        console.log("logout()");
        this.cookies.delete('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/backoffice']);
    }
}
