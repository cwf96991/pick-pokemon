import DropDown from "../../dropdown";
import Accordion from "../../accordion";

const MobileExtraFilterButton = (props: { toggleDrawer: Function }) => {
  const { toggleDrawer } = props;
  return (
    <div className="md:hidden block">
      <button
        onClick={() => {
          toggleDrawer();
        }}
        className={`btn mt-1 normal-case cursor-pointer mr-2 flex-1 border-0 text-white bg-red-700 hover:bg-red-800  focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
        type="button"
        data-drawer-target="drawer-example"
        data-drawer-show="drawer-example"
        aria-controls="drawer-example"
      >
        Refine Your Search
      </button>
    </div>
  );
};
interface IFilterList {
  data: any[];
  type: string;
  text: string;
  isRight: boolean;
}
const ExtraFilterWidget = (props: {
  extraFilterList: IFilterList[];
  toggleFilterParams: Function;
  isSelectedFilter: Function;
  getSizebyParam: Function;
  getSelectedCountByType: Function;
}) => {
  const {
    extraFilterList,
    toggleFilterParams,
    isSelectedFilter,
    getSizebyParam,
    getSelectedCountByType,
  } = props;

  return (
    <div className="md:flex hidden my-2">
      {extraFilterList.map((filter, index) => {
        const { data, type, text, isRight } = filter;
        const selectedCountText =
          getSelectedCountByType(type) > 0
            ? `(${getSelectedCountByType(type)})`
            : "";

        return (
          <DropDown
            key={index}
            options={data.map((data: any) => data.name)}
            sizes={data.map((data: any) => {
              return getSizebyParam(data.name) > 0
                ? `(${getSizebyParam(data.name)})`
                : "";
            })}
            onClick={(option: string) => {
              toggleFilterParams(type, option);
            }}
            isRight={isRight}
            text={text}
            selectedCountText={selectedCountText}
            isSelected={(option: string) => isSelectedFilter(option)}
          />
        );
      })}
    </div>
  );
};
const ExtraFilterWidgetMobile = (props: {
  extraFilterList: IFilterList[];
  toggleFilterParams: Function;
  isSelectedFilter: Function;
  getSizebyParam: Function;
  getSelectedCountByType: Function;
}) => {
  const {
    extraFilterList,
    toggleFilterParams,
    isSelectedFilter,
    getSizebyParam,
    getSelectedCountByType,
  } = props;

  return (
    <div className="mt-4">
      {extraFilterList.map((filter, index) => {
        const { data, type, text } = filter;
        const selectedCountText =
          getSelectedCountByType(type) > 0
            ? `(${getSelectedCountByType(type)})`
            : "";
        return (
          <Accordion
            key={index}
            header={
              <div className="">
                {text}
                <div className="inline ml-2 text-red-700 mt-[1px]">
                  {selectedCountText}
                </div>
              </div>
            }
            content={
              <div>
                {data
                  .map((data: any) => data.name)
                  .map((option, index) => {
                    const isSelected = isSelectedFilter(option);
                    const sizeText =
                      getSizebyParam(option) > 0
                        ? `(${getSizebyParam(option)})`
                        : "";
                    return (
                      <li className=" flex" key={index}>
                        <div
                          className=" text-black dark:text-white flex items-center mb-2"
                          onClick={() => {
                            toggleFilterParams(type, option);
                          }}
                        >
                          <input
                            type="checkbox"
                            readOnly
                            checked={isSelected}
                            className="mr-2 checkbox checkbox-warning"
                          />
                          <div className="">
                            {option}{" "}
                            <div className="inline text-red-700 text-bold">
                              {sizeText}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </div>
            }
          />
        );
      })}
    </div>
  );
};

export { MobileExtraFilterButton, ExtraFilterWidget, ExtraFilterWidgetMobile };
