import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../authentication/authentication.service';
import {Observable} from 'rxjs';
import {Users} from './user.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private apiUrl: string = 'https://salty-crag-12236.herokuapp.com/users';

  constructor(private http: HttpClient, private auth: AuthenticationService) {
  }

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl);
  }
}
