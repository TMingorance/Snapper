import { Component, OnInit, Input } from '@angular/core';
import { NgStyle, NgClass, TitleCasePipe, DatePipe, PercentPipe, DecimalPipe, CurrencyPipe } from '@angular/common';
import { FaceSnap } from '../models/face-snap';
import { FaceSnapsService } from '../services/face-snaps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [NgStyle, NgClass, TitleCasePipe, DatePipe, PercentPipe, DecimalPipe, CurrencyPipe],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})
export class FaceSnapComponent implements OnInit{

  @Input() faceSnapInstance!: FaceSnap;

  snapped!: boolean;
  snapButtonText!: string;

  constructor (private faceSnapsService: FaceSnapsService,
              private router: Router
  ){}

  ngOnInit(): void {
    this.snapped = false;
    this.snapButtonText = "Oh Snap!";
  }

  onSnap(): void {
    this.faceSnapsService.SnapActionOnFaceSnap(this.faceSnapInstance.id, this.snapped ? 'unsnap' : 'snap');
    this.snapped = !this.snapped;
    this.changeSnapText();
  }

  changeSnapText(): void{
    this.snapButtonText = this.snapped ? "Oops UnSnap!" : "Oh Snap!";
  }

  
  onViewFaceSnap(): void{
    this.router.navigate([`/facesnap/${this.faceSnapInstance.id}`])
  }

}
