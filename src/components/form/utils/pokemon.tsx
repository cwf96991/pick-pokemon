import { pokemonBallImg } from "../../../constant";
import { ResponseAPI } from "../../../interface/pokemon";

const getAvatarFromPokemon = (pokemon: ResponseAPI) => {
  let id = pokemon?.id?.toString() as string;

  let avatar = pokemon?.sprites?.front_default ?? pokemonBallImg;
  if (id.length > 0) {
    avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
  }
  return avatar;
};
const getPokemonIdByUrl = (url: string): string => {
  url = url.substring(34, url.length);
  // https://pokeapi.co/api/v2/pokemon/ -> remove those 34 characters
  return url.slice(0, -1);
};
const colors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};
function getColorByType(type: string): string {
  for (const [key, value] of Object.entries(colors)) {
    if (key === type) return "bg-[" + value + "]";
  }

  return "";
}
export { getAvatarFromPokemon, getPokemonIdByUrl, getColorByType };
