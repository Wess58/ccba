import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { EN_CONTACT_HEADER, FR_CONTACT_HEADER, EN_CONTACT_FORM, FR_CONTACT_FORM } from "../../app.constants";
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
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
export class ContactComponent implements OnInit {

  content: any = EN_CONTACT_HEADER;
  formTitles: any = EN_CONTACT_FORM;
  currentLang = 'EN';

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
    window.scrollTo({ top: 1, behavior: "smooth" });

    this.currentLang = localStorage.getItem('lang') ?? 'EN';
    this.content = this.currentLang === 'EN' ? EN_CONTACT_HEADER : FR_CONTACT_HEADER;
    this.formTitles = this.currentLang === 'EN' ? EN_CONTACT_FORM : FR_CONTACT_FORM;

  }

}
