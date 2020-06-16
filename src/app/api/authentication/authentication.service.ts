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

  public authenticated : boolean = false;
  
  public auth_token : string;

  public currentUser: Observable<AuthUser>;

  private apiUrl = 'https://salty-crag-12236.herokuapp.com/auth/login/admin'; 

  constructor(private http: HttpClient, private router: Router, private cookies: CookieService) {
    let cookieUsr = null; 
    if (this.cookies.check('currentUser'))
    {
      this.authenticated = true;
      cookieUsr = JSON.parse(this.cookies.get('currentUser'));
    }
    this.currentUserSubject = new BehaviorSubject<AuthUser>(cookieUsr);

    if (cookieUsr != null)
      this.auth_token = this.currentUserValue.auth_token;
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.getValue();
  }
  
  login(email: string, password: string) {
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(this.apiUrl, {email, password})
        .toPromise()
        .then(res => {
          this.authenticated = true;
          this.cookies.set('currentUser', JSON.stringify(res));
          this.currentUserSubject.next(res);
          this.auth_token = this.currentUserValue.auth_token;
          resolve(res);
        }
        )
        .catch(err => {
          reject(err);
        }
        )
    });
    return promise;
  }

  logout() {
    this.authenticated = false;
    this.auth_token = "";
    this.cookies.delete('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/backoffice']);
  }
}
