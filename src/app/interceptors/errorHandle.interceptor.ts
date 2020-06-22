import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {AuthenticationService} from '../api/authentication/authentication.service'; 
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class ErrorHandleInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticationService, private router : Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        let errorMsg = '';
        let expiredToken : boolean = false; 
        if (err instanceof HttpErrorResponse) {
          errorMsg = `Error Code: ${err.status}\nMessage: ${err.message}`;
          if (err.status === 401) {
            this.auth.logout();
            expiredToken = true;
          }
        }
        else {
          errorMsg = `Error: ${err.error.message}`;
        }
        if (!expiredToken)
        {
          this.router.navigate(['/']);
          alert(errorMsg);
        }
        return throwError(err); 
      }),
    );
  }
}
