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
    const urlParams = new URLSearchParams(window.location.search);

    //get page params in url (xxxx/?page=urlParams)

    const localPage = localStorage.getItem("page") ?? "1";
    const pageParam = urlParams.get("page") ?? localPage;
    const pageNumber = Number(pageParam);

    if (pageNumber < Number(localPage)) {
      //page params is smaller then local store's page
      //nivagate to the url assigned page
      setPage(pageNumber);
      localStorage.setItem("page", pageNumber.toString());
    } else {
      setPage(Number(localPage));

      //go to previous page that store in local store
      //and change the url to correct one
      const finalUrl = `${window.location.origin}/?page=${localPage}`;
      window.history.replaceState(null, "", finalUrl);
    }
  }, []);
  return { page, setPage, pageClickHandler };
};
export default usePageHandler;
