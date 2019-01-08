import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { UsersService } from '../services/users.service';
import { User } from '../models/User';
import * as ResultCode from '../models/ResultCodeEnum';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: '../views/usersSignup.component.html',
  styleUrls: ['../styles/usersSignup.component.css']
})
export class UsersSignupComponent {
  configService: ConfigService;
  usersService: UsersService;
  user: User;
  constructor(
    configService: ConfigService,
    usersService: UsersService,
    private router: Router
  ) {
    this.configService = configService;
    this.usersService = usersService;
    this.user = new User();
  }

  registerUser() {
    if (
      !isNullOrUndefined(this.user) &&
      !isNullOrUndefined(this.user.Email) &&
      !isNullOrUndefined(this.user.Password)
    ) {
      this.usersService.registerUser(this.user).subscribe(
        ({ data }) => {
          if (
            data.register[0].resultCode === ResultCode.ResultCodeEnum.Success
          ) {
            this.configService.logSuccess(data.register[0].message);
            this.router.navigate(['login']);
          } else {
            this.configService.logError(
              data.register[0].path + ':' + data.register[0].message
            );
          }
        },
        error => {
          this.configService.logError(error);
        }
      );
    }
  }
}
