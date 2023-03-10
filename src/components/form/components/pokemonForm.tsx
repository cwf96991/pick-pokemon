import SearchBox from "./searchBox";
import { useRef, useState } from "react";
import useSearchPokemon from "../../../hook/useSearchPokemon";
import Pokemon from "./pokemon";
import useSelectPokemon from "../../../hook/useSelectPokemon";
import Chip from "../../chip";
import Paginate from "../../paginate";
import Tag from "../../tag";
import { pokemonBallImg } from "../../../constant/index";
import { ResponseAPI } from "../../../interface/pokemon";

const PokemonForm = (props: { setPage: Function }) => {
  const { setPage } = props;
  const [searchQuery, setSearchQuery] = useState("");

  const {
    cachePokemon,
    searchPokemons,
    filteredPokemon,
    filterParams,
    isLoading,
    toggleFilterParams,
    clearFilterParams,
    isSelectedFilter,
    getSizebyParam,
    getSelectedCountByType,
  } = useSearchPokemon(searchQuery);

  const pokemonsNames = searchPokemons?.map(
    (pokemon: ResponseAPI) => pokemon?.name
  ) as string[];
  const nameFilter = searchPokemons?.map((pokemon: ResponseAPI) => {
    return {
      type: "pokemon",
      query: pokemon.name,
    };
  }) as any[];
  const finalFilterParams = [...nameFilter, ...filterParams];
  const finalPokemons =
    searchPokemons?.length === 0
      ? filteredPokemon
      : [...pokemonsNames, ...filteredPokemon];

  const {
    selectedPokemonList,
    deletePokemonByName,
    isSelected,
    togglePokemon,
    clearSelectedPokemon,
  } = useSelectPokemon();
  const turnstoneRef = useRef<any>();
  const canProceed = (selectedPokemonList?.length ?? 0) > 0;
  const handleQuery = (query: string) => {
    turnstoneRef.current?.query(query);
  };

  const onSubmit = () => {
    localStorage.setItem("page", "3");
    setPage(3);
  };
  const LoadingWidget = () => {
    return (
      <div
        role="status"
        className="flex items-center justify-center w-full h-full"
      >
        <svg
          aria-hidden="true"
          className="animate-spin dark:text-gray-600 fill-red-600 w-8 h-8 mr-2 text-gray-200"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  };
  const LoadingCard = () => {
    return (
      <div className="mt-4 mr-2 h-[180px] border border-gray-500 shadow-lg rounded max-w-sm p-4">
        <div className="animate-pulse flex items-center justify-between w-full">
          <div className="bg-slate-200 w-10 h-10 rounded-full"></div>
          <div className="h-8 w-[150px] bg-slate-200 rounded "></div>
        </div>
        <div className="h-8 mt-4 w-[150px] bg-slate-200 rounded "></div>
        <div className="h-8  mt-2 w-[150px] bg-slate-200 rounded "></div>
      </div>
    );
  };
  const PokemonListView = (props: { pokemons: any[] }) => {
    const { pokemons } = props;
    let isLoadingData =
      (finalFilterParams.length > 0 && finalPokemons.length === 0) ||
      (filterParams.length !== 0 && finalPokemons.length === 1);
    return (
      <div
        className={`${
          finalFilterParams.length > 0
            ? "md:h-[calc(100vh-680px)]"
            : "md:h-[calc(100vh-550px)]"
        }`}
      >
        {isLoadingData ? (
          <div className=" md:grid-cols-2 grid grid-cols-1">
            <LoadingCard />
            <LoadingCard />
          </div>
        ) : (
          <div
            className={`${
              finalFilterParams.length > 0
                ? "md:h-[calc(100vh-680px)]"
                : "md:h-[calc(100vh-550px)]"
            } mb-2 my-2 grid grid-cols-1 md:grid-cols-2 overflow-y-auto gap-2 `}
          >
            {pokemons &&
              pokemons.map((pokemon: string, index) => {
                return (
                  <Pokemon
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
  const FilterTag = () => {
    return (
      <div className=" flex flex-wrap md:max-h-[50px] md:overflow-y-auto md:max-w-[800px]">
        {finalFilterParams.map(
          (param: { type: string; query: string }, index) => {
            const { type, query } = param;
            // if ()
            return (
              <Tag
                key={index}
                type={type}
                query={query}
                onDelete={async () => {
                  if (type === "pokemon") {
                    setSearchQuery(" ");
                    turnstoneRef.current.query("");
                  }
                  await toggleFilterParams(type, query);
                }}
              />
            );
          }
        )}
        {isLoading && (
          <div
            data-te-chip-init
            data-te-ripple-init
            className={` mt-1 [word-wrap: break-word] capitalize my-[5px] mr-4 flex h-[32px] items-center  rounded bg-[#eceff1] border-red-500 border py-1 px-[12px]  justify-center text-[13px] font-normal leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none  dark:bg-neutral-600 dark:text-neutral-200`}
          >
            <div className="h-4/5 w-4/5">
              <LoadingWidget />
            </div>
          </div>
        )}
      </div>
    );
  };
  const ClearAllAndPokemonNumber = () => {
    return (
      <div className="flex items-center mt-2">
        {finalFilterParams.length > 0 && (
          <button
            onClick={() => {
              clearFilterParams();
            }}
            className="btn btn-sm hover:bg-gray-200 dark:hover:bg-gray-800 hover:border-red-800 focus:outline-none sm:w-auto w-auto px-5 py-1 text-sm font-medium text-center text-red-700 bg-transparent border border-red-700 rounded-lg"
          >
            Clear All ({finalFilterParams.length})
          </button>
        )}
        {!(finalFilterParams.length > 0 && finalPokemons.length === 0) &&
          finalPokemons.length !== 0 && (
            <div className="md:text-base dark:text-white ml-2 text-xs text-black">
              {finalPokemons.length} Pokemon Found
            </div>
          )}
      </div>
    );
  };
  const SumbitPanel = () => {
    return (
      <div className="md:static md:px-12 dark:bg-gray-800 md:rounded-none sticky bottom-0 z-10 px-2 py-2 pb-4 bg-gray-100 rounded-t-lg">
        <div className="items-center w-full">
          {selectedPokemonList?.length !== 0 && (
            <div className="dark:text-white flex justify-between text-black">
              <div className="">
                Selected Pokemons({selectedPokemonList?.length})
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
          )}
          {selectedPokemonList?.length !== 0 ? (
            <div className=" flex flex-wrap w-full">
              {selectedPokemonList?.map((pokemon, index) => {
                let id = pokemon?.id?.toString() as string;
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
            className={`${
              canProceed ?? true
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
  };
  const PokemonContent = () => {
    return (
      <div className=" mb-4">
        <Paginate
          items={finalPokemons}
          itemsListView={(items: any) => {
            return <PokemonListView pokemons={items} />;
          }}
          itemsInPage={10}
        />
      </div>
    );
  };
  return (
    <div className="flex-1 flex flex-col m-0 md:m-6 justify-between min-h-[450px]  md:border  mt-10 rounded-lg">
      <div className="md:px-12 md:pt-10 px-2 py-2">
        <div className="dark:text-white mb-2 text-black">Pick Your Pokemon</div>
        <SearchBox
          turnstoneRef={turnstoneRef}
          setSearchQuery={(query: string) => {
            setSearchQuery(query);
          }}
          isSelectedFilter={(query: string) => {
            return isSelectedFilter(query);
          }}
          toggleFilterParams={async (type: string, query: string) => {
            await toggleFilterParams(type, query);
          }}
          filterTagWidget={
            <>
              <FilterTag />
              <ClearAllAndPokemonNumber />
            </>
          }
          getSizebyParam={getSizebyParam}
          getSelectedCountByType={getSelectedCountByType}
        />

        <FilterTag />
        <ClearAllAndPokemonNumber />

        <PokemonContent />
      </div>
      <SumbitPanel />
    </div>
  );
};

export default PokemonForm;
