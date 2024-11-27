import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { FaceSnap } from '../models/face-snap';
import { AsyncPipe } from '@angular/common';
import { SingleFaceSnapComponent } from "../single-face-snap/single-face-snap.component";

@Component({
  selector: 'app-new-face-snap',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, SingleFaceSnapComponent],
  templateUrl: './new-face-snap.component.html',
  styleUrl: './new-face-snap.component.scss'
})
export class NewFaceSnapComponent {

  newSnapForm!: FormGroup;
  faceSnapPreview$!: Observable<FaceSnap>

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(){
    this.newSnapForm = this.formBuilder.group({
      title: [null],
      description: [null],
      pictureUrl: [null],
      location: [null]
    });
    this.faceSnapPreview$ = this.newSnapForm.valueChanges.pipe(
      map(changedValues => ({
        ...changedValues,
        createdAt : new Date(),
        snaps : 0,
        id : "0"       
      }))
    );
  }

  onSubmitForm(){
    console.log(this.newSnapForm.value);
  }

}
