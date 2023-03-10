import { useEffect, useState } from "react"
import { IRecord } from "../interface/record";

const useUserRecord = () => {
    const [userRecord, setUserRecord] = useState<IRecord[]>([])
    function loadUserRecord() {
        if (localStorage.userRecord) {
            let localUserRecord = JSON.parse(localStorage.userRecord);
            setUserRecord(localUserRecord)
        }
    }
    function deleteUserRecord(record: IRecord) {
        var index = userRecord.indexOf(record)
        if (index !== -1) {
            userRecord.splice(index, 1);
            localStorage.userRecord = JSON.stringify(userRecord)
            window.dispatchEvent(new Event("storage"));
        }
    }
    useEffect(() => {
        loadUserRecord()
        window.addEventListener('storage', () => {
            loadUserRecord()
        })
        return () => window.removeEventListener("storage", loadUserRecord);
    }, [])
    return { userRecord, deleteUserRecord }
}
export default useUserRecord