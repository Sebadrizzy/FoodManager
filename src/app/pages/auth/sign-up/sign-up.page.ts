import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { CustomInputComponent } from 'src/app/shared/components/custom-input/custom-input.component';
import { LogoComponent } from 'src/app/shared/components/logo/logo.component';
import { FirebaseService } from 'src/app/services/firebase';
import { User } from 'src/app/models/user.model';
import { Utils } from 'src/app/services/utils';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
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

export class SignUpPage implements OnInit {
  title = 'Registro';

  form: FormGroup = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  get name() {
    return this.form.get('name') as FormControl;
  }
  get email() {
    return this.form.get('email') as FormControl;
  }
  get password() {
    return this.form.get('password') as FormControl;
  }

  constructor(private firebaseSvc: FirebaseService) { }
  utilsSvc = inject(Utils);

  ngOnInit(): void {
  }


  async submit() {

    if (!this.form.valid) return;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    this.firebaseSvc.signUp(this.form.value as User).then(async res => {

      await this.firebaseSvc.updatrUser(this.form.value.name);

      let uid = res.user.uid;
      (this.form.get('uid') as FormControl).setValue(uid);
      this.setUserInfo(uid);
      

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

  async setUserInfo(uid: string) {

    if (!this.form.valid) return;

    const loading = await this.utilsSvc.loading();
    await loading.present();

    let path = `Users/${uid}`;

    delete this.form.value.password;

    this.firebaseSvc.setDocument(path, this.form.value).then(async res => {

      this.utilsSvc.saveinLocalStorage('user', this.form.value);
      this.utilsSvc.routerlink('/main/home');
      this.form.reset();
      
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