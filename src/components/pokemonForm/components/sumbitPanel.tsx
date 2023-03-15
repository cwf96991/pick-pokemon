
import { memo } from "react";
import { pokemonBallImg } from "../../../constant";
import { ResponseAPI } from "../../../interface/pokemon";
import Chip from "../../chip";

const SumbitPanel = memo(function SumbitPanel(props: {
    selectedPokemonList: ResponseAPI[], clearSelectedPokemon: () => void, deletePokemonByName: (name: string) => void,
    handleQuery: (name: string) => void,
    canProceed: boolean, onSubmit: () => void,
    clearFilterParams: () => void,
    showIsSeletedOnly:boolean
    toggleShowIsSelectedOnly:()=>void
  }) {
    const { selectedPokemonList, clearSelectedPokemon, deletePokemonByName, handleQuery, canProceed, onSubmit, clearFilterParams,toggleShowIsSelectedOnly,showIsSeletedOnly } = props
    const ShowSelectedPokemon = ()=>{
        return <>
      {selectedPokemonList?.length !== 0 &&  <div
        className=" btn btn-sm hover:bg-gray-200 dark:hover:bg-gray-800 normal-case hover:border-red-800 focus:outline-none sm:w-auto w-auto px-5 text-sm font-medium text-center text-red-700 bg-transparent border border-red-700 rounded-lg "
        onClick={() => {
          
          toggleShowIsSelectedOnly()
        }}
      >
        <input
          type="checkbox"
          readOnly
          checked={showIsSeletedOnly}
          className="checkbox checkbox-warning mr-2"
        />
        Show Selected Only
      </div>}
        </>
    }
    return (
      <div className="md:static md:px-12 dark:bg-gray-800 md:rounded-none sticky bottom-0 z-10 px-2 py-2 pb-4 bg-gray-100 rounded-t-lg">
        <div className="items-center w-full">
          { (
            <>
            <div className="dark:text-white flex  justify-between text-black mb-2">
              <div className="flex flex-col md:flex-row  items-center">
                Selected Pokemons({selectedPokemonList?.length})
                <div className="hidden md:block ml-2">
                <ShowSelectedPokemon/>
                </div>
              </div>
             
              
              <button
                onClick={() => {
                  clearSelectedPokemon();
                }}
                className="btn btn-sm hover:bg-gray-200 dark:hover:bg-gray-800 hover:border-red-800 focus:outline-none sm:w-auto w-auto px-5 py-1 text-sm font-medium text-center text-red-700 bg-transparent border border-red-700 rounded-lg"
              >
                Clear All
              </button>
            </div>
            <div className="block md:hidden mb-2">
            <ShowSelectedPokemon/>
            </div>
            </>
          )}
          {selectedPokemonList?.length !== 0 ? (
            <div className=" flex flex-wrap w-full">
              {selectedPokemonList?.map((pokemon, index) => {
                const id = pokemon?.id?.toString() as string;
                let avatar = pokemon?.sprites?.front_default ?? pokemonBallImg;
                if (id.length > 0) {
                  avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
                }
                return (
                  <Chip
                    key={index}
                    name={pokemon.name}
                    imgUrl={avatar}
                    onDelete={() => {
                      deletePokemonByName(pokemon.name);
                    }}
                    onClick={() => {
                      handleQuery(pokemon.name);
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <div className="h-[53px]"></div>
          )}
        </div>
        <div className="flex">
          <button
            disabled={!(canProceed ?? true)}
            onClick={() => {
              onSubmit();
            }}
            className={`${canProceed ?? true
              ? "cursor-pointer btn"
              : "opacity-25 cursor-not-allowed"
              } border-none flex-1 mr-4  text-white bg-red-700 hover:bg-red-800  focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
          >
            {"Next"}
          </button>
          <button
            type="reset"
            onClick={() => {
              clearSelectedPokemon();
              clearFilterParams();
            }}
            className="btn text-red-700 hover:bg-gray-300 dark:hover:bg-gray-800  border border-red-700 hover:border-red-800 bg-transparent focus:outline-none  font-medium rounded-lg text-sm w-auto sm:w-auto px-5 py-2.5 text-center"
          >
            Reset
          </button>
        </div>
      </div>
    );
  
  })
  export default SumbitPanel