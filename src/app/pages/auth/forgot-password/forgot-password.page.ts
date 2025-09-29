import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { CustomInputComponent } from 'src/app/shared/components/custom-input/custom-input.component';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { Utils } from 'src/app/services/utils';
import { FirebaseService } from 'src/app/services/firebase';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    CustomInputComponent,
    LogoComponent
  ]
})
export class ForgotPasswordPage implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  utilsSvc = inject(Utils); // <-- Agrega esto
  firebaseSvc = inject(FirebaseService); // <-- Agrega esto si usas firebaseSvc

  constructor() {}

  ngOnInit(): void {}

  get email(): FormControl {
    return this.form.controls['email'] as FormControl;
  }

async submit(): Promise<void> {
  if (this.form.valid) {
    const loading = await this.utilsSvc.loading();
    await loading.present();

    const email = this.form.value.email;

    await this.firebaseSvc.getUserByEmail(email)
      .then(user => {
        if (!user) {
          this.utilsSvc.presentToast({
            message: 'No existe una cuenta asociada a ese correo.',
            duration: 2000,
            color: 'danger',
            position: 'middle',
            icon: 'alert-circle-outline'
          });
        }

        return this.firebaseSvc.sendRecoveryEmail(email)
          .then(() => {
            this.utilsSvc.presentToast({
              message: 'Correo enviado correctamente',
              duration: 1500,
              color: 'primary',
              position: 'middle',
              icon: 'mail-outline'
            });
            this.utilsSvc.routerlink('/auth');
            this.form.reset();
          })
          .catch(err => {
            console.error('Error enviando el correo:', err);
            this.utilsSvc.presentToast({
              message: err.message,
              duration: 3000,
              color: 'danger',
              position: 'middle',
              icon: 'alert-circle-outline'
            });
          });
      })
      .catch(err => {
        console.error('Error buscando usuario:', err);
        this.utilsSvc.presentToast({
          message: 'No existe una cuenta asociada a ese correo.',
          duration: 3000,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'
        });
      })
      .finally(() => {
        loading.dismiss();
      });
  }
  return;
}
}

