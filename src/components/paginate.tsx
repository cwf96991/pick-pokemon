import { useCallback, useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";

const Paginate = (props: {
  items: unknown[];
  itemsListView: (items: unknown[]) => JSX.Element;
  pageClassName?: string;
  itemsInPage?: number;
  currentPage: number;
  setCurrentPage: (page: number) => void
  pageClickHandler?: () => void
}) => {
  const { items, itemsListView, itemsInPage, pageClassName, currentPage, setCurrentPage, pageClickHandler } = props;
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = itemsInPage || 4
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = useMemo(() => items.slice(itemOffset, endOffset), [items, itemOffset, endOffset]);
  const pageCount = Math.ceil(items.length / itemsPerPage);
  const handlePageClick = useCallback((event: { selected: number }) => {
    // scroll to clear all row
    if (pageClickHandler)
      pageClickHandler()

    const newOffset = (event.selected * itemsPerPage) % items.length;
    setCurrentPage(event.selected)
    setItemOffset(newOffset);
  },[items, itemsPerPage, setCurrentPage, pageClickHandler])
  useEffect(() => {
    if (items.length > 0) {
      const newOffset = ((currentPage ?? 0) * itemsPerPage) % items.length;
      setItemOffset(newOffset ?? 0);
    }
  }, [items.length, itemsPerPage, currentPage])

  return (
    <>
      {itemsListView(currentItems)}
      <div className={`flex justify-center ${pageClassName}`}>
        {items.length > itemsPerPage && (
          <ReactPaginate
            breakLabel="..."
            forcePage={(currentPage || 0)}
            nextLabel={
              <>
                <span className="sr-only">Next</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel={
              <div>
                <span className="sr-only">Previous</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            }
            previousClassName="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            nextClassName="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            className="mr-4 justify-center px-auto mt-2 w-4/5 md:w-auto inline-flex items-center -space-x-px"
            activeClassName=" z-10 px-3 py-2 leading-tight text-red-600 border border-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 dark:border-red-700 dark:bg-gray-700 dark:text-red-600"
            breakClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            pageClassName="px-3 py-2 leading-tight text-gray-500 bg-white border  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            disabledClassName="cursor-not-allowed"
            disabledLinkClassName="cursor-not-allowed"
          />
        )}
      </div>
    </>
  );
};

export default Paginate;
