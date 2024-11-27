import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  constructor(private router: Router ){}

  userEmail!: String;

  ngOnInit(): void {
    this.userEmail="me@mail.com"
  }

  OnContinue(): void {
    this.router.navigateByUrl('facesnaps')
  }

  OnSubmitForm(form: NgForm){
    console.log(form.value.userEmail);
  }

}
