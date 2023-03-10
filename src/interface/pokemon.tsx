export interface ResponseAPI {
  egg_groups: Species[];
  name: string;
  sprites: { front_default: string };
  types: Type[];
  abilities: Ability[];
  height: number;
  weight: number;
  id: string;
}
interface Type {
  slot: number;
  type: Species;
}
interface Species {
  name: string;
  url: string;
}
interface Ability {
  ability: Species;
}

export interface IPokemon {
  name: string;
  url: string;
}

export interface IFilterParams {
  type: string;
  query: string;
  size?: number;
}