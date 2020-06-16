import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user.model';
import {AuthenticationService} from '../authentication/authentication.service';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private apiUrl : string = 'https://salty-crag-12236.herokuapp.com/users';

  constructor(private http: HttpClient, private auth: AuthenticationService) {
  }

  getUsers() {
    const httpOptions = {headers: new HttpHeaders({'Authorization': ('Bearer ' + this.auth.auth_token)})};
    return this.http.get<User[]>(this.apiUrl, httpOptions);
  }
}
