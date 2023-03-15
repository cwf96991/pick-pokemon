import { useRef } from "react";
import DarkModeButton from "../darkModeButton";
import { UserRecordButton } from "./components";
import { pokemonBallImg } from "../../constant";
import {
  UserRecordDesktopSection,
  UserRecordList,
} from "./components/userRecordDesktopSection";
import useIsMobile from "../../hook/useIsMobile";
import useUserRecord from "../../hook/useUserRecord";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import DeleteModal from "../deleteModal";
import useDrawer from "../../hook/useDrawer";
import { IRecord } from "../../interface/record";
const UserPanel = (props: {
  isDarkMode: boolean;
}) => {
  const { isOpen, toggleDrawer } = useDrawer();
  const { isDarkMode } = props;
  const { isMobile } = useIsMobile();
  const { userRecord, deleteUserRecord } = useUserRecord();
  const recordRef = useRef<IRecord>();
  function updateRecordRef(record: IRecord) {
    recordRef.current = record
  }
  return (
    <>
      <div className=" md:hidden mx-4 mt-4 flex justify-between">
        <UserRecordButton toggleDrawer={toggleDrawer} isDarkMode={isDarkMode} />
        <DarkModeButton />
      </div>
      <div className="flex flex-col items-center w-full p-4 m-auto mt-10">
        <img
          src={pokemonBallImg}
          alt={"Pokenmon Ball"}
          className="m-auto md:w-[128px] md:h-[128px] w-[64px] h-[64px]"
        />

        <UserRecordDesktopSection
          updateRecordRef={updateRecordRef}
          userRecord={userRecord}
          isMobile={isMobile}
          deleteUserRecord={deleteUserRecord}
        />
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="left"
          className="!w-4/5 p-4 !bg-gray-100 dark:!bg-gray-800 text-black dark:text-white !flex-col !flex  h-screen"
        >
          <div className="text-2xl font-bold text-center mt-10 mb-[150px]">
            User Record
          </div>
          <div className="h-[calc(100vh-250px)] overflow-y-auto">
            <UserRecordList
              userRecord={userRecord}
              isMobile={isMobile}
              deleteUserRecord={deleteUserRecord}
              updateRecordRef={updateRecordRef}
            />
          </div>
          <DeleteModal
            onConfirm={() => {
              deleteUserRecord(recordRef.current as IRecord);
            }}
          />
        </Drawer>
      </div>
    </>
  );
};
export default UserPanel;
