import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

function useFormData() {
  const [firstName, setFirstName] = useState("");
  const debouncedFirstName = useDebounce<string>(firstName, 50);
  const [lastName, setLastName] = useState("");
  const debouncedLastName = useDebounce<string>(lastName, 50);
  const [phoneNumber, setPhoneNumber] = useState("");
  const debouncedPhoneNumber = useDebounce<string>(phoneNumber, 50);
  const [address, setAddress] = useState("");
  const debouncedAddress = useDebounce<string>(address, 50);
  const [isLoading, setIsLoading] = useState(true);

  const loadDataFromlocalStorage = () => {
    setIsLoading(true);
    const firstName = localStorage.getItem("firstName") ?? "";
    setFirstName(firstName);
    const lastName = localStorage.getItem("lastName") ?? "";
    setLastName(lastName);
    const phoneNumber = localStorage.getItem("phoneNumber") ?? "";
    setPhoneNumber(phoneNumber);
    const address = localStorage.getItem("address") ?? "";
    setAddress(address);
    setIsLoading(false);
  };
  useEffect(() => {
    loadDataFromlocalStorage();
  }, []);
  useEffect(() => {
    if (!isLoading) localStorage.setItem("firstName", debouncedFirstName);
  }, [debouncedFirstName, isLoading]);
  useEffect(() => {
    if (!isLoading) localStorage.setItem("lastName", debouncedLastName);
  }, [debouncedLastName, isLoading]);
  useEffect(() => {
    if (!isLoading) localStorage.setItem("phoneNumber", debouncedPhoneNumber);
  }, [debouncedPhoneNumber, isLoading]);
  useEffect(() => {
    if (!isLoading) localStorage.setItem("address", debouncedAddress);
  }, [debouncedAddress, isLoading]);

  const clearFormData = () => {
    localStorage.setItem("firstName", "");
    localStorage.setItem("lastName", "");
    localStorage.setItem("phoneNumber", "");
    localStorage.setItem("address", "");
    loadDataFromlocalStorage();
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phoneNumber,
    setPhoneNumber,
    address,
    setAddress,
    isLoading,
    setIsLoading,
    clearFormData,
  };
}

export default useFormData;
