import { Injectable } from '@angular/core';
import { Ng2IzitoastService } from 'ng2-izitoast';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private toasterConfig = {
    id: null,
    class: '',
    title: '',
    titleColor: '',
    titleSize: '',
    titleLineHeight: '',
    message: '',
    messageColor: '',
    messageSize: '',
    messageLineHeight: '',
    backgroundColor: '',
    theme: 'light', // dark
    color: '', // blue, red, green, yellow
    icon: '',
    iconText: '',
    iconColor: '',
    image: '',
    imageWidth: 50,
    maxWidth: null,
    zindex: null,
    layout: 1,
    balloon: false,
    close: true,
    closeOnEscape: false,
    closeOnClick: false,
    rtl: false,
    position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
    target: '',
    targetFirst: true,
    toastOnce: false,
    timeout: 5000,
    animateInside: true,
    drag: true,
    pauseOnHover: true,
    resetOnHover: false,
    progressBar: true,
    progressBarColor: '',
    progressBarEasing: 'linear',
    overlay: false,
    overlayClose: false,
    overlayColor: 'rgba(0, 0, 0, 0.6)',
    transitionIn: 'bounceInDown',
    transitionOut: 'fadeOutUp',
    transitionInMobile: 'bounceInDown',
    transitionOutMobile: 'fadeOutUp',
    buttons: {},
    inputs: {},
    onOpening: function () { },
    onOpened: function () { },
    onClosing: function () { },
    onClosed: function () { }
  }

  constructor(public iziToast: Ng2IzitoastService) { }

  showError(errors) {
    let config = {
      color: 'red',
      icon: 'ico-error',
      title: 'Error',
      message: errors, 
    }

    //Merge default config with error config
    this.toasterConfig = { ...this.toasterConfig, ...config };

    this.iziToast.show(this.toasterConfig);
  }

  showSuccess(msg) {
    let config = {
      color: 'green',
      icon: 'ico-success',
      title: 'Success',
      message: msg,
    }

    //Merge default config with error config
    this.toasterConfig = { ...this.toasterConfig, ...config };

    this.iziToast.show(this.toasterConfig);
  }

  decodeError(httpErrors): Object {
    let errorObject = httpErrors.error;
    let errorMsg = "";

    for (let error in errorObject.errors) {
      for (let listErrorMsg in errorObject.errors[error]) {
        errorMsg = errorObject.errors[error][listErrorMsg];
      }
    }

    return errorMsg;
  }
}
