import { useEffect, useState } from "react";
import { IRecord } from "../interface/record";
import useLocalStorage from "./useLocalStorage";

const useUserRecord = () => {
  const [userRecord, setUserRecord] = useState<IRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { getItem, setItem } = useLocalStorage<IRecord[]>("userRecord", []);


  async function loadUserRecord() {
    try {
      const localUserRecord = await getItem();
      setUserRecord(localUserRecord);
    } catch (error) {
      console.error("Failed to load user record from localStorage", error);
    } finally {
      setLoading(false);
    }
  }
  
  function deleteUserRecord(record: IRecord) {
    const index = userRecord.indexOf(record);
    if (index !== -1) {
      userRecord.splice(index, 1);
      setItem(userRecord);
      window.dispatchEvent(new Event("storage"));
    }
  }
  
  useEffect(() => {
    loadUserRecord();
    window.addEventListener("storage", () => {
      loadUserRecord();
    });
    return () => window.removeEventListener("storage", loadUserRecord);
  }, []);
  return { userRecord, deleteUserRecord ,loading};
};
export default useUserRecord;
