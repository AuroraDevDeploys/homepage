import { Component , HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isTransparent: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      
      if (event instanceof NavigationEnd) {
        console.log(event.url );
        this.isTransparent = (event.url === '/home#principal'||event.url === '/home');
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollY = window.scrollY;
    this.isTransparent = scrollY <= 400 && (this.router.url === '/home#principal'||this.router.url === '/home');
  }


}
