import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loading : boolean = false;

  public nextValue : boolean;

  public changedLoading : boolean = false;

  public set(value : boolean){
    console.log("Set: ", value);
    this.changedLoading = true;
    this.nextValue = value;
    this.setNext();
  }

  public setNext(){
    this.loading = this.nextValue;
  }

  constructor() { }
}
