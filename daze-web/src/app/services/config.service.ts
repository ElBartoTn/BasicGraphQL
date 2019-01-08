import { Injectable } from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apollo: Apollo;
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    private toastr: ToastrService
  ) {
    this.apollo = apollo;
    apollo.create({
      link: httpLink.create({ uri: 'http://127.0.0.1:4000/graphql' }),
      cache: new InMemoryCache()
    });
  }
  public isNullOrEmpty(value: any): boolean {
    if (typeof value === 'string') {
      return value == null || value.trim() === '';
    } else if (value.isArray) {
      return value == null || value === undefined || value.length === 0;
    } else {
      return value == null || value === '' || value === undefined;
    }
  }

  public isNullOrUndefined(value: any): boolean {
    return value == null || value === undefined;
  }

  public isNullOrWhiteSpaces(value: string): boolean {
    if (value == null) {
      return true;
    }
    return this.isNullOrEmpty(value.trim());
  }

  public logError(error: string) {
    if (!this.isNullOrUndefined(error)) {
      this.toastr.error(error);
    }
  }

  public logSuccess(message: string) {
    if (!this.isNullOrUndefined(message)) {
      this.toastr.success(message);
    }
  }
}
