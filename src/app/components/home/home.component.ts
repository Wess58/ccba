import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';

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

  @ViewChild('video') elementRef!:ElementRef; 


  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
    window.scrollTo({ top: 1, behavior: "smooth" });
    this.checkIfRouteIsEmpty();


    this.currentLang = localStorage.getItem('lang') ?? 'EN';
    this.content = this.currentLang === 'EN' ? contentEN : contentFR;

  }

  ngAfterViewInit():void{
    this.elementRef.nativeElement.play();
    this.elementRef.nativeElement.muted = true;

    // (canplay) = "video.play()"(loadedmetadata) = "video.muted = true"
  }

  checkIfRouteIsEmpty(): void {
    if (this.router.url.length === 1) {
      this.router.navigate(['/home'], {
        relativeTo: this.activatedRoute,
        queryParams: {
          // search: this.searchTerm.trim(),
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  duplicateIcons(icons: any[]): any {
    return [...icons, ...icons];
  }

  scrollToElement(id: string): void {
    const element = document.getElementById(id) as HTMLElement;
    element?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

}
