/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { IFilterParams, ResponseAPI } from '../interface/pokemon';

const useSearchPokemon = (search: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [cachePokemon, setCachePokemon] = useState<any>({})
    const [filterParams, setFilterParams] = useState<IFilterParams[]>([])
    const filterParmsRef = useRef<IFilterParams[]>([])
    const [searchPokemons, setSearchPokemons] = useState<ResponseAPI[]>([] as ResponseAPI[]);
    const [isLoading, setIsLoading] = useState(false)
    const [filteredPokemon, setFilteredPokemon] = useState<string[]>([])
    
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
    useEffect(() => {
        const controller = new AbortController();
        try {
            if (search && search !== " ") {
                setIsLoading(true)
                searchPokemon(search, controller.signal)
                    .then(data => {
                        const index2 = getSearchPokemonsIndexByName(data?.name as string)
                        if (index2 === -1) {
                            searchPokemons?.unshift(data as ResponseAPI)
                            const set = new Set([
                                ...(searchPokemons as ResponseAPI[])
                            ]);
                            const finalList = [...set]?.filter(n => n)
                            localStorage.searchedPokemons = JSON.stringify(finalList)
                            setSearchPokemons(finalList)
                        }
                    })
            }
        } finally {
            setIsLoading(false);
        }

        return () => controller.abort();
    }, [search])
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
    const searchPokemonByFilter = async (type: string, query: string) => {
        if (query.trim().length === 0) return null;
        try {
            //get data by catehory and query
            const url = `https://pokeapi.co/api/v2/${type}/${query.toLowerCase().trim()}`
            const res = await fetch(url);
            if (res.status === 404) return null
            const data = await res.json();
            const pokemons = data.pokemon || data.pokemon_species;
            const filterParams = filterParmsRef.current
            const index = filterParams?.findIndex((param: IFilterParams) => param.type === type && param.query === query) as number

            filterParams[index].size = pokemons.length
            filterParmsRef.current = filterParams
            localStorage.filterParams = JSON.stringify(filterParams)


            const nameList = [] as string[];
            for (let index = 0; index < pokemons.length; index++) {
                const pokemon = pokemons[index].pokemon || pokemons[index]

                const pokemonName = pokemon.name

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
            const ListOfNameList = [] as string[][]

            //store all the params return name list
            for (let index = 0; index < filterParams.length; index++) {
                const param = filterParams[index];
                if (param.type === "pokemon") {
                    searchPokemon(param.query)
                        .then(data => {
                            const index2 = getSearchPokemonsIndexByName(data?.name as string)
                            if (index2 === -1) {
                                searchPokemons?.unshift(data as ResponseAPI)
                                const set = new Set([
                                    ...(searchPokemons as ResponseAPI[])
                                ]);
                                const finalList = [...set]?.filter(n => n)
                                localStorage.searchedPokemons = JSON.stringify(finalList)
                                console.log("searchPokemons",searchPokemons)
                                setSearchPokemons(finalList)

                            }



                        })
                } else {
                    const nameList = await searchPokemonByFilter(param.type, param.query)
                    if (nameList) {
                        ListOfNameList.push(nameList)
                    } else {
                        throw new Error("No Data")
                    }

                }

            }
            const finalList = ListOfNameList.reduce((x: string[], y: string[]) => {
                // return x.filter((z) => y.includes(z))
                const set = new Set([
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
    async function toggleFilterParams(type: string, query: string) {
        const param = {
            type,
            query
        }

        if (type === "name" || type === "pokemon") {
            //toggle searched pokemon tag
            const index2 = getSearchPokemonsIndexByName(query)
            if (index2 !== -1) {
                //remove existing searched pokemon
                searchPokemons?.splice(index2, 1)
                const set = new Set([
                    ...(searchPokemons as ResponseAPI[])
                ]);

                if (set.size !== 0) {
                    const finalList = [...set]?.filter(n => n)
                    localStorage.searchedPokemons = JSON.stringify(finalList)
                    setSearchPokemons(finalList)
                } else {
                    localStorage.searchedPokemons = JSON.stringify([])
                    setSearchPokemons([])
                }

            }
        } else {
            const index = filterParmsRef.current.findIndex((parmaData: { type: string; query: string; }) => parmaData.type === type && parmaData.query === query)
            const filterParams = filterParmsRef.current
            let isAdd = true
            if (index !== -1) {
                //remove existing params
                filterParams.splice(index, 1);
                isAdd = false
            } else {
                // add new params
                filterParams.push(param);
                setIsLoading(true)
            }
            try {
                //update the final pokemon name list and params list
                await getFinalListFromFilterParams([...filterParams])
                localStorage.filterParams = JSON.stringify(filterParams)
                filterParmsRef.current = [...filterParams]
                setFilterParams([...filterParams])
            } catch (error) {
                console.log(error)
            } finally {
                //if user input params is not valid
                if (!isAdd) {
                    //still remove the params from the filter params and update it
                    localStorage.filterParams = JSON.stringify(filterParams)
                    filterParmsRef.current = [...filterParams]
                    setFilterParams([...filterParams])
                }
                setIsLoading(false)
            }
        }
    }
    function isSelectedFilter(query: string) {
        //search pokemon by pokemon name in searched pokemon
        const index2 = getSearchPokemonsIndexByName(query)
        if (index2 !== -1) {
            return true
        }
        //check query is existing
        const index = filterParmsRef.current.findIndex((parmaData: IFilterParams) => {

            return parmaData.query === query
        })
        return index !== -1
    }
    function getSizebyParam(query: string) {

        const filterParams = filterParmsRef.current
        const index = filterParams?.findIndex((param: IFilterParams) => param.query === query) as number
        if (index !== -1) {
            return filterParams[index]?.size ?? 0
        }
        return 0
    }
    function getSelectedCountByType(type: string): number {
        const filterParams = filterParmsRef.current
        return filterParams?.filter((param: IFilterParams) => param.type === type).length
    }
    function getSearchPokemonsIndexByName(name: string) {
        if (localStorage.searchedPokemons) {
            const localSearchedPokemons = JSON.parse(localStorage.searchedPokemons ?? "")
            return localSearchedPokemons?.findIndex((pokemon: { name: string; }) => pokemon.name === name) as number
        } else {
            return searchPokemons?.findIndex((pokemon: { name: string; }) => pokemon.name === name) as number
        }
    }
    
    async function loadSearchedPokemons() {
        if (localStorage.searchedPokemons && searchPokemons?.length === 0) {
            setIsLoading(true)
            const localSearchedPokemons = JSON.parse(localStorage.searchedPokemons ?? "")

            let finalList = [] as ResponseAPI[]
            for (let index = 0; index < localSearchedPokemons.length; index++) {
                const pokemon = localSearchedPokemons[index];
                const query = pokemon.name
                const data = await searchPokemon(query)
                const index2 = searchPokemons?.findIndex((pokemon: { name: string; }) => pokemon.name === query) as number
                if (index2 === -1) { searchPokemons?.unshift(data as ResponseAPI) }
            }
            const set = new Set([
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
            const localFilterParams = JSON.parse(localStorage.filterParams ?? "")
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