import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { User } from '../models/User';
import gql from 'graphql-tag';
import { Subscription } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  configService: ConfigService;
  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  register = gql`
    mutation RegisterUserMutation($email: String!, $password: String!) {
      register(email: $email, password: $password) {
        path
        message
        resultCode
      }
    }
  `;
  public registerUser(user: User) {
    return this.configService.apollo.mutate({
      mutation: this.register,
      variables: {
        email: user.Email,
        password: user.Password
      }
    });
  }
}
