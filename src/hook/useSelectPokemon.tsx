import { useEffect, useState } from "react"
import { ResponseAPI } from "../interface/pokemon";

const useSelectPokemon = () => {
    const [pokemonMap, setPokemonMap] = useState<any>({})
    const [selectedPokemonList, setSelectedPokemonList] = useState<ResponseAPI[]>()
    useEffect(() => {
        if (localStorage.pokemonMap) {
            let localPokemonMap = JSON.parse(localStorage.pokemonMap);
            setPokemonMap(localPokemonMap)
        } else {
            localStorage.pokemonMap = JSON.stringify({});
        }


    }, [])
    useEffect(() => {
        getSelectedPokemonList()
    }, [pokemonMap])
    function isSelected(pokemon: ResponseAPI) {
        if (pokemon && Object.keys(pokemon).length === 0) return false

        let pokemonName = pokemon?.name ?? ""
        if (pokemonMap[pokemonName] && pokemonMap[pokemonName] !== "") { return true }

        return false
    }
    function isSelectedByName(pokemonName: string) {

        if (pokemonMap[pokemonName] && pokemonMap[pokemonName] !== "") { return true }

        return false
    }
    function togglePokemon(pokemon: ResponseAPI) {
        let localPokemonMap = JSON.parse(localStorage.pokemonMap);
        let pokemonName = pokemon.name
        if (localPokemonMap[pokemonName] && localPokemonMap[pokemonName] !== "") {
            localPokemonMap[pokemonName] = ""
        } else {
            localPokemonMap[pokemonName] = pokemon
        }
        setPokemonMap(localPokemonMap)
        localStorage.pokemonMap = JSON.stringify(localPokemonMap);

    }
    function deletePokemonByName(pokemonName: string) {
        let localPokemonMap = JSON.parse(localStorage.pokemonMap);

        localPokemonMap[pokemonName] = ""
        setPokemonMap(localPokemonMap)
        localStorage.pokemonMap = JSON.stringify(localPokemonMap);
    }
    
    function getSelectedPokemonList() {
        let list: any = []
        Object.values(pokemonMap).forEach(value => {
            if (value !== "") {
                list.push(value)
            }
        })

        setSelectedPokemonList(list);
    }
    function clearSelectedPokemon() {
        localStorage.pokemonMap = JSON.stringify({});
        setPokemonMap({})
    }
    return {
        pokemonMap,
        isSelected,
        isSelectedByName,
        // selectedPokemonNameList,
        togglePokemon,
        deletePokemonByName,
        clearSelectedPokemon,
        selectedPokemonList,
        // getSelectedPokemonNameList
    }
}

export default useSelectPokemon