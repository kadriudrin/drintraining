import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loading : BehaviorSubject<boolean>;

  public set(value: boolean){
    this.loading.next(value);
  }

  public get(){
    return this.loading.getValue();
  }

  constructor() { this.loading = new BehaviorSubject<boolean>(false); }
}
