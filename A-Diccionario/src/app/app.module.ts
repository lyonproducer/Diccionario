import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { BeforeLoginService } from './services/auth/before-login.service';
import { AfterLoginService } from './services/auth/after-login.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import { AddDictionaryComponent } from './components/dictionary/add-dictionary/add-dictionary.component';



const routes: Route[] = [
  
  {path: 'login', component: LoginComponent, canActivate:[BeforeLoginService] },
  {path: 'signup', component: SignUpComponent, canActivate:[BeforeLoginService]},
  {path: 'profile', component: ProfileComponent, canActivate:[AfterLoginService]},
  {path: 'request-pass-reset', component: RequestResetComponent, canActivate:[BeforeLoginService]},
  {path: 'response-pass-reset', component: ResponseResetComponent, canActivate:[BeforeLoginService]},

  //User normal y super admin
  {
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate:[AfterLoginService],
    data: {role : 'USER'}
  },
  //Super admin rute
  {
    path: 'admin/dashboard', 
    component: DashboardComponent, 
    canActivate:[AfterLoginService],
    data: {role : 'ADMIN'}
  },
  {
    path: 'admin/diccionario', 
    component: DictionaryComponent, 
    canActivate:[AfterLoginService],
    data: {role : 'ADMIN'}
  },

];

@NgModule({
  entryComponents:[
    AddDictionaryComponent
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignUpComponent,
    RequestResetComponent,
    ResponseResetComponent,
    ProfileComponent,
    DashboardComponent,
    DictionaryComponent,
    AddDictionaryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    SnotifyModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
