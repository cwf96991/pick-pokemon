/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useEffect,  useMemo,  useState } from "react";
import { ResponseAPI } from "../interface/pokemon";

const useSelectPokemon = () => {
  const [pokemonMap, setPokemonMap] = useState<{ [id: string]: any }>({});
  const [showIsSeletedOnly,setShowIsSelectedOnly] = useState(false)
  const [selectedPokemonList, setSelectedPokemonList] = useState<ResponseAPI[]>([]);

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
    
  
  const isSelected = useMemo(() => {
    return (pokemon: ResponseAPI) => {
      if (pokemon && Object.keys(pokemon).length === 0) return false;

      const pokemonName = pokemon?.name ?? "";
      if (pokemonMap[pokemonName] && pokemonMap[pokemonName] !== "") {
        return true;
      }

      return false;
    };
  }, [pokemonMap]);

  const isSelectedByName = useMemo(() => {
    return (pokemonName: string) => {
      if (pokemonMap[pokemonName] && pokemonMap[pokemonName] !== "") {
        return true;
      }

      return false;
    };
  }, [pokemonMap]);

  
  // function togglePokemon(pokemon: ResponseAPI) {
  //   const localPokemonMap = JSON.parse(localStorage.pokemonMap);
  //   const pokemonName = pokemon?.name ?? "";
  //   if (localPokemonMap[pokemonName] && localPokemonMap[pokemonName] !== "") {
  //     localPokemonMap[pokemonName] = "";
  //   } else {
  //     localPokemonMap[pokemonName] = pokemon;
  //   }
  //   setPokemonMap(localPokemonMap);
  //   localStorage.pokemonMap = JSON.stringify(localPokemonMap);
   
  // }
  const togglePokemon = (pokemon: ResponseAPI) => {
    const localPokemonMap = JSON.parse(localStorage.pokemonMap);
    const pokemonName = pokemon?.name??"";
    const isPokemonSelected = localPokemonMap[pokemonName] && localPokemonMap[pokemonName] !== "";

    if (isPokemonSelected) {
      localPokemonMap[pokemonName] = "";
    } else {
      localPokemonMap[pokemonName] = pokemon;
    }

    setPokemonMap(localPokemonMap);
    localStorage.pokemonMap = JSON.stringify(localPokemonMap);

    const index = selectedPokemonList.findIndex((p) => p.name === pokemonName);

    if (isPokemonSelected && index !== -1) {
      setSelectedPokemonList(selectedPokemonList.slice(0, index).concat(selectedPokemonList.slice(index + 1)));
    } else if (!isPokemonSelected && index === -1) {
      setSelectedPokemonList(selectedPokemonList.concat(pokemon));
    }
  };
  function deletePokemonByName(pokemonName: string) {
    const localPokemonMap = JSON.parse(localStorage.pokemonMap);
    localPokemonMap[pokemonName] = "";
    setPokemonMap(localPokemonMap);
    localStorage.pokemonMap = JSON.stringify(localPokemonMap);
  }

 
  function clearSelectedPokemon() {
    localStorage.pokemonMap = JSON.stringify({});
    setPokemonMap({});
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
