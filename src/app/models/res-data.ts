import { Episodio } from './episodio';
import { Personaje } from './personaje';

export interface ResData<T> {
  results: T;
}

export interface ResCharacter {
  characters: ResData<Personaje[]>;
}

export interface ResEpisode {
  episodes: ResData<Episodio[]>;
}
