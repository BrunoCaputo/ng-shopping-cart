import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { USERS } from 'src/app/shared/constants';
import { IUser } from 'src/app/shared/models';
import { SharedModule } from 'src/app/shared/shared.module';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have email field', () => {
    const emailField = (fixture.nativeElement as HTMLElement).querySelector(
      '.login-container .fields #email-field'
    );

    expect(emailField).toBeTruthy();
  });

  it('should have password field', () => {
    const passwordField = (fixture.nativeElement as HTMLElement).querySelector(
      '.login-container .fields #password-field'
    );

    expect(passwordField).toBeTruthy();
  });

  it('should enter with a valid user', () => {
    const validUser: IUser = USERS[0];
    const invalidUser: IUser = {
      id: 500,
      email: 'bruno@gmail.com',
      firstName: 'Bruno',
      lastName: 'Caputo',
      maidenName: 'Pereira',
      username: 'bruno',
      password: '123456',
    };

    // With valid user
    component.loginForm.controls['email'].setValue(validUser.email);
    component.loginForm.controls['password'].setValue(validUser.password);

    component.login().then((_) => {});
  });
});
