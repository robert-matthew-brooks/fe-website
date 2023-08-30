import './PortfolioPagination.css';

export default function PortfolioPagination({
  totalProjects,
  projectsPerPage,
  currentPage,
  setCurrentPage,
}) {
  const pageNumbers = [];
  for (let i = 0; i * projectsPerPage < totalProjects; i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <div className="PortfolioPagination">
      <div className="PortfolioPagination__button-wrapper">
        <button>&lt;</button>

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

        <button>&gt;</button>
      </div>
      <span>Results 1-6 of 20</span>
    </div>
  );
}
