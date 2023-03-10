import { useEffect, useState } from "react";
import { ResponseAPI } from "../interface/pokemon";

const useSelectPokemon = () => {
  const [pokemonMap, setPokemonMap] = useState<{ [id: string]: any }>({});
  const [selectedPokemonList, setSelectedPokemonList] =
    useState<ResponseAPI[]>();
  useEffect(() => {
    if (localStorage.pokemonMap) {
      const localPokemonMap = JSON.parse(localStorage.pokemonMap);
      setPokemonMap(localPokemonMap);
    } else {
      localStorage.pokemonMap = JSON.stringify({});
    }
  }, []);
  useEffect(() => {
    getSelectedPokemonList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonMap]);
  function isSelected(pokemon: ResponseAPI) {
    if (pokemon && Object.keys(pokemon).length === 0) return false;

    const pokemonName = pokemon?.name ?? "";
    if (pokemonMap[pokemonName] && pokemonMap[pokemonName] !== "") {
      return true;
    }

    return false;
  }
  function isSelectedByName(pokemonName: string) {
    if (pokemonMap[pokemonName] && pokemonMap[pokemonName] !== "") {
      return true;
    }

    return false;
  }
  function togglePokemon(pokemon: ResponseAPI) {
    const localPokemonMap = JSON.parse(localStorage.pokemonMap);
    const pokemonName = pokemon.name;
    if (localPokemonMap[pokemonName] && localPokemonMap[pokemonName] !== "") {
      localPokemonMap[pokemonName] = "";
    } else {
      localPokemonMap[pokemonName] = pokemon;
    }
    setPokemonMap(localPokemonMap);
    localStorage.pokemonMap = JSON.stringify(localPokemonMap);
  }
  function deletePokemonByName(pokemonName: string) {
    const localPokemonMap = JSON.parse(localStorage.pokemonMap);

    localPokemonMap[pokemonName] = "";
    setPokemonMap(localPokemonMap);
    localStorage.pokemonMap = JSON.stringify(localPokemonMap);
  }

  function getSelectedPokemonList() {
    const list: ResponseAPI[] = [];
    Object.values(pokemonMap).forEach((value ) => {
      if (value !== "") {
        list.push(value);
      }
    });

    setSelectedPokemonList(list);
  }
  function clearSelectedPokemon() {
    localStorage.pokemonMap = JSON.stringify({});
    setPokemonMap({});
  }
  return {
    pokemonMap,
    isSelected,
    isSelectedByName,
    togglePokemon,
    deletePokemonByName,
    clearSelectedPokemon,
    selectedPokemonList,
  };
};

export default useSelectPokemon;
