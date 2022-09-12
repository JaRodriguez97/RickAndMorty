import { Component, OnInit } from '@angular/core';
import { Episodio } from '@app/models/episodio';
import { QueryServiceService } from '@app/services/query-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-episodios',
  templateUrl: './episodios.component.html',
  styleUrls: ['./episodios.component.css'],
})
export class EpisodiosComponent implements OnInit {
  episodios$!: Observable<Episodio[]>;

  constructor(
    private queryServiceService: QueryServiceService
  ) // private spinnerService: NgxSpinnerService
  {}

  ngOnInit(): void {
    this.episodios$ = this.queryServiceService.episodios$;
  }
}
