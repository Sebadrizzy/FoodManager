import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-sign-up',
  template: `<app-header [title]="title"></app-header>
<ion-content>
  <!-- contenido de la página aquí -->
</ion-content>`,
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class SignUpPage implements OnInit {
  title = 'Registro';

  constructor() { }

  ngOnInit() {
  }

}
