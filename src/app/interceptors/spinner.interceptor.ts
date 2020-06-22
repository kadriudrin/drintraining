import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {AuthenticationService} from '../api/authentication/authentication.service';
import {Observable} from 'rxjs';
import {LoaderService} from '../loader/loader.service';
import {startWith, tap, delay} from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticationService, private loader: LoaderService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loader.set(true);
    console.log('SPIN START');
    return next.handle(request)
      .pipe(
        tap({
            error: error => {
              console.log('SPIN ERROR');
              this.loader.set(false);
            },
            complete: () => {
              console.log('SPIN COMPLETE');
              this.loader.set(false);
            }
          }
        ));
  }
}
