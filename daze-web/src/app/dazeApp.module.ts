import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DazeAppComponent } from './dazeApp.component';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { Routing } from './dazeApp.routes';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { LoginComponent } from './components/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UsersSignupComponent } from './components/usersSignup.component';

@NgModule({
  declarations: [DazeAppComponent, LoginComponent, UsersSignupComponent],
  imports: [
    BrowserModule,
    BootstrapModule,
    Routing,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    BrowserAnimationsModule, // required animations module
    HttpClient,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [DazeAppComponent]
})
export class DazeAppModule {}
