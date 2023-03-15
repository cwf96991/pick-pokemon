import DarkModeButton from "./darkModeButton";

const Step = (props: {
  mobileHiddenText?: string;
  text: string;
  page: number;
  isActive: boolean;
  onClick: (page:number) => void;
}) => {
  const { isActive, onClick, page, text, mobileHiddenText } = props;
  const pcDisplayText = text.replace(mobileHiddenText ?? "", "");
  return (
    <li
      onClick={() => {
        onClick(page);
      }}
      className={`cursor-pointer flex items-center ${
        isActive ? "text-red-600 dark:text-red-500" : ""
      }`}
    >
      <span
        className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border  ${
          isActive
            ? "border-red-600 dark:border-red-500 "
            : "border-gray-500 dark:border-gray-400"
        }  rounded-full shrink-0 `}
      >
        {page}
      </span>
      {pcDisplayText}{" "}
      <span className="sm:inline-flex sm:ml-2 hidden">{mobileHiddenText}</span>
      {isActive ? <ActiveArrow /> : <Arrow />}
    </li>
  );
};
const Arrow = () => {
  return (
    <svg
      aria-hidden="true"
      className="sm:ml-4 w-4 h-4 ml-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 5l7 7-7 7M5 5l7 7-7 7"
      ></path>
    </svg>
  );
};
const ActiveArrow = () => {
  return (
    <svg
      aria-hidden="true"
      className="sm:ml-4 w-4 h-4 ml-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 5l7 7-7 7M5 5l7 7-7 7"
      ></path>
    </svg>
  );
};
const Header = (props: { page: number; setPage: (nextPage: number) => void }) => {
  const { page, setPage } = props;
  return (
    <div className="flex items-center mt-4 justify-between mx-auto">
      <ol className=" ml-auto md:max-w-[480px]  md:p-3 md:space-x-2 dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 flex items-center w-full p-2  space-x-1 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm">
        <Step
          text={"Personal Info"}
          mobileHiddenText={"Info"}
          page={1}
          isActive={page === 1}
          onClick={(page: number) => {
            setPage(page);
          }}
        />
        <Step
          text={"Pokemon"}
          page={2}
          isActive={page === 2}
          onClick={(page: number) => {
            setPage(page);
          }}
        />
        <Step
          text={"Review"}
          page={3}
          isActive={page === 3}
          onClick={(page: number) => {
            setPage(page);
          }}
        />
      </ol>
      <div></div>
      <div className="mx-auto md:block hidden">
        <DarkModeButton />
      </div>
    </div>
  );
};

export default Header;
