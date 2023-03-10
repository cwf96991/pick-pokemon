import * as yup from "yup";
const PHONE_NUMBER_DIDITS = 10
const AddUserSchema = yup.object().shape({
    firstName: yup.string().required("Please Input your first name"),
    lastName: yup.string().required("Please Input your last name"),
    address: yup.string().required("Please Input your address name"),
    phoneNumber: yup
        .string()
        .required("Phone number is required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(PHONE_NUMBER_DIDITS, `Must be exactly ${PHONE_NUMBER_DIDITS} digits`)
        .max(PHONE_NUMBER_DIDITS, `Must be exactly ${PHONE_NUMBER_DIDITS} digits`),
});
function isNumeric(str: string) {
    return (
        !isNaN(+str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
}
export {
    AddUserSchema,
    PHONE_NUMBER_DIDITS,
    isNumeric
}