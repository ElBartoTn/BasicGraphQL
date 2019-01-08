import { TestBed, inject, async } from '@angular/core/testing';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { Apollo } from 'apollo-angular';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientModule,
  HttpClient,
  HttpHandler
} from '@angular/common/http';
import { Toast, ToastrService, ToastPackage, ToastrModule } from 'ngx-toastr';
import { UsersService } from '../services/users.service';

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ToastrModule.forRoot()],
    providers: [
      UsersService,
      Apollo,
      RouterTestingModule,
      HttpLink,
      HttpClient,
      HttpClientModule,
      HttpHandler,
      ToastrService
    ]
  });
});
describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService]
    });
  });

  it('should be created', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));
});
