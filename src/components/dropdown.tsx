import ArrowUpSvg from "../images/arrow-up";
const DropDown = (props: { text: string, isRight?: boolean, options: any[], sizes: any[], onClick: Function, isSelected: Function, selectedCountText: string }) => {
    const { text, options, onClick, isSelected, isRight, sizes, selectedCountText } = props;

    return <div className={`dropdown mr-2 ${(isRight ?? false) ? "dropdown-bottom dropdown-end" : ""} `}>
        <label tabIndex={Number("0")} className="btn btn-outline btn-sm m-0 mt-1 border-gray-300 dark:border-gray-300 group  hover:bg-transparent normal-case text-gray-400  hover:text-black dark:hover:text-white ">
            <div className="flex items-center">
                {text}
                {selectedCountText !== "" && <div className="mx-1 text-red-700 mt-[1px] ">
                    {selectedCountText}
                </div>}
                <div className="rotate-180">
                    <ArrowUpSvg
                        color="fill-gray-400 dark:fill-gray-400 hover:fill-black group-hover:fill-black dark:group-hover:fill-white "
                    />
                </div>
            </div>

        </label>
        <ul tabIndex={Number("0")} className=" md:h-[400px]  md:w-[400px] dropdown-content menu p-2 shadow bg-red-900  rounded-box  ">
            {options.map((option, index) => {
                return <li className="" key={index}>
                    <div
                        className="active:bg-red-300 text-white"
                        onClick={() => {
                            (document.activeElement as HTMLElement)?.blur();
                            onClick(option)
                        }}>
                        <input type="checkbox" readOnly checked={isSelected(option)} className="checkbox checkbox-warning" />
                        {option} {sizes[index]}

                    </div>
                </li>
            })}


        </ul>
    </div>
}
export default DropDown