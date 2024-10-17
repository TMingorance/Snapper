import { Component } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { FaceSnapComponent } from '../face-snap/face-snap.component';
import { FaceSnapsService } from '../services/face-snaps.service';

@Component({
  selector: 'app-face-snap-list',
  standalone: true,
  imports: [FaceSnapComponent],
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss'
})
export class FaceSnapListComponent {

  frontFaceSnaps!: FaceSnap[];

  constructor (private faceSnapsService: FaceSnapsService){}

  ngOnInit(){
    this.frontFaceSnaps = this.faceSnapsService.getFaceSnaps();
  }

}
