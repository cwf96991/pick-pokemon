
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import useDarkMode from '../hook/useDarkMode';
const DarkModeButton = () => {
    const { isDarkMode, toggleDarkModeHandler } = useDarkMode()
    return <div className="w-full">
        <div
            className=" float-right btn btn-outline  justify-center items-center dark:border-gray-700 border-gray-400 dark:hover:bg-gray-700 hover:bg-gray-400 hover:border-gray-400 hover:bg-opacity-30"
            onClick={() => {
                toggleDarkModeHandler()
            }}
        >
            {isDarkMode ? <DarkModeIcon
                sx={{ color: isDarkMode ? "#fff" : "#000" }}
            /> : <LightModeIcon
                sx={{ color: isDarkMode ? "#fff" : "#000" }}
            />}

        </div>
    </div>
}
export default DarkModeButton