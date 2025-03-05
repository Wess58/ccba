import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { EN_NAV_TITLES, FR_NAV_TITLES, PATHS } from "../../app.constants";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
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
export class NavbarComponent implements OnInit {


  showNavbarOnScroll = true;
  morphNavbar = false;
  prevScrollPos = window.pageYOffset;
  changeIcon = false;
  enNavTitles: string[] = EN_NAV_TITLES;
  frNavTitles: string[] = FR_NAV_TITLES;
  paths: string[] = PATHS;
  links: any[] = [];
  currentLang = 'EN';
  langFlags: any[] = [
    {
      icon: "assets/images/en-icon.png",
      title: "EN",
      alt: "English"
    },
    {
      icon: "assets/images/fr-icon.png",
      title: "FR",
      alt: "French"
    }
  ];


  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    // console.log($event);
    // console.log("scrolling", window.pageYOffset);
    if (window.innerWidth > 770 && (window.pageYOffset / window.innerHeight * 100) > 100) {
      // const currentScrollPos = window.pageYOffset;
      // this.showNavbarOnScroll = this.prevScrollPos > currentScrollPos;
      // this.prevScrollPos = currentScrollPos;
    } else {
      this.showNavbarOnScroll = true;
    }

    this.morphNavbar = window.innerWidth > 770 ? (window.pageYOffset / window.innerHeight * 100) > 40 : true;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.currentLang = localStorage.getItem('lang') ?? 'EN';
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


  selectLang(lang: string): void {
    this.currentLang = lang;
    localStorage.setItem('lang', lang);

    setTimeout(() => {
      location.reload();
    }, 10);
  }


}
