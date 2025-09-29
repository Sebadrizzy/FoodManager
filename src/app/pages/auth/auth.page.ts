import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { CustomInputComponent } from 'src/app/shared/components/custom-input/custom-input.component';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { FirebaseService } from 'src/app/services/firebase';
import { User } from 'src/app/models/user.model';
import { Utils } from 'src/app/services/utils';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HeaderComponent, CustomInputComponent, LogoComponent]
})
export class AuthPage implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private firebaseSvc: FirebaseService) {}
  utilsSvc = inject(Utils);

  ngOnInit(): void {
  }


  async submit() {
    if (!this.form.valid) return;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    const credentials = this.form.value as User;

    try {
      const res = await this.firebaseSvc.signIn(credentials);
      this.getUserInfo(res.user.uid);
    } catch (err: any) {
      console.error('Sign in error:', err);
      this.utilsSvc.presentToast({
        message: err.message,
        duration: 3000,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline'
      });
    } finally {
      loading.dismiss();
    }
  }

  get email(): FormControl {
    return this.form.controls['email'] as FormControl;
  }

  get password(): FormControl {
    return this.form.controls['password'] as FormControl;
  }


  async getUserInfo(uid: string) {

  if (!this.form.valid) return;

  const loading = await this.utilsSvc.loading();
  await loading.present();

  let path = `Users/${uid}`;

  this.firebaseSvc.getDocument(path).then((user: User | undefined) => {
    this.utilsSvc.saveinLocalStorage('user', user);
    this.utilsSvc.routerlink('/main/home');
    this.form.reset();

    let welcomeMessage = 'Te damos la bienvenida';
    if (user && user.name) {
      welcomeMessage += `, ${user.name}`;
    } else {
      welcomeMessage += ' usuario';
    }

    this.utilsSvc.presentToast({
      message: welcomeMessage,
      duration: 2000,
      color: 'primary',
      position: 'middle',
      icon: 'person-circle-outline'
    });

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
  