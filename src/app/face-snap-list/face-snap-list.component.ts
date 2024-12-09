import { Component } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { FaceSnapComponent } from '../face-snap/face-snap.component';
import { FaceSnapsService } from '../services/face-snaps.service';
import { interval, tap, take, Subject, takeUntil, Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-face-snap-list',
  standalone: true,
  imports: [FaceSnapComponent, AsyncPipe],
  templateUrl: './face-snap-list.component.html',
  styleUrl: './face-snap-list.component.scss'
})
export class FaceSnapListComponent {

  frontFaceSnaps!: FaceSnap[];
  faceSnaps$!: Observable <FaceSnap[]>
  private destroy$!: Subject<boolean>;

  constructor (private faceSnapsService: FaceSnapsService){}

  ngOnInit(){
    this.faceSnaps$ = this.faceSnapsService.getFaceSnaps();
    //Comments: destroying an observable when another one emits
    /*
    this.destroy$ = new Subject<boolean>();
    interval(1000).pipe(tap(console.log), takeUntil(this.destroy$)).subscribe();*/
  }
/*
  ngOnDestroy(){
    console.log("Destroy!!!")
    this.destroy$.next(true);
    this.destroy$.complete();
  }
*/
}
