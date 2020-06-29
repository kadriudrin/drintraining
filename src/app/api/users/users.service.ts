import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../authentication/authentication.service';
import {Observable} from 'rxjs';
import {UserModel} from './user.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl: string = 'https://salty-crag-12236.herokuapp.com/users';

  constructor(private http: HttpClient, private auth: AuthenticationService) {
  }

  createUser(usr : UserModel){
    
  }

  editUser(usr : UserModel){

  }

  deleteUser(usr : UserModel): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + usr.id);
  }

  getUser(id): Observable<UserModel> {
    return this.http.get<UserModel>(this.apiUrl + '/' + id);
  }

  getUserModel(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiUrl);
  }
}
