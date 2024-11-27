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
  styleUrl: './single-face-snap.component.scss',
  schemas: []
})
export class SingleFaceSnapComponent implements OnInit{

  @Input() faceSnapInstance!: FaceSnap;

  snapped!: boolean;
  snapButtonText!: string;
  preview!: boolean; //!This component is also used as preview when creating a new faceSnap

  constructor (private faceSnapsService: FaceSnapsService,
              private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.snapped = false;
    this.snapButtonText = "Oh Snap!";
    console.log("faceSnapInstance = " + this.faceSnapInstance);
    if (this.faceSnapInstance === undefined){
      this.faceSnapInstance = this.faceSnapsService.findFaceSnap(this.activatedRoute.snapshot.params["id"]);
    }
    this.preview = this.faceSnapInstance.id === "0";
  }

  onSnap(): void {
    if (!this.preview){//if the faceSnap is not a preview, else : the button does nothing
      this.faceSnapsService.SnapActionOnFaceSnap(this.faceSnapInstance.id, this.snapped ? 'unsnap' : 'snap');
      this.snapped = !this.snapped;
      this.changeSnapText();
    }
  }

  changeSnapText(): void{
    this.snapButtonText = this.snapped ? "Oops UnSnap!" : "Oh Snap!";
  }



}
