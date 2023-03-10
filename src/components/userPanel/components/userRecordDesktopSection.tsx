/* eslint-disable @typescript-eslint/no-explicit-any */
import Paginate from "../../paginate";
import { IRecord } from "../../../interface/record";

import UserRecord from "./userRecord";
function Items(props: {
  recordRef: any;
  currentItems: any[];
  deleteUserRecord: Function;
}) {
  const { currentItems, deleteUserRecord, recordRef } = props;
  return (
    <div className="md:min-h-[380px]">
      {currentItems &&
        currentItems.map((record: any, index: number) => {
          return (
            <UserRecord
              key={index}
              record={record}
              recordRef={recordRef}
              onDelete={deleteUserRecord}
            />
          );
        })}
    </div>
  );
}
const UserRecordList = (props: {
  recordRef: any;
  userRecord: IRecord[];
  isMobile: boolean;
  deleteUserRecord: Function;
}) => {
  const { userRecord, isMobile, deleteUserRecord, recordRef } = props;
  return (
    <>
      <div className=" w-full h-full flex flex-col overflow-y-auto">
        {userRecord.length > 0 && (
          <Paginate
            pageClassName="  "
            itemsInPage={isMobile ? 4 : 8}
            items={userRecord}
            itemsListView={(records: any) => {
              return (
                <Items
                  deleteUserRecord={deleteUserRecord}
                  currentItems={records}
                  recordRef={recordRef}
                />
              );
            }}
          />
        )}
      </div>
    </>
  );
};
const TitleText = (props: { userRecord: IRecord[] }) => {
  const { userRecord } = props;
  return (
    <div className=" mb-2 text-black dark:text-white text-[24px] md:text-[30px] font-bold text-center">
      {userRecord.length > 0
        ? "User Record"
        : " A tool to record your pokemon."}
    </div>
  );
};
const UserRecordDesktopSection = (props: {
  recordRef: any;
  userRecord: IRecord[];
  isMobile: boolean;
  deleteUserRecord: Function;
}) => {
  const { userRecord, isMobile, deleteUserRecord, recordRef } = props;

  return (
    <div className="hidden md:block w-full">
      <TitleText userRecord={userRecord} />
      <UserRecordList
        recordRef={recordRef}
        userRecord={userRecord}
        isMobile={isMobile}
        deleteUserRecord={deleteUserRecord}
      />
    </div>
  );
};
export { UserRecordDesktopSection, UserRecordList };
