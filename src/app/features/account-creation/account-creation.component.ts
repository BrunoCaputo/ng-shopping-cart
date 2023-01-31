import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, AlertService } from 'src/app/core/services';
import { LoadingSpinnerService } from 'src/app/core/services/spinner/loading-spinner.service';
import { USERS } from 'src/app/shared/constants';
import { States } from 'src/app/shared/constants/states.constants';
import { IPostmonApiResponse, IState } from 'src/app/shared/models';

@Component({
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.scss'],
})
export class AccountCreationComponent {
  newAccountForm!: FormGroup;
  showPassword: boolean[] = [false, false];
  stateOpts: IState[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService,
    private spinner: LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.stateOpts = Object.keys(States).map((st) => ({
      uf: st,
      name: States[st].name,
    }));

    this.newAccountForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: this.fb.group({
        zipCode: ['', [Validators.required]],
        street: ['', [Validators.required]],
        complement: [''],
        neighborhood: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
      }),
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      privacyPolicy: [false, [Validators.required]],
      dataSharing: [false, [Validators.required]],
    });
  }

  async getAddressFromZipCode(zipCode: string) {
    if (zipCode === '') {
      this.newAccountForm.controls['address'].get('zipCode')?.setErrors({
        required: true,
      });
    }

    try {
      zipCode = zipCode.replace('-', '').trim();
      const address: IPostmonApiResponse =
        await this.authService.getDataFromZipCode(zipCode);
      this.fillAddress(address);
    } catch (err) {
      this.newAccountForm.controls['address'].get('zipCode')?.setErrors({
        invalidZipCode: true,
      });
    }
  }

  private fillAddress(address: IPostmonApiResponse) {
    console.log(address);
    const addressGroupControl = this.newAccountForm.controls['address'];

    addressGroupControl.get('city')?.setValue(address.cidade);
    addressGroupControl.get('state')?.setValue(address.estado);
    addressGroupControl.get('neighborhood')?.setValue(address.bairro);
    addressGroupControl.get('street')?.setValue(address.logradouro);
  }

  async createAccount() {
    this.spinner.show();
    const formValues = this.newAccountForm.getRawValue();
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
      this.newAccountForm.get('password')!.setErrors({
        incorrectPassword: true,
      });
      this.spinner.hide();
      return;
    }

    try {
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
    } catch (error) {
      this.alert.createErrorDialog('Something went wrong', '');
    } finally {
      this.spinner.hide();
    }
  }
}
