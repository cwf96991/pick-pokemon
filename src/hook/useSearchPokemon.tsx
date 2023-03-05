import { useState, useEffect } from 'react';
import { ResponseAPI } from '../interface/pokemon';

 const useSearchPokemon = (search: string) => {

    const [pokemon, setPokemon] = useState<ResponseAPI | null>({} as ResponseAPI);
    const [isLoading, setIsLoading] = useState(false)

    const searchPokemon = async (pokemon: string, signal?: AbortSignal): Promise<ResponseAPI | null> => {
        if(pokemon.trim().length === 0) return null;
        
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
        if (search) {
            setIsLoading(true)
            searchPokemon(search, controller.signal)
                .then(data => {
                    setPokemon(data);
                    setIsLoading(false);
                })
        }else { setPokemon({} as ResponseAPI) }

        return () => controller.abort();
    }, [search])

    return {
        pokemon,
        isLoading
    }
}
export default useSearchPokemon