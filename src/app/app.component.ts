import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "./header/header.component"
import { RouterLink, RouterOutlet } from '@angular/router';
import { interval, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  interval$!: Observable<number>

  ngOnInit(){
    const interval$ = interval(1000);
  }
}
