import { Personaje } from '@app/models/personaje';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.css'],
})
export class PersonajeComponent implements OnInit {
  @Input() personaje!: Personaje;
  constructor() {}

  ngOnInit(): void {}
}
