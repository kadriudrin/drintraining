import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './utils/auth.guard';
import { LoggedInGuard } from './utils/loggedin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    { path : '', component : DashboardComponent, canActivate: [AuthGuard] },
    { path : 'settings', component : SettingsComponent, canActivate: [AuthGuard] },
    { path : 'users', component : UsersComponent, canActivate: [AuthGuard] },
    { path : 'tasks', component : TasksComponent, canActivate: [AuthGuard] },
    { path : 'backoffice', component : LoginComponent, canActivate: [LoggedInGuard] },
    { path : '**', component : LoginComponent, canActivate: [LoggedInGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
