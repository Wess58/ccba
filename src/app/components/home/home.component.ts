import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import contentEN from "../../../assets/jsons/en-home-content.json";
import contentFR from "../../../assets/jsons/fr-home-content.json";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(600, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {

  content: any = contentEN;
  currentLang = 'EN';

  constructor() { }

  ngOnInit(): void {
    window.scrollTo({ top: 1, behavior: "smooth" });

    this.currentLang = localStorage.getItem('lang') ?? 'EN';
    this.content = this.currentLang === 'EN' ? contentEN : contentFR;

  }


  duplicateIcons(icons: any[]): any {
    return [...icons, ...icons];
  }


  scrollToElement(id:string): void {
    const element = document.getElementById(id) as HTMLElement;
    element?.scrollIntoView({ block: "start", behavior: "smooth" });
  }


}
