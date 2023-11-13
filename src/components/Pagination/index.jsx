import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./pagination.module.scss";

const Pagination = ({ onChangePage, currentPage }) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			onPageChange={(e) => onChangePage(e.selected + 1)}
			pageRangeDisplayed={8}
			pageCount={3}
			previousLabel="<"
      forcePage={currentPage - 1}
			renderOnZeroPageCount={null}
		/>
	);
};

export default Pagination;
