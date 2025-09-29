import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class Utils {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);

  ///// Loading /////
  loading() {
    return this.loadingCtrl.create({ spinner: 'circles', cssClass: 'custom-loading' });
  }

  ///// Toast /////
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  //// enruta a cualquier pagina disponible ////
  routerlink(url: string) {
    return this.router.navigateByUrl(url);
  }

  /// guarda datos en local storage ////
  saveinLocalStorage(key: string, data: any) {
    return localStorage.setItem(key, JSON.stringify(data));
  }

  /// obtiene datos de local storage ////
  getfromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

}
