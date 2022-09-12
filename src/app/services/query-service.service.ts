import { Personaje } from '@app/models/personaje';
import { Episodio } from '@app/models/episodio';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ReplaySubject, take, tap } from 'rxjs';
import { ResCharacter, ResEpisode } from '@app/models/res-data';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class QueryServiceService {
  queryCharacter = `
  {
    characters {
      results {
        id
        name
        status
        species
        type
        gender
        image
        episode {
          name
          id
        }
        location {
          name
          id
        }
        origin {
          id
          name
        }
      }
    }
  }`;

  queryEpisodes = `
  {
    episodes {
      results {
        id
        name
        air_date
        episode
        characters{
          id
          name
          status
          species
          type
          gender
          image
          episode {
            name
            id
          }
          location {
            name
            id
          }
          origin {
            id
            name
          }
        }
      }
    }
  }`;
  // a considerar
  private episodiosSubj = new ReplaySubject<Episodio[]>(1);
  private personajesSubj = new ReplaySubject<Personaje[]>(1);

  episodios$ = this.episodiosSubj.asObservable();
  personajes$ = this.personajesSubj.asObservable();

  constructor(
    private apollo: Apollo,
    private spinnerService: NgxSpinnerService
  ) {
    this.getQueryCharacters();
    this.getQueryEpisodes();
  }

  private getQueryCharacters(): void {
    let query = gql`
      ${this.queryCharacter}
    `;

    this.apollo
      .watchQuery<ResCharacter>({ query })
      .valueChanges.pipe(
        take(1),
        tap(
          (res) => {
            let { data } = res,
              { characters } = data,
              { results } = characters;

            this.personajesSubj.next(results);
          },
          (err) => console.error(err),
          () => this.spinnerService.hide()
        )
      )
      .subscribe();
  }

  private getQueryEpisodes(): void {
    let query = gql`
      ${this.queryEpisodes}
    `;

    this.apollo
      .watchQuery<ResEpisode>({ query })
      .valueChanges.pipe(
        take(1),
        tap(
          (res) => {
            let { data } = res,
              { episodes } = data,
              { results } = episodes;

            this.episodiosSubj.next(results);
          },
          (err) => console.error(err),
          () => this.spinnerService.hide()
        )
      )
      .subscribe();
  }
}
