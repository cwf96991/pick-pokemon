import { pokemonBallImg } from "../constant"

const Chip = (props: { name: string, imgUrl: string, onDelete?: Function, onClick?: Function }) => {
    const { name, imgUrl, onDelete, onClick } = props
    const isClickable = onClick !== undefined
    return <div
        onClick={() => {
            if (onClick) onClick()
        }}
        data-te-chip-init
        data-te-ripple-init
        className={`${isClickable ? " cursor-pointer active:bg-[#cacfd1]" : ""} dark:hover:bg-gray-700 group mt-0 mb-2 md:mb-2 md:mt-0 [word-wrap: break-word] capitalize my-[5px] mr-4 flex h-[32px] items-center justify-between rounded-[16px] bg-[#eceff1] border-red-700 hover:border-red-900 text-gray-600  dark:text-gray-300  hover:text-black border py-0 px-[12px] text-[13px] font-normal leading-loose shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none  dark:bg-gray-900  dark:hover:text-white`}>
        <img
            className="my-0 mr-[8px] pb-1 h-[inherit] w-[inherit] rounded-[100%]"
            src={imgUrl}
            alt={name}
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = pokemonBallImg;
            }}
        />
        {name}
        {onDelete && <span
            onClick={() => {
                if (onDelete) onDelete()
            }}
            data-te-chip-close
            className={`${isClickable ? " cursor-pointer" : ""} float-right w-4  pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                fill="currentColor"
                className="fill-gray-400 dark:fill-gray-400 hover:fill-black group-hover:fill-black dark:group-hover:fill-white  stroke-black w-3 h-3 ">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12" />
            </svg>
        </span>}
    </div>
}
export default Chip