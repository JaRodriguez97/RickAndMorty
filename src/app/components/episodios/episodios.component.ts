import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Episodio } from '@app/models/episodio';
import { QueryServiceService } from '@app/services/query-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-episodios',
  templateUrl: './episodios.component.html',
  styleUrls: ['./episodios.component.css'],
})
export class EpisodiosComponent implements OnInit {
  episodios$!: Observable<Episodio[]>;
  pageCount: number = 1;
  paramId!: number;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private queryServiceService: QueryServiceService,
    public activedRoute: ActivatedRoute,
    private spinnerService: NgxSpinnerService
  ) {}

  // Despliegue nuevos campos al hacer scroll
  @HostListener('window:scroll')
  scrolling(): void {
    let spinnerOn = this.spinnerService.spinnerObservable.value.show;

    if (
      (window.pageYOffset > 700 * this.pageCount ||
        this.document.documentElement.scrollTop > 700 * this.pageCount) &&
      !spinnerOn
    ) {
      this.pageCount++;
      this.queryServiceService.chargeEpisodes(this.pageCount);
    }
  }

  // Validación parámetros url
  ngOnInit(): void {
    this.paramId = this.activedRoute.snapshot.params['id'];
    if (this.paramId.toString() != 'all')
      this.queryServiceService.getQueryEpisodesCharacter(this.paramId);
    else this.queryServiceService.getQueryEpisodes();
    this.episodios$ = this.queryServiceService.episodios$;
  }
}
