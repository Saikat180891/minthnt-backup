import React from "react";

const usePagination = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLastPage, setIsLastPage] = React.useState(false);

  const changePage = (dir) => {
    if (dir === -1) {
      // previous
      if (currentPage <= 1) return;
      if (isLastPage) setIsLastPage(true);
      setCurrentPage((currentPage) => currentPage - 1);
    } else {
      // next
      if (isLastPage) return;
      setCurrentPage((currentPage) => currentPage + 1);
    }
  };
  return {
    changePage,
    currentPage,
    isLastPage,
    setIsLastPage,
  };
};

export { usePagination };
