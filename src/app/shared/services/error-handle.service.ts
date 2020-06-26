import { Injectable } from '@angular/core';

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

  constructor() { }
}
