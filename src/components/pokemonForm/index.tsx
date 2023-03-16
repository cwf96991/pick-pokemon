import { useState, useRef } from "react";
import useSearchPokemon from "../../hook/useSearchPokemon";
import useSelectPokemon from "../../hook/useSelectPokemon";
import { ResponseAPI, IFilterParams } from "../../interface/pokemon";
import {PokemonContent,FilterTag,ClearAllAndPokemonNumber,SumbitPanel,SearchBox} from "./components"
const PokemonForm = (props: { setPage: React.Dispatch<React.SetStateAction<number>> }) => {
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
      getTotalPokemonFromFilter,
    } = useSearchPokemon(searchQuery);
  
    const pokemonsNames = searchPokemons?.map(
      (pokemon: ResponseAPI) => pokemon?.name
    ) as string[];
    const nameFilter = searchPokemons?.map((pokemon: ResponseAPI) => {
      return {
        type: "pokemon",
        query: pokemon.name,
      };
    }) as IFilterParams[];
    const filterParamsWithoutSizeLength = Object.values(filterParams).filter(
      (params) => params?.size === undefined
    ).length;
    const finalFilterParams = [...nameFilter, ...(filterParams as IFilterParams[])];
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
      showIsSeletedOnly,
      setShowIsSelectedOnly
    } = useSelectPokemon();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const turnstoneRef = useRef<any>(null);
    const [currentPage, setCurrentPage] = useState<number>(0)
    const canProceed = (selectedPokemonList?.length ?? 0) > 0;
    const handleQuery = (query: string) => {
      turnstoneRef.current?.query(query);
    };
  
    const onSubmit = () => {
      localStorage.setItem("page", "3");
      setPage(3);
    };
  
    return (
      <div className="flex-1 flex flex-col m-0 md:m-6 justify-between min-h-[450px]  md:border  mt-10 rounded-lg ">
        <div className="md:px-12 md:pt-10 md:py-0 px-2 py-2">
          <div className="dark:text-white mb-2 text-black">Pick Your Pokemon</div>
          <SearchBox
            turnstoneRef={turnstoneRef}
            setSearchQuery={(query: string) => {
              setSearchQuery(query);
              setCurrentPage(0)
            }}
            isSelectedFilter={(query: string) => {
              return isSelectedFilter(query);
            }}
            toggleFilterParams={async (type: string, query: string) => {
              await toggleFilterParams(type, query);
            }}
            filterTagWidget={
              <>
                <FilterTag
                  onDelete={async (type: string, query: string) => {
                    if (type === "pokemon") {
                      setSearchQuery(" ");
                      turnstoneRef.current.query("");
                    }
                    await toggleFilterParams(type, query);
                  }} isLoading={isLoading} filterParamsWithoutSizeLength={filterParamsWithoutSizeLength} finalFilterParams={finalFilterParams} />
                <ClearAllAndPokemonNumber
                  finalFilterParams={finalFilterParams} clearFilterParams={clearFilterParams} finalPokemons={finalPokemons}
                />
              </>
            }
            getSizebyParam={getSizebyParam}
            getSelectedCountByType={getSelectedCountByType}
          />
  
          <FilterTag onDelete={async (type: string, query: string) => {
            if (type === "pokemon") {
              setSearchQuery(" ");
              turnstoneRef.current.query("");
            }
            await toggleFilterParams(type, query);
          }} isLoading={isLoading||getTotalPokemonFromFilter()>filteredPokemon.length} filterParamsWithoutSizeLength={filterParamsWithoutSizeLength} finalFilterParams={finalFilterParams} />
          <ClearAllAndPokemonNumber
            finalFilterParams={finalFilterParams} clearFilterParams={clearFilterParams} finalPokemons={finalPokemons}
  
          />
  
          <PokemonContent currentPage={currentPage} setCurrentPage={setCurrentPage}
            finalPokemons={finalPokemons} nameFilter={nameFilter} 
            filterParams={filterParams}  
            filterParamsWithoutSizeLength={filterParamsWithoutSizeLength} 
            cachePokemon={cachePokemon} 
            isSelected={isSelected} togglePokemon={togglePokemon}
            showIsSeletedOnly={showIsSeletedOnly}
            selectedPokemonList={selectedPokemonList}
            />
        </div>
        <SumbitPanel selectedPokemonList={selectedPokemonList} clearSelectedPokemon={clearSelectedPokemon}
          deletePokemonByName={deletePokemonByName}
          handleQuery={handleQuery} canProceed={canProceed}
          onSubmit={onSubmit} clearFilterParams={clearFilterParams}
          showIsSeletedOnly={showIsSeletedOnly}
          toggleShowIsSelectedOnly={()=>{
            setShowIsSelectedOnly(!showIsSeletedOnly)
          }}
          />
      </div>
    );
  };
  export default PokemonForm;