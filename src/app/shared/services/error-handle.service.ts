import { Injectable } from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {filter} from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandleService {

  private errorMessage : string;

  public setErrorMessage(newError : string){
    this.errorMessage = newError;
  }

  public getErrorMessage(){
    return this.errorMessage;
  }

  constructor(private r: Router) { 
    r.events.pipe(filter(ev => ev instanceof NavigationStart)).subscribe(v => this.errorMessage = "");
  }
}
