import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersSignupComponent } from './components/usersSignup.component';
import { LoginComponent } from './components/login.component';

// Route Configuration
export const routes: Routes = [
  { path: 'signup', component: UsersSignupComponent },
  { path: 'login', component: LoginComponent }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
