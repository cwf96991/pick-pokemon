import { Header } from "./components/";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDarkMode from "./hook/useDarkMode";
import UserPanel from "./components/userPanel/index";
import usePageHandler from "./hook/usePageHandler";
import Form from "./components/form/index";
function App() {
  const { isDarkMode, toggleDarkModeHandler } = useDarkMode();
  const { page, setPage, pageClickHandler } = usePageHandler();

  const MainPanel = () => {
    return (
      <div className="md:m-auto m-4">
        <Header page={page} setPage={pageClickHandler} />
        <Form page={page} setPage={setPage} />
      </div>
    );
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div
        className={`w-screen h-screen flex flex-col  md:flex-row bg-white dark:bg-black `}
      >
        <div className="md:w-1/3 w-full ">
          <UserPanel
            isDarkMode={isDarkMode}
            toggleDarkModeHandler={toggleDarkModeHandler}
          />
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 md:w-1/2 w-full flex flex-col flex-1">
          <MainPanel />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
