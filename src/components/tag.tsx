import PushPinIcon from "@mui/icons-material/PushPin";
const Tag = (props: { type: string; query: string; onDelete?: Function }) => {
  const { onDelete, type, query } = props;
  const isClickable = onDelete !== undefined;
  const typeConverter = () => {
    //hide prefix if type is pokemon 
    if (type === "pokemon") return "";
    let result = type.replace("pokemon", "");
    return result.replace("-", " ") + ":";
  };
  return (
    <div
      onClick={() => {
        if (onDelete) onDelete();
      }}
      data-te-chip-init
      data-te-ripple-init
      className={`${
        isClickable
          ? " cursor-pointer hover:bg-gray-200 hover:text-black dark:bg-gray-900 dark:hover:bg-gray-700 active:bg-[#cacfd1]"
          : ""
      }  mt-1 [word-wrap: break-word] capitalize my-[5px] mr-4 flex h-[32px] items-center  rounded bg-[#eceff1] border-red-900 border py-0 px-[12px] text-[13px] font-normal leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none  dark:bg-neutral-600 dark:text-neutral-200`}
    >
      {type === "pokemon" && <PushPinIcon sx={{ color: "#7f1d1d" }} />}
      {`${typeConverter()} ${query.replace("-", " ")}`}
      {onDelete && (
        <span
          data-te-chip-close
          className={`${
            isClickable ? " cursor-pointer" : ""
          }  w-4  pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="stroke-black dark:stroke-white w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      )}
    </div>
  );
};
export default Tag;
