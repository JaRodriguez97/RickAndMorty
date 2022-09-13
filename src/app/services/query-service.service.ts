import { LocalStorageService } from '@app/services/local-storage.service';
import { Personaje } from '@app/models/personaje';
import { Episodio } from '@app/models/episodio';
import { Localizacion } from '@app/models/localizacion';
import { ResCharacter, ResEpisode } from '@app/models/res-data';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ReplaySubject, take, tap, withLatestFrom, map } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class QueryServiceService {
  queryCharacter = `
  {
    characters {
      info{
        pages
      }
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }`;

  private episodiosSubj = new ReplaySubject<Episodio[]>(1);
  private personajesSubj = new ReplaySubject<Personaje[]>(1);
  private localizacionSubj = new ReplaySubject<Localizacion[]>(1);

  episodios$ = this.episodiosSubj.asObservable();
  personajes$ = this.personajesSubj.asObservable();
  localizacion$ = this.localizacionSubj.asObservable();

  constructor(
    private apollo: Apollo,
    private spinnerService: NgxSpinnerService,
    private locarStoraService: LocalStorageService
  ) {}

  chargeCharacters(pageNum: number) {
    this.spinnerService.show().then(() => {
      let query = gql`
      {
        characters(page: ${pageNum}) {
          results {
            id
            name
            status
            species
            gender
            image
          }
        }
      }
    `;

      this.apollo
        .watchQuery<any>({ query })
        .valueChanges.pipe(
          take(1),
          withLatestFrom(this.personajes$),
          map((x) => {
            let [resturnQuery, querySaved] = x,
              { data } = resturnQuery,
              { characters } = data,
              { results } = characters;

            this.charactersLocalStorage([...querySaved, ...results]);
          }),
          tap(
            (res) => {},
            (err) => console.error(err),
            () => this.spinnerService.hide()
          )
        )
        .subscribe();
    });
  }

  chargeEpisodes(pageNum: number) {
    this.spinnerService.show().then(() => {
      let query = gql`
      {
        episodes(page: ${pageNum}) {
          results {
            id
            name
            air_date
            episode
          }
        }
      }
    `;

      this.apollo
        .watchQuery<any>({ query })
        .valueChanges.pipe(
          take(1),
          withLatestFrom(this.episodios$),
          map((x) => {
            let [returnQuery, querySaved] = x,
              { data } = returnQuery,
              { episodes } = data,
              { results } = episodes;

            console.log(results, querySaved);
            return [...querySaved, ...results];
          }),
          tap(
            (res) => {
              this.episodiosSubj.next(res);
            },
            (err) => console.error(err),
            () => this.spinnerService.hide()
          )
        )
        .subscribe();
    });
  }

  getQueryCharacters(): void {
    this.spinnerService.show().then(() => {
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

              this.charactersLocalStorage(results);
            },
            (err) => console.error(err),
            () => this.spinnerService.hide()
          )
        )
        .subscribe();
    });
  }

  async getQueryCharacterDetails(id: string): Promise<void> {
    this.spinnerService.show().then(() => {
      let query = gql`
      {
        charactersByIds(ids: [${id}]){          
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
        }
      }`;

      this.apollo
        .watchQuery<any>({ query })
        .valueChanges.pipe(
          take(1),
          tap(
            (res) => {
              let { data } = res,
                { charactersByIds } = data;

              this.personajesSubj.next(charactersByIds[0].episode);
            },
            (err) => console.error(err),
            () => this.spinnerService.hide()
          )
        )
        .subscribe();
    });
  }

  getQueryEpisodesCharacter(id: number): void {
    this.spinnerService.show().then(() => {
      let query = gql`{
          charactersByIds(ids: [${id}]){
           episode{
             id
             name
             air_date
             episode
           }
       }
   }`;

      this.apollo
        .watchQuery<any>({ query })
        .valueChanges.pipe(
          take(1),
          tap(
            (res) => {
              let { data } = res,
                { charactersByIds } = data;

              this.episodiosSubj.next(charactersByIds[0].episode);
            },
            (err) => console.error(err),
            () => this.spinnerService.hide()
          )
        )
        .subscribe();
    });
  }

  getQueryEpisodes(): void {
    this.spinnerService.show().then(() => {
      let query = gql`
        {
          episodes {
            results {
              id
              name
              air_date
              episode
            }
          }
        }
      `;

      this.apollo
        .watchQuery<ResEpisode>({ query })
        .valueChanges.pipe(
          take(1),
          tap(
            (res) => {
              let { data } = res,
                { episodes } = data;
              this.episodiosSubj.next(episodes.results);
            },
            (err) => console.error(err),
            () => this.spinnerService.hide()
          )
        )
        .subscribe();
    });
  }

  private async charactersLocalStorage(personajes: Personaje[]) {
    let listaFav = await this.locarStoraService.getPersonajesFavoritos(),
      arrayreturn = personajes.map((character: Personaje) => {
        let find = !!listaFav.find((fav: Personaje) => fav.id === character.id);
        return { ...character, isFavorite: find };
      });

    this.personajesSubj.next(arrayreturn);
  }

  getQueryLocalizationCharacter(id: number): void {
    this.spinnerService.show().then(() => {
      let query = gql`
      {
        charactersByIds(ids: [${id}]){
          id
          name
          location {
            id
            type
            dimension
            residents {
              name
              id
            }
          }
        }
      }`;

      this.apollo
        .watchQuery<any>({ query })
        .valueChanges.pipe(
          take(1),
          tap(
            (res) => {
              let { data } = res,
                { charactersByIds } = data;
              console.log(charactersByIds[0].location);
              this.localizacionSubj.next(charactersByIds[0].location);
            },
            (err) => console.error(err),
            () => this.spinnerService.hide()
          )
        )
        .subscribe();
    });
  }
}
