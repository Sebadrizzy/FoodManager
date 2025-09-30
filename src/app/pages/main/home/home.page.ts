import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { User } from 'firebase/auth';
import { Product } from 'src/app/models/products.model';
import { FirebaseService } from 'src/app/services/firebase';
import { Utils } from 'src/app/services/utils';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent] // No es necesario AddUpdateProductComponent aquí
})
export class HomePage implements OnInit {

  firebaseService = inject(FirebaseService);
  utilsSvc = inject(Utils);

  products: any[] = [];

  ngOnInit() {
    this.getProducts();
  }

  ionViewWillEnter() {
    this.getProducts();
  }

  // ====== Obtener usuario del localStorage de forma segura ======
  user(): User | null {
    return this.utilsSvc.getfromLocalStorage('user');
  }

  // ====== Obtener productos ======
  getProducts() {
    const currentUser = this.user();
    if (!currentUser) {
      console.warn('No hay usuario en localStorage');
      this.products = [];
      return;
    }

    let path = `users/${currentUser.uid}/products`;

    this.firebaseService.getCollectionData(path)
      .then((res: any) => {
        console.log(res);
        this.products=res;
        this.products = res;
      })
      .catch(err => {
        console.error('Error al obtener productos:', err);
      });
  }

  /// abre el modal para agregar o actualizar un producto ////
  addUpdateProduct(product?: Product) {
    this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal',
      componentProps: {product}
    });
  }


  /// elimina un producto de la lista ////
  deleteProduct(p: any) {
    const index = this.products.indexOf(p);
    if (index > -1) {
      this.products.splice(index, 1);
      // Actualizar localStorage si lo usas
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  }
}
