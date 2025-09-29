import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
