import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-phone-number-input/style.css";
import useFormData from "../../../hook/useFormData";
import { IUser } from "../../../interface/user";
import { AddUserSchema, PHONE_NUMBER_DIDITS, isNumeric } from "../utils/form"

const PersonalInfoForm = (props: { setPage: React.Dispatch<React.SetStateAction<number>> }) => {
    const { setPage } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUser>({
        resolver: yupResolver(AddUserSchema),
    });

    const {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        phoneNumber,
        setPhoneNumber,
        address,
        setAddress,
        isLoading,
        clearFormData
    } = useFormData();
    const onSubmit = () => {
        localStorage.setItem("page", "2");
        setPage(2);
    };

    return (
        <div>
            {isLoading ? (
                <div></div>
            ) : (
                <form
                    className=" md:px-12 md:py-10 md:border px-2 py-2 m-auto mt-10 mb-4 rounded-lg"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="md:grid-cols-2 md:gap-6 grid">
                        <div className="group relative z-0 w-full mb-6">
                            <input
                                // autoFocus
                                {...register("firstName")}
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                                className=" block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-red-600 peer"
                                placeholder=" "
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                First Name*
                            </label>

                            {errors.firstName && (
                                <p className="dark:text-red-500 mt-2 text-sm text-red-600">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>
                        <div className="group relative z-0 w-full mb-6">
                            <input
                                {...register("lastName")}
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-red-600 peer"
                                placeholder=" "
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Last Name*
                            </label>

                            {errors.lastName && (
                                <p className="dark:text-red-500 mt-2 text-sm text-red-600">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="group relative z-0 w-full mb-6">
                        <input
                            {...register("address")}
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-red-600 peer"
                            placeholder=" "
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Address*
                        </label>

                        {errors.address && (
                            <p className="dark:text-red-500 mt-2 text-sm text-red-600">
                                {errors.address.message}
                            </p>
                        )}
                    </div>
                    <div className="group relative z-0 w-full mb-6">
                        <input
                            {...register("phoneNumber")}
                            value={phoneNumber}
                            onChange={(e) => {

                                if ((e.target.value.length <= PHONE_NUMBER_DIDITS && isNumeric(e.target.value)) || e.target.value.length === 0) {
                                    setPhoneNumber(e.target.value);
                                }
                            }}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 dark:text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-red-600 peer"
                            placeholder=" "
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Phone Number ({PHONE_NUMBER_DIDITS} digits)*
                        </label>

                        {errors.phoneNumber && (
                            <p className="dark:text-red-500 mt-2 text-sm text-red-600">
                                {errors.phoneNumber.message}
                            </p>
                        )}
                    </div>
                    <div className="flex">
                        <button
                            type="submit"
                                className="flex-1 btn mr-4 text-white bg-red-700 hover:bg-red-800  border-0 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Next
                        </button>
                        <button
                            type="reset"
                            onClick={() => {
                                clearFormData()
                            }}
                                className="btn text-red-700 hover:bg-gray-200 dark:hover:bg-gray-800 border-red-700  hover:border-red-800  bg-transparent border focus:outline-none  font-medium rounded-lg text-sm w-auto sm:w-auto px-5 py-2.5 text-center"
                        >
                            Reset
                        </button>
                    </div>


                </form>
            )}
        </div>
    );
};
export default PersonalInfoForm;
