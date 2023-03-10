import { useEffect, useState } from "react"

const useGetPokemons = () => {
    const [pokemons, setPokemons] = useState([])
    const [abilities, setAbilities] = useState([])
    const [colors, setColors] = useState([])
    const [eggGroups, setEggGroups] = useState([])
    const [types, setTypes] = useState([])
    const [natures, setNatures] = useState([])
    const [growthRates, setGrowthRates] = useState([])
    const [habitats, setHabitats] = useState([])
    const [shapes, setShapes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const getPokemons = async () => {
        if (pokemons.length === 0) {
            const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
            )
            const data = await res.json()
            let results = data.results

            setPokemons(results)
        }

    }
    const getAbilities = async () => {
        if (abilities.length === 0) {
            const res = await fetch(
                `https://pokeapi.co/api/v2/ability?offset=1&limit=400`
            )
            const data = await res.json()
            let results = data.results

            setAbilities(results)
        }

    }
    const getColors = async () => {
        if (colors.length === 0) {
            const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon-color/`
            )
            const data = await res.json()
            let results = data.results

            setColors(results)
        }

    }
    const getEggGroups = async () => {
        if (eggGroups.length === 0) {
            const res = await fetch(
                `https://pokeapi.co/api/v2/egg-group/`
            )
            const data = await res.json()
            let results = data.results

            setEggGroups(results)
        }

    }
    const getTypes = async () => {
        if (types.length === 0) {
            const res = await fetch(
                `https://pokeapi.co/api/v2/type/`
            )
            const data = await res.json()
            let results = data.results

            setTypes(results)
        }

    }
    const getNatures = async () => {
        if (natures.length === 0) {
            const res = await fetch(
                `https://pokeapi.co/api/v2/nature/`
            )
            const data = await res.json()
            let results = data.results

            setNatures(results)
        }

    }
    const getGrowthRates = async () => {
        if (growthRates.length === 0) {
            const res = await fetch(
                `https://pokeapi.co/api/v2/growth-rate/`
            )
            const data = await res.json()
            let results = data.results

            setGrowthRates(results)
        }

    }
    const getHabitats = async () => {
        if (habitats.length === 0) {
            const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon-habitat/`
            )
            const data = await res.json()
            let results = data.results

            setHabitats(results)
        }

    }
    const getShapes = async () => {
        if (shapes.length === 0) {
            const res = await fetch(
                `https://pokeapi.co/api/v2/pokemon-shape/`
            )
            const data = await res.json()
            let results = data.results

            setShapes(results)
        }

    }

    useEffect(() => {
        setIsLoading(true)
        getPokemons()
        getColors()
        getAbilities()
        getEggGroups()
        getTypes()
        getNatures()
        getGrowthRates()
        getHabitats()
        getShapes()
        setIsLoading(false)
    }, [])
    return { pokemons, abilities, colors, eggGroups, types, natures, growthRates, habitats, shapes, isLoading }

}
export default useGetPokemons