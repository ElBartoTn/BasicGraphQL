import { TestBed, async } from '@angular/core/testing';
import { DazeAppComponent } from '../dazeApp.component';
import { Routing } from '../dazeApp.routes';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersSignupComponent } from '../components/usersSignup.component';
import { LoginComponent } from '../components/login.component';

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [
      RouterTestingModule.withRoutes([
        { path: 'signup', component: UsersSignupComponent },
        { path: 'login', component: LoginComponent }
      ])
    ]
  });
});
describe('DazeAppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DazeAppComponent]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(DazeAppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
