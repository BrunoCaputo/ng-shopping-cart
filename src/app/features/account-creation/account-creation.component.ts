import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, AlertService, UtilsService } from 'src/app/core/services';
import { LoadingSpinnerService } from 'src/app/core/services/spinner/loading-spinner.service';
import { USERS } from 'src/app/shared/constants';
import { States } from 'src/app/shared/constants/states.constants';
import { IPostmonApiResponse, IState, IUser } from 'src/app/shared/models';

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
    private utils: UtilsService,
    private router: Router,
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
    if (zipCode.trim() === '') {
      this.newAccountForm.controls['address'].get('zipCode')?.setErrors({
        required: true,
      });
    }

    try {
      zipCode = zipCode.replace('-', '').trim();
      const address: IPostmonApiResponse = await this.utils.getDataFromZipCode(
        zipCode
      );
      this.fillAddress(address);
    } catch (err) {
      this.newAccountForm.controls['address'].get('zipCode')?.setErrors({
        invalidZipCode: true,
      });
    }
  }

  agreementAccepted() {
    const formValue = this.newAccountForm.getRawValue();
    const privacyPolicy: boolean = formValue['privacyPolicy'];
    const dataSharing: boolean = formValue['dataSharing'];

    return privacyPolicy && dataSharing;
  }

  private fillAddress(address: IPostmonApiResponse) {
    const addressGroupControl = this.newAccountForm.controls['address'];

    addressGroupControl.get('city')?.setValue(address.cidade);
    addressGroupControl.get('state')?.setValue(address.estado);
    addressGroupControl.get('neighborhood')?.setValue(address.bairro);
    addressGroupControl.get('street')?.setValue(address.logradouro);
  }

  private getNewUser(): IUser {
    const formValues = this.newAccountForm.getRawValue();
    const email = formValues['email'];
    const username = email.split('@')[0];
    const password = formValues['password'];
    const name = formValues['name'];
    const lastName = formValues['lastName'];
    const phone = formValues['phone'];

    const addressValue = this.newAccountForm.controls['address'].getRawValue();
    const zipCode = addressValue['zipCode'];
    const street = addressValue['street'];
    const complement = addressValue['complement'];
    const neighborhood = addressValue['neighborhood'];
    const city = addressValue['city'];
    const state = addressValue['state'];

    return {
      id: USERS.length + 1,
      email,
      firstName: name,
      maidenName: '',
      lastName,
      password,
      username,
      addresses: [
        {
          city,
          postalCode: zipCode,
          state,
          address: `${street} - ${complement} - ${neighborhood}`,
        },
      ],
      phone,
    };
  }

  async createAccount() {
    this.spinner.show();

    const newUser: IUser = this.getNewUser();

    const user = USERS.find(
      (u) => u.email === newUser.email || u.username === newUser.username
    );

    if (user) {
      this.alert.createErrorDialog(
        'Account already exists',
        'An account with this email already exists'
      );
      this.spinner.hide();
      return;
    }

    const confirmPassword =
      this.newAccountForm.getRawValue()['confirmPassword'];

    if (newUser.password !== confirmPassword) {
      this.newAccountForm.controls['confirmPassword'].setErrors({
        differentPassword: true,
      });
      this.spinner.hide();
      return;
    }

    try {
      if (this.newAccountForm.valid) {
        await this.authService.createNewAccount(newUser);
        this.alert.createSuccessDialogWithAction(
          'Account created!',
          'Your account was created successfully',
          () => {
            this.router.navigate(['/login']);
          }
        );
      }
    } catch (err) {
      this.alert.createErrorDialog('Error!', 'Something went wrong');
    } finally {
      this.spinner.hide();
    }
  }
}
