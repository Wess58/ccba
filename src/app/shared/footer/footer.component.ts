import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';

import { EN_NAV_TITLES, FR_NAV_TITLES, PATHS, EN_FOOTER, FR_FOOTER } from "../../app.constants";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
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
export class FooterComponent implements OnInit {

  addressInfo: any = [];
  enNavTitles: string[] = EN_NAV_TITLES;
  frNavTitles: string[] = FR_NAV_TITLES;
  paths: string[] = PATHS;
  links: any[] = [];
  currentLang = 'EN';
  year = new Date().getFullYear();

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.currentLang = localStorage.getItem('lang') ?? 'EN';

    this.addressInfo = this.currentLang === 'EN' ? EN_FOOTER : FR_FOOTER;
    this.constructLinks(this.currentLang);

  }


  constructLinks(language: string): void {
    this.links = [];

    for (let i = 0; i < 3; i++) {
      const linkObj: any = {
        title: language === 'EN' ? this.enNavTitles[i] : this.frNavTitles[i],
        path: this.paths[i]
      };

      this.links.push(linkObj);
    }
  }



}
