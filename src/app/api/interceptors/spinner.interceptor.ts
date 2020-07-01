import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {AuthenticationService} from '../authentication/authentication.service'; 
import {Observable} from 'rxjs';
import {LoaderService} from '../../shared/services/loader.service';
import {startWith, tap, delay} from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticationService, private loader : LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    setTimeout(() => { this.loader.set(true) });
    return next.handle(request)
    .pipe(
      tap({
        complete: () => setTimeout(() => { this.loader.set(false) })
      })
    );
  }
}
