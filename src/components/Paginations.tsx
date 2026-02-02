import ReactPaginate from 'react-paginate';

type PaginationProps = {
  pageCount: number;
  currentPage: number;
  onChange: (page: number) => void;
};

function Pagination({ pageCount, currentPage, onChange }: PaginationProps) {
  if (!pageCount || pageCount <= 1) return null;

  const forced = Math.min(Math.max((currentPage ?? 1) - 1, 0), pageCount - 1);

  return (
    <ReactPaginate
      className="pagination-main"
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageRangeDisplayed={4}
      pageCount={pageCount}
      forcePage={forced}
      onPageChange={({ selected }) => onChange(selected + 1)}
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
