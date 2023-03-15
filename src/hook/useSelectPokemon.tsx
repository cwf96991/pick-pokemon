/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ResponseAPI } from "../interface/pokemon";

const useSelectPokemon = () => {
  const [pokemonMap, setPokemonMap] = useState<{ [id: string]: any }>({});
  const [showIsSeletedOnly,setShowIsSelectedOnly] = useState(false)
  const [selectedPokemonList, setSelectedPokemonList] =
    useState<ResponseAPI[]>([]);
    
  useEffect(() => {
    if (localStorage.pokemonMap) {
      const localPokemonMap = JSON.parse(localStorage.pokemonMap);
      setPokemonMap(localPokemonMap);
      const list: ResponseAPI[] = [];
      Object.values(localPokemonMap as { [id: string]: any }).forEach((value) => {
        if (value !== "") {
          list.push(value);
        }
      });

      setSelectedPokemonList(list);
    } else {
      localStorage.pokemonMap = JSON.stringify({});
    }
  }, []);

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
    const index = selectedPokemonList?.findIndex((pokemon) => {
      return pokemon.name === pokemonName
    }) as number
    if (index !== -1) {
      selectedPokemonList?.splice(index, 1)
    } else {
      selectedPokemonList?.push(pokemon)
    }
    setSelectedPokemonList(selectedPokemonList)
  }
  function deletePokemonByName(pokemonName: string) {
    const localPokemonMap = JSON.parse(localStorage.pokemonMap);

    localPokemonMap[pokemonName] = "";
    setPokemonMap(localPokemonMap);
    localStorage.pokemonMap = JSON.stringify(localPokemonMap);
    const index = selectedPokemonList?.findIndex((pokemon) => {
      return pokemon.name === pokemonName
    }) as number
    if (index !== -1) {

      selectedPokemonList?.splice(index, 1)
      setSelectedPokemonList(selectedPokemonList)
    }

  }

 
  function clearSelectedPokemon() {
    localStorage.pokemonMap = JSON.stringify({});
    setPokemonMap({});
    setSelectedPokemonList([])
    setShowIsSelectedOnly(false)
  }
  return {
    pokemonMap,
    isSelected,
    isSelectedByName,
    togglePokemon,
    deletePokemonByName,
    clearSelectedPokemon,
    selectedPokemonList,
    showIsSeletedOnly,
    setShowIsSelectedOnly
  };
};

export default useSelectPokemon;
