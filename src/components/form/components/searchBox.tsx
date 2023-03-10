/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useRef } from "react";
import useDrawer from "../../../hook/useDrawer";
import useGetPokemons from "../../../hook/useGetPokemons";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { pokemonBallImg } from "../../../constant/index";
import { IPokemon } from "../../../interface/pokemon";
import {
  MobileExtraFilterButton,
  ExtraFilterWidget,
  ExtraFilterWidgetMobile,
} from "./extraFilter";
import { getPokemonIdByUrl } from "../utils/pokemon";
import { getListBox, searchStyles } from "../utils/search";

const recentSearchesPlugin = require("turnstone-recent-searches");
const Turnstone = require("turnstone");

const SEARCH_MAX_ITEM = 3;
const SearchBox = (props: {
  setSearchQuery: Function;
  turnstoneRef: any;
  toggleFilterParams: Function;
  isSelectedFilter: Function;
  filterTagWidget: ReactElement;
  getSizebyParam: Function;
  getSelectedCountByType: Function;
}) => {
  const {
    setSearchQuery,
    turnstoneRef,
    toggleFilterParams,
    isSelectedFilter,
    filterTagWidget,
    getSizebyParam,
    getSelectedCountByType,
  } = props;
  const { isOpen, toggleDrawer } = useDrawer();
  const queryString = useRef("");
  const {
    pokemons,
    abilities,
    colors,
    eggGroups,
    types,
    growthRates,
    habitats,
    shapes,
  } = useGetPokemons();
  function queryOnChange(query: string) {
    queryString.current = query;
  }

  const listbox = getListBox(pokemons, abilities);

  const Item = (data: { groupName: string; item: IPokemon }) => {
    const { item } = data;
    const category = data.groupName;
    const isSelected = isSelectedFilter(item.name);

    const id = getPokemonIdByUrl(item.url);
    let avatar = pokemonBallImg;
    if (id.length > 0) {
      avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
    }
    return (
      <div className="flex justify-between px-5 py-2 cursor-pointer items-center">
        <div className="flex items-center ">
          {category === "Name" && (
            <img
              width={35}
              height={35}
              src={avatar}
              alt={item.name}
              className="object-cover mr-3 rounded-full"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = pokemonBallImg;
              }}
            />
          )}
          <p className="capitalize ">{item.name.replace("-", " ")}</p>
        </div>

        {isSelected && (
          <input
            type="checkbox"
            readOnly
            checked={true}
            className="checkbox checkbox-warning"
          />
        )}
      </div>
    );
  };
  const onSelect = (item: IPokemon) => {
    const filteredPokemon = pokemons.filter((pokemon: IPokemon) => {
      return pokemon.name === item?.name;
    });
    //check if querying name or ability
    //lenght = 0 => ability
    //lenght!= 0 => name
    if (filteredPokemon.length === 0) {
      if (queryString.current !== "") {
        toggleFilterParams("ability", queryString.current);
        turnstoneRef.current.query("");
      }
    } else {
      setSearchQuery(item?.name ?? "");
    }
  };
  const extraFilterList = [
    {
      data: eggGroups,
      type: "egg-group",
      text: "Egg Group",
      isRight: false,
    },
    {
      data: colors,
      type: "pokemon-color",
      text: "Color",
      isRight: false,
    },
    {
      data: types,
      type: "type",
      text: "Type",
      isRight: false,
    },
    {
      data: growthRates,
      type: "growth-rate",
      text: "Growth Rate",
      isRight: true,
    },
    {
      data: habitats,
      type: "pokemon-habitat",
      text: "Habitat",
      isRight: true,
    },
    {
      data: shapes,
      type: "pokemon-shape",
      text: "Shape",
      isRight: true,
    },
  ];

  const DrawerWidget = () => {
    return (
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="!w-4/5 p-4 !bg-gray-100 dark:!bg-gray-800 text-black dark:text-white h-screen overflow-y-auto"
      >
        <div className="text-2xl font-bold">Refine Your Search</div>
        <div className="text-lg font-semibold mt-4">Applied Filters</div>
        {filterTagWidget}
        <ExtraFilterWidgetMobile
          extraFilterList={extraFilterList}
          toggleFilterParams={toggleFilterParams}
          isSelectedFilter={isSelectedFilter}
          getSizebyParam={getSizebyParam}
          getSelectedCountByType={getSelectedCountByType}
        />
      </Drawer>
    );
  };
  const SearchBar = () => {
    return (
      <Turnstone
        id="search"
        name="search"
        ref={turnstoneRef}
        typeahead={true}
        clearButton={true}
        debounceWait={250}
        listboxIsImmutable={true}
        maxItems={SEARCH_MAX_ITEM}
        noItemsMessage="We couldn't find any pokemon that matches your search"
        placeholder="Search for any pokemon and ability"
        listbox={listbox}
        matchText={true}
        styles={searchStyles}
        Item={Item}
        plugins={[recentSearchesPlugin]}
        onSelect={onSelect}
        onChange={(query: string) => {
          queryOnChange(query);
        }}
      />
    );
  };
  return (
    <div>
      <SearchBar />
      <MobileExtraFilterButton toggleDrawer={toggleDrawer} />
      <ExtraFilterWidget
        extraFilterList={extraFilterList}
        toggleFilterParams={toggleFilterParams}
        isSelectedFilter={isSelectedFilter}
        getSizebyParam={getSizebyParam}
        getSelectedCountByType={getSelectedCountByType}
      />
      <DrawerWidget />
    </div>
  );
};
export default SearchBox;
