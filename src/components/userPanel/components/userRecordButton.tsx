import HistoryIcon from "@mui/icons-material/History";

const UserRecordButton = (props: {
  toggleDrawer: Function;
  isDarkMode: boolean;
}) => {
  const { toggleDrawer, isDarkMode } = props;
  return (
    <div
      onClick={() => {
        toggleDrawer();
      }}
      className="text-white btn btn-outline dark:border-gray-700 border-gray-400"
    >
      <HistoryIcon sx={{ color: isDarkMode ? "#fff" : "#000" }} />
    </div>
  );
};
export default UserRecordButton;
