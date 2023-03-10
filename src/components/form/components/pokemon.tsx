/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ResponseAPI } from "../../../interface/pokemon";
import { pokemonBallImg } from "../../../constant/index";
import { getAvatarFromPokemon } from "../utils/pokemon";
const TypeLabel = (props: { type: string; color?: string }) => {
  const { type, color } = props;
  return (
    <span
      className={`${
        color ?? "bg-gray-300"
      }  inline-block mt-1 px-2 py-1 mb-2 mr-2 text-xs font-semibold text-gray-700 capitalize  rounded-full`}
    >
      {type}
    </span>
  );
};

const Pokemon = (props: {
  pokemon: ResponseAPI | null;
  isSelected: (pokemon: ResponseAPI) => boolean;
  togglePokemon: (pokemon: ResponseAPI) => void;
}) => {
  const { pokemon, isSelected, togglePokemon } = props;

  if (pokemon && Object.keys(pokemon).length === 0) return <></>;
  const avatar = getAvatarFromPokemon(pokemon as ResponseAPI);

  return (
    <>
      {!pokemon ? (
        <span className="no-results">No results</span>
      ) : (
        <div className="mr-1 mt-4 ">
          <div
            onClick={() => {
              togglePokemon(pokemon);
            }}
            className={`overfloat-y-auto cursor-pointer  h-[180px] max-w-sm hover:bg-gray-200 dark:hover:bg-gray-600 rounded overflow-hidden shadow-lg ${
              isSelected(pokemon)
                ? "border-2 border-red-600 dark:border-red-900"
                : "border-2 border-gray-500"
            }`}
          >
            <div className="flex items-center justify-between p-4 mb-2">
              <img
                className="w-[36px]"
                src={avatar}
                alt={pokemon.name}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = pokemonBallImg;
                }}
              />
              <div className="dark:text-white  text-xl font-bold text-black capitalize  mr-2">
                {pokemon.name}
              </div>
            </div>

            <div className=" px-6 pb-2 ">
              {pokemon?.abilities && (
                <div className="flex flex-wrap items-center">
                  <div className="dark:text-gray-400 mr-2 text-xs text-gray-700">
                    Abilities:{" "}
                  </div>
                  <div>
                    {pokemon?.abilities?.map((ability, index) => (
                      <TypeLabel key={index} type={ability.ability.name} />
                    ))}
                  </div>
                </div>
              )}
              {pokemon?.types && (
                <div className="flex flex-wrap items-center">
                  <div className="dark:text-gray-400 mr-2 text-xs text-gray-700">
                    Type:{" "}
                  </div>
                  <div>
                    {pokemon?.types?.map((type, index) => {
                      return <TypeLabel key={index} type={type.type.name} />;
                    })}
                  </div>
                </div>
              )}
              {pokemon?.egg_groups && (
                <>
                  <div className="dark:text-gray-400 mr-2  text-xs text-gray-700">
                    Egg Group:{" "}
                  </div>
                  <div>
                    {pokemon?.egg_groups?.map((eggGroup, index) => {
                      return <TypeLabel key={index} type={eggGroup.name} />;
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Pokemon;
