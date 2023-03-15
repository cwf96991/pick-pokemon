import Paginate from "../../paginate";
import { IRecord } from "../../../interface/record";

import UserRecord from "./userRecord";
import { useState } from "react";
function Items(props: {
  updateRecordRef: (record: IRecord) => void;
  currentItems: IRecord[];
  deleteUserRecord: (record: IRecord) => void;
}) {
  const { currentItems, deleteUserRecord, updateRecordRef } = props;
  return (
    <div className="md:min-h-[380px]">
      {currentItems &&
        currentItems.map((record: IRecord, index: number) => {
          return (
            <UserRecord
              key={index}
              record={record}
              updateRecordRef={updateRecordRef}
              onDelete={deleteUserRecord}
            />
          );
        })}
    </div>
  );
}
const UserRecordList = (props: {
  updateRecordRef: (record: IRecord) => void;
  userRecord: IRecord[];
  isMobile: boolean;
  deleteUserRecord: (record: IRecord) => void;
}) => {
  const { userRecord, isMobile, deleteUserRecord, updateRecordRef } = props;
  const [page, setPage] = useState<number>(0)
  return (
    <>
      <div className=" w-full h-full flex flex-col overflow-y-auto">
        {userRecord.length > 0 && (
          <Paginate
            currentPage={page}
            setCurrentPage={(page) => {
              setPage(page)
            }}
            pageClassName="  "
            itemsInPage={isMobile ? 4 : 8}
            items={userRecord}
            itemsListView={(records: unknown) => {
              return (
                <Items
                  deleteUserRecord={deleteUserRecord}
                  currentItems={records as IRecord[]}
                  updateRecordRef={updateRecordRef}
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
  updateRecordRef: (record: IRecord) => void;
  userRecord: IRecord[];
  isMobile: boolean;
  deleteUserRecord: (record: IRecord) => void;
}) => {
  const { userRecord, isMobile, deleteUserRecord, updateRecordRef } = props;

  return (
    <div className="hidden md:block w-full">
      <TitleText userRecord={userRecord} />
      <UserRecordList
        updateRecordRef={updateRecordRef}
        userRecord={userRecord}
        isMobile={isMobile}
        deleteUserRecord={deleteUserRecord}
      />
    </div>
  );
};
export { UserRecordDesktopSection, UserRecordList };
