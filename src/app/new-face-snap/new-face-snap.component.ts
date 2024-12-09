import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { FaceSnap } from '../models/face-snap';
import { AsyncPipe } from '@angular/common';
import { SingleFaceSnapComponent } from "../single-face-snap/single-face-snap.component";
import { FaceSnapsService } from '../services/face-snaps.service';
import { Router } from '@angular/router';
import { waitForAsync } from '@angular/core/testing';

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
  urlRegex!: RegExp;

  constructor(private formBuilder: FormBuilder, 
    private faceSnapsService: FaceSnapsService,
    private router: Router){}

  ngOnInit(){
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    this.newSnapForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      pictureUrl: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
      location: [null]
    },
    {
      updateOn: 'blur'
    });
    this.faceSnapPreview$ = this.newSnapForm.valueChanges.pipe(
      map(changedValues => ({
        ...changedValues,
        createdAt : new Date(),
        snaps : 0,
        id : "0"       
      })),
      tap(console.log),
      tap(() => console.log(this.newSnapForm.invalid))
    );
  }

  onSubmitForm(){
    console.log(this.newSnapForm.value);
    this.faceSnapsService.CreateNewFaceSnap(this.newSnapForm.value.title, this.newSnapForm.value.description, this.newSnapForm.value.pictureUrl, this.newSnapForm.value.location)
    .pipe(tap(() => this.router.navigateByUrl("/facesnaps"))).subscribe()
  }

}
