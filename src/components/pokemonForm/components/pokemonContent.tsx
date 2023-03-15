/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from "react";
import { pokemonBallImg } from "../../../constant";
import { IFilterParams, ResponseAPI } from "../../../interface/pokemon";
import Paginate from "../../paginate";
import { getAvatarFromPokemon } from "../utils/pokemon";
import { LoadingCard } from "./loading";
const TypeLabel = (props: { type: string; color?: string }) => {
    const { type, color } = props;
    return (
      <span
        className={`${color ?? "bg-gray-300"
          }  inline-block mt-1 px-2 py-1 mb-2 mr-2 text-xs font-semibold text-gray-700 capitalize  rounded-full`}
      >
        {type}
      </span>
    );
  };
  
  const Pokemon = (props: {
    pokemon: ResponseAPI | null;
    isSelected: (pokemon: ResponseAPI) => boolean;
    togglePokemon: (pokemon: ResponseAPI) => void;
    id: string;
  }) => {
    const { id, pokemon, isSelected, togglePokemon } = props;
    if (pokemon && Object.keys(pokemon).length === 0) return <></>;
    const avatar = getAvatarFromPokemon(pokemon as ResponseAPI);
  
    return (
      <>
        {!pokemon ? (
          <span className="no-results">No results</span>
        ) : (
          <div id={id} className="mr-1 pt-4 ">
            <div
              onClick={() => {
                togglePokemon(pokemon);
                document?.getElementById(id)?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
              className={`overflow-y-auto cursor-pointer  h-[180px] max-w-sm hover:bg-gray-200 dark:hover:bg-gray-600 rounded overflow-hidden shadow-lg ${isSelected(pokemon)
                  ? "border-2 border-red-600 dark:border-red-900"
                  : "border-2 border-gray-500"
                }`}
            >
              <div className="flex items-center justify-between p-4 mt-2">
                <img
                  className="w-[36px]"
                  src={avatar}
                  alt={pokemon.name}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = pokemonBallImg;
                  }}
                />
                <div className="dark:text-white  text-xl font-bold text-black capitalize  mr-2">
                  {pokemon.name}
                </div>
              </div>
  
              <div className=" px-6 pb-2 ">
                {pokemon?.abilities && (
                  <div className="flex flex-wrap items-center">
                    <div className="dark:text-gray-400 mr-2 text-xs text-gray-700">
                      Abilities:{" "}
                    </div>
                    <div>
                      {pokemon?.abilities?.map((ability, index) => (
                        <TypeLabel key={index} type={ability.ability.name} />
                      ))}
                    </div>
                  </div>
                )}
                {pokemon?.types && (
                  <div className="flex flex-wrap items-center">
                    <div className="dark:text-gray-400 mr-2 text-xs text-gray-700">
                      Type:{" "}
                    </div>
                    <div>
                      {pokemon?.types?.map((type, index) => {
                        return <TypeLabel key={index} type={type.type.name} />;
                      })}
                    </div>
                  </div>
                )}
                {pokemon?.egg_groups && (
                  <>
                    <div className="dark:text-gray-400 mr-2  text-xs text-gray-700">
                      Egg Group:{" "}
                    </div>
                    <div>
                      {pokemon?.egg_groups?.map((eggGroup, index) => {
                        return <TypeLabel key={index} type={eggGroup.name} />;
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
const PokemonListView = (props: { pokemons: string[], finalPokemons: string[], nameFilter: IFilterParams[], filterParams: IFilterParams[], 
    filterParamsWithoutSizeLength: number,cachePokemon:any, isSelected: (pokemon: ResponseAPI) => boolean, togglePokemon: (pokemon: ResponseAPI) => void
 ,showIsSeletedOnly:boolean, selectedPokemonList: ResponseAPI[] }) => {
    const { pokemons, finalPokemons, nameFilter, filterParams, cachePokemon,filterParamsWithoutSizeLength, 
       isSelected, togglePokemon,showIsSeletedOnly,selectedPokemonList } = props;
    const isLoadingData =
      (nameFilter.length > 0 && finalPokemons.length === 0) ||
      (filterParams.length > 0 && finalPokemons.length === 0) ||
      (filterParamsWithoutSizeLength > 0 && finalPokemons.length === 0);
    //Display the loading effect if the filter parameters are present but the final list of Pokémon is not yet available,
    //or if the filter parameters have been added but the Pokémon data has not been retrieved yet.
    return (
      <div>
        {isLoadingData ? (
          <div className=" md:grid-cols-2 grid grid-cols-1">
            <LoadingCard />
            <LoadingCard />
          </div>
        ) : (
          <div
            className={`md:h-[calc(100vh-600px)]
               mb-2 my-2 grid grid-cols-1 md:grid-cols-2 overflow-y-auto gap-2 `}
          >
            {pokemons &&
             showIsSeletedOnly? selectedPokemonList.map((pokemonData: ResponseAPI, index) => {
                
                return (
                  <Pokemon
                    id={"pokemon" + index}
                    key={index}
                    pokemon={pokemonData}
                    isSelected={isSelected}
                    togglePokemon={togglePokemon}
                  />
                );
              }):pokemons.map((pokemon: string, index) => {
                return (
                  <Pokemon
                    id={"pokemon" + index}
                    key={index}
                    pokemon={cachePokemon[pokemon]}
                    isSelected={isSelected}
                    togglePokemon={togglePokemon}
                  />
                );
              })}
          </div>
        )}
      </div>
    );
  };

const PokemonContent = memo(function PokemonContent(props: { currentPage: number, setCurrentPage: (page: number) => void, 
    finalPokemons: string[], nameFilter: IFilterParams[], filterParams: IFilterParams[],
    filterParamsWithoutSizeLength: number, cachePokemon: any, isSelected: (pokemon: ResponseAPI) => boolean, togglePokemon: (pokemon: ResponseAPI) => void
    showIsSeletedOnly:boolean,selectedPokemonList: ResponseAPI[]
  }) {
  
    const { currentPage, setCurrentPage, finalPokemons, nameFilter, filterParams, cachePokemon, filterParamsWithoutSizeLength,
       isSelected, togglePokemon ,showIsSeletedOnly,selectedPokemonList} = props
    return (
      <Paginate
        currentPage={currentPage}
        setCurrentPage={(page) => {
          setCurrentPage(page)
        }}
        items={showIsSeletedOnly? selectedPokemonList:finalPokemons}
        pageClickHandler={() => {
          document?.getElementById('pokemon0')?.scrollIntoView({
            behavior: 'smooth'
          });
        }}
        itemsListView={(items: unknown[]) => {
          return <PokemonListView pokemons={items as string[]} 
          selectedPokemonList={selectedPokemonList}
          showIsSeletedOnly={showIsSeletedOnly}
            finalPokemons={finalPokemons} nameFilter={nameFilter} 
            filterParams={filterParams}  
            filterParamsWithoutSizeLength={filterParamsWithoutSizeLength} 
            cachePokemon={cachePokemon} 
            isSelected={isSelected} togglePokemon={togglePokemon } />;
        }}
        itemsInPage={10}
      />
    );
  });
  export default PokemonContent