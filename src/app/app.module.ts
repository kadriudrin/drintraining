import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SettingsComponent} from './settings/settings.component';
import {TasksComponent} from './tasks/tasks.component';
import {UsersComponent} from './users/users.component';
import {MaterialModule} from './material-module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './api/interceptors/token.interceptor'; 
import {ErrorHandleInterceptor} from './api/interceptors/errorHandle.interceptor';
import {SpinnerInterceptor} from './api/interceptors/spinner.interceptor';
import {LoaderComponent} from './shared/components/loader/loader.component';
import {DialogDeleteConfirmComponent} from './dialog-delete-confirm/dialog-delete-confirm.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserCreateComponent} from './user-create/user-create.component';
import {ErrorHandleComponent} from './shared/components/error-handle/error-handle.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SettingsComponent,
    TasksComponent,
    UsersComponent,
    LoaderComponent,
    DialogDeleteConfirmComponent,
    UserEditComponent,
    UserCreateComponent,
    ErrorHandleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [CookieService, 
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandleInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
