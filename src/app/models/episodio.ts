import { Personaje } from './personaje';

export interface Episodio {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: Personaje;
}
