import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './utils/auth.guard';
import { LoggedInGuard } from './utils/loggedin.guard';

const routes: Routes = [
    { path : '', component : HomeComponent, canActivate: [AuthGuard] },
    { path : 'backoffice', component : LoginComponent, canActivate: [LoggedInGuard] },
    { path : '**', component : ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
