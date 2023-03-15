import { IFilterParams } from "../../../interface/pokemon";
import Tag from "../../tag";
import { LoadingWidget } from "./loading";

const FilterTag = (props: { isLoading: boolean, filterParamsWithoutSizeLength: number, finalFilterParams: IFilterParams[], onDelete: (type: string, query: string) => void }) => {
    const { isLoading, filterParamsWithoutSizeLength, finalFilterParams, onDelete } = props
    const isLoadingData = isLoading || filterParamsWithoutSizeLength !== 0;
    return (
      <div className=" flex flex-wrap md:max-h-[50px] md:overflow-y-auto md:max-w-[800px]">
        {finalFilterParams.map(
          (param: { type: string; query: string }, index) => {
            const { type, query } = param;
            // if ()
            return (
              <Tag
                key={index}
                type={type}
                query={query}
                onDelete={async () => {
                  onDelete(type, query)
  
                }}
              />
            );
          }
        )}
        {isLoadingData && (
          <div
            data-te-chip-init
            data-te-ripple-init
            className={` mt-1 [word-wrap: break-word] capitalize my-[5px] mr-4 flex h-[32px] items-center  rounded bg-[#eceff1] border-red-500 border py-1 px-[12px]  justify-center text-[13px] font-normal leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none  dark:bg-neutral-600 dark:text-neutral-200`}
          >
            <div className="h-4/5 w-4/5">
              <LoadingWidget />
            </div>
          </div>
        )}
      </div>
    );
  };

  const ClearAllAndPokemonNumber = (props: { finalFilterParams: IFilterParams[], clearFilterParams: () => void, finalPokemons: string[] }) => {
    const { finalFilterParams, clearFilterParams, finalPokemons } = props
    return (
      <div className="flex items-center pt-2">
        {finalFilterParams.length > 0 && (
          <button
            onClick={() => {
              clearFilterParams();
            }}
            className="btn btn-sm hover:bg-gray-200 dark:hover:bg-gray-800 hover:border-red-800 focus:outline-none sm:w-auto w-auto px-5 py-1 text-sm font-medium text-center text-red-700 bg-transparent border border-red-700 rounded-lg"
          >
            Clear All ({finalFilterParams.length})
          </button>
        )}
        {!(finalFilterParams.length > 0 && finalPokemons.length === 0) &&
          finalPokemons.length !== 0 && (
            <div className="md:text-base dark:text-white ml-2 text-xs text-black">
              {finalPokemons.length} Pokemon Found
            </div>
          )}
      </div>
    );
  };
  export { FilterTag ,ClearAllAndPokemonNumber}