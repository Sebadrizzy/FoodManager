import { inject, Injectable } from '@angular/core';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class Utils {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);

  ///// Loading /////
  loading(){
    return this.loadingCtrl.create({spinner: 'circles', cssClass: 'custom-loading'});
  }

  ///// Toast /////
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }


}
