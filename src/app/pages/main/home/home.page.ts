import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class HomePage implements OnInit {

  firebaseService = inject(FirebaseService);
  utilsSvc = inject(Utils);

  ngOnInit() {
  }

  ///// cerrar sesion /////
  signOut() {
    this.firebaseService.signOut();
  }

}
