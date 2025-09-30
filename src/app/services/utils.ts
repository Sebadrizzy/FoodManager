import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class Utils {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  modalCtrl = inject(ModalController);
  router = inject(Router);


  async takePicture(promptLabelHeader: string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: 'Selecciona una imagen',
      promptLabelPicture: 'Tomar una foto'
    });
  };

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


  /// Modal ////
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalCtrl.create(opts);
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) return data;
  }


  dissmissModal(data?: any) {
    return this.modalCtrl.dismiss(data);
  }

}
