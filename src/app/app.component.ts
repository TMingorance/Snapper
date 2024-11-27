import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "./header/header.component"
import { RouterLink, RouterOutlet } from '@angular/router';
import { interval, of, concatMap, mergeMap, delay, exhaustMap, map, switchMap, take, tap, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


  //Test pour un quizz d'OpenClassrooms
  /*
processMessage$(message: number){
  return interval(3000).pipe(take(1), tap(value => console.log("processed " + message.toString())));
}

ngOnInit(){
  interval(1000).pipe(take(3), tap(console.log), concatMap(this.processMessage$)).subscribe();
  
}
*/
//Test sur les observables et opérateurs high-level
/*

  redTrainsCalled = 0;
  yellowTrainsCalled = 0;

  ngOnInit() {
    interval(500).pipe(
      take(10),
      map(value => value % 2 === 0 ? 'rouge' : 'jaune'),
      tap(color => console.log(`La lumière s'allume en %c${color}`, `color: ${this.translateColor(color)}`)),
      switchMap(this.getTrainObservable$),
      tap(train => console.log(`Train %c${train.color} ${train.trainIndex} arrivé !`, `font-weight: bold; color: ${this.translateColor(train.color)}`))
    ).subscribe();
  }

  getTrainObservable$(color: 'rouge' | 'jaune') {
    const isRedTrain = color === 'rouge';
    isRedTrain ? this.redTrainsCalled++ : this.yellowTrainsCalled++;
    const trainIndex = isRedTrain ? this.redTrainsCalled : this.yellowTrainsCalled;
    console.log(`Train %c${color} ${trainIndex} appelé !`, `text-decoration: underline; color: ${this.translateColor(color)}`);
    return of({ color, trainIndex }).pipe(
      delay(isRedTrain ? 5000 : 6000)
    );
  }

  translateColor(color: 'rouge' | 'jaune') {
    return color === 'rouge' ? 'red' : 'yellow';
  }
*/
  
  //Tests sur les observables et les operateurs low-level
  /*
  interval$!: Observable<string>

  ngOnInit(){
    this.interval$ = interval(1000).pipe(
      filter(value => value % 3 === 0),
      map(value => value % 2 === 0 ?
      `Je suis ${value}, je suis pair.` :
      `Je suis ${value}, je suis impair.`
      ),
      tap(value => this.logger(value))
    );

  }

  logger(text: string){
    console.log(text);
  }*/
}
