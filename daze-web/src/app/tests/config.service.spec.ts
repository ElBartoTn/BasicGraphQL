import { TestBed, inject, async } from "@angular/core/testing";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { ConfigService } from "../services/config.service";
import { Apollo } from "apollo-angular";
import { RouterTestingModule } from "@angular/router/testing";
import {
  HttpClientModule,
  HttpClient,
  HttpHandler
} from "@angular/common/http";
import { Toast, ToastrService, ToastPackage, ToastrModule } from "ngx-toastr";

describe("ConfigService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [
        ConfigService,
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

  it("should be created", async(
    inject([ConfigService], (service: ConfigService) => {
      expect(service).toBeTruthy();
    })
  ));
});
