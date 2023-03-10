import { ResponseAPI } from "./pokemon";

export interface IRecord {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  selectedPokemon: ResponseAPI[];
}
