import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgStyle, NgClass, TitleCasePipe, DatePipe, PercentPipe, DecimalPipe, CurrencyPipe, AsyncPipe } from '@angular/common';
import { FaceSnap } from '../models/face-snap';
import { FaceSnapsService } from '../services/face-snaps.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-single-face-snap',
  standalone: true,
  imports: [RouterLink,
    NgStyle, NgClass, TitleCasePipe, DatePipe, PercentPipe, DecimalPipe, CurrencyPipe, AsyncPipe],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss',
  schemas: []
})
export class SingleFaceSnapComponent implements OnInit{

  @Input() faceSnapPreview!: FaceSnap; //for previews

  faceSnapInstance$!: Observable<FaceSnap>;

  snapped!: boolean;
  snapButtonText!: string;
  preview!: boolean; //!This component is also used as preview when creating a new faceSnap

  constructor (private faceSnapsService: FaceSnapsService,
              private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.snapped = false;
    this.snapButtonText = "Oh Snap!";
    console.log("faceSnap preview instance = " + this.faceSnapPreview);
    if (this.faceSnapPreview === undefined || (this.faceSnapPreview !== undefined && this.faceSnapPreview.id !== "0")){
      this.faceSnapInstance$ = this.faceSnapsService.findFaceSnap(this.activatedRoute.snapshot.params["id"]);
      console.log(this.activatedRoute.snapshot.params["id"])
      this.preview = false;
    }
    else{
      this.faceSnapInstance$ = of(this.faceSnapPreview);
      this.preview = true;
      console.log("preview mode")
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.faceSnapInstance$ = of(changes['faceSnapPreview'].currentValue);
  }

  onSnap(): void {
    if (!this.preview){//if the faceSnap is not a preview, else : the button does nothing and should not appear
      this.faceSnapInstance$ = this.faceSnapsService.SnapActionOnFaceSnap(this.activatedRoute.snapshot.params["id"], this.snapped ? 'unsnap' : 'snap');
      this.snapped = !this.snapped;
      this.changeSnapText();
    }
  }

  changeSnapText(): void{
    this.snapButtonText = this.snapped ? "Oops UnSnap!" : "Oh Snap!";
  }



}
