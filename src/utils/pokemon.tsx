const getPokemonIdByUrl = (url: string): string => {
        url = url.substring(34, url.length)
        // https://pokeapi.co/api/v2/pokemon/ -> remove those 34 characters
        return url.slice(0, -1)
    }

    export {getPokemonIdByUrl}