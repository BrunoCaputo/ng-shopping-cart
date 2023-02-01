import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, AuthService } from 'src/app/core/services';
import { LoadingSpinnerService } from 'src/app/core/services/spinner/loading-spinner.service';
import { USERS } from 'src/app/shared/constants';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService,
    private spinner: LoadingSpinnerService
  ) {}

  ngOnInit() {
    if (this.authService.hasLoggedUser()) {
      this.router.navigate(['/']);
      return;
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async login() {
    this.spinner.show();
    const formValues = this.loginForm.getRawValue();
    const email = formValues['email'];
    const password = formValues['password'];

    const user = USERS.find((u) => u.email === email);

    if (!user) {
      this.alert.createErrorDialog(
        'Account does not exist',
        'Check your email'
      );
      this.spinner.hide();
      return;
    }

    if (user.password !== password) {
      this.loginForm.get('password')!.setErrors({
        incorrectPassword: true,
      });
      this.spinner.hide();
      return;
    }

    const fromRoute = this.route.snapshot.queryParamMap.get('from');
    await this.authService.login(user);
    let navigationRoute = fromRoute ?? '/';
    if (fromRoute?.includes('admin') && user.role !== 'admin') {
      navigationRoute = '/';
      this.alert.createWarningDialog(
        'You are not an administrator',
        'You cannot access this page!'
      );
    }

    this.router.navigate([navigationRoute]);
    this.spinner.hide();
  }
}
