import { Injectable } from '@angular/core';

declare let swal: any;

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  createConfirmDialog(title: string, message: string, action: any) {
    swal({
      title: title,
      text: message,
      icon: 'warning',
      buttons: {
        cancel: {
          text: 'No',
          value: false,
          visible: true,
          className: '',
          closeModal: true,
        },
        confirm: {
          text: 'Yes',
          value: true,
          visible: true,
          className: '',
          closeModal: true,
        },
      },
    }).then(async (confirm: boolean) => {
      if (confirm) {
        action();
      }
    });
  }

  createConfirmDenyDialog(
    title: string,
    message: string,
    action: Function,
    denyAction: Function
  ) {
    swal({
      title: title,
      text: message,
      icon: 'warning',
      buttons: {
        cancel: {
          text: 'No',
          value: false,
          visible: true,
          className: '',
          closeModal: true,
        },
        confirm: {
          text: 'Yes',
          value: true,
          visible: true,
          className: '',
          closeModal: true,
        },
      },
    }).then(async (confirm: boolean) => {
      if (confirm) {
        action();
      } else {
        denyAction();
      }
    });
  }

  createDenyDialog(title: string, message: string, action: Function) {
    swal({
      title: title,
      text: message,
      icon: 'warning',
      buttons: {
        cancel: {
          text: 'No',
          value: false,
          visible: true,
          className: '',
          closeModal: true,
        },
        confirm: {
          text: 'Yes',
          value: true,
          visible: true,
          className: '',
          closeModal: true,
        },
      },
    }).then(async (confirm: boolean) => {
      if (!confirm) {
        action();
      }
    });
  }

  createBooleanConfirmDialog(title: string, message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      swal({
        title: title,
        text: message,
        icon: 'warning',
        buttons: {
          cancel: {
            text: 'No',
            value: false,
            visible: true,
            className: '',
            closeModal: true,
          },
          confirm: {
            text: 'Yes',
            value: true,
            visible: true,
            className: '',
            closeModal: true,
          },
        },
      }).then(async (confirm: boolean) => {
        resolve(confirm);
      });
    });
  }

  createWarningDialog(title: string, message: string) {
    swal({
      title: title,
      text: message,
      icon: 'warning',
    });
  }

  createErrorDialog(title: string, message: string) {
    swal({
      title: title,
      text: message,
      icon: 'error',
    });
  }

  createSuccessDialog(title: string, message: string) {
    swal({
      title: title,
      text: message,
      icon: 'success',
    });
  }

  createSuccessDialogWithAction(
    title: string,
    message: string,
    action: Function
  ) {
    swal({
      title: title,
      text: message,
      icon: 'success',
      buttons: {
        confirm: {
          text: 'Ok',
          value: true,
          visible: true,
          className: '',
          closeModal: true,
        },
      },
    }).then(async (ok: boolean) => {
      action();
    });
  }
}
