import React from "react";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <ReactPaginate
      previousLabel={<span aria-hidden>←</span>}
      nextLabel={<span aria-hidden>→</span>}
      breakLabel="…"
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      pageClassName={css.item}
      pageLinkClassName={css.link}
      previousClassName={css.item}
      nextClassName={css.item}
      breakClassName={css.item}
      breakLinkClassName={css.link}
      activeClassName={css.active}
      disabledClassName={css.disabled}
    />
  );
};

export default Pagination;
