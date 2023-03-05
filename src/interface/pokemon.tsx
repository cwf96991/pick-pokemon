export interface ResponseAPI {
    name: string;
    sprites: { front_default: string }
    types: Type[];
    abilities: Ability[];
    height:number;
    weight:number;
}
interface Type {
    slot: number;
    type: Species;
}
 interface Species {
    name: string;
    url:  string;
}
 interface Ability {
    ability:   Species;
   
}