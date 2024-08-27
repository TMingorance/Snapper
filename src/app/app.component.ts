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
  mySnap!: FaceSnap;
  my2ndSnap!: FaceSnap;
  my3rdSnap!: FaceSnap;

  ngOnInit(){
    this.mySnap = new FaceSnap("Archibald",
      "Il est archi chauve !",
      new Date (),
      0,
      'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg');

      this.my2ndSnap = new FaceSnap("Me",
        "C'est moi !",
        new Date (),
        2,
        'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg');

        this.my3rdSnap = new FaceSnap("You",
          "C'est toi !",
          new Date (),
          4,
          'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg');
  }
  
}
