import { IPokemon } from "../../../interface/pokemon";

function getListBox(pokemons: any[], abilities: any[]) {
  return [
    {
      id: "name",
      name: "Name",
      ratio: 8,
      displayField: "name",
      data: async (query: string) => {
        let filteredPokemons = pokemons.filter((pokemon: IPokemon) => {
          return pokemon.name.startsWith(query);
        });

        return filteredPokemons;
      },
      searchType: "startsWith",
    },
    {
      id: "ability",
      name: "Ability",
      ratio: 2,
      displayField: "name",
      data: async (query: string) => {
        let filteredPokemons = abilities.filter((ability: IPokemon) => {
          return ability.name.startsWith(query);
        });

        return filteredPokemons;
      },
      searchType: "startsWith",
    },
  ];
}
const searchStyles = {
  input:
    "w-full border border-gray-300 dark:border-gray-700 py-2 px-4 text-lg outline-none text-sm md:text-md text-gray-700 dark:placeholder-gray-400 dark:text-gray-400 rounded-md bg-transparent",
  listbox: "bg-red-900 w-full text-slate-50 rounded-md",
  highlightedItem: "bg-red-800",
  query: "text-oldsilver-800 placeholder:text-slate-600",
  typeahead: "text-slate-500",
  clearButton:
    "absolute inset-y-0 text-lg right-0 w-10 inline-flex items-center justify-center bg-netural-700 hover:text-red-500 text-black dark:text-white",
  noItems: "cursor-default text-center my-10",
  match: "font-semibold",
  groupHeading: "px-5 py-3 text-white",
};
export { getListBox, searchStyles };
