import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user.model';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  auth_token: string;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.auth.currentUser.subscribe(val => this.auth_token = val.auth_token);
  }

  getUsers() {
    const httpOptions = {headers: new HttpHeaders({'Authorization': ('Bearer ' + this.auth_token)}), responseType: 'text' as 'json'};
    return this.http.get<any[]>('https://salty-crag-12236.herokuapp.com/users', httpOptions);
  }
}
