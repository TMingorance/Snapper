import { Component, OnInit } from '@angular/core';
import { FaceSnapComponent } from './face-snap/face-snap.component';
import { FaceSnap } from './models/face-snap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FaceSnapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  mySnapArray!: FaceSnap[];

  ngOnInit(){
    this.mySnapArray = [
      new FaceSnap("Archibald",
      "Il est archi chauve !",
      new Date (),
      0,
      'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg'),

      new FaceSnap("Me",
      "C'est moi !",
      new Date (),
      100,
      'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg'),

      new FaceSnap("You",
      "C'est toi !",
      new Date (),
      200,
      'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg')
    ];

    this.mySnapArray[2].location = "À la mer";
  }
  
}
