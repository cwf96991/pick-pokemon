import SearchBar from "./searchBar"
import { useEffect, useState } from "react"
import useDebounce from "../hook/useDebounce"
import { ResponseAPI } from "../interface/pokemon"
import useSearchPokemon from "../hook/useSearchPokemon";
import Pokemon from "./pokemon";
const PokemonForm = ()=>{
    const [searchQuery,setSearchQuery] = useState("")
    const debouncedSearchQuery = useDebounce<string>(searchQuery, 500)
    const { isLoading, pokemon } = useSearchPokemon(debouncedSearchQuery)

    const searchPokemon = async (pokemon: string, signal?: AbortSignal): Promise<ResponseAPI | null> => {
        try {
    
            const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase().trim()}`
            const res = await fetch(url, { signal });
    
            if(res.status === 404) return null
    
            const data: ResponseAPI = await res.json();
            return data
    
        } catch (error) {
            console.log((error as Error).message);
            return null
        }
    }
    useEffect(() => {

        const controller = new AbortController();
        if (debouncedSearchQuery){
             searchPokemon(debouncedSearchQuery, controller.signal).then(data => {
                console.log(data) //pokemon | null
            })
        }
        return () => controller.abort();
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [debouncedSearchQuery]);
    return <div className=" px-12 py-10 m-auto mt-10 border rounded-lg">

       <SearchBar
       searchQuery={searchQuery}
       setSearchQuery={setSearchQuery}
       />
        {
        isLoading 
          ? <span className="loading">Loading Results...</span>
          : <Pokemon pokemon={pokemon}/>
      }
    </div>
}

export default PokemonForm