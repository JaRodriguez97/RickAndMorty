import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  header!: HTMLElement;
  menuToggle!: Element;
  menu!: Element;

  constructor() {}

  // agregamos clase sticky al header al hacer scroll
  @HostListener('window:scroll')
  scrolling(): void {
    this.header = document.querySelector('header')!;
    this.header.classList.toggle('sticky', window.scrollY > 0);
  }

  ngOnInit(): void {}

  // Menú toggle
  toogleMenu(): void {
    this.menuToggle = document.querySelector('.toggle')!;
    this.menu = document.querySelector('.menu')!;
    this.menuToggle.classList.toggle('active');
    this.menu.classList.toggle('active');
  }
}
