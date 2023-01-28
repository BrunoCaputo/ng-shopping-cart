import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services';
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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async login() {
    const formValues = this.loginForm.getRawValue();
    const email = formValues['email'];
    const password = formValues['password'];

    console.log('EMAIL:', email);
    console.log('PASSWORD:', password);

    const user = USERS.find((u) => u.email === email);

    console.log(user);

    if (!user) {
      alert('Account does not exist');
      return;
    }

    if (user.password !== password) {
      this.loginForm.get('password')!.setErrors({
        incorrectPassword: true,
      });
      return;
    }

    try {
      const fromRoute = this.route.snapshot.queryParamMap.get('from');
      await this.authService.login(user);
      let navigationRoute = fromRoute ?? '/';
      if (fromRoute?.includes('admin') && user.role !== 'admin') {
        navigationRoute = '/';
        alert('You are not an administrator!');
      }

      this.router.navigate([navigationRoute]);
    } catch (error) {
      alert('Something went wrong!');
    }
  }
}
