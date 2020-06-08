import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

    auth_token : string;

    constructor(private http : HttpClient, private auth : AuthenticationService) {
        this.auth.currentUser.subscribe(val => this.auth_token = val.auth_token);
    }

    getUsers() : Observable<any> {
        const server_api = "https://salty-crag-12236.herokuapp.com/users";
        const httpOptions = { headers : new HttpHeaders({ Authorization : this.auth_token }) };
        return this.http.get<any>(server_api, httpOptions);
    }
}
