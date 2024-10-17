import { Component, OnInit, Input } from '@angular/core';
import { NgStyle, NgClass, TitleCasePipe, DatePipe, PercentPipe, DecimalPipe, CurrencyPipe } from '@angular/common';
import { FaceSnap } from '../models/face-snap';
import { FaceSnapsService } from '../services/face-snaps.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-single-face-snap',
  standalone: true,
  imports: [RouterLink,
    NgStyle, NgClass, TitleCasePipe, DatePipe, PercentPipe, DecimalPipe, CurrencyPipe],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss'
})
export class SingleFaceSnapComponent implements OnInit{

  faceSnapInstance!: FaceSnap;

  snapped!: boolean;
  snapButtonText!: string;

  constructor (private faceSnapsService: FaceSnapsService,
              private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.snapped = false;
    this.snapButtonText = "Oh Snap!";

    this.faceSnapInstance = this.faceSnapsService.findFaceSnap(this.activatedRoute.snapshot.params["id"]);
  }

  onSnap(): void {
    this.faceSnapsService.SnapActionOnFaceSnap(this.faceSnapInstance.id, this.snapped ? 'unsnap' : 'snap');
    this.snapped = !this.snapped;
    this.changeSnapText();
  }

  changeSnapText(): void{
    this.snapButtonText = this.snapped ? "Oops UnSnap!" : "Oh Snap!";
  }



}
