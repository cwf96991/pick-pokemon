import { useState, useEffect, useRef } from 'react';
import { ResponseAPI } from '../interface/pokemon';
interface IFilterParams {
    type: string;
    query: string;
    size?: number;
}
const useSearchPokemon = (search: string) => {
    const [cachePokemon, setCachePokemon] = useState<any>({})
    const [filterParams, setFilterParams] = useState<IFilterParams[]>([])
    const filterParmsRef = useRef<IFilterParams[]>([])
    const [searchPokemons, setSearchPokemons] = useState<ResponseAPI[] | null>([] as ResponseAPI[]);
    const [isLoading, setIsLoading] = useState(false)
    const [filteredPokemon, setFilteredPokemon] = useState<string[]>([])
    const searchPokemon = async (pokemon: string, signal?: AbortSignal): Promise<ResponseAPI | null> => {
        if (pokemon.trim().length === 0) return null;
        if (cachePokemon[pokemon]) {
            // Hit cached data
            return cachePokemon[pokemon]
        }
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase().trim()}`
            const res = await fetch(url, { signal });
            if (res.status === 404) return null
            const data: ResponseAPI = await res.json();
            cachePokemon[data.name] = data
            setCachePokemon(cachePokemon)
            //get data and update to cache 
            return data

        } catch (error) {
            console.log((error as Error).message + "search ", pokemon);
            return null
        }
    }
    function isSelectedFilter(query: string) {
        //search pokemon by pokemon name in searched pokemon
        var index2 = findSearchPokemonsByName(query)
        if (index2 !== -1) {
            return true
        }
        //check query is existing
        var index = filterParmsRef.current.findIndex(parmaData => {

            return parmaData.query === query
        })
        return index !== -1
    }
    function getSizebyParam(query: string) {
        let filterParams = filterParmsRef.current
        let index = filterParams?.findIndex(param => param.query === query) as number
        if (index !== -1) {
            return filterParams[index]?.size ?? 0
        }
        return 0
    }
    function getSelectedCountByType(type: string): number {
        let filterParams = filterParmsRef.current
        return filterParams?.filter(param => param.type == type).length

    }
    const searchPokemonByFilter = async (type: string, query: string) => {
        if (query.trim().length === 0) return null;
        try {
            //get data by catehory and query
            const url = `https://pokeapi.co/api/v2/${type}/${query.toLowerCase().trim()}`
            const res = await fetch(url);
            if (res.status === 404) return null
            const data = await res.json();
            let pokemons = data.pokemon || data.pokemon_species;
            let filterParams = filterParmsRef.current
            let index = filterParams?.findIndex(param => param.type === type && param.query === query) as number
            filterParams[index].size = pokemons.length
            filterParmsRef.current = filterParams
            
            
            let nameList = [] as string[];
            for (let index = 0; index < pokemons.length; index++) {
                const pokemon = pokemons[index].pokemon || pokemons[index]

                let pokemonName = pokemon.name

                if (cachePokemon[pokemon.name]) {
                    //hit the cached item
                } else {
                    const url = pokemon.url
                    const res = await fetch(url);
                    const data = await res.json();
                    cachePokemon[pokemonName] = data
                }

                if (type !== "ability") {
                    cachePokemon[pokemonName][type] = query
                }

                nameList.push(pokemonName)
            }

            setFilterParams(filterParams)
            setIsLoading(false)
            setCachePokemon(cachePokemon)
            if (res.status === 404) return null
            return nameList



        } catch (error) {
            console.log((error as Error).message);
            // return null
        }
    }
    async function getFinalListFromFilterParams(filterParams: IFilterParams[]) {

        try {
            let ListOfNameList = [] as string[][]

            //store all the params return name list
            for (let index = 0; index < filterParams.length; index++) {
                const param = filterParams[index];
                if (param.type === "pokemon") {
                    searchPokemon(param.query)
                        .then(data => {
                            var index2 = findSearchPokemonsByName(data?.name as string)
                            if (index2 === -1) {
                                searchPokemons?.push(data as ResponseAPI)
                                let set = new Set([
                                    ...(searchPokemons as ResponseAPI[])
                                ]);
                                let finalList = [...set]?.filter(n => n)
                                localStorage.searchedPokemons = JSON.stringify(finalList)
                                setSearchPokemons(finalList)

                            }



                        })
                } else {
                    let nameList = await searchPokemonByFilter(param.type, param.query)
                    if (nameList) {
                        ListOfNameList.push(nameList)
                    } else {
                        throw ("No Data")
                    }

                }

            }
            let finalList = ListOfNameList.reduce((x: string[], y: string[]) => {
                // return x.filter((z) => y.includes(z))
                let set = new Set([
                    ...x,
                    ...y
                ]);
                return [...set]
            }, []);
            //get the common name within the lists
            setFilteredPokemon(finalList)

        } catch (error) {
            console.log("throw new Error", error)
            throw new Error("No Data")
        } finally {
            setIsLoading(false)
        }

    }
    function findSearchPokemonsByName(name: string) {
        if (localStorage.searchedPokemons) {
            let localSearchedPokemons = JSON.parse(localStorage.searchedPokemons ?? "")
            var index2 = localSearchedPokemons?.findIndex((pokemon: { name: string; }) => pokemon.name === name) as number
            return index2
        } else {
            var index2 = searchPokemons?.findIndex(pokemon => pokemon.name === name) as number
            return index2
        }

    }
    async function toggleFilterParams(type: string, query: string) {
        let param = {
            type,
            query
        }

        if (type === "name" || type === "pokemon") {
            // setPokemon({} as ResponseAPI)
            var index2 = findSearchPokemonsByName(query)
            if (index2 !== -1) {
                searchPokemons?.splice(index2, 1)
                let set = new Set([
                    ...(searchPokemons as ResponseAPI[])
                ]);

                if (set.size !== 0) {
                    let finalList = [...set]?.filter(n => n)
                    localStorage.searchedPokemons = JSON.stringify(finalList)
                    setSearchPokemons(finalList)
                } else {
                    localStorage.searchedPokemons = JSON.stringify([])
                    setSearchPokemons([])
                }

            }
        } else {
            var index = filterParmsRef.current.findIndex(parmaData => parmaData.type === type && parmaData.query === query)
            let filterParams = filterParmsRef.current
            let isAdd = true
            if (index !== -1) {
                filterParams.splice(index, 1);
                isAdd = false
            } else {
                filterParams.push(param);
                setIsLoading(true)
            }
            try {
                await getFinalListFromFilterParams([...filterParams])
                localStorage.filterParams = JSON.stringify(filterParams)
                filterParmsRef.current = [...filterParams]
                setFilterParams([...filterParams])
            } catch (error) {
                console.log(error)
            } finally {
                if (!isAdd) {

                    localStorage.filterParams = JSON.stringify(filterParams)
                    filterParmsRef.current = [...filterParams]
                    setFilterParams([...filterParams])
                }
                setIsLoading(false)
            }
        }




    }
    useEffect(() => {
        const controller = new AbortController();
        try {
            if (search && search !== " ") {
                setIsLoading(true)
                searchPokemon(search, controller.signal)
                    .then(data => {
                        var index2 = findSearchPokemonsByName(data?.name as string)
                        if (index2 === -1) {
                            searchPokemons?.push(data as ResponseAPI)
                            let set = new Set([
                                ...(searchPokemons as ResponseAPI[])
                            ]);
                            let finalList = [...set]?.filter(n => n)
                            localStorage.searchedPokemons = JSON.stringify(finalList)
                            setSearchPokemons(finalList)
                        }
                    })
            }
        } catch (error) { } finally {
            setIsLoading(false);
        }

        return () => controller.abort();
    }, [search])
    async function loadSearchedPokemons() {
        if (localStorage.searchedPokemons && searchPokemons?.length === 0) {
            setIsLoading(true)
            let localSearchedPokemons = JSON.parse(localStorage.searchedPokemons ?? "")

            let finalList = [] as ResponseAPI[]
            for (let index = 0; index < localSearchedPokemons.length; index++) {
                const pokemon = localSearchedPokemons[index];
                let query = pokemon.name
                let data = await searchPokemon(query)
                var index2 = searchPokemons?.findIndex(pokemon => pokemon.name === query) as number
                if (index2 === -1) { searchPokemons?.push(data as ResponseAPI) }
            }
            let set = new Set([
                ...(searchPokemons as ResponseAPI[])
            ]);
            finalList = [...set]?.filter(n => n)
            setSearchPokemons(finalList)
            setIsLoading(false)

        }
    }
    async function loadFilterParams() {
        if (localStorage.filterParams) {
            setIsLoading(true)
            let localFilterParams = JSON.parse(localStorage.filterParams ?? "")
            setFilterParams(localFilterParams)
            filterParmsRef.current = localFilterParams
            await getFinalListFromFilterParams(localFilterParams)
            setIsLoading(false)

        }
    }
    function clearFilterParams() {
        localStorage.filterParams = JSON.stringify([])
        localStorage.searchedPokemons = JSON.stringify([])
        setSearchPokemons([])
        setFilterParams([])
        filterParmsRef.current = ([])
        setFilteredPokemon([])
    }
    useEffect(() => {
        loadFilterParams()
        window.addEventListener('storage', () => {
            loadFilterParams()
        })
        return () => window.removeEventListener("storage", loadFilterParams);
    }, [])
    useEffect(() => {
        loadSearchedPokemons()
        return () => {
            setSearchPokemons([])
        }
    }, [])
    return {
        cachePokemon,
        searchPokemons,
        filteredPokemon,
        filterParams,
        isLoading,
        toggleFilterParams,
        clearFilterParams,
        isSelectedFilter,
        getSelectedCountByType,
        getSizebyParam
    }
}
export default useSearchPokemon