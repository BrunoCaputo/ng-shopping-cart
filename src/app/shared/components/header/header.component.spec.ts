import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared.module';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [SharedModule, HttpClientTestingModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have category menu', () => {
    const categoryMenu = (fixture.nativeElement as HTMLElement).querySelector(
      '.categories-menu mat-menu'
    );
    const categoryMenuButton = (
      fixture.nativeElement as HTMLElement
    ).querySelector('.categories-menu button');

    expect(categoryMenu).toBeTruthy();
    expect(categoryMenuButton?.textContent).toEqual('Categories');
  });

  it('should have a login/logout button', () => {
    const loginAndLogoutButton = (
      fixture.nativeElement as HTMLElement
    ).querySelector('.account-manage #login-logout-btn span');
    const loggedUser = (fixture.nativeElement as HTMLElement).querySelector(
      '.account-manage > a span'
    );

    if (component.isLogged) {
      expect(loginAndLogoutButton?.textContent?.trim()).toEqual('Logout');

      if (component.loggedUser !== null) {
        expect(loggedUser).toBeTruthy();
        expect(loggedUser?.textContent?.trim()).toEqual(
          `Hello, ${component.loggedUser.name}`
        );
      } else {
        expect(loggedUser).toBeFalsy();
      }
    } else {
      expect(loginAndLogoutButton?.textContent?.trim()).toEqual('Login');
    }
  });

  it('should have a search bar', () => {
    const searchInput = (fixture.nativeElement as HTMLElement).querySelector(
      '.categories-menu mat-form-field input'
    );

    expect(searchInput).toBeTruthy();
    expect((searchInput as HTMLInputElement).placeholder.trim()).toEqual(
      'Search'
    );
  });
});
