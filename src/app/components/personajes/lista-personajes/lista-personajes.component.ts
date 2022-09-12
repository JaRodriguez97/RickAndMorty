import { Component, OnInit } from '@angular/core';
import { Personaje } from '@app/models/personaje';
import { QueryServiceService } from '@app/services/query-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lista-personajes',
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.css'],
})
export class ListaPersonajesComponent implements OnInit {
  personajes$!: Observable<Personaje[]>;
  faHourglassStart = faHourglassStart;

  constructor(private queryServiceService: QueryServiceService) {}

  ngOnInit(): void {
    this.personajes$ = this.queryServiceService.personajes$;
  }
}
