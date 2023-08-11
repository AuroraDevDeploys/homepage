import { Component , HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isTransparent: boolean = true;
  private index:string="";

  constructor(private router: Router) {
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
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.clientHeight;

      if (currentPosition >= sectionTop && currentPosition < sectionBottom) {
        currentSection = section;
      }
    });

    if (currentSection) {
      const cs:HTMLElement=currentSection as HTMLElement;
      this.index=cs.id;
      this.isTransparent =  scrollY <= 490 &&(this.index === 'principal'|| this.index === '');
    }
  }


}
