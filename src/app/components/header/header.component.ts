import { Component , HostListener, Renderer2, OnChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  isTransparent: boolean = true;
  private index:string="";

  constructor(private router: Router, private renderer: Renderer2) {
    this.isTransparent=this.validateTransparent(0)
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.index=String(event.url).split("#")[1] || "";
      }
    });
  }
  


  isActive(fragment: string):boolean{
    return (this.index === fragment);
  }


  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollY = window.scrollY;

    const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
    const sections = document.querySelectorAll('section'); // Cambia el selector según tu estructura HTML

    let currentSection = null;

    sections.forEach((section: HTMLElement) => {
      const sectionTop = section.offsetTop-100;
      const sectionBottom = sectionTop + section.clientHeight;

      if (currentPosition >= sectionTop && currentPosition < sectionBottom) {
        currentSection = section;
      }
    });

    if (currentSection) {
      const cs:HTMLElement=currentSection as HTMLElement;
      this.index=cs.id;
      this.isTransparent =  this.validateTransparent(scrollY);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const scrollY = window.scrollY;
    this.isTransparent=this.validateTransparent(scrollY);
  }


  validateTransparent(scrollY:number):boolean{
    if (this.ismobile()) {
      return false;
    }else{
      return scrollY <= 200 && (this.index === 'principal'|| this.index === '');;
    }
  }

  ismobile(): boolean {
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    this.renderer.setProperty(document.body, 'data-screen-small', mediaQuery.matches);
    return mediaQuery.matches;
  }
}
