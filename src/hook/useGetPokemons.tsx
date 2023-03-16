import { useEffect, useState } from "react";

const useGetPokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [colors, setColors] = useState([]);
  const [eggGroups, setEggGroups] = useState([]);
  const [types, setTypes] = useState([]);
  const [natures, setNatures] = useState([]);
  const [growthRates, setGrowthRates] = useState([]);
  const [habitats, setHabitats] = useState([]);
  const [shapes, setShapes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`),
      fetch(`https://pokeapi.co/api/v2/ability?offset=1&limit=400`),
      fetch(`https://pokeapi.co/api/v2/pokemon-color/`),
      fetch(`https://pokeapi.co/api/v2/egg-group/`),
      fetch(`https://pokeapi.co/api/v2/type/`),
      fetch(`https://pokeapi.co/api/v2/nature/`),
      fetch(`https://pokeapi.co/api/v2/growth-rate/`),
      fetch(`https://pokeapi.co/api/v2/pokemon-habitat/`),
      fetch(`https://pokeapi.co/api/v2/pokemon-shape/`)
    ])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then(([pokemonsData, abilitiesData, colorsData, eggGroupsData, typesData, naturesData, growthRatesData, habitatsData, shapesData]) => {
        setPokemons(pokemonsData.results);
        setAbilities(abilitiesData.results);
        setColors(colorsData.results);
        setEggGroups(eggGroupsData.results);
        setTypes(typesData.results);
        setNatures(naturesData.results);
        setGrowthRates(growthRatesData.results);
        setHabitats(habitatsData.results);
        setShapes(shapesData.results);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return {
    pokemons,
    abilities,
    colors,
    eggGroups,
    types,
    natures,
    growthRates,
    habitats,
    shapes,
    isLoading,
  };
};

export default useGetPokemons;
