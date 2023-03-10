import { useEffect, useState } from "react";

const usePageHandler = () => {
  const [page, setPage] = useState(1);
  const pageClickHandler = (nextPage: number) => {
    //user can only go back to previous page
    if (nextPage < page) {
      setPage(nextPage);
      localStorage.setItem("page", nextPage.toString());
    }
  };
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    //get page params in url (xxxx/?page=urlParams)

    const localPage = localStorage.getItem("page") ?? "1";
    const pageParms = urlParams.get("page") ?? localPage;
    if (pageParms <= localPage) {
      //page params is smaller then local store's page
      //nivagate to the url assigned page
      setPage(Number(pageParms));
    } else {
      //go to previous page that store in local store
      //and change the url to correct one
      const finalUrl = window.location.origin + "/?page=" + localPage;

      window.location.href = finalUrl;
    }
  }, []);
  return { page, setPage, pageClickHandler };
};
export default usePageHandler;
