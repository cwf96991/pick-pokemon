import { useEffect, useState } from 'react'
import useDebounce from './useDebounce';

function useFormData() {
    const [firstName, setFirstName] = useState("");
    const debouncedFirstName = useDebounce<string>(firstName, 500)
    const [lastName, setLastName] = useState("");
    const debouncedLastName = useDebounce<string>(lastName, 500)
    const [phoneNumber, setPhoneNumber] = useState("");
    const debouncedPhoneNumber = useDebounce<string>(phoneNumber, 500)
    const [address, setAddress] = useState("");
    const debouncedAddress = useDebounce<string>(address, 500)
    const [isLoading,setIsLoading] = useState(true)

    const loadDataFromlocalStorage = ()=>{
        setIsLoading(true)
        let firstName = localStorage.getItem("firstName")??""
        setFirstName(firstName)
        let lastName = localStorage.getItem("lastName")??""
        setLastName(lastName)
        let phoneNumber = localStorage.getItem("phoneNumber")??""
        setPhoneNumber(phoneNumber)
        let address = localStorage.getItem("address")??""
        setAddress(address)
        setIsLoading(false)
      }
      useEffect(()=>{
        loadDataFromlocalStorage()
      },[])
     useEffect(()=>{
        if (!isLoading)
        localStorage.setItem("firstName", debouncedFirstName);
     },[debouncedFirstName, isLoading])
     useEffect(()=>{
        if (!isLoading)
        localStorage.setItem("lastName", debouncedLastName);
     },[debouncedLastName, isLoading])
     useEffect(()=>{
        if (!isLoading)
        localStorage.setItem("phoneNumber", debouncedPhoneNumber);
     },[debouncedPhoneNumber, isLoading])
     useEffect(()=>{
        if (!isLoading)
        localStorage.setItem("address", debouncedAddress);
     },[debouncedAddress, isLoading])
    // useEffect(()=>{
    //     window.onbeforeunload = function(e) {
    //         return "Do you want to exit this page?";
    //       };
    // },[])

  return {
    firstName,setFirstName,
    lastName,setLastName,
    phoneNumber,setPhoneNumber,
    address,setAddress,
    isLoading,setIsLoading
  }
}

export default useFormData