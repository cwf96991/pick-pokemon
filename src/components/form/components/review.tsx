import useFormData from "../../../hook/useFormData";
import useSelectPokemon from "../../../hook/useSelectPokemon";
import Chip from "../../chip";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { toast } from "react-toastify";
import useDarkMode from "../../../hook/useDarkMode";
import { getAvatarFromPokemon } from "../utils/pokemon";
import useIsMobile from "../../../hook/useIsMobile";

const Review = (props: { setPage: Function }) => {
  const { setPage } = props;
  const { isDarkMode } = useDarkMode();
  const { isMobile } = useIsMobile();
  const { selectedPokemonList, clearSelectedPokemon } = useSelectPokemon();
  const { firstName, lastName, phoneNumber, address, clearFormData } =
    useFormData();
  const onSubmit = () => {
    let userRecord: { [id: string]: any } = {};
    userRecord.firstName = firstName;
    userRecord.lastName = lastName;
    userRecord.phoneNumber = phoneNumber;
    userRecord.address = address;
    userRecord.selectedPokemon = selectedPokemonList;
    if (localStorage.userRecord) {
      let localUserRecord = JSON.parse(localStorage.userRecord);
      localUserRecord.push(userRecord);
      localStorage.userRecord = JSON.stringify(localUserRecord);
    } else {
      localStorage.userRecord = JSON.stringify([userRecord]);
    }
    clearSelectedPokemon();
    localStorage.filterParams = JSON.stringify([]);
    localStorage.searchedPokemons = JSON.stringify([]);
    clearFormData();
    toast.success("Submit Successfully!", {
      position: isMobile ? "bottom-center" : "top-right",
    });
    setPage(1);
    localStorage.setItem("page", "1");
    window.dispatchEvent(new Event("storage"));
  };
  
  return (
    <div className=" md:px-12 md:py-10 md:border px-2 py-2 m-auto mt-10 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="dark:text-white mb-4 text-black">Personal Info</div>

        <div
          onClick={() => {
            setPage(1);
          }}
          className="text-white btn btn-outline btn-sm dark:border-gray-700 border-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          <ModeEditIcon sx={{ color: isDarkMode ? "#fff" : "#000" }} />
        </div>
      </div>
      <form className="">
        <div className="md:grid-cols-2 md:gap-6 grid">
          <div className="group relative z-0 w-full mb-6">
            <input
              autoFocus
              value={firstName}
              className="cursor-not-allowed block py-2.5 px-0 w-full text-sm text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-red-600 peer"
              placeholder=" "
              disabled={true}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              First Name*
            </label>
          </div>
          <div className="group relative z-0 w-full mb-6">
            <input
              value={lastName}
              className="cursor-not-allowed block py-2.5 px-0 w-full text-sm text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-red-600 peer"
              placeholder=" "
              disabled={true}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Last Name*
            </label>
          </div>
        </div>
        <div className="group relative z-0 w-full mb-6">
          <input
            value={address}
            className="cursor-not-allowed block py-2.5 px-0 w-full text-sm text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-red-600 peer"
            placeholder=" "
            disabled={true}
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Address*
          </label>
        </div>
        <div className="group relative z-0 w-full mb-6">
          <input
            value={phoneNumber}
            className="cursor-not-allowed block py-2.5 px-0 w-full text-sm text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-red-600 peer"
            placeholder=" "
            disabled={true}
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Phone Number (10 digits)*
          </label>
        </div>
      </form>
      <div className="flex items-center justify-between">
        <div className="dark:text-white text-black">Selected Pokemon</div>

        <div
          onClick={() => {
            setPage(2);
          }}
          className="text-white btn btn-outline btn-sm dark:border-gray-700 border-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          <ModeEditIcon sx={{ color: isDarkMode ? "#fff" : "#000" }} />
        </div>
      </div>
      <div className=" flex flex-wrap w-full">
        {selectedPokemonList?.map((pokemon, index) => {
          let avatar = getAvatarFromPokemon(pokemon);
          return <Chip key={index} name={pokemon.name} imgUrl={avatar} />;
        })}
      </div>

      <div className="flex">
        
        <button
          onClick={() => {
            onSubmit();
          }}
          className="flex-1 btn  text-white bg-red-700 hover:bg-red-800  border-0 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Review;
