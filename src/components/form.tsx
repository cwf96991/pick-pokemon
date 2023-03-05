import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-phone-number-input/style.css";
import useFormData from "../hook/useFormData";
import * as yup from "yup";
type AppUser = {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
};
const AddUserSchema = yup.object().shape({
  firstName: yup.string().required("Please Input your first name"),
  lastName: yup.string().required("Please Input your last name"),
  address: yup.string().required("Please Input your address name"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
});
function isNumeric(str: string) {
  return (
    !isNaN(+str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}
const Form = (props: { setPage: Function }) => {
  const { setPage } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppUser>({
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
  } = useFormData();
  console.log("phoneNumber", phoneNumber);
  const onSubmit = (data: AppUser) => {
    console.log(data);
    localStorage.setItem("page", "2");
    setPage(2);
  };

  return (
    <div>
      {isLoading ? (
        <div></div>
      ) : (
        <form
          className=" px-12 py-10 m-auto mt-10 border rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="md:grid-cols-2 md:gap-6 grid">
            <div className="group relative z-0 w-full mb-6">
              <input
                autoFocus
                {...register("firstName")}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  console.log(e.target.value);
                }}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
                  console.log(e.target.value);
                }}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
                console.log(e.target.value);
              }}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
                if (e.target.value.length <= 10 && isNumeric(e.target.value)) {
                  setPhoneNumber(e.target.value);
                }
                console.log(e.target.value);
              }}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Phone Number (10 digits)*
            </label>

            {errors.phoneNumber && (
              <p className="dark:text-red-500 mt-2 text-sm text-red-600">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Next
          </button>
        </form>
      )}
    </div>
  );
};
export default Form;
