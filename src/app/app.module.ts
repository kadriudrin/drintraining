import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {HttpClientModule} from '@angular/common/http';
import {ErrorComponent} from './shared/error/error.component';

<<<<<<< HEAD
import {CookieService} from 'ngx-cookie-service';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SettingsComponent} from './settings/settings.component';
import {TasksComponent} from './tasks/tasks.component';
import {UsersComponent} from './users/users.component';
import {MaterialModule} from './material-module';
=======
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import {MatIconModule} from '@angular/material/icon';

import { CookieService } from 'ngx-cookie-service';
import {MatMenuModule} from '@angular/material/menu';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';
import {MatTableModule} from '@angular/material/table';
>>>>>>> 866c104ab2a4298aa00ed3a5969ee1880ac312c0

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    DashboardComponent,
    SettingsComponent,
    TasksComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    HttpClientModule,
    MaterialModule
  ],
=======
		MatFormFieldModule,
		MatCardModule,
		MatProgressSpinnerModule,
        HttpClientModule,
        MatIconModule,
        MatMenuModule,
        MatTableModule,
      MatInputModule
	],
>>>>>>> 866c104ab2a4298aa00ed3a5969ee1880ac312c0
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
