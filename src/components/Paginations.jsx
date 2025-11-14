import ReactPaginate from 'react-paginate';

function Pagination({ pageCount, currentPage, onChange }) {
  return (
    <ReactPaginate
      className="pagination-main"
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={({ selected }) => onChange(selected + 1)}
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
