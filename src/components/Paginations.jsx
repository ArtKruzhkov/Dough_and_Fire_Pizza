// import ReactPaginate from 'react-paginate';

// function Pagination({ pageCount, currentPage, onChange }) {
//   return (
//     <ReactPaginate
//       className="pagination-main"
//       breakLabel="..."
//       nextLabel=">"
//       previousLabel="<"
//       pageCount={pageCount}
//       forcePage={currentPage - 1}
//       onPageChange={({ selected }) => onChange(selected + 1)}
//       renderOnZeroPageCount={null}
//     />
//   );
// }

// export default Pagination;

import ReactPaginate from 'react-paginate';

function Pagination({ pageCount, currentPage, onChange }) {
  // если страниц нет или всего одна – кнопку пагинации не показываем
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
