import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserModel } from "./user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseApi: string = "https://salty-crag-12236.herokuapp.com";

  private apiUrl: string = this.baseApi + "/users";

  constructor(private http: HttpClient) {}

  createUser(usr: any): Observable<UserModel> {
    console.log("Created New User: ", usr);
    return this.http.post<UserModel>(this.baseApi + "/users", usr);
  }

  editUser(usr: any, id: number): Observable<UserModel> {
    return this.http.put<UserModel>(this.apiUrl + "/" + id, usr);
  }

  deleteUser(usr: any): Observable<any> {
    console.log("Deleting: ", usr);
    return this.http.delete(this.apiUrl + "/" + usr.id);
  }

  getUser(id: number): Observable<UserModel> {
    return this.http.get<UserModel>(this.apiUrl + "/" + id);
  }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiUrl);
  }
}
