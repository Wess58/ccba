import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';

import contentEN from "../../../assets/jsons/en-sectors-content.json";
import contentFR from "../../../assets/jsons/fr-sectors-content.json";

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrl: './sectors.component.scss',
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
export class SectorsComponent implements OnInit {

  content: any = contentEN;
  currentLang = 'EN';

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
    window.scrollTo({ top: 1, behavior: "smooth" });

    this.currentLang = localStorage.getItem('lang') ?? 'EN';
    this.content = this.currentLang === 'EN' ? contentEN : contentFR;

  }


  scrollToElement(id: string): void {
    const element = document.getElementById(id) as HTMLElement;
    element?.scrollIntoView({ block: "start", behavior: "smooth" });
  }


}