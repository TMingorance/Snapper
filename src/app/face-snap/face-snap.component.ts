import { Component, OnInit, Input } from '@angular/core';
import { FaceSnap } from '../models/face-snap';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})
export class FaceSnapComponent implements OnInit{

  @Input() faceSnapInstance!: FaceSnap;

  snapped!: boolean;
  snapButtonText!: string;

  ngOnInit(): void {
    this.snapped = false;
    this.snapButtonText = "Oh Snap!";
  }

  onSnap(): void {
    this.snapped ? this.faceSnapInstance.snaps -- : this.faceSnapInstance.snaps ++;
    this.snapped = !this.snapped;
    this.changeSnapText();
  }

  changeSnapText(): void{
    this.snapButtonText = this.snapped ? "Oops UnSnap!" : "Oh Snap!";
  }


}
