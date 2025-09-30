
import { HeaderComponent } from '../header/header.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomInputComponent } from 'src/app/shared/components/custom-input/custom-input.component';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { FirebaseService } from 'src/app/services/firebase';
import { User } from 'src/app/models/user.model';
import { Utils } from 'src/app/services/utils';
import { Product } from 'src/app/models/products.model';


@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    HeaderComponent,
    CustomInputComponent
  ]
})
export class AddUpdateProductComponent implements OnInit {
  @Input() product: Product;

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    Price: new FormControl('', [Validators.required, Validators.min(0)]),
    image: new FormControl('', [Validators.required]),
    soldUnits: new FormControl('', [Validators.required, Validators.min(0)])
  });

  get name() {
    return this.form.get('name') as FormControl;
  }

  get Price() {
    return this.form.get('Price') as FormControl;
  }

  get soldUnits() {
    return this.form.get('soldUnits') as FormControl;
  }


  constructor(private firebaseSvc: FirebaseService) { }
  utilsSvc = inject(Utils);

  user = {} as User;

  ngOnInit(): void {

    this.user = this.utilsSvc.getfromLocalStorage('user');
    if(this.product) this.form.setValue(this.product);
  }

  /// Tomar/Seleccionar foto ////
  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('Imagen para el producto')).dataUrl;
    this.form.controls['image'].setValue(dataUrl);
  }

  submit() {
    if (this.form.invalid) {
      if(this.product) this.updateProduct();
      else this.createProduct();
    }
  }


  /// Crear producto ////
  async createProduct() {


      let path = `users/${this.user.uid}/products`

      const loading = await this.utilsSvc.loading();
      await loading.present();

      // === Subir la imagen y obtener la url ===
      let dataUrl = this.form.value.image;
      let imagePath = `${this.user.uid}/${Date.now()}`;
      let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
      this.form.controls['image'].setValue(imageUrl);

      delete this.form.value.id

      this.firebaseSvc.addDocument(path, this.form.value).then(async res => {

        this.utilsSvc.dissmissModal({ success: true });

        this.utilsSvc.presentToast({
          message: 'Producto creado exitosamente',
          duration: 1500,
          color: 'success',
          position: 'middle',
          icon: 'checkmark-circle-outline'
        })
      }).catch((err: any) => {
        console.error(err);
        this.utilsSvc.presentToast({
          message: err.message,
          duration: 3000,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        loading.dismiss();
      });
    


  }


  /// actualiza producto ////
  async updateProduct() {
  

      let path = `users/${this.user.uid}/products/${this.product.id}`

      const loading = await this.utilsSvc.loading();
      await loading.present();

      // === Subir la imagen y obtener la url ===
      if(this.form.value.image !== this.product.image) {
        let dataUrl = this.form.value.image;
        let imagePath = await this.firebaseSvc.getFilePath(this.product.image);
        let imageUrl = await this.firebaseSvc.uploadImage(imagePath, dataUrl);
        this.form.controls['image'].setValue(imageUrl);
      }

      delete this.form.value.id

      this.firebaseSvc.updateDocument(path, this.form.value).then(async res => {

        this.utilsSvc.dissmissModal({ success: true });

        this.utilsSvc.presentToast({
          message: 'Producto actualizado exitosamente',
          duration: 1500,
          color: 'success',
          position: 'middle',
          icon: 'checkmark-circle-outline'
        })
      }).catch((err: any) => {
        console.error(err);
        this.utilsSvc.presentToast({
          message: err.message,
          duration: 3000,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        loading.dismiss();
      });
    


  }
}
