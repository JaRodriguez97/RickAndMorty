import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Localizacion } from '@app/models/localizacion';
import { QueryServiceService } from '@app/services/query-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-localizacion',
  templateUrl: './localizacion.component.html',
  styleUrls: ['./localizacion.component.css'],
})
export class LocalizacionComponent implements OnInit {
  localizacion$!: Observable<Localizacion[]>;
  paramId!: number;

  constructor(
    private queryServiceService: QueryServiceService,
    public activedRoute: ActivatedRoute,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.localizacion$ = this.queryServiceService.localizacion$;

    this.paramId = this.activedRoute.snapshot.params['id'];
    if (this.paramId.toString() != 'all')
      this.queryServiceService.getQueryLocalizationCharacter(this.paramId);
    // else this.queryServiceService.getQueryEpisodes();
    this.localizacion$ = this.queryServiceService.localizacion$;
    this.spinnerService.hide();
  }
}
