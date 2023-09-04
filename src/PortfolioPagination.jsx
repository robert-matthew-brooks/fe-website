import './PortfolioPagination.css';

export default function PortfolioPagination({
  limit,
  page,
  totalProjects,
  changeRequestParams,
}) {
  const pageNumbers = [];
  for (let i = 0; i * limit < totalProjects; i++) {
    pageNumbers.push(i + 1);
  }

  const from = !totalProjects ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, totalProjects);

  const isFirstPage = page === 1;
  const isLastPage = page === pageNumbers.length;

  const prevPage = () => {
    if (!isFirstPage) changeRequestParams({ page: page - 1 });
  };

  const nextPage = () => {
    if (!isLastPage) changeRequestParams({ page: page + 1 });
  };

  return (
    <div id="PortfolioPagination">
      <div id="PortfolioPagination__button-wrapper">
        {/* prev << button */}
        <button
          onClick={() => {
            prevPage();
          }}
          style={{ display: isFirstPage ? 'none' : 'initial' }}
        >
          &#171;
        </button>

        {/* page number buttons */}
        {pageNumbers.map((pageNumber, i) => {
          return (
            <button
              key={i}
              disabled={pageNumber === page}
              onClick={() => {
                changeRequestParams({ page: pageNumber });
              }}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* next >> button */}
        <button
          onClick={() => {
            nextPage();
          }}
          style={{ display: isLastPage ? 'none' : 'initial' }}
        >
          &#187;
        </button>
      </div>

      <span>
        Results {from} - {to} of {totalProjects}
      </span>
    </div>
  );
}
