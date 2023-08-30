import './PortfolioPagination.css';

export default function PortfolioPagination({
  projectsPerPage,
  currentPage,
  totalProjects,
  setCurrentPage,
}) {
  const pageNumbers = [];
  for (let i = 0; i * projectsPerPage < totalProjects; i++) {
    pageNumbers.push(i + 1);
  }

  const from = !totalProjects ? 0 : (currentPage - 1) * projectsPerPage + 1;
  const to = Math.min(currentPage * projectsPerPage, totalProjects);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageNumbers.length;

  const prevPage = () => {
    if (!isFirstPage) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (!isLastPage) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="PortfolioPagination">
      <div className="PortfolioPagination__button-wrapper">
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
              disabled={pageNumber === currentPage}
              onClick={() => {
                setCurrentPage(pageNumber);
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
