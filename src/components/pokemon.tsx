/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import { ResponseAPI } from "../interface/pokemon";

const TypeLabel = (props: { type: string }) => {
  const { type } = props;
  return (
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
      {type}
    </span>
  );
};

const Pokemon = ({ pokemon }: { pokemon: ResponseAPI | null }) => {
  const [selectedPokemon,setSelectedPokemon] = useState<any>({})
  
  useEffect(()=>{
    if (localStorage.selectedPokemonMap){
      let selectedPokemonMap = JSON.parse( localStorage.selectedPokemonMap );
    setSelectedPokemon(selectedPokemonMap)
    }else{
      localStorage.selectedPokemonMap = JSON.stringify({});
    }
    
  },[])
  if (pokemon && Object.keys(pokemon).length === 0) return <></>;
  function isSelected(){
    if (pokemon && Object.keys(pokemon).length === 0) return false
   
    let pokemonName = pokemon?.name??""
    if (selectedPokemon[pokemonName]&&selectedPokemon[pokemonName]!=="")
    {return true}

    return false
  }
  function clickHandler(pokemon: ResponseAPI) {
    let selectedPokemonMap = JSON.parse( localStorage.selectedPokemonMap );
    let pokemonName = pokemon.name
    if (selectedPokemon[pokemonName]&&selectedPokemon[pokemonName]!==""){
      selectedPokemonMap[pokemon.name] = ""
    }else{
      selectedPokemonMap[pokemon.name] = pokemon
    }
    setSelectedPokemon(selectedPokemonMap)
    localStorage.selectedPokemonMap = JSON.stringify(selectedPokemonMap);
    
    
  }

  return (
    <>
      {!pokemon ? (
        <span className="no-results">No results</span>
      ) : (
        <div 
        onClick={()=>{
          clickHandler(pokemon)
        }}
        className="cursor-pointer mt-4">
          <div>{}</div>
          <div className={`max-w-sm rounded overflow-hidden shadow-lg ${isSelected()?"border-2 border-blue-300":""}`}>
            <img
              className="w-[96px]"
              src={
                pokemon.sprites.front_default ??
                "https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder-1024x512.png"
              }
              alt={pokemon.name}
            />

            <div className="px-6">
              <div className="font-bold text-xl mb-2">{pokemon.name}</div>
              <p className="text-gray-700 text-base">
                {pokemon.name} {pokemon.height}m tall and weight{" "}
                {pokemon.weight}kg
              </p>
            </div>
            <div className="px-6 pt-4 pb-2 flex flex-wrap">
              <div className="mr-2">Abilities : </div>
              {pokemon.types.map((type) => (
                <TypeLabel type={type.type.name} />
              ))}
            </div>
            <div className="px-6 pb-2 flex flex-wrap">
              <div className="mr-2">Types : </div>
              {pokemon.abilities.map((ability) => (
                <TypeLabel type={ability.ability.name} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Pokemon;
