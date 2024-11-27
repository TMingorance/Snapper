import { Routes } from '@angular/router';
import { FaceSnapListComponent } from './face-snap-list/face-snap-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SingleFaceSnapComponent } from './single-face-snap/single-face-snap.component';
import { NewFaceSnapComponent } from './new-face-snap/new-face-snap.component';

export const routes: Routes = [
    {path: "facesnaps", component: FaceSnapListComponent}, 
    {path: "facesnap/:id", component: SingleFaceSnapComponent},
    {path: "create", component: NewFaceSnapComponent},
    {path: "", component: LandingPageComponent}
];
