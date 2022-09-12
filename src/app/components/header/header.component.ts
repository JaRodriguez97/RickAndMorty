import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  header: HTMLElement | null | undefined;
  menuToggle: Element | null | undefined;
  menu: Element | null | undefined;

  constructor() {
    window.addEventListener('scroll', () => {
      this.header = document.querySelector('header')!;
      this.header.classList.toggle('sticky', window.scrollY > 0);
    });
  }

  ngOnInit(): void {}

  toogleMenu(): void {
    this.menuToggle = document.querySelector('.toggle')!;
    this.menu = document.querySelector('.menu')!;
    this.menuToggle.classList.toggle('active');
    this.menu.classList.toggle('active');
    window.scrollY = 0;
    console.log(window.scrollY);
  }
}
