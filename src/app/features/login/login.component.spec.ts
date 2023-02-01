import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { USERS } from 'src/app/shared/constants';
import { IUser } from 'src/app/shared/models';
import { SharedModule } from 'src/app/shared/shared.module';
import { Location } from '@angular/common';

import { LoginComponent } from './login.component';

declare let swal: any;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let location: Location;

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
    location = TestBed.inject(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    const formControls = component.loginForm.controls;

    formControls['email'].setValue(validUser.email);
    formControls['password'].setValue(validUser.password);

    expect(formControls['email'].value).not.toEqual('');
    expect(formControls['password'].value).not.toEqual('');

    component.login().then((_) => {
      expect(location.path()).toBe('/');
    });
  });
});
