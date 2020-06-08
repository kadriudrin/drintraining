import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../users/user.model';
import {AuthUser} from './authuser.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<AuthUser>;

  public currentUser: Observable<AuthUser>;

  constructor(private http: HttpClient, private router: Router, private cookies: CookieService) {
    // smart and cheeky :)
    if (this.cookies.check('currentUser')) {
      this.currentUserSubject = new BehaviorSubject<AuthUser>(JSON.parse(this.cookies.get('currentUser')));
    } else {
      this.currentUserSubject = new BehaviorSubject<AuthUser>(null);
    }

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.getValue();
  }

  // todo: We will work on this later on as it needs to be a promise service call funcition..
  // todo: We use the Servce class function only for triggering the request for
  //       this to be possible we need Promises :) for both handling the http response and for http error response
  login(email: string, password: string) {
    return this.http.post<any>('https://salty-crag-12236.herokuapp.com/auth/login/admin', {email, password}).pipe(map(user => {
      this.cookies.set('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  logout() {
    this.cookies.delete('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/backoffice']);
  }
}
